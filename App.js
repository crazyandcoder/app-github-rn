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
} from 'react-native';
import {Provider} from 'react-redux';
import getRouter from './app/router';
import store from './app/store/'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            store: store,
        };
    }

    render() {
        return (
            <Provider store={this.state.store}>
                {getRouter()}
            </Provider>
        );
    }

}


