import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createProduct } from '../../../actions/productActions'

const ProductCreatePage = () => {
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState('')
    const [category, setCategory] = useState([])
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [finish, setFinish] = useState(false)
    const [availability, setAvailability] = useState(true)

    useEffect(() => {
        if (finish === true) {
            navigator('/admin/product')
        }
    }, [finish])

    const submitHandler = (e) => {
        e.preventDefault()
        try {
            dispatch(
                createProduct({
                    _id: id,
                    name,
                    price,
                    imageUrl,
                    availability,
                    category,
                    description,
                    countInStock,
                })
            )
            setFinish(true)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container>
            <Link to='/admin/product' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Container>
                <h1>Create Product</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId='name'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId='countInStock'>
                        <Form.Label>Stock level</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter initial stock level'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="my-1">
                        <Form.Label>Product Status</Form.Label>
                        <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                                inline
                                label="Unavailable"
                                name="group1"
                                onChange={() => setAvailability(false)}
                                type="radio"
                                id={`inline-radio-1`}
                            />
                            <Form.Check
                                inline
                                label="Available"
                                name="group1"
                                onChange={() => setAvailability(true)}
                                type="radio"
                                id={`inline-radio-2`}
                            />
                        </div>
                    </Form.Group>
                    <Button className="my-3" type='submit' variant='primary'>
                        Create
                    </Button>
                </Form>

            </Container>
        </Container>
    )
}

export default ProductCreatePage
