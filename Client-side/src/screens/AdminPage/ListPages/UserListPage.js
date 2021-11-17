import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import CustomerList from '../../../components/CustomerList'

const CustomerListPage = () => {
    const [users, setUsers] = useState([])
    const fetchUsers = async () => {
        const {data} = await axios.get('/user')
        console.log(data)
        setUsers(data)
    }
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    useEffect(() => {
        fetchUsers()
    }, [])
    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin){
            navigator('/')
        }
    }, [userInfo])
    return (
        <Container maxWidth={false}>
        <Col >
          <CustomerList customers={users} />
        </Col>
      </Container>
    )
}

export default CustomerListPage
