import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import Input from '../components/Input';
import Subtitle from '../components/Subtitle';
import ConfirmModal from '../components/ConfirmModal';
import Header from '../components/Header';
import { clearAuth } from '../services/authService';
import { deleteUser, updateUser } from '../services/userService';
import ToastNotification from '../components/ToastNotification';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('danger');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setUserId(user.user_id);
    }
  }, [])

  const handleUpdateProfile = async () => {
    try {
      await updateUser(userId, name, email);
      setToastMessage('Alterado com sucesso!');
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      setToastMessage(error.message || 'Erro ao alterar dados do usuário');
      setToastType('danger');
      setShowToast(true);
    }
  };

  const handleChangePassword = () => {
    navigate('/forgot-password');
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(userId);
      setToastMessage('Conta excluída com sucesso!');
      setToastType('success');
      setShowToast(true);
      clearAuth();
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      setToastMessage(error.message || 'Erro ao excluir a conta');
      setToastType('danger');
      setShowToast(true);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const handleTokenSubmit = () => {
    console.log('Token submetido:', token);
    // Lógica para gerenciar o compartilhamento
  };

  const handleLogout = () => {
    console.log('Usuário saiu');
    clearAuth();
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <div>
      <Header />
      <div className="container py-4 d-flex flex-column h-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <ToastNotification
            message={toastMessage}
            type={toastType}
            show={showToast}
            onClose={() => setShowToast(false)}
          />
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
    </div>
  );
};

export default Profile;
