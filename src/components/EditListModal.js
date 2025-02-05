import React, { useState } from 'react';
import Subtitle from './Subtitle';
import Button from './Button';
import Input from './Input';
const EditListModal = ({ showModal, onClose, listName, onSave }) => {
  const [newListName, setNewListName] = useState(listName);

  const handleSave = () => {
    if (newListName.trim() === '') {
      alert('O nome da lista não pode estar vazio.');
      return;
    }
    onSave(newListName);
    onClose();
  };

  return (
    <div
      className={`modal ${showModal ? 'fade show' : ''}`}
      tabIndex="-1"
      style={{ display: showModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0">
          <div className='d-flex justify-content-between align-items-center p-3'>
            <Subtitle text={'Editar Lista'} />
            <Button
              className={'btn-close fs-6'}
              onClick={onClose}
            />
          </div>

          <div className="modal-body">
            <Input
              type="text"
              className="form-control"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Novo nome da lista"
            />
            <div className="d-flex justify-content-between gap-3 my-3">
              <button type="button" className="btn btn-secondary w-100" onClick={onClose}>
                Cancelar
              </button>
              <button type="button" className="btn btn-primary w-100" onClick={handleSave}>
                Salvar
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditListModal;