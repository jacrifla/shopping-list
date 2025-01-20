import { useState} from 'react';

const useSearchItems = (items, onSelectItem) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    

    // Função para manipular a mudança no campo de pesquisa
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() !== '') {
            setShowSuggestions(true);
            const filtered = items.filter((item) => item?.itemName?.toLowerCase().includes(value.toLowerCase()));
            setFilteredItems(filtered);
        } else {
            setShowSuggestions(false);
        }
    };

    // Função para manipular a navegação na lista com as teclas
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => (prevIndex - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0 && filteredItems[selectedIndex]) {
                handleSelectItem(filteredItems[selectedIndex]);
                e.preventDefault();
            }
        }
    };

    // Função para selecionar o item
    const handleSelectItem = (selectedItem) => {
        setSearchTerm('');
        setShowSuggestions(false);
        // Chama a função do componente pai para passar o item selecionado
        if (onSelectItem) {
            onSelectItem(selectedItem);
        }
    };

    return {
        searchTerm,
        showSuggestions,
        filteredItems,
        selectedIndex,
        handleSearchChange,
        handleKeyDown,
        handleSelectItem,
    };
};

export default useSearchItems;

