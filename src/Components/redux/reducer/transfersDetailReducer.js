export const transfersDetailReducer = (state = {}, action)=>{
    switch(action.type){
        case 'INIT_TRANSFERS_DETAIL':
            return {...action.payload};
        case 'UPDATE_TRANSFERS_DETAIL':
            return {...action.payload}
        default:
            return state;
    }
}