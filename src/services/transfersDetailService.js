import config from './config.json';
import http from './httpService';

export const transfersDetail = (id, pageId = 1, perPage = 10)=>{
    return http.get(`${config.localhost}/transfers-detail/${id}?pageId=${pageId}&perPage=${perPage}`);
}

export const searchTransfers = (search, transferId, pageId=1 , perPage = 10)=>{
    return http.post(`${config.localhost}/transfers-detail/search?pageId=${pageId}&perPage=${perPage}`, {search, transferId});
}

export const addTransferDetail = (info, transferId)=>{
    return http.post(`${config.localhost}/transfers-detail/new/${transferId}`, info);
}

export const deleteTransferDetail = id =>{
    return http.delete(`${config.localhost}/transfers-detail/delete/${id}`);
}

export const updateTransferDetail = (info, transferId)=>{
    return http.put(`${config.localhost}/transfers-detail/update/${transferId}`, info);
}