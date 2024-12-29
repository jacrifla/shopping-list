import React from 'react';
import Input from './Input';

const SearchItem = ({ searchQuery, setSearchQuery }) => (
    <div className="d-flex mb-4">
        <div className="flex-grow-1 me-2">
            <Input
                type='text'
                value={searchQuery}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);
                }}
                placeholder='Buscar por nome ou codigo de barras'
                className="form-control"
                icon={'search'}
            />
        </div>
    </div>
);

export default SearchItem;
