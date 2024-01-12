import Logo from "./header/Logo";
import Menus from "./header/Menus";
import Profile from "./header/Profile";
import { useSelector } from "react-redux";
import HeaderContainer from "./styles/Header.styled";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <HeaderContainer>
      <Navbar className="m-0" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Logo />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Menus userInfo={userInfo} />
            <Nav className="ms-auto">
              <Profile userInfo={userInfo} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </HeaderContainer>
  );
};

export default Header;
