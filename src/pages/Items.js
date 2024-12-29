import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Title from '../components/Title';
import SearchItem from '../components/SearchItem';
import ItemForm from '../components/ItemForm';
import CategoryForm from '../components/CategoryForm';
import BrandForm from '../components/BrandForm';

// Importando os dados
import { initialItems, initialBrands, initialCategories } from '../data';

const Items = () => {
    const [itemName, setItemName] = useState('');
    const [barcode, setBarcode] = useState('');
    const [description, setDescription] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [items, setItems] = useState(initialItems);
    const [filteredItems, setFilteredItems] = useState(items);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilteredItems, setShowFilteredItems] = useState(true);
    const [brands, setBrands] = useState(initialBrands);
    const [categories, setCategories] = useState(initialCategories);

    useEffect(() => {
        const results = items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.barcode.includes(searchQuery)
        );
        setFilteredItems(results);
    }, [searchQuery, items]);

    const handleSaveItem = () => {
        console.log('Salvar Item:', { itemName, barcode, description, selectedBrand, selectedCategory });
    };

    const handleSelectItem = (item) => {
        setItemName(item.name);
        setBarcode(item.barcode);
        setDescription(item.description);
        setSelectedBrand(item.brandId);
        setSelectedCategory(item.categoryId);
        setSearchQuery('');
        setShowFilteredItems(false);
    };

    return (
        <div>
            <Header />
            <div className="container-fluid py-4 d-flex flex-column h-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <Title icon={'box'}>Itens</Title>
                </div>

                <SearchItem
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearch={() => { }}
                />

                {searchQuery && showFilteredItems && (
                    <div className="item-list mt-4">
                        {filteredItems.length > 0 ? (
                            filteredItems.map(item => (
                                <div
                                    key={item.id}
                                    className="item p-2 mb-2 border rounded"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleSelectItem(item)}
                                >
                                    <h5>{item.name}</h5>
                                    <p>Código de Barras: {item.barcode}</p>
                                    <p>Descrição: {item.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum item encontrado.</p>
                        )}
                    </div>
                )}

                <ItemForm
                    itemName={itemName}
                    setItemName={setItemName}
                    barcode={barcode}
                    setBarcode={setBarcode}
                    description={description}
                    setDescription={setDescription}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    brands={brands}
                    categories={categories}
                    onSaveItem={handleSaveItem}
                />

                <div className="row g-3 mt-4">
                    {/* Categoria */}
                    <div className="col-12 col-md-6">
                        <CategoryForm categories={categories} setCategories={setCategories} />
                    </div>

                    {/* Marca */}
                    <div className="col-12 col-md-6">
                        <BrandForm brands={brands} setBrands={setBrands} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Items;
