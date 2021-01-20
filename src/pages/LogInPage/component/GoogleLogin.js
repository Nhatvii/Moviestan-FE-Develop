import React, { useState } from "react";
import GoogleLoginIcon from "react-google-login";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./GoogleLogin.scss";

export default function GoogleLogin() {
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    dispatch({ type: "GET_GOOGLEINFO", data: response });
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };
  return (
    <div>
      {!login ? (
        <GoogleLoginIcon
          clientId="322219453826-n4bou7t4883i9ij2ngi4ndiohh3t3n3v.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          render={(renderProps) => (
            <div onClick={renderProps.onClick} className="Google-btn">
              <img
                src="./img/Google.png"
                alt="google-icon-login"
                className="Google-btn__img"
              ></img>
            </div>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      ) : (
        login && (
          <Redirect to="/home" style={{ textDecoration: "none" }}></Redirect>
        )
      )}
    </div>
  );
}
