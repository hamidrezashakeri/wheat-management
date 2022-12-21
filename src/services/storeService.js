import config from './config.json';
import http from './httpService';

export const getAllStores = (pageId = 1, perPage = 10)=>{
    return http.get(`${config.localhost}/store?pageId=${pageId}&perPage=${perPage}`);
}

export const addSingleStore = store=>{
    return http.post(`${config.localhost}/store/new`, store);
}

export const deleteSingleStore = id =>{
    return http.delete(`${config.localhost}/store/delete/${id}`);
}

export const updateSingleStore = (id, data)=>{
    return http.put(`${config.localhost}/store/update/${id}`, data);
}

export const changeStatusStore = id=>{
    return http.post(`${config.localhost}/store/change-status`, {id});
}

export const searchStores = (pageId, perPage, search)=>{
    return http.post(`${config.localhost}/store/search?pageId=${pageId}&perPage=${perPage}`, search);
}