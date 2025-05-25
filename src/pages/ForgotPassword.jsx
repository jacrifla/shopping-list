import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/userService';
import ToastNotification from '../components/ToastNotification'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('danger');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      setToastMessage('Por favor, preencha todos os campos!');
      setToastType('danger');
      setShowToast(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setToastMessage('As senhas não coincidem!');
      setToastType('danger');
      setShowToast(true);
      return;
    }

    try {
      await resetPassword(email, newPassword);
      setToastMessage('Senha alterada com sucesso!');
      setToastType('success');
      setShowToast(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      setToastMessage(error.message || 'Erro ao cadastrar o usuário');
      setToastType('danger');
      setShowToast(true);
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6">
          <div className="text-center mt-5 mb-4">
            <Title className="title-login-signup" text={'Recuperar Senha'}/>
          </div>
          <ToastNotification 
            message={toastMessage} 
            type={toastType} 
            show={showToast} 
            onClose={() => setShowToast(false)} 
          />
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon="envelope"
              />
            </div>
            <div className="mb-3">
              <Input
                type="password"
                placeholder="Nova Senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                icon="lock"
              />
            </div>
            <div className="mb-3">
              <Input
                type="password"
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon="lock"
              />
            </div>
            <Button 
              className="btn btn-primary w-100" 
              type="submit"
              text="Recuperar Senha"
              showText={true}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
