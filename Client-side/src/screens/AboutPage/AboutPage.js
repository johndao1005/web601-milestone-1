import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'

const AboutPage = () => {
    return (
        <div className="main">
            <Container>
                <Row> 
                    <div className="intro-text">
                        <div>
                            <h1 className="title"> Welcome to my store</h1>
                            <p className="subtitle">Get your zap here</p>
                        </div>
                        <div className="buttonContainer">
                            <a href="/login">
                                <Button size='lg' className='Landingbutton'>Login</Button>
                            </a>
                            <a href="/register">
                                <Button size='lg' className='Landingbutton'variant='outline-primary'>Register</Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default AboutPage
