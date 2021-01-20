import "./NavBar.scss";
import React, { useState, useEffect } from "react";
import { animateScroll } from "react-scroll";
import { Link as LinkDom, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function NavBar(props) {
  var currentLocation = window.location.pathname;

  const [isLogin, setIsLogin] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [facebookInfo, setFacebookInfo] = useState({ ...props.facebookInfo });
  const [googleInfo, setGoogleInfo] = useState({ ...props.googleInfo });

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type === 1) {
        if (!(localStorage.getItem("facebookAccount") === "undefined")) {
          if (facebookInfo.accessToken) {
            localStorage.setItem(
              "facebookAccount",
              JSON.stringify(facebookInfo)
            );
            setFacebookInfo(facebookInfo);
            setIsLogin(true);
            console.log(1);
          } else {
            setIsLogin(false);
          }
        } else {
          setIsLogin(false);
        }
        if (!(localStorage.getItem("googleAccount") === "undefined")) {
          if (googleInfo.accessToken) {
            localStorage.setItem("googleAccount", JSON.stringify(googleInfo));
            setGoogleInfo(googleInfo);
            setIsLogin(true);
            setIsGoogleLogin(true);
          } else {
            setIsLogin(false);
            setIsGoogleLogin(false);
          }
        } else {
          setIsLogin(false);
          setIsGoogleLogin(false);
        }
      }
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("facebookAccount")) {
      setIsLogin(true);
      setFacebookInfo(JSON.parse(localStorage.getItem("facebookAccount")));
    } else if (localStorage.getItem("googleAccount")) {
      setIsGoogleLogin(true);
      setIsLogin(true);
      setGoogleInfo(JSON.parse(localStorage.getItem("googleAccount")));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("facebookAccount");
    localStorage.removeItem("googleAccount");
    window.location.reload(false);
  };

  return (
    <div className="nav">
      <LinkDom to="/home" style={{ textDecoration: "none" }}>
        <div className="nav__heading">MovieStan</div>
      </LinkDom>
      {currentLocation === "/" ? (
        <div className="nav__link">
          <a href="/#" onClick={() => animateScroll.scrollTo(730)}>
            <div className="nav__link__item">Lịch Chiếu</div>
          </a>
          <a href="/#" onClick={() => animateScroll.scrollTo(2000)}>
            <div className="nav__link__item">Cụm rạp</div>
          </a>
        </div>
      ) : (
        <div className="nav__link">
          <LinkDom to="/home" onClick={() => animateScroll.scrollTo(730)}>
            <div className="nav__link__item">Lịch Chiếu</div>
          </LinkDom>
          <LinkDom to="/home" onClick={() => animateScroll.scrollTo(2000)}>
            <div className="nav__link__item">Cụm rạp</div>
          </LinkDom>
        </div>
      )}

      {isLogin ? (
        isGoogleLogin ? (
          <div className="nav__googleInfo">
            <img
              src={googleInfo.profileObj.imageUrl}
              className="nav__googleInfo__img"
              alt="google-icon"
            ></img>
            <div className="nav__googleInfo__name">
              {googleInfo.profileObj.givenName}
            </div>
            <div
              className="nav__googleInfo__logout"
              onClick={() => {
                logout();
              }}
              style={{ textDecoration: "none" }}
            >
              Logout
            </div>
          </div>
        ) : (
          <div className="nav__facebookInfo">
            <img
              src={facebookInfo.picture.data.url}
              className="nav__facebookInfo__img"
              alt="facebook-icon"
            ></img>
            <div className="nav__facebookInfo__name">{facebookInfo.name}</div>
            <div
              className="nav__facebookInfo__logout"
              onClick={() => {
                logout();
              }}
              style={{ textDecoration: "none" }}
            >
              Logout
            </div>
          </div>
        )
      ) : (
        <div className="nav__log-in">
          <img
            alt="avatar"
            src={process.env.PUBLIC_URL + "/img/account.png"}
            className="nav__log-in__img"
          ></img>
          <NavLink
            to="/login"
            className="nav__log-in__name"
            style={{ textDecoration: "none" }}
          >
            Đăng nhập{" "}
          </NavLink>
        </div>
      )}
    </div>
  );
}
NavBar.propTypes = {
  facebookInfo: PropTypes.object,
};
NavBar.propTypes = {
  googleInfo: PropTypes.array,
};
const mapStateToProps = (state) => {
  return {
    facebookInfo: state.loginInfoReducer.facebookInfo,
    googleInfo: state.loginInfoReducer.googleInfo,
  };
};
export default connect(mapStateToProps)(NavBar);
