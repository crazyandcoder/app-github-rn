import AsyncStorage from '@react-native-community/async-storage';
import Api from '../http/http'
import Address from '../http/address'
import * as Constant from '../common/constant'


/**
 * 获取本地登录用户信息
 * @returns {Promise<*>}
 */
const getUserInfoLocal = async()=>{
    let userText= await  AsyncStorage.getItem(Constant.USER_INFO);
    if (userText){
        let res=JSON.parse(userText);
        return {
            result:true,
            data:res
        }
    } else{
        return {
            result:false
        }
    }
}

export default {
    getUserInfoLocal,
}
