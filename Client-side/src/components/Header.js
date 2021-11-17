import React from 'react'
import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    // Form,
    // FormControl
    // Button
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions';

const Header = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout())
        history("/", { replace: true })
    }

    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container>
                <Link to='/'>
                    <Navbar.Brand>Toy Shopy</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        {/* <Form >
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                    </Nav>
                    <Nav className="me-auto">

                        {(!userInfo || userInfo.isAdmin === false) && (<Nav.Link >
                            <Link to='/'>
                                Home
                            </Link>
                        </Nav.Link>)}

                        {userInfo ? userInfo.isAdmin ? (<NavDropdown title='Admin Control' id='adminmenu'>

                            <NavDropdown.Item href='/admin/user'>Users</NavDropdown.Item>
                            <NavDropdown.Item href='/admin/product'>Products</NavDropdown.Item>
                            <NavDropdown.Item href='/admin/order'>Orders</NavDropdown.Item>

                            <NavDropdown.Item onClick={() => {
                                logoutHandler()
                            }}>Logout</NavDropdown.Item>
                        </NavDropdown>) :
                            (<NavDropdown className="" title={userInfo.name} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/profile">Details</NavDropdown.Item>
                                <NavDropdown.Item href="/cart">Cart</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => {
                                    logoutHandler()
                                }}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            ) : (<Nav.Link>
                                <Link to='/login'>
                                    Login
                                </Link>
                            </Nav.Link>)}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
