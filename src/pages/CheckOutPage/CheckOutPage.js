import React, { useEffect, Fragment, useState } from 'react';
import * as action from "../../redux/action/action";
import { connect } from 'react-redux';
import './CheckOutPage.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingPage from "../LoadingPage/LoadingPage";

function CheckOutPage(props) {

    const { listChair } = props;
    const [danhSachGheDangDat, setDanhSachGheDangDat] = useState([]);
    const [momoActive, setMomoActive] = useState(false);
    const [paypalActive, setPaypalActive] = useState(false);
    const [visaActive, setVisaActive] = useState(false);
    const { thongTinPhim } = listChair;
    const [startDate, setStartDate] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const { maLichChieu } = props.match.params;
        props.callToGetListChair(maLichChieu);
        async function firstTimeCall() {
            setIsLoading(false);
        }
        firstTimeCall();
    }, [props]);

    const logoClickHandler = (action) => {
        if (action === "momo") {
            setMomoActive(current => !current);
            setPaypalActive(false);
            setVisaActive(false);
        } else if (action === "paypal") {
            setPaypalActive(current => !current);
            setMomoActive(false);
            setVisaActive(false);
        } else if (action === "visa") {
            setVisaActive(current => !current);
            setMomoActive(false);
            setPaypalActive(false);
        }
    }

    const renderDanhSachGhe = () => {
        return listChair.danhSachGhe?.map((ghe, index) => {
            return <Fragment key={index}>
                {renderGhe(ghe)}
                {(index + 1) % 18 === 0 ? <br /> : ''}
            </Fragment>
        })
    }
    const renderGhe = (ghe) => {
        let classGheVip = "";
        if (ghe.loaiGhe === "Vip") {
            classGheVip = "gheVip";
        }
        if (ghe.daDat) {
            return <button className={`ghe gheDaDat ${classGheVip}`} disabled></button>
        }
        let classGheDangDat = '';
        let index = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);
        if (index !== -1) {
            classGheDangDat = 'gheDangDat';
        }
        return <button onClick={() => { chonGhe(ghe) }} className={`ghe ${classGheVip} ${classGheDangDat} `} ></button>
    }
    const chonGhe = (ghe) => {
        let index = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);
        if (index !== -1) {
            danhSachGheDangDat.splice(index, 1);
        } else {
            danhSachGheDangDat.push(ghe);
        }
        setDanhSachGheDangDat([...danhSachGheDangDat]);
    }

    const visaInfo = () => {
        return (<div>
            <div className="Visa__infoText">
                <textarea className="Sothe" placeholder="Số thẻ"></textarea>
                <div className="ExpiredDate" >
                    <img src={process.env.PUBLIC_URL + "/img/calendar.png"} alt="calender-icon"></img>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        placeholderText="Expired date"
                    >
                    </DatePicker>
                </div>
            </div>
            <textarea className="Visa__CVV" placeholder="CVV"></textarea>
        </div>
        )
    }
    // const exit = () =>{
    //     return(
    //         // <Redirect to={thongTinPhim.maLichChieu} />
    //         console.log(thongTinPhim.maLichChieu)
    //     )
    // }
    let taiKhoanNguoiDung = "string";
    const datVePhim = () => {
        let thongTinDatVe = {
            "maLichChieu": props.match.params.maLichChieu,
            "danhSachVe": danhSachGheDangDat,
            "taiKhoanNguoiDung": taiKhoanNguoiDung
        }
        props.datVe(thongTinDatVe);
        // Promise.resolve(props.datVe(thongTinDatVe)).then((res) => {
        //     console.log(res);
        // })
    }

    return (
        <div>
            {isLoading ? <LoadingPage /> : (
                <div className="CheckOut">
                    <div className="CheckOut__left">
                        <div className="Screen">
                            <div className="Screen__header"></div>
                            <div className="Screen__text">Màn hình</div>
                        </div>
                        <div className="ListChair">
                            <div>
                                <div>A</div>
                                <div>B</div>
                                <div>C</div>
                                <div>D</div>
                                <div>E</div>
                                <div>F</div>
                                <div>G</div>
                                <div>H</div>
                                <div>J</div>
                            </div>
                            <div className="ListChair__chair">{renderDanhSachGhe()}</div>
                        </div>
                        <div className="ChairInfo-Left">
                            <div>
                                <img src={process.env.PUBLIC_URL + "/img/ghedadat.png"} alt="ghedatdat"></img>
                                <div>Ghế đã đặt</div>
                            </div>
                            <div>
                                <img src={process.env.PUBLIC_URL + "/img/ghechuachon.png"} alt="ghechuachon"></img>
                                <div>Ghế chưa chọn</div>
                            </div>
                            <div>
                                <img src={process.env.PUBLIC_URL + "/img/ghevip.png"} alt="ghevip"></img>
                                <div>Ghế Vip</div>
                            </div>
                            <div>
                                <img src={process.env.PUBLIC_URL + "/img/ghedangchon.png"} alt="ghedangchon"></img>
                                <div>Ghế đang chọn</div>
                            </div>
                        </div>
                    </div>
                    <div className="CheckOut__right">
                        <div className="CheckOut__right__header">
                            <div className="Age">C18</div>
                            <div className="MovieName">{thongTinPhim?.tenPhim}</div>
                            <div >
                                <img className="Exit" src={process.env.PUBLIC_URL + "/img/btnExit.png"} alt="exit-icon"></img>
                            </div>
                        </div>
                        <div className="CheckOut__right__chair-money">
                            <div className="ChairInfo-Right">Ghế {danhSachGheDangDat.map((gheDangDat, index) => {
                                return (
                                    <div key={index}>{gheDangDat.tenGhe}</div>
                                )
                            })}
                            </div>
                            <div className="Money">{danhSachGheDangDat?.reduce((tongTien, gheDangDat, index) => {
                                return tongTien + gheDangDat.giaVe;
                            }, 0).toLocaleString()}vnđ</div>
                        </div>
                        <div className="CheckOut__right__info">
                            <div className="Email">Email</div>
                            <textarea className="Email-text"></textarea>
                            <div className="PhoneNumber">Phone number</div>
                            <textarea className="PhoneNumber-text"></textarea>
                            <div className="Payments">Hình thức thanh toán</div>
                            <div className="Momo">
                                <div className="Momo__button">
                                    <div onClick={() => { logoClickHandler("momo") }} className={momoActive ? "Momo-Btn__active" : "Momo-Btn"}></div>
                                </div>
                                <img src={process.env.PUBLIC_URL + "/img/momo.png"} alt="momo-icon"></img>
                                <div className="Momo__name">Ví momo</div>
                                <div>
                                    {momoActive ? (
                                        <textarea className="Momo__textArea" placeholder="Số điện thoại"></textarea>)
                                        : ("")}
                                </div>
                            </div>
                            <div className="Paypal">
                                <div className="Paypal__button">
                                    <div onClick={() => { logoClickHandler("paypal") }} className={paypalActive ? "Paypal-Btn__active" : "Paypal-Btn"}></div>
                                </div>
                                <img src={process.env.PUBLIC_URL + "/img/paypal.png"} alt="paypal-icon"></img>
                                <div className="Paypal__name">Paypal</div>
                                <div>
                                    {paypalActive ? (
                                        <textarea className="Paypal__textArea" placeholder="Email"></textarea>
                                    ) : ("")}
                                </div>
                            </div>
                            <div className="Visa">
                                <div className="Visa__button">
                                    <div onClick={() => { logoClickHandler("visa") }} className={visaActive ? "Visa-btn__active" : "Visa-btn"}></div>
                                </div>
                                <img src={process.env.PUBLIC_URL + "/img/visa.png"} alt="visa-icon"></img>
                                <div>
                                    {visaActive ? (
                                        visaInfo()
                                    ) : ("")}
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className={visaActive ? "btnDatVe__active" : "btnDatVe"} onClick={() => { datVePhim() }}>Đặt vé</button>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        listChair: state.checkOutPageReducer.listChair,
        isLoading: state.movieReducer.isLoading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        callToGetListChair: (maLichChieu) => {
            dispatch(action.getListChairAPI(maLichChieu));
        },
        datVe: (thongTinDatVe) => {
            dispatch(action.datVe(thongTinDatVe));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPage);
