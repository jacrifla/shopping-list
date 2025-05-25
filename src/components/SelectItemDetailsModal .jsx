import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import brandService from '../services/brandService';
import categoryService from '../services/categoryService';
import Select from './Select';
import Input from './Input';
import Button from './Button';

const SelectItemDetailsModal = ({ show, onHide, onSave, selectedItem }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [barcode, setBarcode] = useState('');

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const loadCategoriesAndBrands = async () => {
      try {
        const categoryResponse = await categoryService.findAllCategories();
        const brandResponse = await brandService.findAllBrands();

        setCategories(categoryResponse || []);
        setBrands(brandResponse || []);
      } catch (error) {
        console.error('Erro ao carregar categorias ou marcas', error);
      }
    };

    if (show) {
      loadCategoriesAndBrands();
      if (selectedItem) {
        setCategoryId(selectedItem.categoryId || null);
        setBrandId(selectedItem.brandId || null);
        setBarcode(selectedItem.barcode || '');
      }
    } else {
      // Resetando os valores para o estado inicial quando o modal é fechado
      setCategoryId(null);
      setBrandId(null);
      setBarcode('');
    }
  }, [show, selectedItem]);

  const handleSave = () => {
    onSave({ categoryId, brandId, barcode });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="border-0">
      <Modal.Header closeButton className="border-0 shadow-none">
        <Modal.Title className="fw-bold">
          Detalhes do Item {selectedItem ? ` : ${selectedItem.itemName}` : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Select
            label="Categoria"
            value={categoryId || ''}
            onChange={(e) => setCategoryId(e.target.value || null)}
            options={categories}
            placeholder="Escolha uma categoria"
            keyField="categoryId"
            displayField="categoryName"
            icon="tags"
          />

          <Select
            label="Marca"
            value={brandId || ''}
            onChange={(e) => setBrandId(e.target.value || null)}
            options={brands}
            placeholder="Escolha uma marca"
            keyField="brandId"
            displayField="brandName"
            icon="building"
          />

          <Input
            type="text"
            label="Código de Barras"
            placeholder="Digite o código de barras"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            icon="upc-scan"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 shadow-none d-flex gap-2">
        <Button text="Fechar" onClick={onHide} className="btn-outline-secondary flex-grow-1 fs-6" showText />
        <Button text="Salvar" onClick={handleSave} className="btn-primary flex-grow-1 fs-6" showText />
      </Modal.Footer>
    </Modal>
  );
};

export default SelectItemDetailsModal;
