export const transfersReducer = (state = {}, action)=>{
    switch(action.type){
        case 'INIT_TRANSFERS':
            return {...action.payload};
        case 'UPDATE_TRANSFERS':
            return {...action.payload}
        default:
            return state
    }
}