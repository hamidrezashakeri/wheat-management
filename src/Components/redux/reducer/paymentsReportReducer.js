export const paymentsReportReducer = (state = [], action)=>{
    switch(action.type){
        case 'INIT_PAYMENTS_REPORT':
            return [...action.payload];
        default:
            return state;
    }
}