import {CLIENT_ID, CLIENT_SECRET} from './app/config/ignoreConfig';
import {Buffer} from 'buffer';
import Api from 'app/http/http';
import ApiUrl from 'app/common/ApiUrl';
import AsyncStorage from "@react-native-community/async-storage";
import * as Constant from '../../common/constant';
import ToastUtils from '../../utils/ToastUtils';


const doLogin = (username, password, callback) => async () => {

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
        setTimeout(() => {
            callback && callback(res.result);
        }, 1000)
    } else {
        ToastUtils('login error');
    }
}

export default {
    doLogin,
}