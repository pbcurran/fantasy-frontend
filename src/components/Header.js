import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './Header.css';

const Header = () => {
  return (
    <header>
      <Navbar className="navbar navbar-custom" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Quest For The Belt</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
