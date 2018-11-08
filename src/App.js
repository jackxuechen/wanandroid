import React from 'react';
import { createDrawerNavigator, DrawerItems, } from 'react-navigation';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import { DrawerActions } from 'react-navigation-drawer';
import MainScreen from './Screen/MainScreen';
import { color } from './values/color';
import Icon from 'react-native-vector-icons/Ionicons';
import { getUserName, saveUserName, saveCookie, clearAppInfo } from './util/AppManager'
import I18n from './locales/i18n'
import { Card } from 'native-base';
import L from './util/L';



export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
    }
    componentDidMount() {
        getUserName()
            .then(result => {
                _userInfo.username = result
                this.setState({
                    username: result
                })
            })
    }
    render() {
        return <RootStack
            onNavigationStateChange={
                (prevState, newState, action) => {
                    if (action.type == 'Navigation/DRAWER_OPENED') {
                        getUserName()
                            .then(result => {
                                _userInfo.username = result
                                this.setState({
                                    username: result
                                })
                            })
                    }
                }
            }
        />
    }
}
const _userInfo = {
    username: ''
}

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
                            if (_userInfo.username) {
                                Alert.alert(
                                    I18n.t('alert'),
                                    I18n.t('tip_alert_logout'),
                                    [
                                        { text: I18n.t('cancel'), style: 'cancel' },
                                        {
                                            text: I18n.t('confirm'),
                                            onPress: () => {
                                                clearAppInfo()
                                                .then((res) => {
                                                    _userInfo.username = ''
                                                    props.navigation.dispatch(DrawerActions.toggleDrawer())
                                                })
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
                                    _userInfo.username ?
                                        <Text style={
                                            {
                                                color: color.color_ffffff, marginBottom: 16,
                                                marginTop: 4
                                            }}>{_userInfo.username}
                                        </Text> :
                                        <View />
                                }

                                <Text style={{
                                    color: color.color_ffffff, marginBottom: 16,
                                    marginTop: 4
                                }}>{_userInfo.username ? I18n.t('logout') : I18n.t('login')}</Text>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (_userInfo.username) {
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
)
