import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProductList from '../../../components/ProductList'

const ProductListPage = () => {
    localStorage.setItem('userInfo','isAdmin',true)

    const navigator = useNavigate()
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        const {data} = await axios.get('/product')
        console.log(data)
        setProducts(data.products)
    }
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    useEffect(() => {
        fetchProducts()
    }, [])
    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin){
            navigator('/')
        }
    }, [userInfo])
    return (
        <Container maxWidth={false}>
        <Col >
          <ProductList products={products} />
        </Col>
      </Container>
    )
}

export default ProductListPage
