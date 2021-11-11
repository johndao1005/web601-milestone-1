import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <div className="footer pt-5">
        <Container >
            <Row>
                <Col>
                <h3>Toy Shopy, Workshop Corp</h3>
                        <p>
                            3708 NW 82nd Street  Miami,<br/> Florida 33147 United States <br/> <br/>
                            <strong>Phone:</strong> <a href="tel:3056960419">305-696-0419</a><br/>
                            <strong>Email:</strong> <a href="mailto:toyshopy@hotmails.com">gatenfence@hotmails.com</a><br/>
                        </p>
                </Col>
                <Col>
                <ul style={{ listStyle: "none",fontSize:'1.1rem' }}>
                        <li className="py-2">
                            <h3>Menu</h3>
                        </li>
                        <li className="py-1">
                            <Link to='/'>
                                Home
                            </Link>
                        </li>
                        <li className="py-1">
                            <Link to='/about'>
                                About
                            </Link>
                        </li>
                    </ul>
                </Col>
                <Col>
                <ul style={{ listStyle: "none",fontSize:'1.1rem' }}>
                        <li className="py-2">
                            <h3>Category</h3>
                        </li>
                        <li className="py-1">
                            <Link to='/toy'>
                                Toy
                            </Link>
                        </li>
                        <li className="py-1">
                            <Link to='/workshop'>
                                Workshop
                            </Link>
                        </li>
                    </ul></Col>
            </Row>
            <Row>
                <Col className="text-center py-4">@Copryright 2021, Toy Shopy by John Dao</Col>
            </Row>
        </Container>
        </div>
    )
}

export default Footer
