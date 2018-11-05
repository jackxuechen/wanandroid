import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
import BlogScreen from "./BlogScreen";
import { Text } from 'react-native'
import ProjectScreen from "./ProjectScreen";
import I18n from '../locales/i18n'
import { color } from '../values/color'
import OfficialAccountScreen from './OfficialAccountScreen';
import PersonalCenterScreen from './PersonalCenterScreen';


export default BottomTabScreen = createBottomTabNavigator(
    {
        Blog: {
            screen: BlogScreen,

        },
        Project: {
            screen: ProjectScreen,
        },
        OfficialAccount: {
            screen: OfficialAccountScreen,
        },
        PersonalCenter: {
            screen: PersonalCenterScreen,
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarPosition: 'bottom',
            tabBarLabel: () => {
                const { routeName } = navigation.state;
                let barLable
                if (routeName === 'Blog') {
                    barLable = I18n.t('blog')
                } else if (routeName === 'Project') {
                    barLable = I18n.t('project')
                } else if (routeName === 'OfficialAccount') {
                    barLable = I18n.t('official_account')
                } else if (routeName === 'PersonalCenter') {
                    barLable = I18n.t('personal_center')
                }
                return (<Text style={{ textAlign: 'center' }}>{barLable}</Text>)
            },
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Blog') {
                    iconName = `ios-home${focused ? '' : ''}`;
                } else if (routeName === 'Project') {
                    iconName = `ios-paper${focused ? '' : ''}`;
                } else if (routeName === 'OfficialAccount') {
                    iconName = `ios-chatbubbles${focused ? '' : ''}`;
                } else if (routeName === 'PersonalCenter') {
                    iconName = `md-person${focused ? '' : ''}`;
                }
                return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: color.color_5b71f9,
            inactiveTintColor: color.color_888888,
        },
    },
)