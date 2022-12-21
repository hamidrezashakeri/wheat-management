import axios from "axios";

axios.interceptors.request.use(config=>{
    let token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default{
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}