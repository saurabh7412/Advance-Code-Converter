import React, { useEffect, useState } from 'react'

import {Routes, Route } from 'react-router-dom'

import App from '../App'
import Login from '../Components/Login'
import axios from 'axios'
import WelcomePage from '../Components/WelcomePage'

const AllRoutes = () => {
  return (
    <div>
          <Routes>
            <Route path='/' element = {<WelcomePage/>}/>

            <Route path='/codeconverter' element = {<App/>}/>
          </Routes>  

    </div>
  )
}

export default AllRoutes