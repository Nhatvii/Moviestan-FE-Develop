import {combineReducers} from 'redux'; 
import movieReducer from './movieReducer';
import aminationReducer from './aminationReducer';
import movieDetailReducer from "./movieDetailReducer";
import checkOutPageReducer from "./checkOutPageReducer";
import loginInfoReducer from "./loginInfoReducer";

const rootReducer = combineReducers({
    // nơi chứa các reducers con cho từng mục store con 
    movieReducer, 
    aminationReducer,
    movieDetailReducer,
    checkOutPageReducer,
    loginInfoReducer
})

export default rootReducer;