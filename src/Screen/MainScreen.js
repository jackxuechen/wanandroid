import React from 'react';
import { createStackNavigator } from 'react-navigation';

import WebViewScreen from './WebViewScreen'
import BottomTabScreen from './BottomTabScreen';
import LoginOrOutScreen from './LoginOrOutScreen';


export default MainScreen = createStackNavigator(
    {
        Web: {
            screen: WebViewScreen,
        },
        BottomTab: {
            screen: BottomTabScreen
        },
        LoginOrOut: {
            screen: LoginOrOutScreen
        }
    },
    {
        initialRouteName: 'BottomTab',
    }

)
