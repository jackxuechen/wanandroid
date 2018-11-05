import React from 'react';
import { View, Dimensions, Text, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import I18n from '../locales/i18n'
import { Button, Form, Item, Input, Label, Toast } from 'native-base';
import { color } from '../values/color'

export default class LoginOrOutScreen extends React.Component {
    check_password
    username
    password

    constructor(props) {
        super(props)
        this.state = {
            login: true
        }
    }
    render() {
        return (
            <View style={{
                flex: 1, flexDirection: 'column', alignItems: 'center',
                backgroundColor: color.color_ffffff
            }}>
                <Icon
                    name='md-person' size={50}
                    style={{ marginTop: 16 }}
                />



                <Form style={{ width: Dimensions.get('window').width, }} >
                    <Item stackedLabel>
                        <Label>{I18n.t('username')}</Label>
                        <Input onChangeText={(text) => this.username = text} autoCapitalize='none'/>
                    </Item>
                    <Item stackedLabel>
                        <Label>{I18n.t('password')}</Label>
                        <Input onChangeText={(text) => this.password = text} secureTextEntry={true} />
                    </Item>
                    {
                        this.state.login ? <View></View> :
                            <Item stackedLabel>
                                <Label>{I18n.t('check_password')}</Label>
                                <Input onChangeText={(text) => this.check_password = text} secureTextEntry={true} />
                            </Item>
                    }

                </Form>

                <Button rounded
                    onPress={
                        () => {
                            if (this.username == null) {
                                Alert.alert(I18n.t('alert'), I18n.t('tip_username_error'))
                                return
                            }
                            if (this.state.login===false && this.password !== this.check_password) {
                                Alert.alert(I18n.t('alert'), I18n.t('tip_check_password_error'))
                                return
                            }
                            if (this.state.login===true && this.password == null) {
                                Alert.alert(I18n.t('alert'), I18n.t('tip_input_password_error'))
                                return
                            }
                        }
                    }
                    style={{
                        marginLeft: 16, marginRight: 16, marginTop: 16
                    }}>
                    <Text style={{
                        width: Dimensions.get('window').width,
                        textAlign: 'center', color: color.color_ffffff,
                    }}>
                        {this.state.login ? I18n.t('login') : I18n.t('register')}
                    </Text>
                </Button>

                <TouchableOpacity onPress={() => {
                    this.setState(Object.assign({}, this.state, { login: !this.state.login }))
                }} >
                    <Text
                        style={{
                            width: Dimensions.get('window').width,
                            height: 50,
                            textAlign: 'center', color: color.color_888888,
                            marginTop: 16,
                        }}>
                        {this.state.login ? I18n.t('tip_register') : I18n.t('tip_login')}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}