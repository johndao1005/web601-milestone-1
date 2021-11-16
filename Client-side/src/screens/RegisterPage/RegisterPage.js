import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link , useNavigate } from 'react-router-dom'
import Message from '../../components/Message'
import Loading from '../../components/Loading'
import './RegisterPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'

const RegisterPage = () => {
    const navigator = useNavigate()
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    // const { loading, error, userInfo } = userRegister;

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister)
    const {loading, error, userInfo} = userRegister
    
    useEffect(() =>{
        if(userInfo){
            navigator('/')
        }
    },[navigator,userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Password do not match")
        } else {
            dispatch(register(name,email,password))
        }
    }

    return (
        <Container className="py-4 registerContainer">
            <h1>Register</h1>
            {error && <Message variant="danger">{error}</Message>}
            {message && <Message variant="danger">{message}</Message>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        value={name}
                        placeholder="Enter Name"
                        onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder="Enter Your Email"
                        onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {/* {picMessage && (<Message variant="danger">{picMessage}</Message>)} */}
                {/* <Form.Group controlId="pic">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.File
                        onChange={(e) => postDetails(e.target.files[0])}
                        id="custom-file"
                        type="img/png"
                        label="Upload Profile Picture"
                        custom
                    >
                    </Form.File>
                </Form.Group> */}
                <Button className="my-3"variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <Row>
                <Col>Have an Account? <Link to='/login'>Login</Link></Col>
            </Row>

        </Container>
    )
}
export default RegisterPage
