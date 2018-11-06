import React from 'react';
import { createDrawerNavigator, DrawerItems, SafeAreaView, } from 'react-navigation';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import { DrawerActions } from 'react-navigation-drawer';
import MainScreen from './Screen/MainScreen';
import { color } from './values/color';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppManager } from './util/AppManager'
import I18n from './locales/i18n'
import { Card } from 'native-base';





const RootStack = createDrawerNavigator(
    {
        Main: {
            screen: MainScreen
        },
    },
    {
        drawerWidth: 240,
        initialRouteName: 'Main',
        contentComponent:
            (props) => {
                return (
                    <ScrollView>
                        <TouchableOpacity onPress={() => {
                            if (AppManager.loginState) {
                                Alert.alert(
                                    I18n.t('alert'),
                                    I18n.t('tip_alert_logout'),
                                    [
                                        { text: I18n.t('cancel'), style: 'cancel' },
                                        {
                                            text: I18n.t('confirm'),
                                            onPress: () => {
                                                AsyncStorage.multiRemove(['cookie', 'username'])
                                                AppManager.loginState = false
                                                AppManager.username = ''
                                                props.navigation.dispatch(DrawerActions.toggleDrawer())
                                            }
                                        },
                                    ],
                                )
                            } else {
                                props.navigation.navigate('LoginOrOut')
                            }
                        }}>
                            <View style={{
                                flex: 1,
                                backgroundColor: color.color_5b71f9,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <Icon
                                    style={{ marginTop: 16, }}
                                    name='md-person' size={50}
                                    color={color.color_ffffff}
                                />
                                {
                                    AppManager.loginState ?
                                        <Text style={
                                            {
                                                color: color.color_ffffff, marginBottom: 16,
                                                marginTop: 4
                                            }}>{AppManager.username}
                                        </Text> :
                                        <View />
                                }

                                <Text style={{
                                    color: color.color_ffffff, marginBottom: 16,
                                    marginTop: 4
                                }}>{AppManager.loginState ? I18n.t('logout') : I18n.t('login')}</Text>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (AppManager.loginState) {
                                    props.navigation.navigate('Collect')
                                } else {
                                    props.navigation.navigate('LoginOrOut')
                                }
                            }}
                        >
                            <Card >
                                <View style={{ height: 40, flexDirection: 'column', justifyContent: 'center', paddingLeft: 16 }}>
                                    <Text >{I18n.t('collect')}</Text>
                                </View >
                            </Card>
                        </TouchableOpacity>
                    </ScrollView>
                )
            }

    }
);

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            refresh: true
        }
    }
    componentDidMount() {
        AsyncStorage.multiGet(['cookie', 'username'])
            .then((results) => {
                if (results != null && results.length == 2) {
                    AppManager.loginState = results[0][1] == null ? false : true
                    AppManager.username = results[1][1] == null ? '' : results[1][1]
                }
            })
    }
    render() {
        return <RootStack />;
    }
}
