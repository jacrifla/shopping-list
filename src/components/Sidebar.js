import React, { useState } from 'react';
import ShoppingList from './ShoppingList';
import ShareModal from './ShareModal';
import EditModal from './EditModal';

const Sidebar = ({ lists, onToggleComplete, onEdit, onDelete, onShare, onAddList }) => {
  const [showModal, setShowModal] = useState(false);
  const [shareToken, setShareToken] = useState('');
  const [listName, setListName] = useState('');
  const [editingList, setEditingList] = useState(null);

  const handleShareClick = (listId, name) => {
    const token = `LIST-TOKEN-${listId}-${Date.now()}`;
    setShareToken(token);
    setListName(name);
    setShowModal(true);
    onShare(listId);
  };

  const handleEditClick = (list) => {
    setEditingList(list);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-header border-bottom-0 pb-3 bg-white">
        <h3 className="mb-0 d-flex align-items-center fs-6">
          <i className="bi bi-list-task me-2 fs-5"></i>
          Minhas Listas
        </h3>
      </div>
      <div className="card-body bg-white">
        <ShoppingList
          lists={lists}
          onToggleComplete={onToggleComplete}
          onEdit={handleEditClick}
          onDelete={onDelete}
          onShare={handleShareClick}
          onAddList={onAddList}
        />
      </div>
      
      {/* Modals */}
      <ShareModal showModal={showModal} onClose={handleCloseModal} token={shareToken} listName={listName} />
      {editingList && (
        <EditModal
          list={editingList}
          onClose={() => setEditingList(null)}
          onSave={(listId, newName) => {
            onEdit(listId, newName);
            setEditingList(null);
          }}
        />
      )}
    </div>
  );
};

export default Sidebar;
