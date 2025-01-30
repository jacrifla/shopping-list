import React, { useState } from "react";
import Input from "./Input";

const ItemRow = ({ item, onEdit, onDelete, onAskDetails }) => {
    const [editingItem, setEditingItem] = useState(null);
    const [editingItemId, setEditingItemId] = useState(null);

    const handleInputChange = (e, itemId, field) => {
        const { value } = e.target;
        setEditingItem((prev) => ({
            ...prev,
            itemName: field === 'name' ? value : prev.itemName,
            [field]: value,
        }));
    };

    const handleEditItem = (item) => {
        setEditingItemId(item.itemListId);
        setEditingItem({
            itemName: item.itemName,
            quantity: item.quantity,
            price: item.price,
            itemType: item.itemType,
            itemId: item.itemId,
        });
    };

    const handleCancelEditing = () => setEditingItemId(null);

    const handleSaveEditing = (itemId) => {
        if (editingItem) {
            const updatedItem = {
                ...editingItem,
                itemName: editingItem.itemName,
            };
    
            // Atualizando a lista de itens no componente pai (passando para o onEdit)
            onEdit(itemId, updatedItem);
            setEditingItemId(null);
            setEditingItem(null);
        }
    };    

    return (
        <div className={`row border-0 rounded align-items-center g-2 ${item.purchasedAt ? "bought-item" : ""} mb-2 mb-sm-2`}>
            {/* Nome do item */}
            <div className="col-12 col-sm-6 col-md-3">
                <Input
                    name="name"
                    value={editingItemId === item.itemListId ? editingItem?.name || item.itemName : item.itemName}
                    readOnly={editingItemId !== item.itemListId || item.itemType === "common"}
                    onChange={(e) => handleInputChange(e, item.itemListId, "name")}
                    className={editingItemId === item.itemListId ? "form-control" : "form-control-plaintext"}
                />
            </div>

            {/* Quantidade */}
            <div className="col-12 col-sm-6 col-md-2">
                <Input
                    type="number"
                    name="quantity"
                    value={editingItemId === item.itemListId ? editingItem?.quantity || 0 : item.quantity || 0}
                    readOnly={editingItemId !== item.itemListId}
                    onChange={(e) => handleInputChange(e, item.itemListId, "quantity")}
                    className={editingItemId === item.itemListId ? "form-control" : "form-control-plaintext"}
                />
            </div>

            {/* Preço Unitário */}
            <div className="col-12 col-sm-6 col-md-2 d-flex align-items-center">
                <span>R$</span>
                <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={editingItemId === item.itemListId ? editingItem?.price || 0 : item.price || 0}
                    readOnly={editingItemId !== item.itemListId}
                    onChange={(e) => handleInputChange(e, item.itemListId, "price")}
                    className={`form-control ${editingItemId !== item.itemListId ? "border-0 bg-transparent" : ""}`}
                />
            </div>

            {/* Preço Total */}
            <div className="col-12 col-sm-6 col-md-2 text-center">
                <strong>R$ {(
                    (editingItemId === item.itemListId
                        ? (editingItem?.quantity || item.quantity)
                        : item.quantity) *
                    (editingItemId === item.itemListId
                        ? (editingItem?.price || item.price)
                        : item.price)
                ).toFixed(2)}</strong>
            </div>

            {/* Ações */}
            <div className="col-12 col-sm-6 col-md-3 text-center d-flex justify-content-center gap-3 flex-wrap">
                {editingItemId === item.itemListId ? (
                    <div className="d-flex gap-3 w-100">
                        <button
                            className="btn btn-success w-100"
                            onClick={() => handleSaveEditing(item.itemListId)}
                        >
                            <i className="bi bi-floppy-fill"></i>
                        </button>
                        <button
                            className="btn btn-secondary w-100"
                            onClick={handleCancelEditing}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                ) : (
                    <div className="d-flex justify-content-between w-100 gap-3">
                        <button
                            className="btn btn-success w-100"
                            onClick={() => onAskDetails(item.itemListId)}
                        >
                            <i className={`bi ${item.purchasedAt ? "bi-check-circle-fill" : "bi-check-circle"}`}></i>
                        </button>
                        <button
                            className="btn btn-warning w-100"
                            onClick={() => handleEditItem(item)}
                        >
                            <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                            className="btn btn-danger w-100"
                            onClick={() => onDelete(item.itemListId)}
                        >
                            <i className="bi bi-trash-fill"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemRow;
