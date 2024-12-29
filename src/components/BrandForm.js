import React, { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import Select from './Select';
import Subtitle from './Subtitle';

const BrandForm = ({ handleDeleteBrand, handleSaveOrUpdateBrand, brands, setBrands }) => {
  const [brandName, setBrandName] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    if (selectedBrand) {
      const brandToEdit = brands.find(brand => brand.brand_id === selectedBrand);
      if (brandToEdit) {
        setBrandName(brandToEdit.brand_name);
      }
    }
  }, [selectedBrand, brands]);

  const handleBrandSubmit = () => {
    if (selectedBrand) {
      handleSaveOrUpdateBrand(selectedBrand, brandName);
    } else {
      handleSaveOrUpdateBrand(null, brandName);
    }
    setBrandName('');
    setSelectedBrand('');
  };

  const handleBrandDelete = () => {
    handleDeleteBrand(selectedBrand);
    setBrandName('');
    setSelectedBrand('');
  };

  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-body">
        <Subtitle icon={'plus-circle-fill'}>Cadastrar/Editar Marca</Subtitle>
        <div className='mb-3'>
          <Input
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Nome da Marca"
          />
        </div>
        <div className='d-flex flex-row justify-content-between'>
          <Button onClick={handleBrandSubmit} className="btn btn-primary">
            {selectedBrand ? 'Atualizar Marca' : 'Cadastrar Marca'}
          </Button>
          <Button onClick={handleBrandDelete} className="btn btn-danger" disabled={!selectedBrand}>
            Excluir Marca
          </Button>
        </div>

        <div className="mt-4">
          <h6>Gerenciar Marcas</h6>
          {brands.length > 0 ? (
            <Select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              options={brands}
              keyField="brand_id"
              displayField="brand_name"
              placeholder="Selecione uma Marca"
            />
          ) : (
            <p>Carregando marcas...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandForm;
