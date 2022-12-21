export const materialBalanceReducer = (state= {}, action)=>{
    switch(action.type){
        case 'INIT_MATERIAL_BALANCE':
            return {...action.payload};
        default:
            return state;
    }
}