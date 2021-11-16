import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
const ProductCard = ({ product }) => {
    return (
        <Card className='m-2 p-3 rounded shadow'>
            <Link className="product-card" to={`/product/${product._id}`}>
                <Card.Img src={product.imageUrl} variant='top' alt="logo" />
            </Link>

            <Card.Body variant='bottom'>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='h4'>${product.price}</Card.Text>
                <Card.Text >{product.description.substring(0, 75) + "..."}</Card.Text>
                <div>
                    <Button className="mr-2">
                        <Link className="" to={`/product/${product._id}`}>
                            Read More
                        </Link>
                    </Button>
                    <Button className="btn-wrap" style={{ right: '0' }} href={`/product/${product._id}`}><i class="bi bi-cart" id="cart" /></Button>
                </div>

            </Card.Body>

        </Card>
    )
}

export default ProductCard