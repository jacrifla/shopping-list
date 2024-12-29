import React, { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import Select from './Select';
import Subtitle from './Subtitle';

const CategoryForm = ({ handleSaveOrUpdateCategory, handleDeleteCategory, categories }) => {
    const [categoryName, setCategoryName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        if (selectedCategory) {
            const categoryToEdit = categories.find(category => category.category_id === selectedCategory);
            if (categoryToEdit) {
                setCategoryName(categoryToEdit.category_name);
            }
        }
    }, [selectedCategory, categories]);

    const handleCategorySubmit = () => {
        if (selectedCategory) {
            handleSaveOrUpdateCategory(selectedCategory, categoryName);
        } else {
            handleSaveOrUpdateCategory(null, categoryName);
        }
        setCategoryName('');
        setSelectedCategory('');
    };

    const handleCategoryDelete = () => {
        handleDeleteCategory(selectedCategory);
        setCategoryName('');
        setSelectedCategory('');
    };

    return (
        <div className="card shadow-sm mb-4 border-0">
            <div className="card-body">
                <Subtitle icon={'plus-circle-fill'}>Cadastrar/Editar Categoria</Subtitle>
                <div className='mb-3'>
                    <Input
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Nome da Categoria"
                    />
                </div>
                <div className='d-flex flex-row justify-content-between'>
                    <Button onClick={handleCategorySubmit} className="btn btn-primary">
                        {selectedCategory ? 'Atualizar Categoria' : 'Cadastrar Categoria'}
                    </Button>
                    <Button onClick={handleCategoryDelete} className="btn btn-danger" disabled={!selectedCategory}>
                        Excluir Categoria
                    </Button>
                </div>

                <div className="mt-4">
                    <h6>Gerenciar Categorias</h6>
                    {categories.length > 0 ? (
                        <Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            options={categories}
                            keyField="category_id"
                            displayField="category_name"
                            placeholder="Selecione uma Categoria"
                        />
                    ) : (
                        <p>Carregando categorias...</p>
                    )}
                </div>
            </div>
        </div>
    );
};


export default CategoryForm;
