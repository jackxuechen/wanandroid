import React, { Component } from 'react';
import { WebView, ActivityIndicator, View } from 'react-native';
import { color } from '../values/color';

export default class WebViewScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }
    render() {
        return (
            <View style={{ flex: 1,backgroundColor:color.color_ffffff }}>
                {this.state.isLoading ? <ActivityIndicator size='large' color={color.color_5b71f9} style={{backgroundColor:color.color_ffffff }} /> : <View />}
                <WebView
                    onLoadStart={() => {
                        this.setState({
                            isLoading: true
                        })
                    }}
                    onLoadEnd={
                        () => {
                            this.setState({
                                isLoading: false
                            })
                        }
                    }
                    source={{ uri: this.props.navigation.getParam('url', '') }}
                />
            </View>

        );
    }
}