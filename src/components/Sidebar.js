import React, { useState } from 'react';
import ListCard from './ListCard';
import Subtitle from './Subtitle';
import Button from './Button';

const Sidebar = ({ lists, onSelectList, onEdit, onDelete, onShare, onCreateNewList, onMarkAsBought }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Função para alternar a visibilidade da Sidebar
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSelectList = (listId) => {
    // Fechar a sidebar ao selecionar uma lista
    setIsSidebarVisible(false);
    // Chama a função original onSelectList
    onSelectList(listId);
  };

  return (
    <div>
      {/* Botão circular para alternar a visibilidade da Sidebar no canto superior esquerdo */}
      <div className="position-fixed top-0 start-0 m-3 z-5 d-block d-lg-none">
        <Button 
          className="btn btn-primary d-flex justify-content-center align-items-center"
          onClick={toggleSidebar}
          icon={`${isSidebarVisible ? 'x-lg' : 'list'} fs-4`}
          style={{
            width: '3em',
            height: '3em',
            zIndex: 1050,
          }}
        />
      </div>

      {/* Sidebar com animação para telas pequenas e fixa para telas grandes */}
      <div
        className={`bg-white rounded-3 p-3 position-fixed ${
          isSidebarVisible ? 'd-block' : 'd-none'
        } d-lg-block`} // Aqui garantimos que, em telas grandes, a sidebar é sempre visível
        style={{
          overflowY: 'auto',
          maxHeight: '100vh',
          width: '250px',
          zIndex: 1049, // Sidebar abaixo do botão de fechar
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)', // Opcional: sombra para destacar a sidebar
          transition: 'transform 0.3s ease', // Animação de deslizamento
          top: '4em', // Ajustando para ficar mais para baixo
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          {/* Título "Minhas Listas" */}
          <Subtitle icon={'list'} text={'Minhas Listas'} />
          {/* Botão de adicionar lista */}
          <Button
            className="btn btn-primary"
            onClick={onCreateNewList}
            icon={'plus-lg'}
            style={{
              fontSize: '1.5em',
            }}
          />
        </div>

        <div className="d-flex flex-column align-items-stretch gap-3 mt-3">
          {/* Exibindo as listas */}
          {lists.length > 0 ? (
            lists.map((list) => (
              <ListCard
                key={list.listId}
                listName={list.listName}
                createdAt={list.createdAt}
                completedAt={list.completedAt}
                onClick={() => handleSelectList(list.listId)}
                onEdit={() => onEdit(list.listId, list.listName)}
                onDelete={() => onDelete(list.listId)}
                onShare={() => onShare(list.listId)}
                onMarkAsBought={() => onMarkAsBought(list.listId)}
              />
            ))
          ) : (
            <p>Nenhuma lista encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
