import React from 'react';
import { createStackNavigator, Header } from 'react-navigation';

import WebViewScreen from './WebViewScreen'
import BottomTabScreen from './BottomTabScreen';
import LoginOrOutScreen from './LoginOrOutScreen';
import CollectScreen from './CollectScreen';
import I18n from '../locales/i18n'

export default MainScreen = createStackNavigator(
    {
        Web: {
            screen: WebViewScreen,
            navigationOptions: ({ navigation }) => ({
                title: navigation.getParam('title', '')
            })
        },
        BottomTab: {
            screen: BottomTabScreen,
            navigationOptions: ({
                header: null
            }),
        },
        LoginOrOut: {
            screen: LoginOrOutScreen,
            navigationOptions: ({
                title: `${I18n.t('login')}&${I18n.t('register')}`
            })
        },
        Collect: {
            screen: CollectScreen,
            navigationOptions: ({
                title: I18n.t('collect')
            })
        }
    },
    {
        initialRouteName: 'BottomTab',

    }

)
