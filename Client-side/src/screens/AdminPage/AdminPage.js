import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const AdminPage = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin){
            navigator('/')
        }
    }, [userInfo])
    
    return (
        <div>
            hi
        </div>
    )
}

export default AdminPage
