import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ToastNotification from '../components/ToastNotification';
import ShareModal from '../components/ShareModal';
import EditModal from '../components/EditModal';
import { createList, deleteList, getListsByUserId, markListAsCompleted, updateList } from '../services/shoppingListService';
import { generateToken } from '../services/shareListAndToken';
import { formatCurrency, formatTitleCase } from '../utils/functions';
import { createItem, deleteItem, getItemsById, markAsPurchased, updateItem } from '../services/listItemService';
import { findAllItems } from '../services/itemsService';

const Home = () => {
  const [lists, setLists] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [shareToken, setShareToken] = useState('');
  const [listName, setListName] = useState('');
  const [editingList, setEditingList] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: 0 });
  const [availableItems, setAvailableItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
      fetchUserLists(userIdFromStorage);
    }
  }, [])

  useEffect(() => {
    if (selectedList) {
      fetchItemsForList(selectedList.list_id);
    }
  }, [selectedList]);

  useEffect(() => {
    fetchAvailableItems();
  }, [])

  const filteredItems = availableItems.filter(item =>
    item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchUserLists = async (userId) => {
    try {
      const response = await getListsByUserId(userId);

      setLists(response || []);
    } catch (error) {
      console.error('Erro ao buscar listas:', error.message);
    }
  };

  const fetchItemsForList = async (listId) => {
    try {
      const response = await getItemsById(listId);

      setItems(response || []);
    } catch (error) {
      console.error('Erro ao buscar itens:', error.message);
    }
  };

  const fetchAvailableItems = async () => {
    try {
      const response = await findAllItems();
      setAvailableItems(response);
    } catch (error) {
      console.error('Erro ao buscar itens:', error.message);
    }
  }

  const handleCreateList = async () => {
    try {
      const response = await createList(userId, 'Nova Lista');
      setLists([...lists, response]);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleMarkAsCompleted = async (listId) => {
    try {
      await markListAsCompleted(listId);

      setLists((prevLists) =>
        prevLists.map((list) =>
          list.list_id === listId ? { ...list, completed_at: true } : list
        )
      );

      setToast({ show: true, message: 'Marcada com sucesso!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Erro ao marcar lista.', type: 'danger' });
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId);
      setLists((prevLists) => prevLists.filter((list) => list.list_id !== listId));
      setToast({ show: true, message: 'Lista excluída com sucesso', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Erro ao excluir a lista.', type: 'danger' });
    }
  };

  const handleUpdateList = async (listId, newName) => {
    try {
      const formattedName = formatTitleCase(newName);
      await updateList(listId, newName);
      setLists(lists.map((list) =>
        list.list_id === listId ? { ...list, list_name: formattedName } : list
      ));
      setToast({ show: true, message: 'Nome da lista atualizado com sucesso!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Erro ao atualizar o nome da lista.', type: 'danger' });
    }
  };

  const handleShareClick = async (listId, name) => {
    try {
      const tokenData = await generateToken(listId, userId);
      const token = tokenData.data.token;
      console.log(token);

      setShareToken(token);
      setListName(name);
      setShowModal(true);
    } catch (error) {
      setToast({ show: true, message: 'Erro ao gerar o token.', type: 'danger' });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddItem = async () => {
    const { name, quantity, price } = newItem;  // 'price' é o preço unitário
    if (!name || quantity <= 0 || price <= 0) {
      setToast({ show: true, message: 'Preencha todos os campos corretamente.', type: 'danger' });
      return;
    }

    try {
      // Verifica se o item existe no banco de dados
      const existingItem = availableItems.find((item) => item.product_name.toLowerCase() === name.toLowerCase());

      let response;

      if (existingItem) {
        // Se o item existir, cria um item do tipo "common"
        response = await createItem(
          selectedList.list_id,
          existingItem.item_id,  // Usa o item_id do banco de dados
          null,  // Não define customName, já que o item é do tipo "common"
          quantity,
          price  // Usa o preço unitário
        );

        // Atualiza os campos corretamente
        response = {
          ...response,
          type: 'common',
          item: { id: existingItem.item_id, name: existingItem.product_name },  // Nome correto do item
          unit_price: price,  // Certifique-se de incluir o preço unitário
        };

      } else {
        // Se o item não existir, cria um item do tipo "custom"
        response = await createItem(
          selectedList.list_id,
          null,  // Não define item_id, já que é um item personalizado
          name,  // Define o nome como customName
          quantity,
          price  // Usa o preço unitário
        );

        // Atualiza os campos corretamente para um item customizado
        response = {
          ...response,
          type: 'custom',
          customName: name,  // Nome do item customizado
          unit_price: price,  // Certifique-se de incluir o preço unitário
        };
      }

      // Formata a resposta de acordo com o formato de formattedItems
      const formattedResponse = {
        id: response.list_item_id || response.id,  // Usa o list_item_id ou id
        name: response.type === 'custom' ? response.customName : response.item?.name || 'Nome não disponível para adicionar',
        quantity: response.quantity || 0,
        price: response.price || response.unit_price || 0,
        total: response.quantity && (response.price || response.unit_price)
          ? (response.quantity * (response.price || response.unit_price))
          : 0,
        type: response.type, // Adiciona o tipo do item (custom ou common)
      };

      // Atualiza o estado de itens
      setItems(prevItems => {
        const updatedItems = [...prevItems];
        updatedItems.push(formattedResponse);  // Adiciona o item formatado
        return updatedItems;
      });

      setToast({ show: true, message: 'Item adicionado com sucesso!', type: 'success' });
      setNewItem({ name: '', quantity: 0, price: 0 });  // Reseta os campos

    } catch (error) {
      setToast({ show: true, message: `Erro ao adicionar item: ${error.message}`, type: 'danger' });
      console.error(error.message);
    }
  };

  const handleEditItem = async (item) => {
    if (!item) {
      console.error("Item não encontrado!");
      return; // Evita que o código continue caso "item" seja nulo
    }
  
    try {
      // Se o item não está em edição, configuramos ele para ser editado
      if (!editingItem || editingItem.id !== item.id) {
        console.log('Iniciando a edição do item');
        const itemToEdit = items.find(i => i.id === item.id);
        if (itemToEdit) {
          // Define o item a ser editado
          setEditingItem({ ...itemToEdit, unit_price: itemToEdit.unit_price || '' });
        } else {
          console.error("Item para editar não encontrado.");
        }
      } else {
        // Se já estamos editando, salva ou atualiza o item
        const isEditing = editingItem.id === item.id;
  
        if (isEditing) {
          // Atualiza ou salva o item
          const updatedItem = await updateItem(
            editingItem.id,
            editingItem.quantity,
            editingItem.price,
            editingItem.customName,
          );
  
          // Formata o item atualizado
          const formattedUpdatedItem = {
            id: updatedItem.list_item_id || updatedItem.id,
            customName: updatedItem.custom_product || updatedItem.customName || 'Nome não disponível',
            quantity: updatedItem.quantity || 0,
            price: updatedItem.price || updatedItem.unit_price || 0,
            total: updatedItem.quantity && (updatedItem.price || updatedItem.unit_price)
              ? (updatedItem.quantity * (updatedItem.price || updatedItem.unit_price))
              : 0,
            type: updatedItem.type,
          };
  
          // Log para ver o item atualizado formatado
          console.log('Item atualizado (formatado):', formattedUpdatedItem);
  
          // Atualiza a lista de itens com o item formatado
          // setItems(prevItems => {
          //   return prevItems.map(prevItem => {
          //     console.log('Comparando item:', prevItem.id, 'com', formattedUpdatedItem.id);
          
          //     if (prevItem.id === formattedUpdatedItem.id) {
          //       console.log('Item atualizado:', formattedUpdatedItem);
          //       return { ...prevItem, ...formattedUpdatedItem }; // Atualiza o item encontrado
          //     } else {
          //       return prevItem; // Retorna o item inalterado
          //     }
          //   });
          // });
          setItems(prevItems => {
            const updatedItems = prevItems.map(prevItem => {
              if (prevItem.id === formattedUpdatedItem.id) {
                return { ...prevItem, ...formattedUpdatedItem };  // Atualiza o item
              } else {
                return prevItem; // Deixa os outros itens inalterados
              }
            });
            
            console.log('Items atualizados:', updatedItems);
            return updatedItems;
          });
          
          
          
  
          setToast({ show: true, message: 'Item atualizado com sucesso!', type: 'success' });
          setEditingItem(null);  // Limpa a edição
        }
      }
    } catch (error) {
      setToast({ show: true, message: `Erro ao atualizar item: ${error.message}`, type: 'danger' });
    }
  };  
  
  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleInputChange = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleMarkItemAsBought = async (itemId) => {
    try {
      await markAsPurchased(itemId);
      setItems(items.map(item => item.id === itemId ? { ...item, bought: true } : item));
      setToast({ show: true, message: `Item marcado como comprado`, type: 'success' });
    } catch (error) {
      alert('Erro ao marcar item como comprado:', error.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId);
      setItems(items.filter(item => item.id !== itemId));
      setToast({ show: true, message: 'Item excluído', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: `Erro ao excluir item: ${error.message}`, type: 'danger' });
    }
  };

  const formattedItems = items.map(item => ({
    id: item.list_item_id || item.id,
    name: item.customName || item.item?.name || 'Nome não disponívell',
    quantity: item.quantity || 0,
    price: item.price || item.unit_price || 0,
    total: item.quantity && (item.price || item.unit_price)
      ? (item.quantity * (item.price || item.unit_price))
      : 0,
    type: item.type,
  }));

  return (
    <div>
      <Header />
      <div className="container p-0">
        <div className="row py-3">
          {/* Sidebar */}
          <div className="col-3 ">
            <Sidebar
              lists={lists}
              onToggleComplete={handleMarkAsCompleted}
              onEdit={(list) => setEditingList(list)}
              onDelete={handleDeleteList}
              onShare={handleShareClick}
              onAddList={handleCreateList}
              onSelectList={setSelectedList}
            />

            <ShareModal showModal={showModal} onClose={handleCloseModal} token={shareToken} listName={listName} />
            {editingList && (
              <EditModal
                list={editingList}
                onClose={() => setEditingList(null)}
                onSave={(listId, newName) => {
                  handleUpdateList(listId, newName);
                  setEditingList(null);
                }}
              />
            )}
          </div>
          {/* Items da lista */}
          <div className="col-9">
            {selectedList ? (
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="d-flex align-items-center">
                  <h3>Itens da Lista:</h3>
                  <h4 className="ms-2 fw-bold text-primary">{selectedList.list_name}</h4>
                </div>
                <div className="row border-bottom border-primary p-2">
                  <div className="col-3">Item</div>
                  <div className="col-2">Quant.</div>
                  <div className="col-2">Preço Un.</div>
                  <div className="col-2">Total</div>
                  <div className="col-3 text-end">Ações</div>
                </div>
                {formattedItems.map(item => (
                  <div key={item.id} className="row p-2 align-items-center fs-9">
                    <div className="col-3 fs-9">
                      {editingItem && editingItem.id === item.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editingItem.type === 'common' ? item.name : editingItem.customName}
                          disabled={editingItem.type === 'common'}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            [editingItem.type === 'custom' ? 'customName' : 'name']: e.target.value
                          })}
                        />
                      ) : (
                        item.name
                      )}
                    </div>
                    <div className="col-2 fs-9">
                      {editingItem && editingItem.id === item.id ? (
                        <input
                          type="number"
                          className="form-control"
                          value={editingItem.quantity}
                          onChange={(e) => setEditingItem({ ...editingItem, quantity: Number(e.target.value) })}
                        />
                      ) : (
                        item.quantity
                      )}
                    </div>
                    <div className="col-2 fs-9">
                      {editingItem && editingItem.id === item.id ? (
                        <input
                          type="number"
                          className="form-control"
                          value={editingItem.price}
                          onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                        />
                      ) : (
                        formatCurrency(item.price)
                      )}
                    </div>
                    <div className="col-2 fs-9">
                      {editingItem && editingItem.id === item.id ? (
                        formatCurrency(editingItem.quantity * editingItem.price)
                      ) : (
                        formatCurrency(item.quantity * item.price)
                      )}
                    </div>
                    <div className="col-3 d-flex justify-content-around fs-9">
                      {editingItem && editingItem.id === item.id ? (
                        <>
                          <button className="btn btn-sm btn-success rounded-circle" onClick={() => handleEditItem(item)}>
                            <i className="bi bi-save"></i>
                          </button>
                          <button className="btn btn-sm btn-secondary rounded-circle" onClick={handleCancelEdit}>
                            <i className="bi bi-x"></i>
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-sm btn-success rounded-circle" onClick={() => handleMarkItemAsBought(item)}>
                            <i className="bi bi-check"></i>
                          </button>
                          <button className="btn btn-sm btn-primary rounded-circle" onClick={() => handleEditItem(item)}>
                            <i className="bi bi-pencil-fill"></i>
                          </button>
                          <button className="btn btn-sm btn-danger rounded-circle" onClick={() => handleDeleteItem(item.id)}>
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                <div className="row p-2 align-items-center fs-9">
                  <div className="col-3 fs-9">
                    <input
                      type="text"
                      className="form-control p-0 no-focus-border placeholder-dark"
                      placeholder="Novo item"
                      value={newItem.name}
                      onChange={(e) => {
                        setNewItem({ ...newItem, name: e.target.value });
                        setSearchQuery(e.target.value);
                      }}
                      list="itemSuggestions"
                    />
                    <datalist id="itemSuggestions">
                      {availableItems.map((item) => (
                        <option key={item.item_id} value={item.product_name} />
                      ))}
                    </datalist>
                  </div>
                  <div className="col-2 fs-9">
                    <input
                      type="number"
                      className="form-control p-0 no-focus-border placeholder-dark"
                      placeholder="0"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                    />
                  </div>
                  <div className="col-2 fs-9">
                    <input
                      type="number"
                      className="form-control p-0 no-focus-border text-dark"
                      placeholder="R$ 0,00"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="col-2 fs-9">
                    {newItem.quantity && newItem.price ? formatCurrency(newItem.quantity * newItem.price) : formatCurrency(0)}
                  </div>
                  <div className="col-3 text-end fs-9">
                    <button className="btn btn-sm btn-success rounded-circle" onClick={handleAddItem}>
                      <i className="bi bi-save"></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p>Selecione uma lista para ver seus itens.</p>
            )}
          </div>

        </div>
      </div>
      <ToastNotification
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default Home;