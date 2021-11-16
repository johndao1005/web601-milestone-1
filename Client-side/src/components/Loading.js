import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

const Loading = () => {
    return (
        <div style ={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
            <Spinner animation="border" role="status">
            </Spinner>
        </div>
    )
}


// style ={{
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%',
// }}

export default Loading
