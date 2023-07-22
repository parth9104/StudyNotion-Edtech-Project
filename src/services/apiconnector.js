import axios from "axios"

export const axioInstance  = axios.create({});


export const apiConnector = (method,url,bodyData,headers,params)=>{
    return axioInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData?bodyData:null,
        headers:headers?headers:null,
        params:params?params:null,
    });
}