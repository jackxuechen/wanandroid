import React from 'react';
import { createStackNavigator } from 'react-navigation';

import WebViewScreen from './WebViewScreen'
import BottomTabScreen from './BottomTabScreen';


export default MainScreen = createStackNavigator(
    {
        Web: {
            screen: WebViewScreen,
        },
        BottomTab: {
            screen: BottomTabScreen
        }
    },
    {
        initialRouteName: 'BottomTab',
    }

)
