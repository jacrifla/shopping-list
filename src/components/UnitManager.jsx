import React, { useEffect, useState } from 'react';
import UnitService from '../services/unitService';
import Select from './Select';
import Input from './Input';
import Subtitle from './Subtitle';
import Button from './Button';
import ConfirmModal from './ConfirmModal';
import ToastNotification from './ToastNotification';

const UnitForm = () => {
    const [units, setUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [newUnitName, setNewUnitName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const fetchedUnits = await UnitService.findAllUnits();
                setUnits(fetchedUnits);
            } catch (err) {
                showToastNotification('Erro ao carregar unidades.', 'error');
            }
        };
        fetchUnits();
    }, []);

    const handleSaveUnit = async () => {
        if (!newUnitName.trim()) {
            showToastNotification('Digite o nome da unidade.', 'error');
            return;
        }

        try {
            if (selectedUnit && selectedUnit.unitId) {
                const updated = await UnitService.updateUnit(selectedUnit.unitId, newUnitName);
                setUnits(units.map(u => u.unitId === updated.unitId ? updated : u));
                showToastNotification('Unidade atualizada com sucesso!', 'success');
            } else {
                const created = await UnitService.createUnit(newUnitName);
                setUnits([...units, created]);
                showToastNotification('Unidade criada com sucesso!', 'success');
            }

            setNewUnitName('');
            setSelectedUnit(null);
        } catch (err) {
            showToastNotification('Erro ao salvar unidade.', 'error');
        }
    };

    const handleDeleteUnit = async () => {
        try {
            await UnitService.deleteUnit(selectedUnit.unitId);
            setUnits(units.filter(u => u.unitId !== selectedUnit.unitId));
            showToastNotification('Unidade excluída com sucesso!', 'success');
            handleClear();
        } catch (err) {
            showToastNotification('Erro ao excluir unidade.', 'error');
        }
    };

    const handleClear = () => {
        setSelectedUnit(null);
        setNewUnitName('');
    };

    const handleSelectChange = (e) => {
        const id = Number(e.target.value);
        const found = units.find(u => u.unitId === id);

        if (found) {
            setSelectedUnit(found);
            setNewUnitName(found.unitName);
        } else {
            showToastNotification('Unidade não encontrada.', 'error');
        }
    };

    const handleShowModal = () => {
        if (!selectedUnit) {
            showToastNotification('Selecione uma unidade para excluir.', 'error');
            return;
        }
        setShowModal(true);
    };

    const showToastNotification = (msg, type) => {
        setToastMessage(msg);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="card mb-3 w-100 border-0 shadow-sm mt-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Subtitle
                        icon="plus-circle-fill"
                        text={selectedUnit ? 'Editar Unidade' : 'Adicionar Unidade'}
                    />
                    <div className="d-flex gap-2">
                        <Button
                            className="btn btn-danger"
                            icon="trash"
                            onClick={handleShowModal}
                            text="Excluir"
                        />
                        <Button
                            className="btn btn-secondary"
                            icon="x-lg"
                            onClick={handleClear}
                            text="Cancelar"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <Select
                        label="Selecione uma Unidade"
                        value={selectedUnit ? selectedUnit.unitId : ''}
                        onChange={handleSelectChange}
                        options={units}
                        keyField="unitId"
                        displayField="unitName"
                        placeholder="Selecione ou adicione uma unidade"
                        icon="list"
                    />
                </div>

                <div className="mb-3">
                    <Input
                        type="text"
                        placeholder="Nome da Unidade"
                        value={newUnitName}
                        onChange={(e) => setNewUnitName(e.target.value)}
                    />
                </div>

                <Button
                    className="btn btn-primary w-100 mt-2"
                    text={selectedUnit ? "Atualizar" : "Salvar"}
                    onClick={handleSaveUnit}
                    icon="floppy-fill"
                    showText={true}
                />
            </div>

            <ConfirmModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDeleteUnit}
                message="Você tem certeza de que deseja excluir esta unidade?"
                buttons={[
                    {
                        text: 'Sim',
                        class: 'btn btn-danger',
                        action: handleDeleteUnit
                    },
                    {
                        text: 'Não',
                        class: 'btn btn-secondary',
                        action: () => setShowModal(false)
                    }
                ]}
            />

            <ToastNotification
                message={toastMessage}
                type={toastType}
                show={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default UnitForm;
