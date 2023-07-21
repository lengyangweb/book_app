import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useSignOutMutation } from '../slices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signOut, { isLoading }] = useSignOutMutation();

  const logoutUser = async () => {
    try {
        const res = await signOut({}).unwrap();

        // if user logout successfully
        if (res && res.hasOwnProperty('message')) {
            dispatch(logout());
            navigate('/');
        }
        
    } catch (err) {
        console.error(err || err?.error);
    }
  }

  return (  
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect >
            <Container>
                <LinkContainer to='/home'>
                    <Navbar.Brand>BMS</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <>
                            <NavDropdown title={ userInfo.name } id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutUser}>
                                    <div className="d-flex align-items-center">
                                        <span>Logout</span>
                                        <FaSignOutAlt />
                                    </div>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    </Nav> 
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header