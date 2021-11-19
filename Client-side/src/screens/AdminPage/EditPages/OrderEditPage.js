import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { createOrder } from '../../../actions/orderActions'

const OrderEditPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [email, setEmail] = useState('')
    const [subtotal, setSubtotal] = useState(0)
    const [delivery, setDelivery] = useState(false)

    const fetchOrder = async (id) => {
        const order = await axios.get(`/order/${id}`)
        console.log(order)// check if return the order
        setEmail(order.email)
        setSubtotal(order.subtotal)
        setDelivery(order.delivery)
    }
    useEffect(() => {
        fetchOrder(id)
    }, [id])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createOrder({
                _id: id,
               email,
               subtotal,
               delivery,
            })
        )
    }
    return (
        <>
            <Link to='/admin/order' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Container>
                <h1>Edit Order</h1>
                {/* <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={email}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter initial stock level'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form> */}

            </Container>
        </>
    )
}

export default OrderEditPage
