// src/types/api.ts

/**
 * 定义 API 响应的基础结构
 */
export interface BaseResponse<T = unknown> {
    msg: string;
    code: number;
    data: T;
}









