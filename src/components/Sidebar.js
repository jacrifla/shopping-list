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

  return (
    <div>
      {/* Botão para alternar a visibilidade da Sidebar em telas pequenas */}
      <div className="position-fixed top-0 start-50 translate-middle-x w-50 mt-4 z-5 d-block d-lg-none">
        <button
          className="btn btn-primary w-100"
          onClick={toggleSidebar}
        >
          {isSidebarVisible ? 'Esconder Listas' : 'Mostrar Listas'}
        </button>
      </div>

      {/* Sidebar com classe condicional */}
      <div
        className={`d-lg-block bg-white rounded-3 p-3 ${isSidebarVisible ? '' : 'd-none'}`}
        style={{ overflowY: 'auto', maxHeight: '100vh' }}
      >
        <div className="d-flex flex-column align-items-stretch gap-3" style={{ marginTop: '60px' }}>
          {/* Título "Minhas Listas" com espaçamento */}
          <Subtitle icon={'list'} text={'Minhas Listas'} />
          {lists.length > 0 ? (
            lists.map((list) => (
              <ListCard
                key={list.listId}
                listName={list.listName}
                createdAt={list.createdAt}
                completedAt={list.completedAt}
                onClick={() => onSelectList(list.listId)}
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
        <div className="text-center mt-4">
          <Button
            className="btn btn-primary w-100"
            onClick={onCreateNewList}
            icon={'plus-lg'}
            text={'Criar Nova Lista'}
            showText={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;