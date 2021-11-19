import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form, Container } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loading'
import Meta from '../../components/Meta'
import {
  listProductDetails
} from '../../actions/productActions.js'

const ProductScreen = () => {
  const {id} = useParams()
  const navigator = useNavigate()
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  useEffect(() => {
    
      dispatch(listProductDetails(id))
    
  }, [dispatch, id])

  const addToCartHandler = () => {
    navigator(`/cart/${id}?qty=${qty}`)
  }

  // const submitHandler = (e) => {
  //   e.preventDefault()
  // }

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Container className="m-4">
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.imageUrl} alt={product.name} fluid />
            </Col>
            <Col >
            <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      <Link className="" to={`/cart/${product._id}`}>Add To Cart</Link>
                      
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              
            </Col>
            <Row>
              <ListGroup variant='flush'>
                
                <ListGroup.Item>
                  <h1>Description</h1>
                  </ListGroup.Item>
                
                <ListGroup.Item>
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
              </Row>
          </Row>
        </Container>
      )}
    </Container>
  )
}

export default ProductScreen
