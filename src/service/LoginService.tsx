import service from "@/config/axiosAPI.ts";
import type {LoginTypeResp, LoginTypeResq} from "@/service/serviceType/LoginType.d..ts";
import {message} from "antd";


/**
 * 登录请求
 */
export const LoginServiceReq = async (resqData: LoginTypeResq) => {
    try {
        const response = await service.post<LoginTypeResp>('/auth/login', resqData);

        if (response.code === 200) {
            const { token, username } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('userInfo', JSON.stringify({
                    username: username,
                    loginTime: Date.now()
                }));
                service.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            return { success: true, data: response.data, message: '登录成功' };
        } else {
            return { success: false, data: null, message: response.data || '登录失败' };
        }
    } catch (error) {
        message.error('网络异常，请稍后重试');
        return { success: false, data: null, message: '网络异常' };
    }
};

