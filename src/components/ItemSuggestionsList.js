import React from "react";

const ItemSuggestionsList = ({ filteredItems, setItemInputs, setIsItemSelected, itemInputs }) => {
    const handleItemSelect = (item) => {
        console.log("Selecionando item:", item);

        // Atualiza os inputs apenas se o item não for o mesmo
        if (item.itemId !== itemInputs.itemId) {
            setItemInputs({
                ...itemInputs,
                name: item.itemName,
                itemId: item.itemId,
                itemType: "common",
            });
            setIsItemSelected(true);
        }
    };

    // Condicionalmente renderizar a lista apenas se houver itens filtrados
    if (filteredItems.length === 0) return null;

    return (
        <div className="dropdown">
            <ul
                className="list-group mt-2"
                style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    maxHeight: "200px",
                    overflowY: "auto",
                    zIndex: 1000,
                    width: "100%",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            >
                {filteredItems.map((item) => (
                    <li
                        key={item.itemId}
                        className="list-group-item list-group-item-action"
                        onClick={() => {
                            handleItemSelect(item);
                            // Aqui você pode ocultar a lista assim que o item for selecionado
                            setIsItemSelected(true);
                        }}
                    >
                        {item.itemName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemSuggestionsList;
