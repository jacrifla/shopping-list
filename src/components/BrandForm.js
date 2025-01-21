import React, { useState, useEffect } from 'react';
import Select from './Select';
import brandService from '../services/brandService';
import Input from './Input';
import Subtitle from './Subtitle';
import Button from './Button';
import ConfirmModal from './ConfirmModal';
import ToastNotification from './ToastNotification';

const BrandForm = () => {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [newBrandName, setNewBrandName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [showToast, setShowToast] = useState(false);

    // Busca as marcas ao carregar o componente
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const fetchedBrands = await brandService.findAllBrands();
                setBrands(fetchedBrands);
            } catch (error) {
                console.error('Erro ao buscar marcas:', error);
                showToastNotification('Erro ao buscar marcas. Tente novamente!', 'error');
            }
        };
        fetchBrands();
    }, []);

    // Função para adicionar ou editar uma marca
    const handleAddBrand = async () => {
        if (!newBrandName.trim()) {
            showToastNotification('Por favor, insira o nome da marca.', 'error');
            return;
        }

        try {
            if (selectedBrand && selectedBrand.brandId) {
                // Editando marca existente
                const updatedBrand = await brandService.updateBrand(
                    selectedBrand.brandId,
                    newBrandName
                );

                setBrands(prevBrands =>
                    prevBrands.map(brand =>
                        brand.brandId === updatedBrand.brandId
                            ? updatedBrand
                            : brand
                    )
                );
                showToastNotification('Marca atualizada com sucesso!', 'success');
            } else {
                // Criando nova marca
                const newBrand = await brandService.createBrand(newBrandName);

                setBrands(prevBrands => [...prevBrands, newBrand]);
                showToastNotification('Marca criada com sucesso!', 'success');
            }

            // Limpar o input e marca selecionada após ação
            setNewBrandName('');
            setSelectedBrand(null);
        } catch (error) {
            console.error('Erro ao adicionar ou editar marca:', error);
            showToastNotification('Erro ao adicionar ou editar marca. Tente novamente!', 'error');
        }
    };

    // Função para limpar a seleção de marca
    const handleClearBrand = () => {
        setSelectedBrand(null);
        setNewBrandName('');
    };

    // Função para abrir o modal de confirmação antes de excluir
    const handleShowModal = () => {
        if (!selectedBrand) {
            showToastNotification('Você precisa selecionar uma marca antes de excluir.', 'error');
            return;
        }
        setShowModal(true);
    };

    // Função para excluir marca
    const handleDeleteBrand = async () => {
        try {
            if (selectedBrand) {
                await brandService.deleteBrand(selectedBrand.brandId);
                setBrands(prevBrands =>
                    prevBrands.filter(brand => brand.brandId !== selectedBrand.brandId)
                );
                showToastNotification('Marca excluída com sucesso!', 'success');
                handleClearBrand();
            }
        } catch (error) {
            console.error('Erro ao excluir marca:', error);
            showToastNotification('Erro ao excluir marca. Tente novamente!', 'error');
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

    // Lida com a mudança na seleção de marcas
    const handleBrandChange = (event) => {
        const selectedId = Number(event.target.value);
        const selectedBrand = brands.find(brand => brand.brandId === selectedId);

        if (selectedBrand) {
            setSelectedBrand(selectedBrand);
            setNewBrandName(selectedBrand.brandName);
        } else {
            console.log("Marca não encontrada");
        }
    };

    return (
        <div className="card mb-3 w-100 border-0 shadow-sm mt-3">
            <div className="card-body">
                {/* Linha com título e botões */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Subtitle
                        icon={'plus-circle-fill'}
                        text={selectedBrand ? 'Editar Marca' : 'Adicionar Marca'}
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
                            onClick={handleClearBrand}
                            text={'Cancelar'}
                        />
                    </div>
                </div>

                {/* Select para escolher marcas existentes */}
                <div className="mb-3">
                    <Select
                        label="Selecione uma Marca"
                        value={selectedBrand ? selectedBrand.brandId : ''}
                        onChange={handleBrandChange}
                        options={brands}
                        keyField="brandId"
                        displayField="brandName"
                        placeholder="Selecione ou adicione uma marca"
                        icon="list"
                    />
                </div>

                {/* Campo para adicionar ou editar a marca */}
                <div className="mb-3">
                    <Input
                        type="text"
                        placeholder="Nome da Marca"
                        value={newBrandName}
                        onChange={(e) => setNewBrandName(e.target.value)}
                    />
                </div>

                {/* Botões de ação */}
                <div className="d-flex gap-2">
                    <Button
                        className={'btn btn-primary w-100 mt-2'}
                        text={selectedBrand ? "Atualizar" : "Salvar"}
                        onClick={handleAddBrand}
                        icon={'floppy-fill'}
                    />
                </div>
            </div>
            {/* Modal de confirmação para excluir marca */}
            <ConfirmModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDeleteBrand}
                message="Você tem certeza de que deseja excluir esta marca?"
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

export default BrandForm;
