import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Title from '../components/Title';
import SearchItem from '../components/SearchItem';
import ItemForm from '../components/ItemForm';
import CategoryForm from '../components/CategoryForm';
import BrandForm from '../components/BrandForm';
import { createBrand, deleteBrand, updateBrand } from '../services/brandService';
import { createCategory, deleteCategory, updateCategory } from '../services/categoryService';
import { findAllBrands } from '../services/brandService';
import { createItem, deleteItem, findAllItems, updateItem } from '../services/itemsService';
import { findAllCategories } from '../services/categoryService';
import ToastNotification from '../components/ToastNotification';
import { createNote, deleteNote, updateNote } from '../services/itemNoteService';
import { getUserId } from '../services/authService';
import { useUser } from '../context/UserContext';

const Items = () => {
    const [itemName, setItemName] = useState('');
    const [barcode, setBarcode] = useState(null);
    const [observation, setObservation] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedItemId, setSelectedItemId] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const userId = useUser();

    useEffect(() => {
        if (!userId) {
            console.log('Usuário não autenticado');
            return            
        }
    }, [userId]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await findAllBrands();
                if (Array.isArray(response)) {
                    setBrands(response);
                } else {
                    console.error('Resposta inválida, esperado um array: ', response);
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        const fetchItems = async () => {
            try {
                const response = await findAllItems();
                if (Array.isArray(response)) {
                    setItems(response);
                } else {
                    console.error('Resposta inválida, esperado um array de itens: ', response);
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await findAllCategories();
                if (Array.isArray(response)) {
                    setCategories(response);
                } else {
                    console.error('Resposta inválida, esperado um array de categorias: ', response);
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchBrands();
        fetchItems();
        fetchCategories();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const results = items.filter(item =>
                (item.product_name && item.product_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.barcode && item.barcode.includes(searchQuery))
            );
            setFilteredItems(results);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, items]);


    const handleSaveItem = async () => {
        try {
            let response;
            let barcodeNull = barcode || null;

            if (selectedItemId) {
                // Atualizar item existente
                response = await updateItem(selectedItemId, itemName, selectedCategory, selectedBrand, barcodeNull);
                console.log(response);
                
                setItems((prevItems) =>
                    prevItems.map((item) => (item.item_id === selectedItemId ? response : item))
                );

                if (observation) {
                    await updateNote(observation, userId, response.item_id);
                }

                setToastMessage('Item atualizado com sucesso!');
            } else {
                // Criar novo item
                response = await createItem(itemName, selectedCategory, selectedBrand, barcodeNull);
                setItems((prevItems) => [...prevItems, response]);
                if (observation) {
                    await createNote(userId, response.item_id, observation);
                }
                setToastMessage('Item criado com sucesso!');
            }
            setToastType('success');
            setShowToast(true);
            clearForm();
        } catch (error) {
            setToastMessage('Erro ao salvar o item!');
            setToastType('error');
            setShowToast(true);
            console.error("Erro ao excluir item:", error);
        }
    };

    const handleDeleteItem = async () => {
        try {
            if (!selectedItemId || isNaN(Number(selectedItemId))) {
                console.log("Nenhum item selecionado para excluir: ", selectedItemId);
                return;
            }

            await deleteItem(selectedItemId);

            // Atualiza os itens no estado após a exclusão
            setItems((prevItems) => prevItems.filter((item) => item.item_id !== selectedItemId));

            // Exibe a notificação de sucesso
            setToastMessage('Item excluído com sucesso!');
            setToastType('success');
            setShowToast(true);

            clearForm(); 
        } catch (error) {
            setToastMessage('Erro ao excluir o item!');
            setToastType('error');
            setShowToast(true);
            console.error("Erro ao excluir item:", error);
        }
    };

    const clearForm = () => {
        setItemName('');
        setBarcode('');
        setObservation('');
        setSelectedBrand('');
        setSelectedCategory('');
        setSelectedItemId(null);
    };

    const handleSaveOrUpdateBrand = async (brandId, brandName) => {
        try {
            let message = '';
            if (brandId) {
                const updatedBrand = await updateBrand(brandId, brandName);
                setBrands((prevBrands) =>
                    prevBrands.map((brand) =>
                        brand.brand_id === updatedBrand.brand_id ? updatedBrand : brand
                    )
                );
                message = 'Marca atualizada com sucesso!';
            } else {
                const newBrand = await createBrand(brandName);
                setBrands((prevBrands) => [...prevBrands, newBrand]);
                message = 'Marca criada com sucesso!';
            }

            setToastMessage(message);
            setToastType('success');
            setShowToast(true);
        } catch (error) {
            setToastMessage('Erro ao salvar a marca!');
            setToastType('error');
            setShowToast(true);
            console.error(error);
        }
    };

    const handleSaveOrUpdateCategory = async (categoryId, categoryName) => {
        try {
            let message = '';
            if (categoryId) {
                const updatedCategory = await updateCategory(categoryId, categoryName);
                setCategories((prevCategories) =>
                    prevCategories.map((category) =>
                        category.category_id === updatedCategory.category_id ? updatedCategory : category
                    )
                );
                message = 'Categoria atualizada com sucesso!';
            } else {
                const newCategory = await createCategory(categoryName);
                setCategories((prevCategories) => [...prevCategories, newCategory]);
                message = 'Categoria criada com sucesso!';
            }

            setToastMessage(message);
            setToastType('success');
            setShowToast(true);
        } catch (error) {
            setToastMessage('Erro ao salvar a categoria!');
            setToastType('error');
            setShowToast(true);
            console.error(error);
        }
    };

    const handleDeleteBrand = async (brandId) => {
        try {
            await deleteBrand(brandId);
            setBrands((prevBrands) => prevBrands.filter(brand => brand.brand_id !== brandId));
            setToastMessage('Marca excluída com sucesso!');
            setToastType('success');
            setShowToast(true);
        } catch (error) {
            setToastMessage('Erro ao excluir a marca!');
            setToastType('error');
            setShowToast(true);
            console.error(error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await deleteCategory(categoryId);
            setCategories((prevCategories) => prevCategories.filter(category => category.category_id !== categoryId));
            setToastMessage('Categoria excluída com sucesso!');
            setToastType('success');
            setShowToast(true);
        } catch (error) {
            setToastMessage('Erro ao excluir a categoria!');
            setToastType('error');
            setShowToast(true);
            console.error(error);
        }
    };

    // Seleciona o item para edição
    const handleSelectItem = (item) => {
        console.log('Item Selecionado:', item);
        setItemName(item.product_name);
        setBarcode(item.barcode);
        setObservation(item.observation);
        setSelectedBrand(item.brand_name);
        setSelectedCategory(item.category_name);
        setSelectedItemId(item.item_id);
        setSearchQuery('');
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

                {searchQuery && (
                    <div className="item-list mt-4">
                        {filteredItems.length > 0 ? (
                            filteredItems.map(item => (
                                <div
                                    key={item.item_id}
                                    className="item p-3 mb-3 border rounded d-flex flex-column shadow-sm"
                                    style={{ cursor: 'pointer', backgroundColor: '#FFF6ED' }}
                                    onClick={() => handleSelectItem(item)}
                                >
                                    <div className="d-flex justify-content-between">
                                        <h5 className="text-dark" style={{ fontWeight: 'bold' }}>
                                            {item.product_name}
                                        </h5>
                                        <span className="badge bg-secondary">{item.barcode}</span>
                                    </div>
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
                    observation={observation}
                    setObservation={setObservation}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    brands={brands}
                    categories={categories}
                    onSaveItem={handleSaveItem}
                    onDeleteItem={handleDeleteItem}
                />


                <div className="row g-3 mt-4">
                    {/* Categoria */}
                    <div className="col-12 col-md-6">
                        <CategoryForm
                            handleSaveOrUpdateCategory={handleSaveOrUpdateCategory}
                            handleDeleteCategory={handleDeleteCategory}
                            categories={categories}
                            setCategories={setCategories}
                        />

                    </div>

                    {/* Marca */}
                    <div className="col-12 col-md-6">
                        <BrandForm
                            handleSaveOrUpdateBrand={handleSaveOrUpdateBrand}
                            handleDeleteBrand={handleDeleteBrand}
                            brands={brands}
                            setBrands={setBrands}
                        />
                    </div>
                </div>

                <ToastNotification
                    message={toastMessage}
                    type={toastType}
                    show={showToast}
                    onClose={() => setShowToast(false)}
                />
            </div>
        </div>
    );
};

export default Items;
