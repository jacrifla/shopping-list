import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const ItemRow = ({ item, onEdit, onDelete, onAskDetails, index }) => {
    const [editingItem, setEditingItem] = useState(null);
    const [editingItemId, setEditingItemId] = useState(null);

    const handleInputChange = (e, itemId, field) => {
        const { value } = e.target;
        setEditingItem((prev) => ({
            ...prev,
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
            onEdit(itemId, editingItem);
            setEditingItemId(null);
            setEditingItem(null);
        }
    };

    return (
        <div className={`row pt-3 rounded align-items-center g-xl-2 ${item.purchasedAt ? "bought-item" : ""} mb-2 mb-sm-2`}>
            <div className="d-flex align-items-center">
                <strong>Item - {index + 1}</strong>
            </div>
            {/* Nome do item */}
            <div className="col-12 col-sm-6 col-md-3">
                <Input
                    name="itemName"
                    value={editingItemId === item.itemListId ? editingItem?.itemName || item.itemName : item.itemName}
                    readOnly={editingItemId !== item.itemListId || item.itemType === "common"}
                    onChange={(e) => handleInputChange(e, item.itemListId, "itemName")}
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
            <div className="col-12 col-sm-6 col-md-3 text-center d-flex justify-content-center gap-3 flex-wrap mb-3">
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
                        <Button
                            className={'btn btn-success w-100'}
                            onClick={() => onAskDetails(item.itemListId)}
                            icon={`${item.purchasedAt ? 'check-circle-fill' : 'check-circle'}`}
                        />
                        <Button
                            className={'btn btn-warning w-100'}
                            onClick={() => handleEditItem(item)}
                            icon={`pencil-square`}
                        />
                        <Button
                            className={'btn btn-danger w-100'}
                            onClick={() => onDelete(item.itemListId)}
                            icon={`trash-fill`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemRow;
