import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CustomerList from '../../../components/CustomerList'

const CustomerListPage = () => {
    const navigator = useNavigate()
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
        if(!userInfo || !userInfo.isAdmin){
            navigator('/')
        }
    },)
    return (
        <Container>
        <Col >
          <CustomerList customers={users} />
        </Col>
      </Container>
    )
}

export default CustomerListPage
