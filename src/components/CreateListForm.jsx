import React from 'react';
import Subtitle from './Subtitle';
import Input from './Input';

const CreateListForm = ({ show, onClose, onSubmit, listName, setListName }) => {
    if (!show) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-3 border-0">
                    <Subtitle className="text-center" text="Criar Nova Lista" />
                    <div className='mb-3'>
                        <Input
                            type="text"
                            placeholder="Digite o nome do produto"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-between gap-3">
                        <button className="btn btn-secondary w-100" onClick={onClose}>
                            Cancelar
                        </button>
                        <button className="btn btn-primary w-100" onClick={onSubmit}>
                            Criar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateListForm;
