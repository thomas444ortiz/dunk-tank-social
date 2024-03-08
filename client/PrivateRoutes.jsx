import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoutes (){
  let auth = useSelector((state) => state.auth)
    return (
        auth.authStatus ? <Outlet/> : <Navigate to='/'/>
    )
}