import React from 'react';
import Button from '../Button';
import Subtitle from '../Subtitle';

const DangerZone = ({ setShowConfirmModal }) => {
  return (
    <div className="row mt-auto">
      <div className="col-12">
        <div className="card shadow-sm border-0">
          <div
            className="card-body text-light position-relative rounded"
            style={{
              backgroundColor: '#ff7f7f'
            }}
          >
            <Subtitle
              className="text-light fw-bold"
              icon={'exclamation-circle-fill'}
              text={'Zona de Perigo'}
            />
            <p className="text-warning fw-bold mb-3">
              Cuidado! Ações nesta área podem ter efeitos permanentes.
            </p>
            <Button
              className="btn btn-light text-danger fw-bold border border-light"
              icon={'person-x'}
              onClick={() => setShowConfirmModal(true)}
              text={'Excluir Conta'}
              showText={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
