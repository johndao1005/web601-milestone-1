import React from 'react'
import { Button, Container, Table, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useDispatch } from 'react-redux';
import {deleteProduct} from '../actions/productActions'

const ProductList = ({ products }) => {
    const dispatch = useDispatch()
    const deleteHandler = (id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {dispatch(deleteProduct(id))
                    window.location.reload(true)}
                },
                {
                    label: 'No',
                }
            ]
        })
    }

    return (
        <Container>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Available</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr>

                            <th>{product.name}</th>
                            <th>{product.price}</th>
                            <th>{product.countInStock}</th>
                            <th>{product.availability ? "Yes" : "No"}</th>
                            <th>
                                <Link className="my-1 p-2" to={`/admin/product/${product._id}/edit`}>
                                    <Button className="btn-wrap" style={{ right: '0' }} >
                                        <i className="bi bi-pen" id="cart" /></Button>
                                </Link>
                                    <Button className="btn-wrap" onClick={()=>{deleteHandler(product._id)}} >
                                        <i className="bi bi-trash" id="cart" /></Button>
                            </th>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </Container>
    )
}

export default ProductList
