import React, { useState } from "react";
import FacebookLoginIcon from "react-facebook-login";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import "./FacebookLogin.scss";

export default function FacebookLogin() {
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();

  const responseFacebook = (response) => {
    if (response.status !== "unknown") {
      dispatch({ type: "GET_FACEBOOKINFO", data: response });
      if (response.accessToken) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }
  };
  return (
    <div>
      {!login ? (
        <FacebookLoginIcon
          appId="1002641026883341"
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,user_friends"
          callback={responseFacebook}
          icon="fa fa-facebook-square"
          textButton="Log in with Facebook"
          authType="https"
        />
      ) : (
        <Redirect to="/home" style={{ textDecoration: "none" }}>
          {" "}
        </Redirect>
      )}
    </div>
  );
}
