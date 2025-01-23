// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CreateListForm from '../components/CreateListForm';
import EditListModal from '../components/EditModal';
import ShareModal from '../components/ShareModal';
import ConfirmModal from '../components/ConfirmModal';
import ToastNotification from '../components/ToastNotification';
import listService from '../services/listService';
import { getUserId } from '../services/authService';

const Home = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [listNameToEdit, setListNameToEdit] = useState('');
  const [listIdToEdit, setListIdToEdit] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareToken, setShareToken] = useState('');
  const [listToShare, setListToShare] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const getLists = async () => {
      try {
        const userId = getUserId();
        const data = await listService.getListsByUserId(userId);
        setLists(data);
      } catch (error) {
        console.error('Erro ao carregar listas', error);
      }
    };
    getLists();
  }, []);

  const showToastNotification = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleCreateList = async () => {
    try {
      if (newListName.trim() === '') {
        showToastNotification('O nome da lista não pode estar vazio.', 'danger');
        return;
      }
      const newList = await listService.createList(newListName);
      setLists([...lists, newList]);
      setNewListName('');
      setShowCreateForm(false);
      showToastNotification('Lista criada com sucesso!', 'success');
    } catch (error) {
      showToastNotification(`Erro ao criar lista: ${error}`, 'danger');
    }
  };

  const saveUpdatedListName = async (newListName) => {
    try {
      const updatedList = await listService.updateList(listIdToEdit, newListName);
      setLists(lists.map((list) =>
        list.listId === listIdToEdit ? { ...list, listName: updatedList.listName } : list
      ));
      showToastNotification('Lista editada com sucesso!', 'success');
    } catch (error) {
      showToastNotification(`Erro ao editar lista: ${error}`, 'danger');
    }
  };

  const handleEdit = (listId, listName) => {
    setListIdToEdit(listId);
    setListNameToEdit(listName);
    setShowEditModal(true);
  };

  const handleDelete = (listId) => {
    setListToDelete(listId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (listToDelete) {
        await listService.deleteList(listToDelete);
        setLists(lists.filter((list) => list.listId !== listToDelete));
        setListToDelete(null);
        showToastNotification('Lista excluída com sucesso!', 'success');
      }
    } catch (error) {
      showToastNotification(`Erro ao excluir lista: ${error}`, 'danger');
    }
  };

  const handleShare = async (listId) => {
    try {
      const list = lists.find((list) => list.listId === listId);
      const dataToken = await listService.generateShareToken(listId);
      setShareToken(dataToken.token);
      setListToShare(list.listName);
      setShowShareModal(true);
      showToastNotification('Token gerado com sucesso!', 'success');
    } catch (error) {
      showToastNotification('Erro ao gerar token de compartilhamento.', 'danger');
    }
  };

  const handleSelectList = (listId) => {
    setSelectedList(listId);
  };

  const markAsBought = async (listId) => {
    try {
        const totalAmount = 100; // Substitua pelo valor real do total da lista
        const result = await listService.markAsCompleted(listId, totalAmount);

        if (result.status) {
            setLists(lists.map((list) =>
                list.listId === listId
                    ? {
                          ...list,
                          completedAt: result.data.completedAt,
                          totalAmount: result.data.totalAmount,
                      }
                    : list
            ));
            showToastNotification('Lista marcada como concluída!', 'success');
        } else {
            showToastNotification('Não foi possível marcar a lista como concluída.', 'danger');
        }
    } catch (error) {
        console.error('Erro ao marcar a lista como concluída:', error.message);
        showToastNotification(`Erro: ${error.message}`, 'danger');
    }
};

  
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-3 mb-5 mb-lg-0">
            <Sidebar
              lists={lists}
              onSelectList={handleSelectList}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onShare={handleShare}
              onCreateNewList={() => setShowCreateForm(true)}
              onMarkAsBought={(listId) => markAsBought(listId)}
            />
          </div>

          <div className="col-lg-9">
            <div className="card bg-light-custom border-0">
              <div className="card-body text-center">
                {selectedList ? (
                  <p>Itens da lista {selectedList}:</p>
                ) : (
                  <p>Selecione uma lista para visualizar os itens.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateListForm
        show={showCreateForm}
        onClose={() => {
          setShowCreateForm(false);
          setNewListName('');
        }}
        onSubmit={handleCreateList}
        listName={newListName}
        setListName={setNewListName}
      />

      <EditListModal
        showModal={showEditModal}
        onClose={() => setShowEditModal(false)}
        listName={listNameToEdit}
        onSave={saveUpdatedListName}
      />

      <ShareModal
        showModal={showShareModal}
        onClose={() => setShowShareModal(false)}
        token={shareToken}
        listName={listToShare}
      />

      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        message="Você tem certeza de que deseja excluir esta lista?"
      />

      <ToastNotification
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default Home;
