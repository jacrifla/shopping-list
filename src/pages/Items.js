import React, { useState } from 'react';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import useItems from '../hooks/useItems';
import ItemForm from '../components/ItemForm';
import ConfirmModal from '../components/ConfirmModal';
import ToastNotification from '../components/ToastNotification';

const Items = () => {
    const {
        allItems,
        categories,
        brands,
        item,
        isEditing,
        toast,
        handleItemSelect,
        handleSaveEditItem,
        handleDeleteItem,
        setToast,
        clearFields,
        setItem 
    } = useItems();

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleConfirmDelete = () => {
        handleDeleteItem(itemToDelete);
        setShowConfirmModal(false);
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
    };

    return (
        <div>
            <Header />
            <div className="container mt-3">
                <div className="mb-3">
                    <SearchInput
                        items={allItems}
                        onSelectItem={handleItemSelect}
                    />
                </div>

                <ItemForm
                    item={item}
                    categories={categories}
                    brands={brands}
                    isEditing={isEditing}
                    handleSaveEditItem={handleSaveEditItem}
                    handleDeleteItem={(itemId) => {
                        console.log(itemId); 
                        setItemToDelete(itemId);
                        setShowConfirmModal(true);
                    }}
                    setToast={setToast}
                    clearFields={clearFields}
                    setItem={setItem}
                />

                {toast.show && (
                    <ToastNotification
                        message={toast.message}
                        type={toast.type}
                        show={toast.show}
                        onClose={() => setToast({ ...toast, show: false })}
                    />
                )}

                <ConfirmModal
                    show={showConfirmModal}
                    onClose={closeConfirmModal}
                    onConfirm={handleConfirmDelete}
                    message="Tem certeza de que deseja excluir este item?"
                />
            </div>
        </div>
    );
};

export default Items;
