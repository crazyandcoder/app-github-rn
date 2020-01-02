import AsyncStorage from '@react-native-community/async-storage';
import * as Constant from '../../common/constant';
import UserDao from '../../dao/userDao';
import store from '../'
const {dispatch, getState} = store;
import {USER} from '../type'
/**
 * 初始化用户信息
 */
const initUserInfo = async () => {
    let token = await AsyncStorage.getItem(Constant.TOKEN_KEY);
    let res = await  UserDao.getUserInfoLocal();
    if (res && res.result && token) {
        dispatch({
            type: USER.USER_INFO,
            res: res.data
        });
    }

    return {
        result: res.result && (token !== null),
        data: res.data
    }
}

export default {
    initUserInfo,
}
