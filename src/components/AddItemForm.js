import Button from "./Button";
import Input from "./Input";

const AddItemForm = ({ itemInputs, filteredItems, handleAddInputChange, handleSelectItem, clearInputFields, onAddNewItem, listId }) => {
    return (
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
                            <li key={item.itemId} onClick={() => handleSelectItem(item.itemName)}>
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
    );
};

export default AddItemForm;
