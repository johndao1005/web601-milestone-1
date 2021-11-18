import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { updateProduct } from '../../../actions/productActions'

const ProductEditPage = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const [name, setName] = useState('Name')
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const fetchProduct = async(id)=>{
        const product = await axios.get(`/product/${id}`)
        console.log(product)// check if return the product
        setName(product.name)
        setPrice(product.price)
        setImageUrl(product.imageUrl)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
    }
    useEffect(() => {
        fetchProduct(id)
    },[id])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
          updateProduct({
            _id: id,
            name,
            price,
            imageUrl,
            "availability":true,
            category,
            description,
            countInStock,
          })
        )
      }
    return (
        <>
            <Link to='/admin/product' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Container>
                <h1>Edit Product</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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
                </Form>

            </Container>
        </>
    )
}

export default ProductEditPage
