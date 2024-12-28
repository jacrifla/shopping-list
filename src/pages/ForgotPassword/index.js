import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Title from '../../components/Title';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      setError('Por favor, preencha todos os campos!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    console.log(`E-mail: ${email}, Nova Senha: ${newPassword}`);

    // Aqui você pode adicionar a lógica de recuperação de senha

    navigate('/login'); // Após recuperar a senha, redireciona para a tela de login
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6">
          <div className="text-center mt-5 mb-4">
            <Title icon="key" className="title-login-signup">Recuperar Senha</Title>
          </div>
          {error && <div className="alert alert-danger text-center">{error}</div>}
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
            <Button className="btn btn-primary w-100" type="submit">
              Recuperar Senha
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
