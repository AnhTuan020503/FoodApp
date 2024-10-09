import axios from "axios";
import { ApiContants } from "../contants";
import { authHeader } from "../utils/Generator";
import { getToken } from "../Store";

const AuthRequest = axios.create({
    baseURL: ApiContants.BACKEND_API.BASE_API_URL,
});

const register = async (user) =>{
    if(!user?.username || !user?.email || !user?.password){
        return { status: false, message: "Please fill up all the fields"};
    }
    try {
        let requestBody = {
            username: user?.username,
            email: user?.email,
            password: user?.password
        }
        let registerResponse = await AuthRequest.post(
            ApiContants.BACKEND_API.REGISTER, 
            requestBody,
        );
        console.log(registerResponse?.data);
        return registerResponse?.data;
    } catch (error) {
        console.log(error)
        return {status: false, message: "Sai Gòiii"};
    }
}
const login = async (user) =>{
    if(!user?.username || !user?.password){
        return { status: false, message: "Please fill up all the fields"};
    }
    try {
        let requestBody = {
            username: user?.username,
            password: user?.password
        }
        let loginResponse = await AuthRequest.post(
            ApiContants.BACKEND_API.LOGIN, 
            requestBody,
        );
        console.log(loginResponse?.data);
        return loginResponse?.data;
    } catch (error) {
        console.log(error)
        return {status: false, message: "Sai Gòiii"};
    }
}
const checkUserExist = async (type, value) =>{
    
    try {
        let params = {[type]: value}
       
        let userCheckResponse = await AuthRequest.get(
            ApiContants.BACKEND_API.USER_EXIST, 
            {params},
        );
        console.log(userCheckResponse?.data);
        return userCheckResponse?.data;
    } catch (error) {
        console.log(error)
        return {status: false, message: "Sai Gòiii"};
    }
}
const refreshToken = async () =>{
    
    try {
        let tokenResponse = await AuthRequest.get(
            ApiContants.BACKEND_API.REFRESH_TOKEN, 
            {headers: authHeader(getToken())},
        );
        if (tokenResponse?.status ===200){
            return{status: true, data: tokenResponse?.data};
        }else{
            return {status: false};
        }
    } catch (error) {
        console.log(error)
        return {status: false, message: "Sai Gòiii"};
    }
}


export default {register,checkUserExist,login,refreshToken};