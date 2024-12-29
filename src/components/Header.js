import React from 'react';
import { Link } from 'react-router-dom';
import Title from './Title';

const Header = () => {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container d-flex justify-content-between align-items-center flex-sm-nowrap">
        <Title className="fs-4 fs-sm-1">Lista da Mamãe</Title>
        
        <nav>
          <ul className="nav flex-sm-nowrap">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                <i className="bi bi-house-door-fill me-2 me-sm-3"></i> {/* Alteração aqui */}
                <span className="d-none d-sm-inline">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link text-white">
                <i className="bi bi-person-fill me-2 me-sm-3"></i> {/* Alteração aqui */}
                <span className="d-none d-sm-inline">Perfil</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/metrics" className="nav-link text-white">
                <i className="bi bi-graph-up me-2 me-sm-3"></i> {/* Alteração aqui */}
                <span className="d-none d-sm-inline">Métricas</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/items" className="nav-link text-white">
                <i className="bi bi-box me-2 me-sm-3"></i> {/* Alteração aqui */}
                <span className="d-none d-sm-inline">Itens</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
