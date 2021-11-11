import React from 'react'
import { Alert } from 'react-bootstrap'

const ErrorMessage = (variant = 'info',children) => {
    return (
        <Alert variant={variant} style={{fontSize:20}}>
            <strong>Error</strong>
        </Alert>
    )
}

export default ErrorMessage
