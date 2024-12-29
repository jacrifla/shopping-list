import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import Select from './Select';
import Subtitle from './Subtitle';

const BrandForm = ({ brands, setBrands }) => {
  const [brandName, setBrandName] = useState('');
  const [editBrandId, setEditBrandId] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const handleSaveBrand = () => {
    if (editBrandId) {
      setBrands(brands.map(brand =>
        brand.id === parseInt(editBrandId, 10) ? { ...brand, name: brandName } : brand
      ));
    } else {
      const newBrand = { id: brands.length + 1, name: brandName };
      setBrands([...brands, newBrand]);
    }
    setBrandName('');
    setEditBrandId('');
  };

  const handleEditBrand = () => {
    const brand = brands.find(brand => brand.id === parseInt(selectedBrand, 10));
    if (brand) {
      setBrandName(brand.name);
      setEditBrandId(brand.id);
    }
  };

  const handleDeleteBrand = () => {
    setBrands(brands.filter(brand => brand.id !== parseInt(selectedBrand, 10)));
    setSelectedBrand('');
  };

  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-body">
        <Subtitle icon={'plus-circle-fill'}>Cadastrar Marca</Subtitle>
        <div className='mb-3'>
          <Input
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Nome da Marca"
          />
        </div>
        <Button onClick={handleSaveBrand} className="btn btn-primary">
          {editBrandId ? 'Editar Marca' : 'Cadastrar Marca'}
        </Button>

        <div className="mt-4">
          <h6>Gerenciar Marcas</h6>
          <Select 
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            options={brands}
            placeholder={'Selecione uma Marca'}
          />

          <div className="d-flex mt-3">
            <Button
              onClick={handleEditBrand}
              className="btn btn-warning me-2"
              disabled={!selectedBrand}
            >
              Editar
            </Button>
            <Button
              onClick={handleDeleteBrand}
              className="btn btn-danger"
              disabled={!selectedBrand}
            >
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandForm;
