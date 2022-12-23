import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import { AdminPage } from '../pages/admin'
import { MainPage } from '../pages/main/service'
import { Auth } from '../pages/auth'



const useLocationChange = (action) => {
  const location = useLocation()
  React.useEffect(() => { action(location) }, [location])
}

export const Navigation = () => {
  useLocationChange((location) => {

    if(location.pathname === '/')  {
      document.body.appendChild(document.createElement('script')).src = 'widget.js';
    }
  })


  return  <Routes>
  <Route path="/" element={ <MainPage/> } />
  <Route path="/admin" element={ <AdminPage/> } />
  <Route path="/login" element={ <Auth/> } />
</Routes>
}