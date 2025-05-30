import React from 'react';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
    </div>
  );
};

export default Loading;
