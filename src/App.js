import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Items from './pages/Items';
import Metrics from './pages/Metrics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        {/* Rotas que precisam que o usuario esteja conectado */}
        <Route path='/profile' element={<Profile />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/items" element={<Items />}/>
        <Route path="/metrics" element={<Metrics />}/>
      </Routes>
    </Router>
  );
}

export default App;
