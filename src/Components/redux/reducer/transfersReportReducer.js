export const transfersReportReducer = (state = {}, action)=>{
    switch(action.type){
        case "INIT_TRANSFERS_REPORT":
            return {...action.payload};
        default:
            return state;
    }
}