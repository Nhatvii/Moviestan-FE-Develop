import React from 'react';
import './InfoCinema.scss';
import { Link } from "react-router-dom";
export default function InfoCinema(props) {
    const { infoCinema } = props;
    return (
        <div>
            <div className="Info">
                <div className="Info__left">
                    <table className="Info__left__table">
                        <tbody>
                        <tr>
                            <th className="Info__left__table__ngayChieu">Ngày Công Chiếu</th>
                            <th className="Info__left__table__thongTinNgayChieu">30-8-2000</th>
                        </tr>
                        <tr>
                            <th className="Info__left__table__daoDien">Đạo diễn</th>
                            <th className="Info__left__table__thongTinDaoDien">Audrew Traucki</th>
                        </tr>
                        <tr>
                            <th className="Info__left__table__theLoai">Thể loại</th>
                            <th className="Info__left__table__thongTinTheLoai">Phiêu lưu, Giật gân, Kinh dị</th>
                        </tr>
                        <tr>
                            <th className="Info__left__table__dinhDang">Định dạng</th>
                            <th className="Info__left__table__thongTinDinhDang">3D Digital</th>
                        </tr>
                        <tr>
                            <th className="Info__left__table__xuatXu">Xuất xứ</th>
                            <th className="Info__left__table__thongTinXuatXu">Úc</th>
                        </tr>
                        </tbody>
                    </table>

                </div>
                <div className="Info__right">
                    <div className="Info__right__header">Nội dung</div>
                    <div className="Info__right__moTa">{infoCinema.moTa.split(45)}</div>
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
