import * as ActionType from './../constants/ActionType'; 
import Axios from 'axios';

export const getListMovieAPI = () => {
    return (dispatch) => {
        Axios({
            method: "GET", 
            url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP10"
        })
        .then((rs) => {
            dispatch(getListMovie(rs.data));
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export const getListMovie = (listMovie) => {
    return {
        type: ActionType.GET_LIST_FILM, 
        data: listMovie
    }
}

export const changeCurrentHotFilm = (film) => {
    return{
        type: ActionType.CHANGE_CURRENT_HOT_FILM,
        data: film
    }
}

export const turnOnFadeHotFilm = () =>{
    return{
        type: ActionType.TURN_ON_FADE_POSTER_HOT_FILM
    }
}

export const turnOffFadeHotFilm = () =>{
    return{
        type: ActionType.TURN_OFF_FADE_POSTER_HOT_FILM
    }
}

export const turnOnTrailerHot = () =>{
    return{
        type: ActionType.TURN_ON_TRAILER_HOT 
    }
}

export const turnOffTrailerHot = () =>{
    return{
        type: ActionType.TURN_OFF_TRAILER_HOT 
    }
}

export const changeTrailer = (trailer) =>{
    return{
        type: ActionType.CHANGE_TRAILER, 
        data: trailer
    }
}
export const getListCinemaScheduleAPI = (maPhim) => {
    return (dispatch) => {
         Axios({
            method: "GET", 
            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
        }).then((rs) => {
            dispatch(getListCinemaSchedule(rs.data));
        }).catch((err) => {
            console.log(err);
        })
    }
}
export const getListCinemaSchedule = (listCinema) => {
    return {
        type: 'GET_LIST_CINEMA_SCHEDULE',
        data: listCinema
    }
}
export const getListChairAPI = (maLichChieu) => {
    return (dispatch) => {
         Axios({
            method: "GET", 
            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
        }).then((rs) => {
            dispatch(getListChair(rs.data));
        }).catch((err) => {
            console.log(err);
        })
    }
}

export const getListChair = (listChair) => {
    return {
        type: 'GET_LIST_CHAIR',
        data: listChair
    }
}
export const datVe = (thongTinDatVe) =>{
    return (dispatch) => {
        Axios({
           method: "POST", 
           url:`https://movie0706.cybersoft.edu.vn/api/quanlydatve/datve`,
           data:thongTinDatVe,
           headers:{
                    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYwNzU3NzA4MiwiZXhwIjoxNjA3NTgwNjgyfQ.WJyZW7Nmn-_sePc-6nfLQn2_MMbldGhC6h60AJzhLAg`
                }
       }).then((rs) => {
           dispatch(getListChair(rs.data));
       }).catch((err) => {
           console.log(err);
       })
   }
}