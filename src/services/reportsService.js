import config from './config.json';
import http from './httpService';

export const getMaterialBalnce = (info)=>{
    return http.post(`${config.localhost}/reports/material-balance`, info);
}

export const getTransfersReport = (info, page =1, perPage= 10)=>{
    return http.post(`${config.localhost}/reports/transfers-report?pageId=${page}&perPage=${perPage}`, info);
}

export const getPaymentsReport = (info)=>{
    return http.post(`${config.localhost}/reports/payments-report`, info);
}