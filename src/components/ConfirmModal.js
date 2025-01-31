import React from 'react';
import Button from './Button';
import Subtitle from './Subtitle';

const ConfirmModal = ({ show, onClose, onConfirm, message, buttons }) => {
  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3 border-0">
          <Subtitle className="text-center" text={'Confirmação'} />
          <p className="text-center">{message}</p>
          <div className="d-flex justify-content-between mt-4 gap-3">
            {buttons.map((button, index) => (
              <Button
                key={index}
                className={`btn ${button.className} w-100`}
                onClick={() => {
                  if (button.action) {
                    button.action();
                  }
                  onClose();
                }}
                text={button.text}
                showText={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default ConfirmModal;
