export const buysDirectly = (state = [], action)=>{
    switch(action.type){
        case 'INIT_BUYS':
            return [...action.payload];
        case 'ADD_BUYS':
            return [...action.payload];
        case 'UPDATE_BUYS':
            return [...action.payload];
        case 'DELETE_BUYS':
            return [...action.payload];
        default:
            return state;
    }
}