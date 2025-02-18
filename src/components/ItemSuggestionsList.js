import React from "react";

const ItemSuggestionsList = ({ filteredItems, setItemInputs, setIsItemSelected, itemInputs }) => {
    const handleItemSelect = (item) => {
        console.log("Selecionando item:", item);

        if (item.itemId !== itemInputs.itemId) {
            setItemInputs({
                ...itemInputs,
                name: item.itemName,
                itemId: item.itemId,
                itemType: "common",
                brand: item.brandName || "Desconhecida",
                barcode: item.barcode || "N/A",
            });
            setIsItemSelected(true);
        }
    };

    if (filteredItems.length === 0) return null;

    return (
        <div className="dropdown">
            <ul className="list-group mt-2 item-suggestions-list">
                {filteredItems.map((item) => (
                    <li
                        key={item.itemId}
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        onClick={() => {
                            handleItemSelect(item);
                            setIsItemSelected(true);
                        }}
                    >
                        <div className="item-info">
                            <strong className="item-name">{item.itemName}</strong>
                            <small className="text-muted brand">({item.brandName || "Sem marca"})</small>
                        </div>
                        <div className="item-info">
                            <small className="text-muted barcode">{item.barcode || "Sem código"}</small>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemSuggestionsList;