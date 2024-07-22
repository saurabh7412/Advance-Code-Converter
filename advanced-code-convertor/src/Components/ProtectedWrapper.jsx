import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedWrapper = ({children}) => {
    const navigate = useNavigate();

    const withOutGithub = localStorage.getItem('withoutgithub');

    if(!withOutGithub){
        const accessToken = localStorage.getItem('token')
        console.log("access token: " , accessToken);
        if(!accessToken){
            return <>
                <h1 style={{
                color: 'white',
                margin : '18% 20% 0% 30%',
            }}>Please login to access this page</h1>
            <button className='login-button' style={{
                color: 'white',
                margin : '2% 20% 0% 42%',
            }} onClick={()=>{navigate('/home')}}>Go back to Home</button>
            </>
        }
    }
  return (<>
    {children}
  </>
  )
}

export default ProtectedWrapper
