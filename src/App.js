import React from 'react';
import { createDrawerNavigator, DrawerItems, SafeAreaView, } from 'react-navigation';
import { Text, StyleSheet, ScrollView, View,TouchableOpacity } from 'react-native'
import MainScreen from './Screen/MainScreen';
import { color } from './values/color';
import Icon from 'react-native-vector-icons/Ionicons';



const RootStack = createDrawerNavigator(
    {
        Main: {
            screen: MainScreen
        },
    },
    {
        drawerWidth: 200,
        initialRouteName: 'Main',
        contentComponent:
            (props) => {
                return (
                    <ScrollView>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('Web', { url: 'http://www.baidu.com' })
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
                                />
                                <Text style={{
                                    color: color.color_ffffff, marginBottom: 16,
                                    marginTop: 4
                                }}>登录</Text>

                            </View>
                        </TouchableOpacity>

                    </ScrollView>
                )
            }

    }
);

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
