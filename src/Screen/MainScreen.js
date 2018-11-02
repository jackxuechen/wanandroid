import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
import BlogScreen from "./BlogScreen";
import ProjectScreen from "./ProjectScreen";
import { View, Button } from 'react-native'

export const BottomTabNavigator = createBottomTabNavigator(
    {
        Blog: BlogScreen,
        Project: ProjectScreen,
    },
    {
        navigationOptions: ({ navigation }) => ({
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
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    },
);

