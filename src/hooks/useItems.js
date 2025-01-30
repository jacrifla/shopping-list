import { useState, useEffect } from 'react';
import itemsService from '../services/itemsService';
import categoryService from '../services/categoryService';
import brandService from '../services/brandService';

const useItems = () => {
    const [allItems, setAllItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [item, setItem] = useState({
        itemId: '',
        itemName: '',
        barcode: '',
        category: '',
        brand: '',
        categoryId: '',
        brandId: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const items = await itemsService.getAllItems();
                setAllItems(items);
            } catch (error) {
                console.error('Erro ao buscar itens', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await categoryService.findAllCategories();
                setCategories(response);
            } catch (error) {
                console.error(error.message);
            }
        };

        const fetchBrands = async () => {
            try {
                const response = await brandService.findAllBrands();
                setBrands(response);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchItems();
        fetchCategories();
        fetchBrands();
    }, []);

    const handleItemSelect = (item) => {
        setIsEditing(true);
        setItem({
            itemId: item.itemId,
            itemName: item.itemName,
            barcode: item.barcode,
            category: item.categoryName,
            brand: item.brandName,
            categoryId: item.categoryId,
            brandId: item.brandId
        });
    };

    const handleSaveEditItem = async () => {
        if (!item.itemName || item.itemName.trim() === '') {
            setToast({ show: true, message: 'O nome do item é obrigatório!', type: 'danger' });
            return;
        }

        const itemData = {
            itemName: item.itemName,
            barcode: item.barcode || null,
            categoryId: item.categoryId || null,
            brandId: item.brandId || null,
        };

        try {
            if (isEditing && item.itemId) {

                await itemsService.updateItem(
                    item.itemId,
                    itemData.itemName,
                    itemData.categoryId,
                    itemData.brandId,
                    itemData.barcode
                );

                setToast({ show: true, message: 'Item atualizado com sucesso!', type: 'success' });

                setAllItems(allItems.map((i) =>
                    i.itemId === item.itemId ? { ...i, ...itemData } : i
                ));
            } else {
                const newItem = await itemsService.createItem(
                    itemData.itemName, 
                    itemData.categoryId, 
                    itemData.brandId, 
                    itemData.barcode
                );

                setAllItems(prevItems => [
                    ...prevItems,
                    { ...itemData, itemId: newItem.itemId, category: itemData.categoryId, brand: itemData.brandId }
                ]);
                setToast({ show: true, message: 'Item criado com sucesso!', type: 'success' });
            }

            clearFields();
        } catch (error) {
            setToast({ show: true, message: 'Erro ao salvar ou atualizar o item.', type: 'danger' });
        }
    };

    const handleDeleteItem = async (itemId) => {        
        try {
            await itemsService.deleteItem(itemId);
            setToast({ show: true, message: 'Item excluído com sucesso!', type: 'success' });
            setAllItems(allItems.filter(item => item.itemId !== itemId));
            clearFields();
        } catch (error) {
            setToast({ show: true, message: 'Erro ao excluir item.', type: 'danger' });
        }
    };

    const clearFields = () => {
        setItem({
            itemName: '',
            barcode: '',
            category: '',
            brand: '',
            categoryId: '',
            brandId: ''
        });
        setIsEditing(false);
    };

    return {
        allItems,
        categories,
        brands,
        item,
        isEditing,
        toast,
        clearFields,
        handleItemSelect,
        handleSaveEditItem,
        handleDeleteItem,
        setToast,
        setItem
    };
};

export default useItems;
