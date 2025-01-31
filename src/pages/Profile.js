import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import ToastNotification from '../components/ToastNotification';
import Header from '../components/Header';
import { clearAuth } from '../services/authService';
import { deleteUser, updateUser } from '../services/userService';
import { findToken, grantAccess } from '../services/shareListAndToken';
import UserInfo from '../components/Profile/UserInfo';
import TokenManagement from '../components/Profile/TokenManagement';
import DangerZone from '../components/Profile/DangerZone';
import ConfirmModal from '../components/ConfirmModal';

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
  }, []);

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

  const handleTokenSubmit = async () => {
    try {
      const data = await findToken(token);

      if (data && data.status) {
        // Conceder acesso ao usuário
        await grantAccess(token, userId);

        setToastMessage('Acesso concedido à lista!');
        setToastType('success');
        setToken('');
      } else {
        // Token inválido
        setToastMessage('Token inválido!');
        setToastType('danger');
      }

      setShowToast(true);
    } catch (error) {
      setToastMessage('Erro ao validar o token');
      setToastType('danger');
      setShowToast(true);
    }
  };

  const handleLogout = () => {
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
          <Title icon={'person-fill'} text={'Perfil'} />
          <Button
            icon={'box-arrow-right'}
            className="btn btn-danger"
            onClick={() => setShowLogoutModal(true)}
            text={'Sair'}
            showText={true}
          />
        </div>

        <div className="row flex-grow-1">
          <UserInfo
            name={name}
            email={email}
            setName={setName}
            setEmail={setEmail}
            handleUpdateProfile={handleUpdateProfile}
            handleChangePassword={handleChangePassword}
          />
          <TokenManagement
            token={token}
            setToken={setToken}
            handleTokenSubmit={handleTokenSubmit}
          />
        </div>

        <DangerZone setShowConfirmModal={setShowConfirmModal} />

        {/* Modal de Confirmação de Exclusão de Conta */}
        <ConfirmModal
          show={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleDeleteAccount}
          message="Tem certeza que deseja excluir sua conta?"
          buttons={[
            {
              text: 'Sim',
              className: 'btn-danger',
              action: handleDeleteAccount
            },
            {
              text: 'Não',
              className: 'btn-secondary',
              action: () => setShowConfirmModal(false)
            }
          ]}
        />

        {/* Modal de Confirmação de Logout */}
        <ConfirmModal
          show={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          message="Tem certeza que deseja sair?"
          buttons={[
            {
              text: 'Sim',
              className: 'btn-danger',
              action: () => {
                handleLogout();
              }
            },
            {
              text: 'Não',
              className: 'btn-secondary',
              action: () => {
                setShowLogoutModal(false);
              }
            }
          ]}
        />

      </div>
    </div>
  );
};

export default Profile;
