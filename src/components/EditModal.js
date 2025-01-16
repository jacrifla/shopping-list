import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';


const EditModal = ({ list, onClose, onSave }) => {
    const [newName, setNewName] = useState(list.list_name);

  const handleSave = () => {
    if (newName.trim() !== '') {
      onSave(list.list_id, newName);
    }
  };

  return (
    <div className={`modal ${list ? 'd-block' : 'd-none'}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title">Editar Lista</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <Input 
                type="text"
                className="form-control"
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
            />
          </div>
          <div className="modal-footer border-0 d-flex justify-content-between">
            <div className='d-flex flex-fill'>
                <Button
                className='btn btn-warning flex-fill'
                onClick={onClose}
                text={'Cancelar'}
                />

            </div>
            <div className='d-flex flex-fill'>
                <Button
                className='btn btn-primary flex-fill'
                onClick={handleSave}
                text={'Salvar'}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
