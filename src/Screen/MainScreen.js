import React from 'react';
import { createStackNavigator } from 'react-navigation';

import WebViewScreen from './WebViewScreen'
import BottomTabScreen from './BottomTabScreen';
import LoginOrOutScreen from './LoginOrOutScreen';
import CollectScreen from './CollectScreen';


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
        },
        Collect: {
            screen: CollectScreen
        }
    },
    {
        initialRouteName: 'BottomTab',
    }

)
