import React from 'react';
import Button from '../Button';
import Subtitle from '../Subtitle';

const DangerZone = ({ setShowConfirmModal }) => {
  return (
    <div className="row mt-auto">
      <div className="col-12">
        <div className="card shadow-sm">
          <div className="card-body">
            <Subtitle className='text-danger' icon={'exclamation-circle-fill'}>Zona de Perigo</Subtitle>
            <p className="text-warning fw-bold">Cuidado! Ações que requerem atenção especial</p>
            <Button
              className="btn btn-danger"
              icon={'person-x'}
              onClick={() => setShowConfirmModal(true)}
            >
              Excluir Conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
