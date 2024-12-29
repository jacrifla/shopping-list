import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import Select from './Select';
import Subtitle from './Subtitle';

const CategoryForm = ({ categories, setCategories }) => {
    const [categoryName, setCategoryName] = useState('');
    const [editCategoryId, setEditCategoryId] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSaveCategory = () => {
        if (editCategoryId) {
            setCategories(categories.map(cat =>
                cat.id === parseInt(editCategoryId, 10) ? { ...cat, name: categoryName } : cat
            ));
        } else {
            const newCategory = { id: categories.length + 1, name: categoryName };
            setCategories([...categories, newCategory]);
        }
        setCategoryName('');
        setEditCategoryId('');
    };

    const handleEditCategory = () => {
        const category = categories.find(cat => cat.id === parseInt(selectedCategory, 10));
        if (category) {
            setCategoryName(category.name);
            setEditCategoryId(category.id);
        }
    };

    const handleDeleteCategory = () => {
        setCategories(categories.filter(cat => cat.id !== parseInt(selectedCategory, 10)));
        setSelectedCategory('');
    };

    return (
        <div className="card shadow-sm mb-4 border-0">
            <div className="card-body">
              <Subtitle icon={'plus-circle-fill'}>Cadastrar Categoria</Subtitle>
                <div className="mb-3">
                    <Input
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Nome da Categoria"
                    />
                </div>
                <Button onClick={handleSaveCategory} className="btn btn-primary">
                    {editCategoryId ? 'Editar Categoria' : 'Cadastrar Categoria'}
                </Button>

                <div className="mt-4">
                    <h6>Gerenciar Categorias</h6>
                    <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        options={categories}
                        placeholder="Selecione uma Categoria"
                    />

                    <div className="d-flex mt-3">
                        <Button
                            onClick={handleEditCategory}
                            className="btn btn-warning me-2"
                            disabled={!selectedCategory}
                        >
                            Editar
                        </Button>
                        <Button
                            onClick={handleDeleteCategory}
                            className="btn btn-danger"
                            disabled={!selectedCategory}
                        >
                            Excluir
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;
