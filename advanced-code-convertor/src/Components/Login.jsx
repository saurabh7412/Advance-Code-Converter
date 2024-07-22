import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get("error") === "access_denied") {
      console.error("User denied access");
    } else if (searchParams.get("code")) {
      getAccessToken(searchParams.get("code"));

      async function getAccessToken(currCode) {
        await axios
          .get(
            `https://advance-code-converter-backend.onrender.com/getToken?code=${currCode}`
          )
          .then((res) => {
            console.log("Access Token", res.data.access_token);
            localStorage.setItem("token", res.data.access_token);
          })
          .catch((err) => {
            console.log(err.message());
          });
      }

      setTimeout(() => {
        navigate(`/code-convertor`);
      }, 1000);
    }
  });

  return (
    <div style={{}}>
      <a
        href={`${process.env.REACT_APP_OAUTH_BASE_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=repo&redirect_uri=${process.env.REACT_APP_BASE_URL}`}
        style={{
          textDecoration: "none",
          color: "grey",
          fontSize: "22px",
        }}
      >
        <button className="login-button">Login with Github</button>
      </a>
    </div>
  );
};

export default Login;
