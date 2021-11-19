import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import OrderList from '../../../components/OrderList'

const OrderListPage = () => {
    const navigator = useNavigate()
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        const { data } = await axios.get('/order')
        console.log(data)
        setOrders(data)
    }
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    useEffect(() => {
        fetchOrders()
        if (!userInfo || !userInfo.isAdmin) {
            navigator('/')
        }
    },[])
    return (
        <Container>
            <Col >
                <OrderList orders={orders} />
            </Col>
        </Container>
    )
}

export default OrderListPage
