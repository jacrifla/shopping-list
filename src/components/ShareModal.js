import React from 'react';
import Button from './Button';
import Input from './Input';

const ShareModal = ({ showModal, onClose, token, listName }) => {
  if (!showModal) return null;

  const handleSendToWhatsApp = () => {
    const message = `Estou compartilhando a lista: ${listName}\nToken: ${token}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      onClick={handleModalClick}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title">
              <i className="bi bi-share me-2"></i>Compartilhar Lista:
            </h5>
            <span className="fw-semibold text-primary ms-2">
              {listName}
            </span>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Cole o seguinte token e envie para o outro usuário:</p>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex gap-2">
                <Input
                  type="text"
                  className="form-control rounded border-primary"
                  value={token}
                  readOnly
                  placeholder="Token de Compartilhamento"
                  icon="clipboard"
                />
              </div>
              <div className="d-flex gap-2 mt-3">
                <Button
                  className="btn btn-outline-secondary rounded"
                  icon="clipboard"
                  onClick={() => navigator.clipboard.writeText(token)}
                >
                  Copiar
                </Button>
                <Button
                  className="btn btn-success rounded"
                  icon="whatsapp"
                  onClick={handleSendToWhatsApp}
                >
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
