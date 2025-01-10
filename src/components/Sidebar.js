import React from 'react';
import ShoppingList from './ShoppingList';

const Sidebar = ({ lists, onToggleComplete, onEdit, onDelete, onShare, onAddList, onSelectList }) => {
  return (
    <div className="card shadow-sm border-0 h-100 rounded">
      <div className="card-header border-bottom-0 pb-3 bg-white">
        <h3 className="mb-0 d-flex align-items-center fs-6">
          <i className="bi bi-list-task me-2 fs-5"></i>
          Minhas Listas
        </h3>
      </div>
      <div className="card-body bg-white rounded">
        <ShoppingList
          lists={lists}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          onShare={onShare}
          onAddList={onAddList}
          onSelectList={onSelectList}
        />
      </div>
    </div>
  );
};

export default Sidebar;