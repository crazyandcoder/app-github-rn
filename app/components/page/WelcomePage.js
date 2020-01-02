import React, {Component} from 'react';
import {
    View, Image, StatusBar, StyleSheet, Dimensions,  Animated, Easing
} from 'react-native';
import userActions from '../../store/actions/user';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Actions} from 'react-native-router-flux';
import loginActions from '../../store/actions/login';
import styles, {screenHeight, screenWidth} from "../../style";

@connect(
    state => ({
        state
    }), dispatch => ({
        actions: bindActionCreators(loginActions, dispatch),
    })
)
export default class WelcomePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            progress: new Animated.Value(0),
        };
    }

    componentDidMount(){
        Animated.timing(this.state.progress,{
            toValue:1,
            duration:2000,
            easing:Easing.linear,
        }).start();

        userActions.initUserInfo().then((res)=> {
            this.nextStep(res);
        });
    }

    componentWillUnmount() {
        if (this.refs.lottieView) {
            this.refs.lottieView.reset();
        }
    }

    /**
     * 判断是否需要登陆还是进入主页
     * @param res
     */
    nextStep =(res)=>{
        setTimeout(()=>{
            if (res && res.result) {
                Actions.reset("root");
            } else {
                Actions.reset("LoginPage");
            }
        },2000);
    }


    render() {
        return (
            <View style={[styles.mainBox, {backgroundColor: '#ffffff'}]}>
                <StatusBar hidden={true}/>
                <View style={[styles.centered, {flex: 1}]}>
                    <Image source={require("../../image/ic_welcome.png")}
                           resizeMode={"contain"}
                           style={{width: screenWidth, height: screenHeight}}/>
                </View>
            </View>
        )
    }


}


