import React, {Component} from 'react';
import {
    View, Image, StatusBar, StyleSheet, Dimensions,  Animated, Easing
} from 'react-native';
import LottieView from 'lottie-react-native';

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

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
    }

    componentWillUnmount() {
        if (this.refs.lottieView) {
            this.refs.lottieView.reset();
        }
    }


    render() {
        return (
            <View style={[styles.mainBox, {backgroundColor: '#ffffff'}]}>
                <StatusBar hidden={true}/>
                <View style={[styles.centered, {flex: 1}]}>
                    <Image source={require("../../image/ic_welcome.png")}
                           resizeMode={"contain"}
                           style={{width: screenWidth, height: screenHeight}}/>
                    <View style={[styles.absoluteFull, styles.centered, {justifyContent: "flex-end"}]}>
                        <View style={[styles.centered, {width: 150, height:150}]}>
                            <LottieView
                                ref="lottieView"
                                style={{
                                    width: 150,
                                    height: 150,
                                }}
                                source={require('../../style/lottie/animation-w800-h800.json')}
                                progress={this.state.progress}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }


}


const styles = StyleSheet.create({
    mainBox: {
        backgroundColor: '#ececec',
        flex: 1
    },
    absoluteFull: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 999,
    },
    centered: {
        justifyContent: "center",
        alignItems: "center"
    },

});