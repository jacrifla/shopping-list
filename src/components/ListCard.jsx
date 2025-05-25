import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Subtitle from './Subtitle';

const ListCard = ({ listName, createdAt, completedAt, onClick, onMarkAsBought, onEdit, onDelete, onShare }) => {
    // Formatar datas
    const formattedCreatedDate = new Date(createdAt).toLocaleDateString();
    const formattedCompletedDate = completedAt ? new Date(completedAt).toLocaleDateString() : null;

    return (
        <div
            className={`card mb-3 shadow-sm border-0 ${completedAt ? 'bg-light text-muted' : 'bg-light-custom'}`}
        >
            <div className="card-body" onClick={onClick}>
                {/* Ícone, Nome da Lista e Data */}
                <div className="mb-3 text-start">
                    <div className="d-flex align-items-center">
                        <Subtitle
                            icon={completedAt ? 'check-circle-fill' : 'cart-fill'}
                            text={listName}
                        />
                    </div>
                    <p className="text-muted fs-8 mb-0 mt-1">
                        {completedAt
                            ? `Concluída: ${formattedCompletedDate}`
                            : `Criada: ${formattedCreatedDate}`}
                    </p>
                </div>

                {/* Botões de Ações */}
                <div className="d-flex justify-content-around">
                    {!completedAt && (
                        <Button
                            className="btn btn-outline-success btn-sm fs-6"
                            text={'Marcar como comprada'}
                            icon={'cart-check-fill'}
                            onClick={onMarkAsBought}
                        />
                    )}
                    <Button
                        className="btn btn-outline-warning btn-sm fs-6"
                        text={'Editar lista'}
                        icon={'pencil-square'}
                        onClick={onEdit}
                    />
                    <Button
                        className="btn btn-outline-danger btn-sm fs-6"
                        text={'Deletar lista'}
                        icon={'trash-fill'}
                        onClick={onDelete}
                    />
                    <Button
                        className="btn btn-outline-accent btn-sm fs-6"
                        text={'Compartilhar lista'}
                        icon={'share-fill'}
                        onClick={onShare}
                    />
                </div>
            </div>
        </div>
    );
};

ListCard.propTypes = {
    listName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    completedAt: PropTypes.string, // Campo opcional
    onMarkAsBought: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
};

export default ListCard;
