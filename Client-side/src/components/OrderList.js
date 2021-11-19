import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useDispatch } from 'react-redux';
import {deliverOrder} from '../actions/orderActions'

const OrderList = ({orders}) => {
    const dispatch = useDispatch()
    const deliveryHandler = (id) => {
        console.log(id)
        confirmAlert({
            title: 'Confirm Action',
            message: 'This will confirm the order status',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {dispatch(deliverOrder(id))
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
        <Table >
            <thead>
                <tr>
                    <th>Order Date</th>
                    <th>Customer email</th>
                    <th>Status</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order)=>(
                    <tr>
                        
                    <th>{order.orderDate}</th>
                    <th>{order.email}</th>
                    <th>{order.delivery?"Delivered":"Processing"}</th>
                    <th>{order.subtotal}</th>
                    <th >
                        <Button className="btn-wrap m-1"  onClick={()=>{deliveryHandler(order._id)}} disabled={order.delivery} >
                            <i className="bi bi-truck" id="trash" />
                        </Button>
                    </th>
                    </tr>
                ))}
                
            </tbody>
        </Table>
        </Container>
    )
}

export default OrderList
