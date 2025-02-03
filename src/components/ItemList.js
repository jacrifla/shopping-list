import React, { useState, useEffect } from "react";
import Button from "./Button";
import Subtitle from "./Subtitle";
import ItemRow from "./ItemRow";
import itemsService from "../services/itemsService";
import AddItemModal from "./AddItemModal";

const ItemList = ({ listName, items, listId, onEdit, onDelete, onAddNewItem, onAskDetails }) => {
    const [itemInputs, setItemInputs] = useState({ name: "", quantity: 1, price: 0, itemType: "custom" });
    const [allItems, setAllItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isItemSelected, setIsItemSelected] = useState(false);

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
        // Lógica de verificação de item enquanto o usuário digita
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

            // Atualiza os itens filtrados conforme o nome digitado
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
        setFilteredItems([]);
        setIsItemSelected(false);
    };

    const handleSaveItem = () => {
        onAddNewItem({ ...itemInputs, listId });
        setShowModal(false);
        clearInputFields();
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

            <Button
                icon="plus-lg"
                className="btn-outline-success position-fixed end-0 m-3 shadow "
                style={{ bottom: "5em", right: "10px", width: "3em", height: "3em" }}
                onClick={() => setShowModal(true)}
            />

            <AddItemModal
                showModal={showModal}
                onClose={() =>{
                    setShowModal(false)
                    clearInputFields()
                }}
                onSaveItem={handleSaveItem}
                itemInputs={itemInputs}
                handleAddInputChange={handleAddInputChange}
                filteredItems={filteredItems}
                setItemInputs={setItemInputs}
                setIsItemSelected={setIsItemSelected}
                isItemSelected={isItemSelected}
            />
        </div>
    );
};

export default ItemList;
