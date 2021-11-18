import React from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useDispatch } from 'react-redux';
import {deleteUser} from '../actions/userActions'

const CustomerList = ({ customers }) => {
    const dispatch = useDispatch()
    const deleteHandler = (id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {dispatch(deleteUser(id))
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
                    <th>User id</th>
                    <th>Name</th>
                    <th>email</th>
                    <th>DOB</th>
                    <th>PhoneNumber</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((user)=>(
                    <tr>
                        <th>{user._id.substring(10)}</th>
                    <th>{user.name}</th>
                    <th>{user.email}</th>
                    <th>{user.DOB}</th>
                    <th>{user.phoneNumber}</th>
                    <th>
                                <Link className="my-1 p-2" to={`/admin/user/${user._id}/edit`}>
                                    <Button className="btn-wrap" style={{ right: '0' }} >
                                        <i className="bi bi-pen" id="cart" /></Button>
                                </Link>
                                    <Button className="btn-wrap" onClick={()=>{deleteHandler(user._id)}} >
                                        <i className="bi bi-trash" id="cart" /></Button>
                            </th>
                    </tr>
                ))}
                
            </tbody>
        </Table>
        </Container>
        )
}

export default CustomerList
