import React from 'react';
import { Link } from 'react-router-dom';
import Title from './Title';

const Header = () => {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Title>Lista da Mamãe</Title>
        
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                <i className="bi bi-house-door-fill me-2"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link text-white">
                <i className="bi bi-person-fill me-2"></i>
                Perfil
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/metrics" className="nav-link text-white">
                <i className="bi bi-graph-up me-2"></i>
                Métricas
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/items" className="nav-link text-white">
                <i className="bi bi-box me-2"></i>
                Itens
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
