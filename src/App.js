import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainScreen from './Screen/MainScreen';
import WebViewScreen from './Screen/WebViewScreen';

const RootStack = StackNavigator(
    {
        Main: {
            screen: MainScreen,
        },
        Web:{
            screen:WebViewScreen,
        },
    },
    {
        initialRouteName: 'Main',
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}
