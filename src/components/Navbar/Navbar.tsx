import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import iconNavbar from '../../assets/img/icon.png';

const Navigationbar = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand as={Link} to="">
          <Image style={{ width: '5vh' }} src={iconNavbar} />
        </Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to="/dashboard">
            <i className="bi bi-easel fs-3 align-middle"></i>
            <span className="fs-5 align-middle"> Dashboard</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/settings">
            <i className="bi bi-gear-fill fs-3 align-middle"></i>
            <span className="fs-5 align-middle"> Settings</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
