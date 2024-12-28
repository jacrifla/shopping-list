import React, { useState } from 'react';
import ShoppingItem from '../ShoppingItem';

const MainContent = () => {
  const listName = "Lista de Compras 1"; // Substituir por props ou estado
  const totalValue = 125.75; // Substituir por props ou estado

  const [items, setItems] = useState([
    { id: 1, name: "Arroz", quantity: 2, unitPrice: 15.0, purchased: false },
    { id: 2, name: "Feijão", quantity: 1, unitPrice: 12.0, purchased: true },
  ]);

  const [editingItemId, setEditingItemId] = useState(null);
  const [newItem, setNewItem] = useState({
    id: null,
    name: "",
    quantity: 1,
    unitPrice: 0,
    purchased: false,
  });

  const handleEditClick = (item) => {
    setEditingItemId(item.id);
  };

  const handleSaveClick = (itemId, editedItem) => {
    if (itemId) {
      // Se estiver editando um item existente
      setItems(items.map(item => item.id === itemId ? { ...item, ...editedItem } : item));
    } else {
      // Se for um novo item, gere o ID temporário
      const newItemWithId = { ...newItem, id: Date.now() };
      setItems([...items, newItemWithId]);

      // Resetando o estado do novo item
      setNewItem({
        id: null,
        name: "",
        quantity: 1,
        unitPrice: 0,
        purchased: false,
      });
    }

    setEditingItemId(null);
  };

  const handleCancelClick = () => {
    setEditingItemId(null);
    setNewItem({
      id: null,
      name: "",
      quantity: 1,
      unitPrice: 0,
      purchased: false,
    });
  };

  return (
    <div className="card h-100 shadow-sm rounded-3 p-2">
      <div className="card-header border-0 pb-3 bg-white d-flex justify-content-between align-items-center rounded-top">
        <h5 className="mb-0 d-flex align-items-center fs-7">
          <i className="bi bi-basket me-2 fs-5"></i>
          {listName}
        </h5>
        <span className="fw-bold text-primary fs-7">
          <i className="bi bi-receipt me-2 fs-5"></i>
          Total: R$ {totalValue.toFixed(2)}
        </span>
      </div>

      {/* Linha personalizada com borda superior e laterais */}
      <div className="line my-2"></div>

      {/* Lista de Itens - Usando o componente ShoppingItem */}
      <div className="card-body bg-white p-3">
        {items.length > 0 ? (
          <div className="table">
            {/* Cabeçalho da lista de itens */}
            <div className="row mb-2">
              <div className="col-3 fw-semibold fs-7">Item</div>
              <div className="col-2 fw-semibold fs-7">Quant.</div>
              <div className="col-2 fw-semibold fs-7">Preço Un.</div>
              <div className="col-2 fw-semibold fs-7">Total</div>
              <div className="col-3 fw-semibold fs-7">Ações</div>
            </div>

            {/* Mapeando os itens */}
            {items.map((item) => (
              <ShoppingItem
                key={item.id}
                item={item}
                isEditing={editingItemId === item.id}
                isNewItem={false}
                onEdit={handleEditClick}
                onSave={handleSaveClick}
                onCancel={handleCancelClick}
              />
            ))}

            {/* Novo item (caso newItem tenha valores vazios) */}
            {newItem.id === null && (
              <ShoppingItem
                key="new-item"
                item={newItem}
                isEditing={false}
                isNewItem={true}
                onSave={handleSaveClick}
                onCancel={handleCancelClick}
              />
            )}
          </div>
        ) : (
          <p className="text-muted text-center">Nenhum item na lista.</p>
        )}
      </div>
    </div>
  );
};

export default MainContent;
