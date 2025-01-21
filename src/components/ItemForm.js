import React from 'react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import Subtitle from './Subtitle';

const ItemForm = ({
    categories,
    brands,
    item,
    isEditing,
    handleSaveEditItem,
    handleDeleteItem,
    clearFields,
    setItem
}) => {
    return (
        <div className="card shadow-sm border-0">
            <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                    <Subtitle
                        icon={'plus-circle-fill'}
                        text={isEditing ? 'Editar Item' : 'Cadastrar Item'}
                    />
                    <div className='d-flex gap-2'>
                        <Button
                            className={'btn btn-danger'}
                            icon={'trash-fill'}
                            onClick={() => handleDeleteItem(item.itemId)}
                            text={'Excluir'}
                        />
                        <Button
                            className={'btn btn-secondary'}
                            icon={'x-lg'}
                            onClick={() => clearFields('item')}
                            text={'Cancelar'}
                            />
                    </div>
                </div>
                {/* Nome do Produto e Codigo de Barras */}
                <div className="row g-3 mb-3">
                    <div className="col-md-6 col-12">
                        <Input
                            icon={'box'}
                            type="text"
                            placeholder="Nome do Produto"
                            value={item.itemName || ''}
                            onChange={(e) => setItem({ ...item, itemName: e.target.value })}
                            label="Nome do Produto"
                        />
                    </div>
                    <div className="col-md-6 col-12">
                        <Input
                            icon={'upc'}
                            type="number"
                            value={item.barcode || ''}
                            onChange={(e) => setItem({ ...item, barcode: e.target.value })}
                            placeholder="Código de Barras"
                            maxLength={13}
                            label="Código de Barras"
                        />
                    </div>
                </div>
                {/* Marca e Categorias */}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <Select
                            icon={'folder'}
                            value={item.categoryId || ''}
                            onChange={(e) => setItem({ ...item, categoryId: e.target.value })}
                            options={categories}
                            keyField={'categoryId'}
                            displayField={'categoryName'}
                            placeholder="Selecione uma categoria"
                        />
                    </div>
                    <div className="col-md-6 col-12">
                        <Select
                            icon={'tag'}
                            value={item.brandId || ''}
                            onChange={(e) => setItem({ ...item, brandId: e.target.value })}
                            options={brands}
                            keyField={'brandId'}
                            displayField={'brandName'}
                            placeholder="Selecione uma Marca"
                        />
                    </div>
                </div>
                <Button
                    className={'btn btn-primary w-100'}
                    icon={'floppy-fill'}
                    text={isEditing ? 'Atualizar' : 'Salvar'}
                    onClick={handleSaveEditItem}
                    showText={true}
                />
            </div>
        </div>
    );
};

export default ItemForm;
