import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigator = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin){
            navigator('/')
        } else{
            navigator('/admin/user')
        }
    }, [userInfo])
    
    return (
        <div>
            hi
        </div>
    )
}

export default AdminPage
