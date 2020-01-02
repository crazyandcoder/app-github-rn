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
    StyleSheet,
} from 'react-native';


export default class TrendPage extends Component {

    constructor(props) {
        super(props);

    }



    render() {

        return (
            <View style={{marginTop: 200, flex: 1, alignItems: 'center'}}>
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.title}>hello, this is a homePage!</Text>
                </View>
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

