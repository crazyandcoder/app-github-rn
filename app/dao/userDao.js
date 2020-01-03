import AsyncStorage from '@react-native-community/async-storage';
import Api from '../http/http'
import Address from '../http/address'
import * as Constant from '../common/constant'

/**
 * 获取本地登录用户信息
 * @returns {Promise<*>}
 */
const getUserInfoLocal = async () => {
    let userText = await  AsyncStorage.getItem(Constant.USER_INFO);
    if (userText) {
        let res = JSON.parse(userText);
        return {
            result: true,
            data: res
        }
    } else {
        return {
            result: false
        }
    }
}

/**
 * 获取用户详细信息
 * @param userName
 * @returns {Promise<void>}
 */
const getUserInfoDao = async (userName) => {
    let res;
    if (!userName) {
        res = await Api.netFetch(Address.getMyUserInfo());
    } else {
        res = await Api.netFetch(Address.getUserInfo(userName));
    }
    if (res && res.result) {
        let countRes = await getUserStaredCountNet(res.data.login);
        let starred = "---";
        if (countRes.result) {
            starred = countRes.data;
        }
        let totalInfo = Object.assign({}, res.data, {starred: starred});
        if (!userName) {
            AsyncStorage.setItem(Constant.USER_INFO, JSON.stringify(totalInfo));
        }
        return {
            result: true,
            data: totalInfo,
        }
    } else {
        return {
            result: false,
            data: res.data
        }
    }
}

/**
 * 在header中提起stared count
 * @param userName
 * @returns {Promise<*>}
 */
const getUserStaredCountNet = async (userName) => {
    let res = await Api.netFetch(Address.userStar(userName) + "&per_page=1");
    if (res && res.result && res.headers && res.headers.map) {
        try {
            let link = res.headers.map['link'];
            if (link && (typeof link) === 'string') {
                let indexStart = link.lastIndexOf("page=") + 5;
                let indexEnd = link.lastIndexOf(">");
                if (indexStart >= 0 && indexEnd >= 0) {
                    let count = link.substring(indexStart, indexEnd);
                    return {
                        result: true,
                        data: count
                    }
                }
            }
            return {
                result: true,
            }
        } catch (e) {
            console.log(e)
        }
        return {
            result: false,
        }
    } else {
        return {
            result: false,
        }
    }
}

export default {
    getUserInfoLocal,
    getUserInfoDao
}
