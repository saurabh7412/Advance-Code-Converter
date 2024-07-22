import { useEffect, useState } from "react";
import axios from "axios";
import Login from "../Components/Login";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

export const Home = () => {
  const [spinner, setSpinner] = useState(true);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

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

  const handleWithOutGithub = () => {
    localStorage.setItem('withoutgithub', true);

    navigate('/code-convertor')
  }

  return (
    <div className="welcome-container">
      <h1 className="glowing-text" style={{marginTop:'0px'}}>Welcome to Advance Code Converter with Content Generator</h1>
      <div>{spinner && <Loader/>}</div>
      <div>
        {flag ? (<>
          <Login />
          <button className="login-button" onClick={handleWithOutGithub}>Continue withOut Github OAuth</button>
        </>
        ) : (
          <p className="glowing-text" style={{fontSize:"22px"}}>
            Backend is deployed on render so it may take some time to start the
            server. Patience is appreciated.
          </p>
        )}
      </div>
      <div
        style={{
          textAlign: "center",
          paddingTop: "20px",
        }}
      >
        <p className="glowing-text" style={{fontSize:"22px"}}>Created By @Saurabh</p>
      </div>
    </div>
  );
};
