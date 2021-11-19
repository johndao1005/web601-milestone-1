import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link , useNavigate} from 'react-router-dom'
import Message from '../../components/Message'
import Loading from '../../components/Loading'
import './LoginPage.css'
import { login } from '../../actions/userActions'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector((state)=>state.userLogin)
    let navigator = useNavigate()
    const {loading,error, userInfo} = userLogin


    useEffect(() =>{
        if (userInfo){
            if(userInfo.isAdmin === true){
                navigator('/admin',{replace:true})
            } else{
            navigator('/',{replace:true})}
        }
    },[navigator,userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(login(email,password));
    }
    return (
        <>
            <Container className="my-4">
                <h1>Login Page</h1>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => { setEmail(e.target.value) }} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row className="my-3">
                    <Col>
                    New Customer ? <Link to='/register'> Register here </Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginPage
