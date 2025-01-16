import React from 'react';
import Button from './Button';

const ShoppingList = ({ lists, onToggleComplete, onEdit, onDelete, onShare, onAddList, onSelectList }) => {

  return (
    <div className="d-flex flex-column h-100">
      <ul className="list-group flex-grow-1 mb-3 overflow-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        {lists?.length > 0 ? (
          lists.map((list) => (
            <li
              key={list.list_id}
              className="list-group-item d-flex flex-column justify-content-between align-items-start border-0 shadow-sm rounded mb-2 p-3 bg-light-custom"
              onClick={() => onSelectList(list)}
            >
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-basket text-primary fs-6"></i>
                <span className="fw-semibold fs-9" style={{ lineHeight: '1.4' }}>
                  {list.list_name}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center gap-2 mt-2 w-100">
                <i
                  className={`bi ${list.completed_at
                    ? 'bi-check-circle-fill text-success'
                    : 'bi-check-circle text-muted'
                    } fs-6`}
                  onClick={() => onToggleComplete(list.list_id)}
                  role="button"
                />
                <i
                  className="bi bi-pencil-fill text-primary fs-6"
                  onClick={() => onEdit(list)}
                  role="button"
                />
                <i
                  className="bi bi-trash-fill text-danger fs-6"
                  onClick={() => onDelete(list.list_id)}
                  role="button"
                />
                <i
                  className="bi bi-share text-secondary fs-6"
                  onClick={() => onShare(list.list_id, list.list_name)}
                  role="button"
                />
              </div>
            </li>
          ))
        ) : (
          <p className="text-muted text-center">Nenhuma lista encontrada.</p>
        )}

      </ul>
      <div>
      <Button 
        className='btn btn-primary w-100' 
        icon={'plus'} onClick={onAddList}
        text="Adicionar Lista"
      />
      </div>
    </div>
  );
};

export default ShoppingList;
