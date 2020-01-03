/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
} from 'react-native';

import ToastUtils from '../../../app/utils/ToastUtils';
import loginAction from '../../../app/store/actions/login';
import loginActions from '../../store/actions/login'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Actions} from 'react-native-router-flux';
import * as Translation from '../../style/translates'


@connect(
    state => ({state}),
    dispatch => ({
        login: bindActionCreators(loginActions, dispatch)
    })
)
export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            saveUserName: '',
            savePassword: '',
            result: ''
        }
    }

    componentDidMount() {
        loginActions.getLoginParams().then((res) => {
            this.setState({
                saveUserName: res.userName,
                savePassword: res.password
            });
        });
    }

    _login =  () => {

        let userName=this.state.saveUserName;
        let password=this.state.savePassword;

        if (userName.length === 0) {
            ToastUtils(Translation.translate.en.LoginNameTip);
            return;
        }
        if (password.length === 0) {
            ToastUtils(Translation.translate.en.LoginPWTip);
            return;
        }

        Keyboard.dismiss();
        Actions.LoadingModal({backExit: false});
        loginActions.doLogin(userName, password, (res) => {
            this.exitLoading()
            if (res) {
                Actions.reset("root")
            } else {
                ToastUtils(Translation.translate.en.LoginFailTip)
            }
        })



    }

    //关闭loading框
    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }


    userInputChange = (text) => {
        this.setState({
            saveUserName:text
        })
    }

    passwordChange = (text) => {
        this.setState({
            savePassword:text
        })
    }


    render() {

        return (
            <View style={{marginTop: 200, flex: 1, alignItems: 'center'}}>
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.title}>hello, coder</Text>
                </View>


                <TextInput
                    style={{
                        paddingLeft: 15,
                        marginTop: 60,
                        width: 300,
                        height: 40,
                        borderColor: '#03a9f4',
                        borderWidth: 1
                    }}
                    placeholder='username'
                    onChangeText={this.userInputChange}
                />

                <TextInput
                    style={{
                        paddingLeft: 15,
                        marginTop: 20,
                        width: 300,
                        height: 40,
                        borderColor: '#03a9f4',
                        borderWidth: 1
                    }}
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={this.passwordChange}
                />

                <TouchableOpacity style={styles.loginBtnBg} onPress={this._login}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#ffffff',fontSize:16}}>login</Text>
                    </View>
                </TouchableOpacity>


                <Text style={{fontSize: 15,}}>{this.state.result}</Text>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    }
    ,
    title: {
        height: 30,
        color: '#5677fc',
        fontSize: 30,
    },

    loginBtnBg: {
        width: 300,
        borderRadius: 5,
        height: 50,
        marginTop: 20,
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#03a9f4'
    },

})

