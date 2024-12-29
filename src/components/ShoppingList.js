import React from 'react';
import Button from './Button';

const ShoppingList = ({ lists, onToggleComplete, onEdit, onDelete, onShare, onAddList }) => {
  return (
    <div className="d-flex flex-column h-100">
      <ul className="list-group flex-grow-1 mb-3">
        {lists.map((list) => (
          <li
            key={list.id}
            className="list-group-item d-flex flex-column justify-content-between align-items-start border-0 shadow-sm rounded mb-2 p-3 bg-light-custom"
          >
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-basket text-primary fs-6"></i>
              <span className="fw-semibold fs-9" style={{ lineHeight: '1.4' }}>
                {list.name}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center gap-2 mt-2 w-100">
              <i
                className={`bi ${list.completed ? 'bi-check-circle-fill text-success' : 'bi-check-circle text-muted'} fs-6`}
                onClick={() => onToggleComplete(list.id)}
                role="button"
              />
              <i
                className="bi bi-pencil text-primary fs-6"
                onClick={() => onEdit(list.id)}
                role="button"
              />
              <i
                className="bi bi-trash text-danger fs-6"
                onClick={() => onDelete(list.id)}
                role="button"
              />
              <i
                className="bi bi-share text-secondary fs-6"
                onClick={() => onShare(list.id, list.name)}
                role="button"
              />
            </div>
          </li>
        ))}
      </ul>
      <div>
        <Button className="btn btn-primary w-100 fw-bold" onClick={onAddList}>
          + Adicionar Lista
        </Button>
      </div>
    </div>
  );
};

export default ShoppingList;
