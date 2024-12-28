import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import MainContent from '../../components/MainContent';
import Header from '../../components/Header';

const Home = () => {
  const [lists, setLists] = useState([
    { id: 1, name: 'Lista de Compras 1', completed: false },
    { id: 2, name: 'Lista de Compras 2', completed: true },
  ]);

  const handleAddList = () => {
    const newList = { id: lists.length + 1, name: `Nova Lista ${lists.length + 1}`, completed: false };
    setLists([...lists, newList]);
  };


  const handleEdit = (id) => {
    console.log(`Editar lista com id: ${id}`);
  };

  const handleDelete = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  const handleToggleComplete = (id) => {
    setLists(
      lists.map((list) =>
        list.id === id ? { ...list, completed: !list.completed } : list
      )
    );
  };

  const handleShare = (id) => {
    console.log(`Compartilhar lista com id: ${id}`);
  };

  return (
    <div>
      <Header />
      <div className="container-fluid p-0">
        <div className="row min-vh-100 p-3">

          <div className="col-3 ">
            <Sidebar
              lists={lists}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onShare={handleShare}
              onAddList={handleAddList}
            />
          </div>

          <div className="col-9 ">
            <MainContent />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
