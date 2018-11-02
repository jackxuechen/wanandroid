import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class WebViewScreen extends Component {
    render() {
        return (
            <WebView
                source={{ uri: 'http://www.baidu.com' }}
                style={{ marginTop: 20 }}
            />
        );
    }
}