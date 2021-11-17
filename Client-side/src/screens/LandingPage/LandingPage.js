import React, { useEffect, useState } from 'react'
import {  Button, Row, Col, Container } from 'react-bootstrap'
import './LandingPage.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../../components/ProductCard'
import { useSelector } from 'react-redux'

const LandingPage = () => {
    const navigator = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        const data = await axios.get('/product')
        setProducts(data['data']['products'])
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    useEffect(() =>{
        if(userInfo && userInfo.isAdmin === true){
            navigator('/admin')
        }
    },[navigator,userInfo])
    return (
        <>
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
            {/* <Row className="feature">
                <div className="center py-5">
                    <h1 className="pb-3 px-4">Learn more about us</h1>
                    <Link to='/'>
                        <Button variant='secondary' size='lg' className='Landingbutton'>About us</Button>
                    </Link>
                </div>
            </Row> */}
            {/* <Row className="feature">
                <div className="center py-5">
                    <h1 className="pb-3 px-4">Learn more about us</h1>
                    <Link to='/'>
                        <Button variant='secondary' size='lg' className='Landingbutton'>About us</Button>
                    </Link>
                </div>
            </Row> */}
            <Row>
                <Container className='my-5 ' >
                <h1 className="pb-3 px-4 center">Products list</h1>
                    <div className='product-list' >
                        {products.map((product) =>
                            <ProductCard product={product} key={product._id}/>
                        )}
                    </div>
                </Container>
            </Row>


        </>
    )
}

export default LandingPage
