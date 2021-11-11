import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Loading from '../../components/Loading/Loading'
import './LoginPage.css'

const LoginPage = ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo')
        if(userInfo){
            history.push("/mynotes")
        }
    }, [history])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    "Content-Type": 'application/json',
                },
            };
            setLoading(true)

            const { data } = await axios.post('/user/login', {
                email,
                password
            }, config)
            console.log(data)
            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Container className="my-4">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
            </Container>
        </>
    )
}

export default LoginPage
