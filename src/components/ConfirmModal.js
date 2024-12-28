import React from 'react';
import Button from './Button';

const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5 className="mb-4 text-center">Confirmação</h5>
          <p className="text-center">{message}</p>
          <div className="d-flex justify-content-between mt-4">
            <Button className="btn btn-secondary" onClick={onClose}>Cancelar</Button>
            <Button className="btn btn-danger" onClick={onConfirm}>Confirmar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
