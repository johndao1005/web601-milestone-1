import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import OrderList from '../../../components/OrderList'

const OrderListPage = () => {
    const [orders, setOrders] = useState([])
    const fetchOrders = async () => {
        const {data} = await axios.get('/order')
        console.log(data)
        setOrders(data)
    }
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    useEffect(() => {
        fetchOrders()
    }, [])
    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin){
            navigator('/')
        }
    }, [userInfo])
    return (
        <Container maxWidth={false}>
        <Col >
          <OrderList orders={orders} />
        </Col>
      </Container>
    )
}

export default OrderListPage
