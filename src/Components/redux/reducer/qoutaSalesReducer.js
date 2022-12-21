export const qoutaSalesReducer = (state = [], action)=>{
    switch(action.type){
        case 'INIT_QOUTA_SALES':
            return [...action.payload];
        case 'UPDATE_QOUTA_SALES':
            return [...action.payload];
        default:
            return state;
    }
}