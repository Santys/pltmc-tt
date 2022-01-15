import './App.css';
import Login from './Pages/Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import Navigationbar from './components/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import { Container } from 'react-bootstrap';
import Settings from './Pages/Settings/Settings';

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <div className="App">
      {isLoggedIn && <Navigationbar />}
      <Container className="h-100">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
