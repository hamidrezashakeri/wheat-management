import config from './config.json';
import http from './httpService';

export const getTransfers = (page = 1, perPage = 10)=>{
    return http.get(`${config.localhost}/transfers?pageId=${page}&perPage=${perPage}`);
}

export const filteredTransfers = (info, page = 1, perPage = 10)=>{
    return http.post(`${config.localhost}/transfers/search?pageId=${page}&perPage=${perPage}`, info);
}

export const addTransfer = (info)=>{
    return http.post(`${config.localhost}/transfers/new`, info);
}

export const deleteTransfer = (id)=>{
    return http.delete(`${config.localhost}/transfers/delete/${id}`);
}

export const updateTransfer = (info, id)=>{
    return http.put(`${config.localhost}/transfers/update/${id}`, info);
}