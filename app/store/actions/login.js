import {CLIENT_ID, CLIENT_SECRET} from '../../config/ignoreConfig';
import {Buffer} from 'buffer';
import Api from '../../http/http';
import ApiUrl from '../../common/ApiUrl';
import AsyncStorage from "@react-native-community/async-storage";
import * as Constant from '../../common/constant';
import userAction from './user';
import {LOGIN} from '../type';

const doLogin = async (username, password, callback) => {

    let base64Str = Buffer(username + ":" + password).toString('base64');
    AsyncStorage.setItem(Constant.USER_NAME_KEY, username);
    AsyncStorage.setItem(Constant.USER_BASIC_CODE, base64Str);
    Api.clearAuthorization();

    let requestParams = {
        scopes: ['user', 'repo', 'gist', 'notifications'],
        note: "admin_script",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    };

    let res = await  Api.netFetch(
        ApiUrl.getAuthorization(),
        'POST',
        requestParams,
        true
    )

    if (res && res.result) {
        AsyncStorage.setItem(Constant.PW_KEY, password);
        //存储用户信息，调用接口保存数据
        let current = await userAction.getUserInfo();
    }
    setTimeout(() => {
        callback && callback(res.result);
    }, 1000)
};

/**
 * 获取当前登录用户的参数
 * @returns {Promise<{userName: string, password: string}>}
 */
const getLoginParams = async () => {
    let userName = await AsyncStorage.getItem(Constant.USER_NAME_KEY);
    let password = await AsyncStorage.getItem(Constant.PW_KEY);
    return {
        userName: (userName) ? userName : "",
        password: (password) ? password : "",
    }
};

export default {
    doLogin,
    getLoginParams
}