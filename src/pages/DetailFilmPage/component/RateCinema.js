import React from 'react';
import "./RateCinema.scss";
import { Link } from "react-router-dom";

export default function RateCinema(props) {
    const renderComment = () => {
        return <div className="RateCinema__comment">
            <div className="RateCinema__comment__detail">
                <div className="RateCinema__comment__detail__left">
                    <img src={process.env.PUBLIC_URL + "/img/rapCGV.png"} alt="rapCGV"></img>
                    <div className="RateCinema__comment__detail__left__info">
                        <div className="RateCinema__comment__detail__left__info__name">John Doe</div>
                        <div className="RateCinema__comment__detail__left__info__time">59 phút trước</div>
                    </div>
                </div>
                <div className="RateCinema__comment__detail__right">
                    <img src={process.env.PUBLIC_URL + "/img/star.png"} alt="star"></img>
                    <div>4.5</div>
                </div>
            </div>
            <div className="RateCinema__comment__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est</div>
        </div>
    }
    return (
        <div>
            <div className="RateCinema">
                <div className="RateCinema__header">
                    <div className="RateCinema__header__title">Đánh giá của bạn</div>
                    <div className="RateCinema__header__rateStar">
                        <img src={process.env.PUBLIC_URL + "/img/starRate.png"} alt="star-rate"></img>
                        <img src={process.env.PUBLIC_URL + "/img/starRate.png"} alt="star-rate"></img>
                        <img src={process.env.PUBLIC_URL + "/img/starRate.png"} alt="star-rate"></img>
                        <img src={process.env.PUBLIC_URL + "/img/starRate.png"} alt="star-rate"></img>
                        <img src={process.env.PUBLIC_URL + "/img/starRate.png"} alt="star-rate"></img>
                    </div>
                    {/* <div className="RateCinema__header__input"> */}
                        <textarea className="RateCinema__header__input" placeholder="Ý kiến của bạn..."></textarea>
                    {/* </div> */}
                    <button className="RateCinema__header__button">Đăng</button>
                </div>
                <div>
                    {renderComment()}
                    {renderComment()}
                    {renderComment()}
                    {renderComment()}
                </div>
            </div>
            <footer className="footer">
                <Link to="/aboutUs">
                    <div className="footer__about-us">About us</div>
                </Link>
                <div className="footer__copyright">
                    <img
                        className="footer__copyright__img u-inline-block"
                        src={process.env.PUBLIC_URL + "/img/copyright.png"}
                        alt="copyright"
                    ></img>
                    <div className="footer__copyright__info u-inline-block">
                        Copyright
                </div>
                </div>
            </footer>
        </div>
    )
}
