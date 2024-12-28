import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos!');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    console.log(`Nome: ${name}, Email: ${email}, Senha: ${password}`);

    navigate('/');
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6 d-flex flex-column">
          <div className="text-center mt-5 mb-4 flex-grow-1">
            <Title className="title-login-signup">Cadastro</Title>
          </div>
          {error && <div className="alert alert-danger text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <Input
                type="text"
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon="person"
              />
            </div>
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
              Cadastrar
            </Button>
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
