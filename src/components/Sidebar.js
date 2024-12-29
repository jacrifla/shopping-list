import React, { useState } from 'react';
import ShoppingList from './ShoppingList';
import ShareModal from './ShareModal';

const Sidebar = ({ lists, onToggleComplete, onEdit, onDelete, onShare, onAddList }) => {
  const [showModal, setShowModal] = useState(false);
  const [shareToken, setShareToken] = useState('');
  const [listName, setListName] = useState('');

  const handleShareClick = (listId, name) => {
    const token = `LIST-TOKEN-${listId}-${Date.now()}`;
    setShareToken(token);
    setListName(name);
    setShowModal(true);
    onShare(listId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-header border-bottom-0 pb-3 bg-light">
        <h3 className="mb-0 d-flex align-items-center fs-6">
          <i className="bi bi-list-task me-2 fs-5"></i>
          Minhas Listas
        </h3>
      </div>
      <div className="card-body bg-light">
        <ShoppingList
          lists={lists}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          onShare={handleShareClick}
          onAddList={onAddList}
        />
      </div>
      {/* Modal de Compartilhamento */}
      <ShareModal showModal={showModal} onClose={handleCloseModal} token={shareToken} listName={listName} />
    </div>
  );
};

export default Sidebar;
