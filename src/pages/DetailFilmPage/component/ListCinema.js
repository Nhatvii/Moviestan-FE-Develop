import React, { useEffect, useState } from 'react';
import "./ListCinema.scss";
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { Link } from "react-router-dom";

export default function ListCinema(props) {
    const { listCinema } = props;
    const [renderCinema, setRenderCinema] = useState(0);
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("facebookAccount")) {
            setIsLogin(true);
        } else if (localStorage.getItem("googleAccount")) {
            setIsLogin(true);
        }
    }, [])
    return (
        <div>
            <div className="ListCinema">
                <div className="ListCinema__logo">
                    {listCinema.heThongRapChieu?.map((listCinema, index) => {
                        return <img src={listCinema.logo} alt="logo" key={index} className={renderCinema === index ? "ListCinema__logo__img-active" : "ListCinema__logo__img"} onClick={() => setRenderCinema(index)}></img>
                    })}
                </div>
                <div className="ListCinema__timeSchedule">
                    <div className="ListCinema__timeSchedule__date" id="scroll-bar">
                        {listCinema.heThongRapChieu?.map((ListCinema, index) => {
                            return <div key={index} className="ListCinema__timeSchedule__date__listDate">
                                {ListCinema.cumRapChieu.map((cinema, index) => {
                                    return <div key={index} className="ListCinema__timeSchedule__date__listDate__cinemaDate">
                                        {cinema.lichChieuPhim.slice(0, 5).map((lichChieu, index) => {
                                            return <div key={index} className="ListCinema__timeSchedule__date__listDate__cinemaDate__ngayThangThu">
                                                <div className="ListCinema__timeSchedule__date__listDate__cinemaDate__ngayThangThu__thangThu">
                                                    <div className="ListCinema__timeSchedule__date__listDate__cinemaDate__ngayThangThu__thangThu__thang">
                                                        {moment(lichChieu.ngayChieuGioChieu).format("MM")}
                                                    </div>
                                                    <div className="ListCinema__timeSchedule__date__listDate__cinemaDate__ngayThangThu__thangThu__thu">
                                                        {moment(lichChieu.ngayChieuGioChieu).format("ddd")}
                                                    </div>
                                                </div>
                                                <div className="ListCinema__timeSchedule__date__listDate__cinemaDate__ngayThangThu__ngay">
                                                    {moment(lichChieu.ngayChieuGioChieu).format("DD")}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                })}
                            </div>
                        })}
                    </div>
                    <div className="ListCinema__timeSchedule__info">
                        {listCinema.heThongRapChieu?.map((ListCinema, index) => {
                            if (index === renderCinema) {
                                return <div id={ListCinema.maHeThongRap} key={index}>
                                    {ListCinema.cumRapChieu.map((cinema, index) => {
                                        return <div key={index} className="ListCinema__timeSchedule__info__detail" id={cinema.maHeThongRap}>
                                            <div className="ListCinema__timeSchedule__info__detail__info">
                                                <img src={ListCinema.logo} alt="logo"></img>
                                                <div className="ListCinema__timeSchedule__info__detail__info__nameCinema-address">
                                                    <div className="ListCinema__timeSchedule__info__detail__info__nameCinema-address__name-cinema">{cinema.tenCumRap}</div>
                                                    <div className="ListCinema__timeSchedule__info__detail__info__nameCinema-address__address">{cinema.tenCumRap}</div>
                                                </div>
                                            </div>
                                            <div className="ListCinema__timeSchedule__info__detail__info__format">2d-Digital</div>
                                            <div className="ListCinema__timeSchedule__info__detail__time">
                                                {cinema.lichChieuPhim?.slice(0, 5).map((lichChieu, index) => {
                                                    return <NavLink style={{ textDecoration: 'none' }} to={!isLogin ? "/login" : `/CheckOutPage/${lichChieu.maLichChieu}`} key={index}>{moment(lichChieu.ngayChieuGioChieu).format("hh:mm")}</NavLink>
                                                })}
                                            </div>
                                        </div>
                                    })}
                                </div>
                            }
                        })}
                    </div>
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
