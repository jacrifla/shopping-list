import React from 'react';
import Input from '../Input';
import Button from '../Button';

const TokenManagement = ({ token, setToken, handleTokenSubmit }) => {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">Gerenciamento de Compartilhamento</h5>
          <div className="mb-3">
            <Input
              icon={'key-fill'}
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Cole o token aqui"
              label="Token de Compartilhamento"
            />
          </div>
          <Button className="btn btn-primary" onClick={handleTokenSubmit}>
            Submeter Token
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenManagement;
