import  { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { buysDirectly } from '../reducer/buysDirectlyReducer';
import { loaderReducer } from '../reducer/loaderReducer';
import { materialBalanceReducer } from '../reducer/materialBalance';
import { paymentReducer } from '../reducer/paymentReducer';
import { paymentsReportReducer } from '../reducer/paymentsReportReducer';
import { productReducer } from '../reducer/productReducer';
import { qoutaSalesReducer } from '../reducer/qoutaSalesReducer';
import { storeReducer } from '../reducer/storeReducer';
import { transferQoutaSaleReducer } from '../reducer/transferQoutaSaleReducer';
import { transfersDetailReducer } from '../reducer/transfersDetailReducer';
import { transfersReducer } from '../reducer/transfersReducer';
import { transfersReportReducer } from '../reducer/transfersReportReducer';
import { userReducer } from '../reducer/userReducer';


const appReducers = combineReducers({
    store: storeReducer,
    product: productReducer,
    payment: paymentReducer,
    qoutaSales: qoutaSalesReducer,
    transferQoutaSale: transferQoutaSaleReducer,
    buysDirectly: buysDirectly,
    transfers: transfersReducer,
    transfersDetail : transfersDetailReducer,
    user: userReducer,
    loader: loaderReducer,    
    materialBalance: materialBalanceReducer,
    transfersReport: transfersReportReducer,
    paymentsReport: paymentsReportReducer
})

const persistConfig = {
    key: 'root',
    storage
}

// const rootReducers = (state, action)=>{
//     if(action.type === 'CLEAR_USER'){
//         return appReducers(undefined, action);
//     }
//     return appReducers(rootReducers, action);
// }

const persistedReducer = persistReducer(persistConfig, appReducers);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

// store.subscribe(()=> console.log(store.getState()))

