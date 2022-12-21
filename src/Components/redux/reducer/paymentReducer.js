export const  paymentReducer = (state=[], action)=>{
    switch(action.type){
        case 'INIT_PAYMENT':
            return [...action.payload];
        case 'ADD_PAYMENT':
            return [...action.payload];
        case 'DELETE_PAYMENT':
            return [...action.payload];
        case 'UPDATE_PAYMENT':
            return [...action.payload];
        default:
            return state;
    }
}