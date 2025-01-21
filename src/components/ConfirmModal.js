import React from 'react';
import Button from './Button';
import Subtitle from './Subtitle';

const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3 border-0">
        <Subtitle
        className='text-center'
          text={'Confirmação'}
        />
          <p className="text-center">{message}</p>
          <div className="d-flex justify-content-between mt-4 gap-3">
            <Button
              className="btn btn-secondary w-100"
              onClick={onClose}
              text="Cancelar"
            />
            <Button
              className="btn btn-danger w-100"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              text="Confirmar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
