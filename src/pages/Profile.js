import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import Input from '../components/Input';
import Subtitle from '../components/Subtitle';
import ConfirmModal from '../components/ConfirmModal';

const Profile = () => {
  const [email, setEmail] = useState('usuario@example.com');
  const [name, setName] = useState('Nome do Usuário');
  const [token, setToken] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    console.log('Atualizar perfil:', { email, name });
    // Lógica de atualização de perfil
  };

  const handleChangePassword = () => {
    navigate('/forgot-password');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      console.log('Conta excluída');
      setShowConfirmModal(false);
      // Lógica para excluir a conta
    }
  };

  const handleTokenSubmit = () => {
    console.log('Token submetido:', token);
    // Lógica para gerenciar o compartilhamento
  };

  const handleLogout = () => {
    console.log('Usuário saiu');
    // Lógica para deslogar o usuário, como redirecionar ou limpar o estado
    setShowLogoutModal(false);
    navigate('/login');
  };

  return (
    <div className="container py-4 d-flex flex-column h-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Title icon={'person-fill'}>Perfil</Title>
        <Button
          icon={'box-arrow-right'}
          className="btn btn-danger"
          onClick={() => setShowLogoutModal(true)}
        >
          Sair
        </Button>
      </div>

      {/* Informações do Usuário e Gerenciamento de Compartilhamento */}
      <div className="row flex-grow-1">
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
      </div>

      {/* Zona de Perigo */}
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
      
      {/* Modal de Confirmação de Exclusão de Conta */}
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDeleteAccount}
        message="Tem certeza que deseja excluir sua conta?"
      />

      {/* Modal de Confirmação de Logout */}
      <ConfirmModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        message="Tem certeza que deseja sair?"
      />
    </div>
  );
};

export default Profile;
