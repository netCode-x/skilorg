

export  interface  LoginTypeResq{
    username: string;
    password: string
}
export interface LoginTypeResp{
    token: string;
    username: string;
    userId: number;  // 注意是 number 还是 string
    expiresIn?: number;
}

