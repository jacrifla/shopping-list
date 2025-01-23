import React from 'react';
import { Link } from 'react-router-dom';
import Title from './Title';

const Header = () => {
  return (
    <>
      {/* Header para telas grandes */}
      <header className="bg-primary text-white py-3 d-none d-sm-block">
        <div className="container d-flex justify-content-between align-items-center">
          <Title className="fs-4" text={'Lista da Mamãe'} />
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link to="/home" className="nav-link text-white">
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

      {/* Barra inferior para telas pequenas */}
      <nav className="bg-primary text-white py-2 d-sm-none fixed-bottom">
        <ul className="nav justify-content-around">
          <li className="nav-item">
            <Link to="/home" className="nav-link text-white text-center">
              <i className="bi bi-house-door-fill"></i>
              <span className="d-block small">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link text-white text-center">
              <i className="bi bi-person-fill"></i>
              <span className="d-block small">Perfil</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/metrics" className="nav-link text-white text-center">
              <i className="bi bi-graph-up"></i>
              <span className="d-block small">Métricas</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/items" className="nav-link text-white text-center">
              <i className="bi bi-box"></i>
              <span className="d-block small">Itens</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
