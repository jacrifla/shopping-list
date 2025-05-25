import React, { useState, useEffect } from 'react';
import Select from './Select';
import categoryService from '../services/categoryService';
import Input from './Input';
import Subtitle from './Subtitle';
import Button from './Button';
import ConfirmModal from './ConfirmModal';
import ToastNotification from './ToastNotification';

const CategoryForm = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [showToast, setShowToast] = useState(false);

    // Busca as categorias ao carregar o componente
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await categoryService.findAllCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
                showToastNotification('Erro ao buscar categorias. Tente novamente!', 'error');
            }
        };
        fetchCategories();
    }, []);

    // Função para adicionar ou editar uma categoria
    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) {
            showToastNotification('Por favor, insira o nome da categoria.', 'error');
            return;
        }

        try {
            if (selectedCategory && selectedCategory.categoryId) {
                // Editando categoria existente
                const updatedCategory = await categoryService.updateCategory(
                    selectedCategory.categoryId,
                    newCategoryName
                );

                setCategories(prevCategories =>
                    prevCategories.map(category =>
                        category.categoryId === updatedCategory.categoryId
                            ? updatedCategory
                            : category
                    )
                );
                showToastNotification('Categoria atualizada com sucesso!', 'success');
            } else {
                // Criando nova categoria
                const newCategory = await categoryService.createCategory(newCategoryName);

                setCategories(prevCategories => [...prevCategories, newCategory]);
                showToastNotification('Categoria criada com sucesso!', 'success');
            }

            // Limpar o input e categoria selecionada após ação
            setNewCategoryName('');
            setSelectedCategory(null);
        } catch (error) {
            console.error('Erro ao adicionar ou editar categoria:', error);
            showToastNotification('Erro ao adicionar ou editar categoria. Tente novamente!', 'error');
        }
    };

    // Função para limpar a seleção de categoria
    const handleClearCategory = () => {
        setSelectedCategory(null);
        setNewCategoryName('');
    };

    // Função para abrir o modal de confirmação antes de excluir
    const handleShowModal = () => {
        if (!selectedCategory) {
            showToastNotification('Você precisa selecionar uma categoria antes de excluir.', 'error');
            return;
        }
        setShowModal(true);
    };

    // Função para excluir categoria
    const handleDeleteCategory = async () => {
        try {
            if (selectedCategory) {
                await categoryService.deleteCategory(selectedCategory.categoryId);
                setCategories(prevCategories =>
                    prevCategories.filter(category => category.categoryId !== selectedCategory.categoryId)
                );
                showToastNotification('Categoria excluída com sucesso!', 'success');
                handleClearCategory();
            }
        } catch (error) {
            console.error('Erro ao excluir categoria:', error);
            showToastNotification('Erro ao excluir categoria. Tente novamente!', 'error');
        }
    };

    // Função para exibir o toast com a mensagem
    const showToastNotification = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    // Lida com a mudança na seleção de categorias
    const handleCategoryChange = (event) => {
        const selectedId = Number(event.target.value);
        const selectedCategory = categories.find(category => category.categoryId === selectedId);

        if (selectedCategory) {
            setSelectedCategory(selectedCategory);
            setNewCategoryName(selectedCategory.categoryName);
        } else {
            showToastNotification("Categoria não encontrada", 'error');
        }
    };

    return (
        <div className="card mb-3 w-100 border-0 shadow-sm mt-3">
            <div className="card-body">
                {/* Linha com título e botões */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Subtitle
                        icon={'plus-circle-fill'}
                        text={selectedCategory ? 'Editar Categoria' : 'Adicionar Categoria'}
                    />
                    <div className="d-flex gap-2">
                        <Button
                            className={'btn btn-danger'}
                            icon="trash"
                            onClick={handleShowModal}
                            text={'Excluir'}
                        />
                        <Button
                            className={'btn btn-secondary'}
                            icon="x-lg"
                            onClick={handleClearCategory}
                            text={'Cancelar'}
                        />
                    </div>
                </div>

                {/* Select para escolher categorias existentes */}
                <div className="mb-3">
                    <Select
                        label="Selecione uma Categoria"
                        value={selectedCategory ? selectedCategory.categoryId : ''}
                        onChange={handleCategoryChange}
                        options={categories}
                        keyField="categoryId"
                        displayField="categoryName"
                        placeholder="Selecione ou adicione uma categoria"
                        icon="list"
                    />
                </div>

                {/* Campo para adicionar ou editar a categoria */}
                <div className="mb-3">
                    <Input
                        type="text"
                        placeholder="Nome da Categoria"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                </div>

                {/* Botões de ação */}
                <div className="d-flex gap-2">
                    <Button
                        className={'btn btn-primary w-100 mt-2'}
                        text={selectedCategory ? "Atualizar" : "Salvar"}
                        onClick={handleAddCategory}
                        icon={'floppy-fill'}
                        showText={true}
                    />
                </div>
            </div>
            {/* Modal de confirmação para excluir categoria */}
            <ConfirmModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDeleteCategory}
                message="Você tem certeza de que deseja excluir esta categoria?"
                buttons={[
                    {
                        className: 'btn-danger',
                        text: 'Excluir',
                        action: handleDeleteCategory
                    },
                    {
                        className: 'btn-secondary',
                        text: 'Cancelar',
                        action: () => setShowModal(false)
                    }
                ]}
            />
            {/* Toast Notification */}
            <ToastNotification
                message={toastMessage}
                type={toastType}
                show={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default CategoryForm;
