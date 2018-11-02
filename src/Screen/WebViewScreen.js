import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class WebViewScreen extends Component {
    render() {
        return (
            <WebView
                source={{ uri: this.props.navigation.getParam('url','')}}
            />
        );
    }
}