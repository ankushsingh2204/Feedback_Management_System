import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () =>{
    const auth = localStorage.getItem('user');
    return auth ? <Outlet /> : <Navigate to='/'/> // agar localstorage me data hai to mtlb user loged in hai to vo Outlet mtlb navbar ke sare componets chalenge and ager user ka data localstorage me nahi hai to sirf signup page hi chalega. isi liye outlet mtlb ki PrivateCOmponent ko pure navbase se rap kar diya hai taki usko ek sath chalaya ja sake.
}

export default PrivateComponent;