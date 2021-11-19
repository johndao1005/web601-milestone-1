import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import ProductList from '../../../components/ProductList'

const ProductListPage = () => {
    const navigator = useNavigate()
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        const { data } = await axios.get('/product')
        console.log(data)
        setProducts(data.products)
    }
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    useEffect(() => {
        fetchProducts()
        if (!userInfo || !userInfo.isAdmin) {
            navigator('/')
        }
    })
    return (
        <Container >
            <Row className="my-3"> 
                <Col ><h1>Product List</h1>
                <Row>
                
                <Link className="mx-2 p-2" to={`/admin/product/create`}>
                        <Button className="btn-wrap" style={{ right: '0' }} >
                            <i className="bi bi-plus" id="cart" /></Button>
                    </Link>
                    <h5 className="mt-3">Add new product</h5>
                </Row>
                    
                </Col>
            </Row>
            <Row >
                <ProductList products={products} />
            </Row>
        </Container>
    )
}

export default ProductListPage
