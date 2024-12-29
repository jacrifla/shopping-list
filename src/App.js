import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Items from './pages/Items';
import Metrics from './pages/Metrics';
import PrivateRoute from './components/PrivateRoute';  // Importando o componente PrivateRoute
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          {/* Rotas que precisam que o usuário esteja conectado */}
          <Route path='/profile' element={<PrivateRoute element={<Profile />} />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/items" element={<PrivateRoute element={<Items />} />} />
          <Route path="/metrics" element={<PrivateRoute element={<Metrics />} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
