import { Button } from '@mui/material'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Login = () => {

  return (
    <div style={{
      paddingTop:"100px"
    }}>
        <a href='https://github.com/login/oauth/authorize?client_id=11324ab30d1cb2632b31&scope=repo&redirect_uri=https://advanced-code-converter.vercel.app/codeconverter' style={{
          textDecoration: "none",
          color: "grey",
          fontSize:"22px"
        }}><Button variant="contained" color='warning'>Login with Github</Button></a>

    </div>
  )
}

export default Login 