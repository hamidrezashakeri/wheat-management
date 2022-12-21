export const productReducer = (state = {}, action)=>{
    switch(action.type){
        case 'INIT_PRODUCT':
            return {...action.payload};
        case 'ADD_PRODUCT':
            return {...action.payload};
        case 'DELETE_PRODUCT':
            return {...action.payload};
        case 'UPDATE_PRODUCT':
            return {...action.payload};
        default:
            return state;
    }
}