import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Row } from 'react-bootstrap'
import './LandingPage.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

const LandingPage = () => {
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        const data = await axios.get('/product')
        console.log(data)
        setProducts(data['data'])
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="main">
            
                <Row> 
                    <div className="center hero pt-5 my-1">
                        <div>
                            <h1 className="title"> Welcome to Toy Shopy</h1>
                            <h4 className="subtitle py-1">We make toys for you</h4>
                        </div>
                        <div className="buttonContainer py-3">
                            {/* <a href="/login">
                                <Button size='lg' className='Landingbutton'>Login</Button>
                            </a> */}
                            <Link to='/category'>
                                <Button size='lg' className='Landingbutton' variant='primary'>Category</Button>
                                </Link>
                        </div>
                    </div>
                </Row>
                <Row>
                {products.map((product) =>
                <Card key={product._id}>
                    <Card.Header>
                        <span>{product.name}</span>
                        <div>
                            <Button href={`/product/${product._id}`}>Add to Cart</Button>
                            <Button href={`/product/${product._id}`}>Details</Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <h1>
                            <Badge>

                            </Badge>
                        </h1>
                        <blockquote className="blockquote mb-0">
                            <p>
                                {product.description}
                            </p>
                            {/* <footer className="blockquote-footer">
                                Created on - date
                            </footer> */}
                        </blockquote>
                    </Card.Body>
                </Card>
            )}
                </Row>
                <Row className="feature">
                    <div className="center py-5">
                        <h1 className="pb-3 ">Learn more about us</h1>
                        <Link to='/category'>
                                <Button variant='secondary' size='lg' className='Landingbutton'>About us</Button>
                                </Link>
                    </div>
                </Row>
            
        </div>
    )
}

export default LandingPage
