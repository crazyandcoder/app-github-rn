import AsyncStorage from '@react-native-community/async-storage';
import * as Constant from '../../common/constant';
import UserDao from '../../dao/userDao';


/**
 * 初始化用户信息
 * @returns {Promise<{result: (*|boolean), data: *}>}
 */
const initUserInfo = async () => {
    let token = await AsyncStorage.getItem(Constant.TOKEN_KEY);
    let res = await  UserDao.getUserInfoLocal();
    return {
        result: res.result && (token !== null),
        data: res.data
    }
}

/**
 * 获取登录用户信息
 * @returns {Promise<void>}
 */
const getUserInfo = async () => {
    let res = await UserDao.getUserInfoDao();
    // let resData = await res.next();
    return res;
}

export default {
    initUserInfo,
    getUserInfo
}
