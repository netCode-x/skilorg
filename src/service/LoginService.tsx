import service from "@/config/axiosAPI.ts";
import type {
    LoginTypeResp,
    LoginTypeResq,
    RegisterTypeResp,
    RegisterTypeResq
} from "@/service/ApiType.d..ts";
import {message} from "antd";


/**
 * 登录请求
 */
export const LoginServiceReq = async (resqData: LoginTypeResq) => {
    try {
        const response = await service.post<LoginTypeResp>('/auth/login', resqData);
        const {token, username} = response.data;
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('userInfo', JSON.stringify({
                username: username,
                loginTime: Date.now()
            }));
        }
        return {success: true, data: response.data, message: '登录成功'};
    } catch (error) {
        message.error('网络异常，请稍后重试');
        return {success: false, data: null, message: '网络异常'};
    }
};

export const RegisterServiceReq = async (RegisterData: RegisterTypeResq) => {
    try {
        const response = await service.post<RegisterTypeResp>('/auth/register', RegisterData);
        const {username} = response.data
        message.success(`${username} 注册成功`)
        return {success: true}

    } catch (error) {
        message.error('网络异常，请稍后重试');
        return {success: false, data: null, message: '网络异常'};
    }
}




