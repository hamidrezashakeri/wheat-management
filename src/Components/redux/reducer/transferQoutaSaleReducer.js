export const transferQoutaSaleReducer = (state = {}, action)=>{
    switch(action.type){
        case 'INIT_TRANSFER_QOUTA_SALE':
            return {...action.payload};
        case 'UPDATE_TRANSFER_QOUTA_SALE':
            return {...action.payload};
        default:
            return state;
    }
}