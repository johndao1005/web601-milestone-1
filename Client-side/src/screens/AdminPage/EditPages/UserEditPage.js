import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { updateUser } from '../../../actions/userActions'

const UserEditPage = () => {
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const { id } = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [DOB, setDOB] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [finish, setFinish] = useState(false)

    const fetchUser = async (id) => {

        const user = await axios.get(`/user/${id}`)
        console.log(user)// check if return the user
    }
    useEffect(() => {
        fetchUser(id)
        if (finish === true) {
            navigator('/admin/user')
        }
    }, [finish])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateUser({
                _id: id,
                name,
                email,
                DOB,
                phoneNumber,
                isAdmin
            })
        )
        setFinish(true)
    }
    return (
        <Container>
            <Link to='/admin/user' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Container>
                <h1>Edit User</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder="Enter user name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId='price'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId='countInStock'>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type='date'
                            placeholder='Enter user DOB'
                            value={DOB}
                            onChange={(e) => setDOB(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='tel'
                            placeholder='Enter phone number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-1">
                        <Form.Label>User Role</Form.Label>
                        <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                                inline
                                label="Regular User"
                                name="group1"
                                onChange={() => setIsAdmin(false)}
                                type="radio"
                                id={`inline-radio-1`}
                            />
                            <Form.Check
                                inline
                                label="Admin User"
                                name="group1"
                                onChange={() => setIsAdmin(true)}
                                type="radio"
                                id={`inline-radio-2`}
                            />
                        </div>
                    </Form.Group>
                    <Button className="my-4" type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>

            </Container>
        </Container>
    )
}

export default UserEditPage
