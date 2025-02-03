import React from "react";
import Button from "./Button";
import Input from "./Input";
import Subtitle from "./Subtitle";
import ItemSuggestionsList from "./ItemSuggestionsList";

const AddItemModal = ({ showModal, onClose, onSaveItem, itemInputs, handleAddInputChange, filteredItems, setItemInputs, setIsItemSelected, isItemSelected }) => {
    return (
        <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content shadow-lg rounded-3 border-0">
                    <div className="modal-header d-flex justify-content-between align-items-center border-0">
                        <Subtitle text={'Adicionar Item'} icon={"plus-circle-fill"} className="fs-5 text-primary" />
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <Input
                                name="name"
                                value={itemInputs.name}
                                onChange={handleAddInputChange}
                                placeholder="Nome do Item"
                                className="form-control-lg"
                            />
                            {/* A lista de sugestões deve aparecer enquanto o usuário digitar */}
                            {filteredItems.length > 0 && itemInputs.name && !isItemSelected && (
                                <ItemSuggestionsList
                                    filteredItems={filteredItems}
                                    setItemInputs={setItemInputs}
                                    setIsItemSelected={setIsItemSelected}
                                    itemInputs={itemInputs}
                                />
                            )}
                        </div>
                        <div className="mb-3">
                            <Input
                                name="quantity"
                                type="number"
                                value={itemInputs.quantity}
                                onChange={handleAddInputChange}
                                placeholder="Quantidade"
                                className="form-control-lg"
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                name="price"
                                type="number"
                                value={itemInputs.price}
                                onChange={handleAddInputChange}
                                placeholder="Preço"
                                className="form-control-lg"
                            />
                        </div>
                    </div>
                    <div className="modal-footer border-0 d-flex justify-content-between">
                        <Button text="Fechar" className="btn-secondary flex-grow-1" onClick={onClose} showText />
                        <Button text="Salvar" className="btn-primary flex-grow-1" onClick={onSaveItem} showText />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddItemModal;
