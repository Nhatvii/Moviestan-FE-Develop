import React from 'react'
import './LoginPage.scss';
import { NavLink } from 'react-router-dom';
import FacebookLogin from './component/FacebookLogin';
import GoogleLogin from './component/GoogleLogin';

export default function LogInPage() {
    return (
        <div className="login" style={{backgroundImage:`url(./img/background.png)`}}>
            <div className="login__gradient">
                <div className="login__gradient__board">
                    <NavLink className="login__gradient__board__logoutSign" to={`/home`}><img src="./img/X.png" alt="x-icon"></img></NavLink>
                    <div className="login__gradient__board__signin-Name">
                        Moviestan
                    </div>
                    <div className="login__gradient__board__signin-facebook">
                        <FacebookLogin />
                    </div>
                    <div className="login__gradient__board__signin-google">
                        <GoogleLogin />
                    </div>
                </div>
            </div>
        </div>
    )
}
