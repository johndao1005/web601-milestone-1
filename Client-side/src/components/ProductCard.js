import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
const ProductCard = ({ product }) => {
    return (
        <Card className='m-2 p-3 rounded shadow'>
            <Link sm={2} className="product-card" to={`/product/${product._id}`}>
                <Card.Img src={product.imageUrl} variant='top' alt="logo" />
            </Link>
            
            <Card.Body sm={2} variant='bottom'>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='h4'>${product.price}</Card.Text>
                <Card.Text >{product.description.substring(0, 75) + "..."}</Card.Text>
                <div>
                    <Link className="" to={`/product/${product._id}`}>
                        <Button className="mr-2">
                            Read More
                        </Button>
                    </Link>

                    <Link className="" to={`/cart/${product._id}`}>
                        <Button className="btn-wrap" style={{ right: '0' }} >
                            <i className="bi bi-cart" id="cart" /></Button>
                    </Link>

                </div>

            </Card.Body>

        </Card>
    )
}

export default ProductCard
