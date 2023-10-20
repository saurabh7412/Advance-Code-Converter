import React, { useEffect, useState } from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';
import Login from './Login';
import './WelcomePage.css'; // Import a CSS file for styling

const WelcomePage = () => {
  const [spinner, setSpinner] = useState(true);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    function getReq() {
      axios.get(`https://advance-code-converter-backend.onrender.com`)
        .then((res) => {
          if (res.data.data === "Backend Github AI") {
            setFlag(true);
            setSpinner(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setSpinner(false);
        });
    }

    getReq();
  }, []);

  return (
    <div className="welcome-container">
      <h1 className="glowing-text">Welcome to Advance Code Converter</h1>
      <div>
        {spinner && <CircularProgress color="primary" />}
      </div>
      <div>
        {flag ? <Login /> : <p>Backend is deployed on render so it may take some time to start the server. Patience is appreciated.</p>}
      </div>
    </div>
  );
}

export default WelcomePage;
