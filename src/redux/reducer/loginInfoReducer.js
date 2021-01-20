const stateDefault = {
    facebookInfo: [],
    googleInfo: []
}
const loginInfoReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'GET_FACEBOOKINFO': { 
            return {
                ...state,
                facebookInfo: {
                    ...action.data
                }
            }; 
            // state.facebookInfo = action.data;
            // return {...state};
        }
        case 'GET_GOOGLEINFO': {
            return {
                ...state,
                googleInfo: {
                    ...action.data
                }
            }; 
        }
        default:
            return {...state};
    }
}

export default loginInfoReducer;