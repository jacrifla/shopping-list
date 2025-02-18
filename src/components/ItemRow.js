import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const ItemRow = ({ item, onEdit, onDelete, onAskDetails, index }) => {
    const [editingItem, setEditingItem] = useState(null);
    const [editingItemId, setEditingItemId] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

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

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div className={`row p-2 rounded align-items-center g-xl-2 ${item.purchasedAt ? "bought-item" : ""} mb-2 mb-sm-2`}>
            <div className="d-flex align-items-center toggle-expand" onClick={toggleExpand}>
                <strong>{index + 1}. {item.itemName}</strong>
            </div>

            {isExpanded && (
                <>
                    {/* Nome do item */}
                    <div className="col-12">
                        <Input
                            label="Nome do item"
                            name="itemName"
                            value={editingItemId === item.itemListId ? editingItem?.itemName || item.itemName : item.itemName}
                            readOnly={editingItemId !== item.itemListId || item.itemType === "common"}
                            onChange={(e) => handleInputChange(e, item.itemListId, "itemName")}
                            className={editingItemId === item.itemListId ? "form-control" : "form-control-plaintext"}
                        />
                    </div>

                    <div className="col-12 d-flex">
                        {/* Quantidade */}
                        <div className="col-4 col-sm-4">
                            <Input
                                label="Quantidade"
                                type="number"
                                name="quantity"
                                value={editingItemId === item.itemListId ? editingItem?.quantity || 0 : item.quantity || 0}
                                readOnly={editingItemId !== item.itemListId}
                                onChange={(e) => handleInputChange(e, item.itemListId, "quantity")}
                                className={editingItemId === item.itemListId ? "form-control" : "form-control-plaintext"}
                            />
                        </div>

                        {/* Preço Unitário */}
                        <div className="col-4 col-sm-4">
                            <Input
                                label="Preço Un"
                                type="number"
                                name="price"
                                value={editingItemId === item.itemListId ? editingItem?.price || 0 : item.price || 0}
                                readOnly={editingItemId !== item.itemListId}
                                onChange={(e) => handleInputChange(e, item.itemListId, "price")}
                                className={editingItemId !== item.itemListId ? "form-control" : "form-control-plaintext"}
                            />
                        </div>

                        {/* Preço Total */}
                        <div className="col-4 col-lg-4">
                            <Input
                                label="Total Un"
                                type="text"
                                className="form-control-plaintext text-center"
                                value={(
                                    Math.ceil(
                                        ((editingItemId === item.itemListId
                                            ? (editingItem?.quantity || item.quantity)
                                            : item.quantity) *
                                            (editingItemId === item.itemListId
                                                ? (editingItem?.price || item.price)
                                                : item.price)) * 100
                                    ) / 100
                                ).toFixed(2)}
                                readOnly
                                onChange={() => { }}
                            />
                        </div>
                    </div>

                    {/* Ações */}
                    <div className="mb-3">
                        {editingItemId === item.itemListId ? (
                            <div className="d-flex gap-3 w-100">
                                <Button
                                    className="btn btn-success w-100"
                                    onClick={() => handleSaveEditing(item.itemListId)}
                                    icon={'floppy-fill'}
                                />
                                <Button
                                    className="btn btn-secondary w-100"
                                    onClick={handleCancelEditing}
                                    icon={'x-lg'}
                                />
                            </div>
                        ) : (
                            <div className="d-flex justify-content-center w-100 gap-3">
                                <Button
                                    className="btn btn-success flex-grow-1"
                                    onClick={() => onAskDetails(item.itemListId)}
                                    icon={`${item.purchasedAt ? 'check-circle-fill' : 'check-circle'}`}
                                />
                                <Button
                                    className="btn btn-warning flex-grow-1"
                                    onClick={() => handleEditItem(item)}
                                    icon={`pencil-square`}
                                />
                                <Button
                                    className="btn btn-danger flex-grow-1"
                                    onClick={() => onDelete(item.itemListId)}
                                    icon={`trash-fill`}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ItemRow;
