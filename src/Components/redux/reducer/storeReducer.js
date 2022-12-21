export const storeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'INIT_STORE':
            return {...action.payload};
        case 'ADD_STORE':
            return {...action.payload};
        case 'DELETE_STORE':
            return {...action.payload};
        case 'UPDATE_STORE':
            return {...action.payload};
        default:
            return state;
    }
}