import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAppSelector } from './app/hooks';
import Navigationbar from './components/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Settings from './Pages/Settings/Settings';
import * as PATHS from './utils/paths';

function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="App">
      {isLoggedIn && <Navigationbar />}
      <Container className="h-100">
        <Routes>
          <Route path={PATHS.HOMEPAGE} element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
          <Route path={PATHS.DASHBOARDPAGE} element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path={PATHS.SETIINGSPAGE} element={isLoggedIn ? <Settings /> : <Navigate to="/login" replace />} />
          <Route path={PATHS.LOGINPAGE} element={<Login />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
