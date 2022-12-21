import config from './config.json';
import http from './httpService';

export const getAllProducts = (pageId = 1, perPage = 10)=>{
    return http.get(`${config.localhost}/product?pageId=${pageId}&perPage=${perPage}`);
}

export const addSingleProduct = product =>{
    return http.post(`${config.localhost}/product/new`, product);
}

export const deleteSingleProduct = id=>{
    return http.delete(`${config.localhost}/product/delete/${id}`)
}
export const updateSingleProduct = (id, data)=>{
    return http.put(`${config.localhost}/product/update/${id}`, data);
}

export const searchProducts = (pageId, perPage, search)=>{
    return http.post(`${config.localhost}/product/search?pageId=${pageId}&perPage=${perPage}`, search);
}

