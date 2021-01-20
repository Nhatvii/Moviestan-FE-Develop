import React, { useEffect, useState } from 'react';
import * as action from "../../redux/action/action";
import { connect } from 'react-redux';
import "./DetailFilmPage.scss";
import ListCinema from './component/ListCinema';
import InfoCinema from './component/InfoCinema';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NavBar from '../Navbar/NavBar';
import RateCinema from './component/RateCinema';
import ModalVideo from 'react-modal-video';
import getVideoId from 'get-video-id';
import { animateScroll } from "react-scroll";
import LoadingPage from "../LoadingPage/LoadingPage";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));
function DetailFilmPage(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [isOpen, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { listCinemaSchedule } = props;
    useEffect(() => {
        const maPhim = window.location.pathname.split("/");
        props.callToGetListCinema(maPhim[1]);
        async function firstTimeCall(){
            setIsLoading(false);
        }
        firstTimeCall();
    }, [props]);
    const convertToDate = (dateString) => {
        let date = new Date(dateString + "Z");
        return date.toLocaleDateString();
    };

    const {id} = getVideoId(decodeURI(listCinemaSchedule.trailer));

    return (
        <div>
                {isLoading ? <LoadingPage/> : ( 
                    <div>
            <div className="Detail__background" style={{ backgroundImage: `url(${listCinemaSchedule.hinhAnh})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover' }}>
                <div className="Detail__description">
                    <button className="Detail__description__background" onClick={() => setOpen(true)}>
                        <img className="Detail__description__background__img"
                            src={process.env.PUBLIC_URL + "./img/playCircle.png"} alt="play">
                        </img>
                    </button>
                    <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={id} onClose={() => setOpen(false)} />
                    <div className="Detail__description__front"><img className="Detail__description__front__img" alt="#" src={listCinemaSchedule.hinhAnh}></img></div>
                    <div className="Detail__description__info">
                        <p className="Detail__description__info__launch-time">{convertToDate(listCinemaSchedule.ngayKhoiChieu)}</p>
                        <div className="Detail__description__info__name-rate">
                            <div className="Detail__description__info__name-rate__rate"><div className="Detail__description__info__name-rate__rate__rate-text">C13</div></div>
                            <div className="Detail__description__info__name-rate__movie-name">{listCinemaSchedule.tenPhim}</div>
                        </div>
                        <p className="Detail__description__info__time">120 phút</p>
                        <button className="Detail__description__info__btn-ticket" onClick={() => animateScroll.scrollTo(600)}>Đặt vé</button>
                    </div>
                    <div className="Detail__description__rate">
                        <img src={process.env.PUBLIC_URL + "/img/star.png"} alt="star"></img>
                        <div>{listCinemaSchedule.danhGia}</div>
                    </div>
                </div>
            </div>
            
            <NavBar />

            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" style={{ backgroundColor: '#FFFF', color: '#C6C1C1' }}>
                        <Tab label="Lịch chiếu" {...a11yProps(0)} />
                        <Tab label="Thông tin" {...a11yProps(1)} />
                        <Tab label="Đánh giá" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel className="lichChieu" value={value} index={0}>
                    <ListCinema listCinema={listCinemaSchedule}></ListCinema>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <InfoCinema infoCinema={listCinemaSchedule}></InfoCinema>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <RateCinema rateCinema={listCinemaSchedule}></RateCinema>
                </TabPanel>
            </div>
            </div>
            )}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        listCinemaSchedule: state.movieDetailReducer.listCinemaSchedule,
        isLoading: state.movieReducer.isLoading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        callToGetListCinema: (maPhim) => {
            dispatch(action.getListCinemaScheduleAPI(maPhim));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailFilmPage);
