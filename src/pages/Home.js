import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ListCard from '../components/ListCard';
import Subtitle from '../components/Subtitle';
import ConfirmModal from '../components/ConfirmModal';
import CreateListForm from '../components/CreateListForm';
import ShareModal from '../components/ShareModal';
import listService from '../services/listService';
import { getUserId } from '../services/authService';
import Button from '../components/Button';
import ToastNotification from '../components/ToastNotification';
import EditListModal from '../components/EditModal';

const Home = () => {
  const [lists, setLists] = useState([]);
  const [showLists, setShowLists] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [listToDelete, setListToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareToken, setShareToken] = useState('');
  const [listToShare, setListToShare] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showToast, setShowToast] = useState(false);
  const [listNameToEdit, setListNameToEdit] = useState('');
  const [listIdToEdit, setListIdToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);


  const showToastNotification = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

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

  const toggleLists = () => setShowLists(!showLists);

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

  const onMarkAsBought = (itemId) => {
    console.log(`Marcar item ${itemId} como comprado`);
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-3">
            <button
              className="btn btn-secondary w-100 d-lg-none mb-3"
              onClick={toggleLists}
            >
              {showLists ? 'Esconder Listas' : 'Mostrar Listas'}
            </button>
            <div className={`d-lg-block ${showLists ? '' : 'd-none'} bg-white rounded-3 p-3`} style={{ overflowY: 'auto', maxHeight: '100vh' }}>
              <div className="d-flex flex-column align-items-stretch gap-3">
                <Subtitle icon={'list'} text={'Minhas Listas'} />
                {lists.length > 0 ? (
                  lists.map((list) => (
                    <ListCard
                      key={list.listId}
                      listName={list.listName}
                      createdAt={list.createdAt}
                      onClick={() => handleSelectList(list.listId)}
                      onMarkAsBought={onMarkAsBought}
                      onEdit={() => handleEdit(list.listId, list.listName)}  // Passa o id e nome da lista
                      onDelete={() => handleDelete(list.listId)}
                      onShare={() => handleShare(list.listId)}
                    />
                  ))
                ) : (
                  <p>Nenhuma lista encontrada.</p>
                )}
              </div>
              <div className="text-center mt-4">
                <Button
                  className="btn btn-primary w-100"
                  onClick={() => setShowCreateForm(true)}
                  icon={'plus-lg'}
                  text={'Criar Nova Lista'}
                  showText={true}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className='card bg-light-custom border-0'>
              <div className='card-body text-center'>
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

      {/* Formulário para criar lista */}
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

      {/* Modal de Compartilhamento */}
      <ShareModal
        showModal={showShareModal}
        onClose={() => setShowShareModal(false)}
        token={shareToken}
        listName={listToShare}
      />

      {/* Modal de Confirmação */}
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        message="Você tem certeza de que deseja excluir esta lista?"
      />
      {/* Toast Notification */}
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
