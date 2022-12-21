import config from './config.json';
import http from './httpService';

export const getAllProducts = (info, page=1, perPage=10)=>{
    return http.post(`${config.localhost}/payment?pageId=${page}&perPage=${perPage}`, info);
}

export const addSinglePayment = (payment)=>{
    return http.post(`${config.localhost}/payment/new`, payment);
}

export const updatePayment = (paymentInfo, paymentId)=>{
    return http.put(`${config.localhost}/payment/update/${paymentId}`, paymentInfo);
}

export const deletePayment = id=>{
    return http.delete(`${config.localhost}/payment/delete/${id}`);
}