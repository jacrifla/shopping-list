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
      <div className="position-fixed top-0 start-0 m-3 z-5 d-block d-lg-none shadow-sm">
        <Button
          className="btn btn-primary d-flex justify-content-center align-items-center sidebar-toggle-btn"
          onClick={toggleSidebar}
          icon={`${isSidebarVisible ? 'x-lg' : 'list'} fs-4`}
        />
      </div>

      {/* Sidebar com animação para telas pequenas e fixa para telas grandes */}
      <div
        className={`bg-white rounded-3 p-3 sidebar ${isSidebarVisible ? 'd-block' : ''} d-lg-block`}
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
