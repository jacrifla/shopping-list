import React from 'react';
import { Link } from 'react-router-dom';
import Title from './Title';

// Array com os itens do menu
const menuItems = [
  { to: '/home', icon: 'bi-house-door-fill', text: 'Home' },
  { to: '/profile', icon: 'bi-person-fill', text: 'Perfil' },
  { to: '/metrics', icon: 'bi-graph-up', text: 'Métricas' },
  { to: '/items', icon: 'bi-box', text: 'Itens' },
];

// Componente reutilizável para os itens do menu
const MenuItem = ({ to, icon, text, isMobile }) => {
  return (
    <li className="nav-item">
      <Link to={to} className={`nav-link text-white ${isMobile ? 'text-center' : ''}`}>
        <i className={`bi ${icon} ${isMobile ? '' : 'me-2'}`}></i>
        {isMobile && <span className="d-block small">{text}</span>}
        {!isMobile && text}
      </Link>
    </li>
  );
};

const Header = () => {
  return (
    <>
      {/* Header para telas grandes */}
      <header className="bg-primary text-white py-3 d-none d-lg-block">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Título clicável */}
          <Link to="/home" className="text-decoration-none text-white">
            <Title className="fs-4" text={'Lista da Mamãe'} />
          </Link>
          <nav>
            <ul className="nav">
              {menuItems.map((item, index) => (
                <MenuItem key={index} {...item} />
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Barra inferior para telas pequenas e médias */}
      <nav className="bg-primary text-white py-2 d-lg-none fixed-bottom">
        <ul className="nav justify-content-around">
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} isMobile />
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Header;