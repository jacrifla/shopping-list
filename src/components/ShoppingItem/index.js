import React, { useState } from 'react';

const ShoppingItem = ({ item, onEdit, onSave, onCancel, isEditing, isNewItem }) => {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleInputChange = (e, field) => {
    setEditedItem({
      ...editedItem,
      [field]: field === "quantity" || field === "unitPrice" ? parseFloat(e.target.value) : e.target.value,
    });
  };

  const handleSaveClick = () => {
    onSave(item.id, editedItem);
  };

  const handleCancelClick = () => {
    onCancel();
  };

  return (
    <div className="row mb-2 border border-primary rounded-3">
      {/* Coluna Item */}
      <div className="col-12 col-sm-6 col-md-3 d-flex align-items-center border-end border-primary rounded-start">
        {isEditing || isNewItem ? (
          <input
            type="text"
            value={editedItem.name}
            onChange={(e) => handleInputChange(e, "name")}
            className="form-control form-control-sm rounded-3 fs-9"
          />
        ) : (
          <span className="fs-9">{item.name}</span>
        )}
      </div>

      {/* Coluna Quantidade */}
      <div className="col-12 col-sm-6 col-md-2 d-flex align-items-center border-end border-primary">
        {isEditing || isNewItem ? (
          <input
            type="number"
            value={editedItem.quantity}
            onChange={(e) => handleInputChange(e, "quantity")}
            className="form-control form-control-sm rounded-3 fs-9"
            min="1"
          />
        ) : (
          <span className="fs-9">{item.quantity}</span>
        )}
      </div>

      {/* Coluna Preço Unitário */}
      <div className="col-12 col-sm-6 col-md-2 d-flex align-items-center border-end border-primary">
        {isEditing || isNewItem ? (
          <input
            type="number"
            value={editedItem.unitPrice}
            onChange={(e) => handleInputChange(e, "unitPrice")}
            className="form-control form-control-sm rounded-3 fs-9"
            min="0"
            step="0.01"
          />
        ) : (
          <span className="fs-9">R$ {item.unitPrice.toFixed(2)}</span>
        )}
      </div>

      {/* Coluna Total */}
      <div className="col-12 col-sm-6 col-md-2 d-flex align-items-center border-end border-primary">
        {isEditing || isNewItem ? (
          <span className="fs-9">R$ {(editedItem.quantity * editedItem.unitPrice).toFixed(2)}</span>
        ) : (
          <span className="fs-9">R$ {(item.quantity * item.unitPrice).toFixed(2)}</span>
        )}
      </div>

      {/* Coluna Ações */}
      <div className="col-12 col-sm-6 col-md-3 d-flex align-items-center justify-content-around rounded-end">
        {isEditing || isNewItem ? (
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm rounded-3 fs-7"
              onClick={handleSaveClick}
              title="Salvar"
            >
              <i className="bi bi-floppy-fill text-success"></i>
            </button>
            {isEditing && (
              <button
                className="btn btn-sm rounded-3 fs-7"
                onClick={handleCancelClick}
                title="Cancelar"
              >
                <i className="bi bi-x-circle-fill text-danger"></i>
              </button>
            )}
          </div>
        ) : (
          <div className="d-flex gap-3">
            <i
              className={`bi ${item.purchased ? "bi-check-circle-fill text-success" : "bi-check-circle"} fs-7`}
              role="button"
              title="Marcar como comprado"
            ></i>
            <i
              className="bi bi-pencil-fill text-warning fs-7"
              role="button"
              title="Editar"
              onClick={() => onEdit(item)}
            ></i>
            <i
              className="bi bi-trash-fill text-danger fs-7"
              role="button"
              title="Excluir"
            ></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingItem;
