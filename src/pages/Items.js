import React, { useState } from 'react';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import useItems from '../hooks/useItems';
import ItemForm from '../components/ItemForm';
import ConfirmModal from '../components/ConfirmModal';
import ToastNotification from '../components/ToastNotification';
import CategoryForm from '../components/CategoryForm';
import BrandForm from '../components/BrandForm';

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

    const handleDeleteRequest = () => {
        if (!item || !item.itemId) {
            // Se nenhum item for selecionado, exibe a notificação de erro
            setToast({ show: true, message: 'Selecione um item antes de excluir!', type: 'danger' });
            return;
        }
        
        // Se um item estiver selecionado, continua com o processo de exclusão
        setItemToDelete(item.itemId);
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
            <div className="container mt-3 pb-5">
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

                {/* Layout para CategoryForm e BrandForm */}
                <div className="row">
                    <div className="col-12 col-lg-6 mb-3">
                        <CategoryForm />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <BrandForm />
                    </div>
                </div>

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
