import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
import BlogScreen from "./BlogScreen";
import { Text } from 'react-native'
import ProjectScreen from "./ProjectScreen";
import I18n from '../locales/i18n'
import { color } from '../values/color'


export default MainScreen = createBottomTabNavigator(
    {
        Blog: {
            screen: BlogScreen,

        },
        Project: {
            screen: ProjectScreen,
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
                }
                return (<Text style={{ textAlign: 'center' }}>{barLable}</Text>)
            },
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Blog') {
                    iconName = `ios-bug${focused ? '' : ''}`;
                } else if (routeName === 'Project') {
                    iconName = `ios-bug${focused ? '' : ''}`;
                }
                return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: color.color_5b71f9,
            inactiveTintColor: 'gray',
        },
    },
)