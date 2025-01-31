import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userService';
import ToastNotification from '../components/ToastNotification';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('danger');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setToastMessage('Por favor, preencha todos os campos!');
      setToastType('danger');
      setShowToast(true);
      return;
    }


    if (password !== confirmPassword) {
      setToastMessage('As senhas não coincidem!');
      setToastType('danger');
      setShowToast(true);
      return;
    }

    try {
      await createUser(name, email, password);
      setToastMessage('Usuário cadastrado com sucesso!');
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
        <div className="col-12 col-md-6 d-flex flex-column">
          <div className="text-center mt-5 mb-4 flex-grow-1">
            <Title className="title-login-signup" text={'Cadastro'} />
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
                type="text"
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon="person"
                name="name"
              />
            </div>
            <div className="mb-3">
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon="envelope"
                name="email"
                autoComplete="email"
              />
            </div>
            <div className="mb-3">
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon="lock"
                name="password"
                autoComplete="new-password"
              />
            </div>
            <div className="mb-3">
              <Input
                type="password"
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon="lock"
                name="confirm-password"
                autoComplete="new-password"
              />
            </div>
            <Button
              className="btn btn-primary w-100"
              type="submit"
              text="Cadastrar"
              showText={true}
            />
          </form>
          <div className="text-center mt-3">
            <p>Já tem uma conta? <a href="/">Faça login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
