import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CreateListForm from '../components/CreateListForm';
import EditListModal from '../components/EditModal';
import ShareModal from '../components/ShareModal';
import ConfirmModal from '../components/ConfirmModal';
import ToastNotification from '../components/ToastNotification';
import listService from '../services/listService';
import listItemService from '../services/listItemService';
import { getUserId } from '../services/authService';
import ItemList from '../components/ItemList';
import SelectItemDetailsModal from '../components/SelectItemDetailsModal ';

const Home = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [selectedListName, setSelectedListName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [listNameToEdit, setListNameToEdit] = useState('');
  const [listIdToEdit, setListIdToEdit] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareToken, setShareToken] = useState('');
  const [listToShare, setListToShare] = useState('');
  const [listToDelete, setListToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showToast, setShowToast] = useState(false);
  const [selectedListItems, setSelectedListItems] = useState([]);
  const [showItemConfirmModal, setShowItemConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [itemDetails, setItemDetails] = useState({
    categoryId: null,
    brandId: null,
    barcode: null,
  });

  useEffect(() => {
    const getLists = async () => {
      try {
        const userId = getUserId();
        const data = await listService.getListsByUserId(userId);
        setLists(data);
      } catch (error) {
        console.error('Erro ao carregar listas', error);
      }
    };

    const getListItems = async () => {
      try {
        if (!selectedList) {
          console.error('Nenhuma lista selecionada.');
          return;
        }
        const response = await listItemService.getItemsByListId(selectedList);
        setSelectedListItems(response.data);

      } catch (error) {
        console.error('Erro ao carregar itens da lista', error);
        showToastNotification('Erro ao carregar itens da lista.', 'danger');
      }
    };

    getListItems();
    getLists();
  }, [selectedList]);

  const showToastNotification = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  // Listas
  const handleCreateList = async () => {
    try {
      if (newListName.trim() === '') {
        showToastNotification('O nome da lista não pode estar vazio.', 'danger');
        return;
      }
      const newList = await listService.createList(newListName);
      setLists([...lists, newList]);
      setNewListName('');
      setShowCreateForm(false);
      showToastNotification('Lista criada com sucesso!', 'success');
    } catch (error) {
      showToastNotification(`Erro ao criar lista: ${error}`, 'danger');
    }
  };

  const saveUpdatedListName = async (newListName) => {
    try {
      const updatedList = await listService.updateList(listIdToEdit, newListName);
      setLists(lists.map((list) =>
        list.listId === listIdToEdit ? { ...list, listName: updatedList.listName } : list
      ));
      showToastNotification('Lista editada com sucesso!', 'success');
    } catch (error) {
      showToastNotification(`Erro ao editar lista: ${error}`, 'danger');
    }
  };

  const handleEdit = (listId, listName) => {
    setListIdToEdit(listId);
    setListNameToEdit(listName);
    setShowEditModal(true);
  };

  const handleDeleteList = (listId) => {
    setListToDelete(listId);
    setConfirmAction('deleteList');
    setShowItemConfirmModal(true);
  };

  const confirmDeleteList = async () => {
    try {
      if (listToDelete) {
        await listService.deleteList(listToDelete);
        setLists(lists.filter((list) => list.listId !== listToDelete));
        showToastNotification('Lista excluída com sucesso!', 'success');
        setListToDelete(null);
      }
    } catch (error) {
      showToastNotification(`Erro ao excluir lista: ${error}`, 'danger');
    } finally {
      setShowItemConfirmModal(false);
    }
  };

  const handleShare = async (listId) => {
    try {
      const list = lists.find((list) => list.listId === listId);
      const dataToken = await listService.generateShareToken(listId);
      setShareToken(dataToken.token);
      setListToShare(list.listName);
      setShowShareModal(true);
      showToastNotification('Token gerado com sucesso!', 'success');
    } catch (error) {
      showToastNotification('Erro ao gerar token de compartilhamento.', 'danger');
    }
  };

  const markAsBought = async (listId) => {
    try {
      // Encontrar os itens selecionados para a lista pela ID
      const selectedItems = selectedListItems.filter((item) => item.listId === listId);

      if (selectedItems.length === 0) {
        showToastNotification('Lista sem itens ou com dados inválidos.', 'danger');
        return;
      }

      // Calcular o total da lista somando os preços dos itens e multiplicando pela quantidade
      const totalAmount = selectedItems.reduce((total, item) => total + (item.price * item.quantity || 0), 0);

      // Chamar o serviço para marcar a lista como concluída
      const result = await listService.markAsCompleted(listId, totalAmount);

      if (result.status) {
        setLists(lists.map((listItem) =>
          listItem.listId === listId
            ? {
              ...listItem,
              completedAt: result.data.completedAt,
              totalAmount: result.data.totalAmount,
            }
            : listItem
        ));
        showToastNotification('Lista marcada como concluída!', 'success');
      } else {
        showToastNotification('Não foi possível marcar a lista como concluída.', 'danger');
      }
    } catch (error) {
      console.error('Erro ao marcar a lista como concluída:', error.message);
      showToastNotification(`Erro: ${error.message}`, 'danger');
    }
  };

  const handleSelectList = async (listId) => {
    try {
      // Encontrar a lista pelo ID
      const selected = lists.find((list) => list.listId === listId);
      if (selected) {
        setSelectedList(listId);
        setSelectedListName(selected.listName);
      } else {
        console.warn('Lista não encontrada para o ID:', listId);
      }
    } catch (error) {
      console.error('Erro ao selecionar a lista:', error);
      showToastNotification('Erro ao selecionar a lista.', 'danger');
    }
  };

  // Itens
  const handleAddNewItem = async (newItem) => {
    // Certifique-se de que listId está sendo passado corretamente
    if (!newItem.listId) {
      console.error("listId não foi fornecido.");
      return;
    }

    try {
      // Verifique se o item é 'custom' ou 'common' antes de enviar
      const itemData = {
        listId: newItem.listId,
        quantity: newItem.quantity,
        price: newItem.price,
      };

      if (newItem.itemType === 'custom') {
        itemData.itemName = newItem.name;
        itemData.item_type = 'custom';
      } else {
        itemData.itemId = newItem.itemId;
      }

      // Chame o serviço para criar o item com o novo formato
      const addedItem = await listItemService.creatListItem(itemData);
      setSelectedListItems([...selectedListItems, addedItem]);
      showToastNotification('Item adicionado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      showToastNotification('Erro ao adicionar item.', 'danger');
    }
  };

  const handleEditItem = async (itemId, updatedItem) => {
    try {
      // Chama o serviço para atualizar o item com os dados de updatedItem
      const updated = await listItemService.updateListItem(itemId, updatedItem);

      // Atualiza o estado dos itens com o item atualizado
      setSelectedListItems(
        selectedListItems.map((item) =>
          item.itemListId === itemId ? { ...item, ...updated } : item
        )
      );

      showToastNotification('Item atualizado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao editar item:', error);
      showToastNotification('Erro ao editar item.', 'danger');
    }
  };

  const handleDeleteItem = (itemListId) => {
    setItemToDelete(itemListId);
    setConfirmAction('deleteItem');
    setShowItemConfirmModal(true);
  };

  const confirmDeleteItem = async () => {
    try {
      if (itemToDelete) {
        await listItemService.deleteListItem(itemToDelete);
        setSelectedListItems(selectedListItems.filter(item => item.itemListId !== itemToDelete));
        showToastNotification('Item excluído com sucesso!', 'success');
        setItemToDelete(null);
      }
    } catch (error) {
      showToastNotification(`Erro ao excluir item: ${error}`, 'danger');
    } finally {
      setShowItemConfirmModal(false);
    }
  };

  const handleMarkItemAsBought = async () => {
    try {
      await listItemService.markAsPurchased({
        itemListId: selectedItem.itemListId,
        userId: getUserId(),
        categoryId: itemDetails.categoryId,
        brandId: itemDetails.brandId,
        barcode: itemDetails.barcode,
      });

      setSelectedListItems(selectedListItems.map(item =>
        item.itemListId === selectedItem.itemListId
          ? { ...item, purchasedAt: new Date().toISOString() }
          : item
      ));

      showToastNotification('Item marcado como comprado!', 'success');
    } catch (error) {
      console.error('Erro ao marcar item como comprado:', error);
      showToastNotification('Erro ao marcar item como comprado.', 'danger');
    }
  };

  const handleAskForItemDetails = (itemId) => {
    const item = selectedListItems.find(item => item.itemListId === itemId);
    if (!item) {
      console.error("Item não encontrado.");
      return;
    }

    setSelectedItem(item);
    setConfirmAction('markAsBought');
    setShowItemConfirmModal(true);
  };

  const handleSaveItemDetails = (data) => {
    if (!selectedItem) {
      console.error("Nenhum item selecionado.");
      return;
    }

    const newItemDetails = {
      categoryId: data?.categoryId || null,
      brandId: data?.brandId || null,
      barcode: data?.barcode || null,
    };

    setItemDetails(newItemDetails);
    setShowModal(false);

    // Agora usamos o estado itemDetails dentro de handleMarkItemAsBought
    handleMarkItemAsBought();
  };

  const handleConfirmAction = (action) => {
    if (action === 'deleteList') {
      confirmDeleteList();
    } else if (action === 'deleteItem') {
      confirmDeleteItem();
    } else if (action === 'details') {
      setShowModal(true);
    } else if (action === 'noDetails') {
      handleMarkItemAsBought({
        itemListId: selectedItem.itemListId,
        userId: getUserId(),
        categoryId: null,
        brandId: null,
        barcode: null,
      });
    } else if (action === null) {
      // Quando o botão "Não" é clicado e a ação é nula, apenas fecha o modal
      setShowItemConfirmModal(false);
    }
  };

  const getModalButtons = () => {
    if (confirmAction === 'deleteList') {
      return [
        {
          text: "Sim, excluir",
          className: "btn-danger",
          action: confirmDeleteList,
        },
        {
          text: "Cancelar",
          className: "btn-secondary",
          action: () => setShowItemConfirmModal(false),
        }
      ];
    } else if (confirmAction === 'deleteItem') {
      return [
        {
          text: "Sim, excluir",
          className: "btn-danger",
          action: confirmDeleteItem,
        },
        {
          text: "Cancelar",
          className: "btn-secondary",
          action: () => setShowItemConfirmModal(false),
        }
      ];
    } else if (confirmAction === 'markAsBought') {
      return [
        {
          text: "Sim, adicionar detalhes",
          className: "btn-primary",
          action: () => setShowModal(true),
        },
        {
          text: "Não, apenas marcar",
          className: "btn-success",
          action: () => handleConfirmAction('noDetails'),
        },
        {
          text: "Cancelar",
          className: "btn-secondary",
          action: () => setShowItemConfirmModal(false),
        }
      ];
    }
    return [];
  };

  const getModalMessage = () => {
    if (confirmAction === 'deleteList') {
      return "Você realmente deseja excluir esta lista?";
    } else if (confirmAction === 'deleteItem') {
      return "Você realmente deseja excluir este item?";
    } else if (confirmAction === 'markAsBought') {
      return "Você gostaria de fornecer informações adicionais (categoria, marca, código de barras) para este item?";
    }
    return '';
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-3 mb-5 mb-lg-0">
            <Sidebar
              lists={lists}
              onSelectList={handleSelectList}
              onEdit={handleEdit}
              onDelete={handleDeleteList}
              onShare={handleShare}
              onCreateNewList={() => setShowCreateForm(true)}
              onMarkAsBought={(listId) => markAsBought(listId)}
            />
          </div>

          <div className="col-lg-9">
            <div className="card bg-light-custom border-0">
              <div className="card-body">
                {selectedList ? (
                  <>
                    <ItemList
                      listName={selectedListName}
                      items={selectedListItems}
                      listId={selectedList}
                      onEdit={(itemId, updatedItem) => handleEditItem(itemId, updatedItem)}
                      onDelete={(itemId) => handleDeleteItem(itemId)}
                      onAddNewItem={(newItem) => handleAddNewItem(newItem)}
                      onAskDetails={(itemId) => handleAskForItemDetails(itemId)}
                    />
                  </>
                ) : (
                  <>
                    <p className="text-center">Selecione uma lista para visualizar os itens.</p>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      <CreateListForm
        show={showCreateForm}
        onClose={() => {
          setShowCreateForm(false);
          setNewListName('');
        }}
        onSubmit={handleCreateList}
        listName={newListName}
        setListName={setNewListName}
      />

      <EditListModal
        showModal={showEditModal}
        onClose={() => setShowEditModal(false)}
        listName={listNameToEdit}
        onSave={saveUpdatedListName}
      />

      <ShareModal
        showModal={showShareModal}
        onClose={() => setShowShareModal(false)}
        token={shareToken}
        listName={listToShare}
      />

      <SelectItemDetailsModal
        show={showModal}
        onHide={() => setShowItemConfirmModal(false)}
        onSave={handleSaveItemDetails}
      />

      <ConfirmModal
        show={showItemConfirmModal}
        onClose={() => setShowItemConfirmModal(false)}
        onConfirm={handleConfirmAction}
        message={getModalMessage()}
        buttons={getModalButtons()}
      />

      <ToastNotification
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default Home;
