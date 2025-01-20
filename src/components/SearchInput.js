import React from 'react';
import useSearchItems from '../hooks/useSearchItems';
import Input from './Input';

const SearchInput = ({ items, onSelectItem }) => {
    // Usando o hook e passando onSelectItem como argumento
    const {
        searchTerm,
        showSuggestions,
        filteredItems,
        selectedIndex,
        handleSearchChange,
        handleKeyDown,
        handleSelectItem,
    } = useSearchItems(items, onSelectItem);

    return (
        <div>
            {/* Campo de Pesquisa */}
            <Input
                type='text'
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={(e) => handleKeyDown(e)}
                placeholder="Pesquisar itens"
            />
            {/* Lista suspensa com itens filtrados */}
            {showSuggestions && filteredItems.length > 0 && (
                <ul
                    className="dropdown-menu show mt-2"
                    style={{ maxHeight: '200px', overflowY: 'auto' }}
                >
                    {filteredItems.map((item, index) => (
                        <li
                            key={item?.itemId || index}
                            className={`dropdown-item ${selectedIndex === index ? 'active' : ''}`}
                            onClick={() => handleSelectItem(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            {item.itemName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
