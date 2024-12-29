import React from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import Subtitle from './Subtitle';

const ItemForm = ({
    itemName, setItemName, barcode, setBarcode, description, setDescription,
    selectedBrand, setSelectedBrand, selectedCategory, setSelectedCategory, brands, categories, onSaveItem, onDeleteItem
}) => {
    return (
        <div className="card shadow-sm mb-4 border-0">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Subtitle icon={'plus-circle-fill'}>Cadastrar/Editar Item</Subtitle>
                    <Button className="btn btn-danger" icon={'trash'} onClick={onDeleteItem}>
                        Excluir Item
                    </Button>
                </div>

                {/* Linha para Nome do Produto e Código de Barras */}
                <div className="row g-3 mb-3">
                    <div className="col-md-6 col-12">
                        <Input
                            icon={'box'}
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            placeholder="Nome do Produto"
                            label="Nome do Produto"
                        />
                    </div>
                    <div className="col-md-6 col-12">
                        <Input
                            icon={'upc'}
                            type="text"
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            placeholder="Código de Barras"
                            label="Código de Barras"
                        />
                    </div>
                </div>

                {/* Linha para Marca e Categoria */}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <Select
                            icon={'folder'}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(Number(e.target.value))}
                            options={categories}
                            placeholder="Selecione uma Categoria"
                        />
                    </div>
                    <div className="col-md-6 col-12">
                        <Select
                            icon={'tag'}
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(Number(e.target.value))}
                            options={brands}
                            placeholder="Selecione uma Marca"
                        />
                    </div>
                </div>

                {/* Linha para Observação e Botão Salvar */}
                <div className="row g-3">
                    <div className="col-12 col-lg-8">
                        <Input
                            icon={'sticky'}
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Observação"
                            label="Observação"
                        />
                    </div>
                    <div className="col-12 col-lg-4 d-flex align-items-end">
                        <Button className="btn btn-primary w-100" icon={'save'} onClick={onSaveItem}>
                            Salvar Item
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ItemForm;
