const stateDefault = {
    listChair:[
        
    ],
}
const checkOutPageReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'GET_LIST_CHAIR':{
            state.listChair = action.data;  
            return {...state}; 
        }
        default:
            return {...state};
    }
}

export default checkOutPageReducer;