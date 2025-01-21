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

    const handleDeleteRequest = (itemId) => {
        setItemToDelete(itemId);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        handleDeleteItem(itemToDelete);
        setToast({ show: true, message: 'Item excluído com sucesso!', type: 'success' });
        setShowConfirmModal(false);
    };

    return (
        <div>
            <Header />
            <div className="container mt-3">
                {/* Campo de busca */}
                <div className="mb-3">
                    <SearchInput
                        items={allItems}
                        onSelectItem={handleItemSelect}
                    />
                </div>

                {/* Formulário de item */}
                <ItemForm
                    item={item}
                    categories={categories}
                    brands={brands}
                    isEditing={isEditing}
                    handleSaveEditItem={handleSaveEditItem}
                    handleDeleteItem={handleDeleteRequest}
                    setToast={setToast}
                    clearFields={clearFields}
                    setItem={setItem}
                />

                {/* Notificação Toast */}
                {toast.show && (
                    <ToastNotification
                        message={toast.message}
                        type={toast.type}
                        show={toast.show}
                        onClose={() => setToast({ ...toast, show: false })}
                    />
                )}

                {/* Modal de confirmação */}
                <ConfirmModal
                    show={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={handleConfirmDelete}
                    message={`Tem certeza de que deseja excluir o item?`}
                />
            </div>
        </div>
    );
};

export default Items;
