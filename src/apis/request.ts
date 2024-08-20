import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message, Modal } from 'ant-design-vue';
import router from '@/router';

/**
 * GET 请求
 * 类型参数T，表示返回数据中data字段的类型
 * @param url 请求地址
 * @param params 请求参数，为了方便使用，从config中提取出来，单独作为一个参数
 * @param config 请求配置
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET<T>(url: string, params?: Record<string, any>, config: AxiosRequestConfig = {}): Promise<Response<T>> {
  if (params) {
    config.params = params;
  }
  const rsp = await request.get<Response<T>>(url, config);
  return rsp.data;
}

/**
 * POST 请求
 * 类型参数T，表示返回数据中data字段的类型，如果不需要使用data字段，可以不传
 * @param url 请求地址
 * @param data 请求数据
 * @param config 请求配置
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST<T>(url: string, data: Record<string, any>, config: AxiosRequestConfig = {}): Promise<Response<T>> {
  const rsp = await request.post<Response<T>>(url, data, config);
  return rsp.data;
}

/** 通用的响应结构 */
export interface Response<T> {
  ret: number; // 0: 成功
  msg?: string; // 响应信息
  data?: T; // 返回数据
}

/** axios实例 */
export const request = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
  timeout: 10000,
  withCredentials: true
});

/** 请求拦截器 */
request.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  // 在请求头中添加token
  // config.headers['Authorization'] = `Bearer ${sso.getToken()}`;
  return config;
}, onRejected);

/** 响应拦截器 */
request.interceptors.response.use(function (res: AxiosResponse<Response<unknown>>) {
  const { ret } = res.data;
  // ret非0，表示失败，抛出异常
  if (ret !== 0) {
    throw new HttpBusinessError(res.data);
  }
  return res;
}, onRejected);

/**
 * 拦截器失败回调
 * @param error
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function onRejected(error: any) {
  if (error.response?.status === 401) {
    // 401，表示未登录，跳转到登录页
    handleNoPermission();
    return;
  } else if (error.response?.status === 403) {
    try {
      // 刷新用户信息
      // await Promise.all([sso.refresh(), Account.fetchAccountInfo()]);
      // 跳转到403页面
      router.replace('/403');
    } catch (e) {
      // 查询失败，退出登录
      handleNoPermission();
      return;
    }
  } else if (error.response?.status && /^[4|5]/.test(error.response.status.toString())) {
    // 4xx，5xx，表示服务端异常，弹出错误信息
    throw new HttpServerError(error.response?.data?.msg || '系统异常，请稍后重试');
  }
  throw error;
}

/** 没权限提示,用于去重 */
let noPermissionTip = false;

/** 处理没有权限 */
function handleNoPermission() {
  if (noPermissionTip) {
    return;
  }
  noPermissionTip = true;
  message.destroy(); // 清除所有提示
  Modal.warning({
    title: '提示',
    content: '请重新登录！',
    okText: '确定',
    onOk() {
      // sso.login();
    }
  });
}

/** http请求服务端错误 */
export class HttpServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HttpServerError';
  }
}

/** http请求业务逻辑错误 */
export class HttpBusinessError<T> extends Error {
  response: Response<T>;

  constructor(response: Response<T>) {
    super(response.msg || '系统异常，请稍后重试');
    this.name = 'HttpBusinessError';
    this.response = response;
  }
}

/**
 * 监听未捕获的异常
 * 还需要配合app.config.errorHandler才能覆盖所有情况的监听
 */
window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason;
  httpErrorHandler(error);
});

/**
 * 处理http请求错误
 * @param error 错误
 */
export function httpErrorHandler(error: unknown) {
  if (error instanceof HttpBusinessError) {
    message.error(error.message);
  } else if (error instanceof HttpServerError) {
    message.error(error.message);
  } else if (error instanceof AxiosError) {
    message.error('网络错误,请稍后重试');
  }
}

/**
 * 捕获错误并弹出错误信息
 * 有时候抛出的错误会被第三方库捕获，导致错误信息无法弹出
 * 所以提供该方法，用于捕获错误并弹出错误信息
 * @param fn 需要捕获错误的函数
 * @returns 返回一个新的函数
 */
export function catchErrorToMessage<T extends (...args: any[]) => any>(fn: T): T {
  return ((...args: any[]): any => {
    try {
      const ret = fn(...args);
      if (ret instanceof Promise) {
        return ret.catch((error) => {
          httpErrorHandler(error);
        });
      }
      return ret;
    } catch (error) {
      httpErrorHandler(error);
    }
  }) as T;
}
