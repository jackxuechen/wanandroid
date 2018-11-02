import React from 'react';
import { StackNavigator } from 'react-navigation';
import WebViewScreen from './Screen/WebViewScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
import BlogScreen from "./Screen/BlogScreen";
import ProjectScreen from "./Screen/ProjectScreen";


const RootStack = StackNavigator(
    {
        Main: {
            screen: createBottomTabNavigator(
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
            ),
        },
        Web: {
            screen: WebViewScreen,
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
