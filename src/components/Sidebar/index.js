import React from 'react';
import ShoppingList from '../../components/ShoppingList';

const Sidebar = ({ lists, onToggleComplete, onEdit, onDelete, onShare, onAddList }) => {
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
          onShare={onShare}
          onAddList={onAddList}
        />
      </div>
    </div>
  );
};

export default Sidebar;
