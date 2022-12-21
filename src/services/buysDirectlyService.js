import config from './config.json';
import http from './httpService';

export const getBuysDirectly = (info, page = 1, perPage = 10)=>{
    return http.post(`${config.localhost}/buys-directly?pageId=${page}&perPage=${perPage}`, info);
}

export const addBuyDirectly = (info)=>{
    return http.post(`${config.localhost}/buys-directly/new`, info);
}

export const deleteBuy = (id)=>{
    return http.delete(`${config.localhost}/buys-directly/delete/${id}`);
}

export const updateBuy = (info, id)=>{
    return http.put(`${config.localhost}/buys-directly/update/${id}`, info);
}

export const changeStatus = (id)=>{
    return http.post(`${config.localhost}/buys-directly/change-status`, {id});
}