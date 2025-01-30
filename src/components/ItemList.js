import React, { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import Subtitle from "./Subtitle";
import ItemRow from "./ItemRow";
import itemsService from "../services/itemsService";

const ItemList = ({ listName, items, listId, onEdit, onDelete, onAddNewItem, onAskDetails }) => {
    const [itemInputs, setItemInputs] = useState({ name: "", quantity: 1, price: 0, itemType: "custom" });
    const [allItems, setAllItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await itemsService.getAllItems();
                setAllItems(response);
            } catch (error) {
                console.error("Erro ao carregar itens:", error);
            }
        };
        fetchItems();
    }, []);

    useEffect(() => {
        const checkItemType = (itemName) => {
            if (!itemName.trim()) return;

            const existingItem = allItems.find(
                (item) => item.itemName.toLowerCase() === itemName.toLowerCase()
            );

            if (existingItem) {
                setItemInputs((prevState) => ({
                    ...prevState,
                    itemType: "common",
                    itemId: existingItem.itemId,
                }));
            } else {
                setItemInputs((prevState) => ({
                    ...prevState,
                    itemType: "custom",
                    itemId: null,
                }));
            }

            const filtered = allItems.filter((item) =>
                item.itemName.toLowerCase().includes(itemName.toLowerCase())
            );
            setFilteredItems(filtered);
        };

        checkItemType(itemInputs.name);
    }, [itemInputs.name, allItems]);

    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setItemInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const clearInputFields = () => {
        setItemInputs({ name: "", quantity: 1, price: 0, itemType: "custom" });
    };

    const totalValue = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <div className="card shadow-sm border-0 p-3">
            <div className="card-body">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center fs-5 mb-3">
                    <Subtitle icon={"basket3-fill"} text={`${listName}`} />
                    <Subtitle
                        icon={"receipt"}
                        className="text-primary fw-bold mt-2 mt-sm-0"
                        text={`Total: R$ ${totalValue.toFixed(2)}`}
                    />
                </div>

                {/* Adição de Itens */}
                <div className="row border-0 rounded mb-3 g-2 d-flex align-items-center">
                    <div className="col-12 col-sm-6 col-md-3 d-flex flex-column align-items-center">
                        <Input
                            name="name"
                            placeholder="Nome do item"
                            value={itemInputs.name}
                            onChange={handleAddInputChange}
                        />
                        {filteredItems.length > 0 && (
                            <ul className="dropdown-menu show">
                                {filteredItems.map((item) => (
                                    <li key={item.itemId} onClick={() => setItemInputs({ ...itemInputs, name: item.itemName })}>
                                        <button className="dropdown-item">{item.itemName}</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="col-12 col-sm-6 col-md-2 d-flex justify-content-center align-items-center">
                        <Input
                            type="number"
                            name="quantity"
                            placeholder="Qtd."
                            value={itemInputs.quantity}
                            onChange={handleAddInputChange}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-2 d-flex align-items-center">
                        <span>R$</span>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            placeholder="Preço"
                            value={itemInputs.price}
                            onChange={handleAddInputChange}
                            className="form-control border-0 bg-transparent"
                        />
                    </div>
                    <div className="col-12 col-sm-4 col-md-2 text-center">
                        <strong>R$ {(itemInputs.quantity * itemInputs.price).toFixed(2)}</strong>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 text-center">
                        <Button
                            text="Adicionar"
                            icon="floppy-fill"
                            className="btn-primary w-100"
                            onClick={() => {
                                onAddNewItem({ ...itemInputs, listId });
                                clearInputFields();
                            }}
                        />
                    </div>
                </div>

                {/* Lista de Itens */}
                {items.length === 0 && <p className="text-center text-muted">Nenhum item encontrado.</p>}

                {items.map((item) => (
                    <ItemRow
                        key={item.itemListId}
                        item={item}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onAskDetails={onAskDetails}
                    />
                ))}
            </div>
        </div>
    );
};

export default ItemList;
