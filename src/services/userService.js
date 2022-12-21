import config from './config.json';
import http from './httpService';

export const handleLogin = (info)=>{
    return http.post(`${config.localhost}/user/login`, info);
}

export const updateUser = (info, userId)=>{
    return http.put(`${config.localhost}/user/update/${userId}`, info);
}