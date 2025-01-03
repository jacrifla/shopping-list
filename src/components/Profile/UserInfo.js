import React from 'react';
import Input from '../Input';
import Button from '../Button';
import Subtitle from '../Subtitle';

const UserInfo = ({ name, email, setName, setEmail, handleUpdateProfile, handleChangePassword }) => {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <Subtitle icon={'person-circle'}>Informações do Usuário</Subtitle>
          <div className="mb-3">
            <Input
              icon={'person'}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
              label="Nome"
            />
          </div>
          <div className="mb-3">
            <Input
              icon={'envelope'}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              label="Email"
            />
          </div>
          <div className="d-flex gap-2">
            <Button className="btn btn-primary" icon={'floppy-fill'} onClick={handleUpdateProfile}>
              Atualizar Informações
            </Button>
            <Button className="btn btn-primary" icon={'lock-fill'} onClick={handleChangePassword}>
              Alterar Senha
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
