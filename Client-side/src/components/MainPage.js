import React from 'react'
import {Container, Row} from 'react-bootstrap'
import './MainPage.css' 
const MainPage = ({title, children}) => {
    return (
        <Container>
            <Row>
                <div className="page">
                    {title && (<>
                    <h1 className='heading'>
                        {title}
                        </h1>
                        <hr/>
                        </>)}
                    {children}
                </div>
            </Row>
        </Container>
    )
}

export default MainPage
