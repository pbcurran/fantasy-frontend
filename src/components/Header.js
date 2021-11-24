import { Container, Navbar } from 'react-bootstrap';

import logo from '../images/fantasyLogo.png';

import './Header.css';

const Header = () => {
  return (
    <header>
      <Navbar className="navbar navbar-custom" expand="lg">
        <Container>
          <Navbar.Brand>
            <img alt="" src={logo} width="65" height="65" />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
