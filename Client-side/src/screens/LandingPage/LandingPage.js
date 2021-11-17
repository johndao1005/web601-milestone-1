import React, { useEffect, useState } from 'react'
import {  Button, Row, Col, Container } from 'react-bootstrap'
import './LandingPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../../components/ProductCard'

const LandingPage = () => {
    // useEffect(() =>{
    //     const userInfo = localStorage.getItem('userInfo')
    //     if (userInfo){
    //         history.push('/cart')
    //     }
    // },[history])

    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        const data = await axios.get('/product')
        console.log(data)
        setProducts(data['data']['products'])
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div>
            <Row>
                <Col>
                    <div className="center hero pt-5 py-1">
                        <div>
                            <h1 className="title"> Welcome to Toy Shopy</h1>
                            <h4 className="subtitle py-1">We got you covered</h4>
                        </div>
                        <div className="buttonContainer py-3">
                            <Link to='/'>
                                <Button size='lg' className='Landingbutton' variant='primary'>Category</Button>
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="p-0 m-0">
                <Container className='py-5 ' >
                <h1 className="pb-3 px-4 center">Products list</h1>
                    <div className='product-list' >
                        {products.map((product) =>
                            <ProductCard product={product} key={product._id}/>
                        )}
                    </div>
                </Container>
            </Row>


        </div>
    )
}

export default LandingPage
