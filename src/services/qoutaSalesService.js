import config from './config.json';
import http from './httpService';

export const getAllQoutaSales = ()=>{
    return http.get(`${config.localhost}/qouta-sales`);
}

export const getSingleQoutaSales = (id)=>{
    return http.get(`${config.localhost}/qouta-sales/${id}`);
}

export const singleQoutaSale = (id)=>{
    return http.get(`${config.localhost}/qouta-sales/${id}`);
}

export const qoutaSaleByPaymentId = (id)=>{
    return http.get(`${config.localhost}/qouta-sales/detail/${id}`);
}

export const searchQoutaSale = (qoutaSaleInfo, page = 1, perPage = 10)=>{
    return http.post(`${config.localhost}/qouta-sales/search?pageId=${page}&perPage=${perPage}`, qoutaSaleInfo);
}

export const newQoutaSales = (qoutaSalesInfo, paymentId)=>{
    return http.post(`${config.localhost}/qouta-sales/new/${paymentId}`, qoutaSalesInfo);
}

export const updateQoutaSale = (qoutaSaleInfo, qoutaSaleId)=>{
    return http.put(`${config.localhost}/qouta-sales/update/${qoutaSaleId}`, qoutaSaleInfo);
}

export const deleteQoutaSale = (id)=>{
    return http.delete(`${config.localhost}/qouta-sales/delete/${id}`);
}

export const newTransferQoutaSale = (transferInfo, qoutaSaleId)=>{
    return http.post(`${config.localhost}/qouta-sales/transfer/${qoutaSaleId}`, transferInfo);
}

export const updateTransferQoutaSale =(transferInfo, qoutaSaleId)=>{
    return http.put(`${config.localhost}/qouta-sales/update-transfer/${qoutaSaleId}`, transferInfo);
}

export const changeStatusRent = (id)=>{
    return http.post(`${config.localhost}/qouta-sales/change-status`, {id});
}

export const searchTransfers = (search, qoutaSaleId, pageId=1 , perPage = 10)=>{
    return http.post(`${config.localhost}/qouta-sales/search-transfers?pageId=${pageId}&perPage=${perPage}`, {search, qoutaSaleId});
}

export const deleteTransferQoutaSale = (id)=>{
    return http.delete(`${config.localhost}/qouta-sales/delete-transfer/${id}`);
}

export const getTransferQoutaSale = (id, pageId = 1, perPage = 10)=>{
    return http.get(`${config.localhost}/qouta-sales/transfers-detail/${id}?pageId=${pageId}&perPage=${perPage}`);
}