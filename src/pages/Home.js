import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { formatTitleCase } from '../utils/functions';
import ToastNotification from '../components/ToastNotification';
import { createList, deleteList, getListsByUserId, markListAsCompleted, updateList } from '../services/shoppingListService';
import { generateToken } from '../services/shareListAndToken';
import ShareModal from '../components/ShareModal';
import EditModal from '../components/EditModal';

const Home = () => {
  const [lists, setLists] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [shareToken, setShareToken] = useState('');
  const [listName, setListName] = useState('');
  const [editingList, setEditingList] = useState(null);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
      fetchUserLists(userIdFromStorage);
    }
  }, [])

  const fetchUserLists = async (userId) => {
    try {
      const response = await getListsByUserId(userId);
      console.log(userId);
      
      setLists(response || []);
    } catch (error) {
      console.error('Erro ao buscar listas:', error.message);
    }
  };

  const handleCreateList = async () => {
    try {
      const response = await createList(userId, 'Nova Lista');
      setLists([...lists, response]);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleMarkAsCompleted = async (listId) => {
    try {
      await markListAsCompleted(listId);

      setLists((prevLists) =>
        prevLists.map((list) =>
          list.list_id === listId ? { ...list, completed_at: true } : list
        )
      );

      setToast({ show: true, message: 'Marcada com sucesso!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Erro ao marcar lista.', type: 'danger' });
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId);
      setLists((prevLists) => prevLists.filter((list) => list.list_id !== listId));
      setToast({ show: true, message: 'Lista excluída com sucesso', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Erro ao excluir a lista.', type: 'danger' });
    }
  };

  const handleUpdateList = async (listId, newName) => {
    try {
      const formattedName = formatTitleCase(newName);
      await updateList(listId, newName);
      setLists(lists.map((list) =>
        list.list_id === listId ? { ...list, list_name: formattedName } : list
      ));
      setToast({ show: true, message: 'Nome da lista atualizado com sucesso!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Erro ao atualizar o nome da lista.', type: 'danger' });
    }
  };

  const handleShareClick = async (listId, name) => {
    try {
      const tokenData = await generateToken(listId, userId);
      const token = tokenData.data.token;
      console.log(token);

      setShareToken(token);
      setListName(name);
      setShowModal(true);
    } catch (error) {
      setToast({ show: true, message: 'Erro ao gerar o token.', type: 'danger' });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Header />
      <div className="container-fluid p-0">
        <div className="row min-vh-100 p-3">
          <div className="col-3 ">
            <Sidebar
              lists={lists}
              onToggleComplete={handleMarkAsCompleted}
              onEdit={(list) => setEditingList(list)}
              onDelete={handleDeleteList}
              onShare={handleShareClick}
              onAddList={handleCreateList}
            />

            <ShareModal showModal={showModal} onClose={handleCloseModal} token={shareToken} listName={listName} />
            {editingList && (
              <EditModal
                list={editingList}
                onClose={() => setEditingList(null)}
                onSave={(listId, newName) => {
                  handleUpdateList(listId, newName);
                  setEditingList(null);
                }}
              />
            )}
          </div>
          <div className="col-9">
            
          </div>
        </div>
      </div>
      <ToastNotification
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

    </div>
  );
};

export default Home;
