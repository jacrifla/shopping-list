import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/userService';
import { saveAuthToken } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const response = await login(email, password);

      saveAuthToken(response.token, response.user)
      
      navigate('/home');

    } catch (error) {
      setError(error.message || 'Erro ao fazer login');
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
          <div className="text-center mt-5 mb-4 flex-grow-1">
            <Title className="title-login-signup">Fazer Login</Title>
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
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon="lock"
              />
            </div>
            <Button className="btn btn-primary w-100" type="submit">
              Entrar
            </Button>
          </form>
          <div className="text-center mt-3">
            <p>
              Ainda não tem uma conta?{' '}
              <a href="/signup">Cadastre-se</a>
            </p>
            <p>
              <a href="/forgot-password">Esqueceu sua senha?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
