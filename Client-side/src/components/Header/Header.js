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
import { Link } from 'react-router-dom'

const Header = () => {
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

                        <Nav.Link >
                            <Link to='/'>
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to='/'>
                                About
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                        <Link to='/category'>
                        Category
                            </Link>
                        </Nav.Link>
                        {/* <Nav.Link>
                        <Link to='/'>
                            Profile
                            </Link>
                        </Nav.Link> */}
                        <NavDropdown className="" title="Profile" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Details</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Cart</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
