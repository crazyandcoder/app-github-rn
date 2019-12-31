
import Toastutils from '../utils/ToastUtils';

//网络错误
export const NETWORK_ERROR = 1;
//网络超时
export const NETWORK_TIMEOUT = 2;
//网络返回数据格式化一次
export const NETWORK_JSON_EXCEPTION = 3;


export const SUCCESS = 200;


export default function (code, statusText) {
    switch (code) {
        case 401:
            //授权逻辑
            return "未授权或授权失败";//401 Unauthorized
        case 403:
            Toastutils('No authority');
            return "403权限错误";
        case 404:
            Toastutils('Request Not Found');
            return "404错误";
        case 410:
            Toastutils('410 Gone');
            return "410错误";
        case NETWORK_TIMEOUT:
            //超时
            Toastutils('network timeout');
            return "network timeout";
        default:
            if (statusText) {
                Toastutils(statusText);
            } else {
                Toastutils('errorUnKnow');
            }
            return "其他异常"
    }

}