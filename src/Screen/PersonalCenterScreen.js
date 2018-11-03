import React, { Component } from 'react';
import { Container, Button } from 'native-base';
import { ActivityIndicator, View, Text } from 'react-native'
import { apiGet } from '../api/ApiUrl';
import I18n from '../locales/i18n';
import { color } from '../values/color';
import ContentList from '../component/ContentList';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PersonalCenterScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isLogin: false,
            userName: ''
        }
    }


    componentDidMount() {

    }


    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size='large' color={color.color_5b71f9} style={{ backgroundColor: color.color_ffffff }} />
            )
        }

        return (
            <Container>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <Text>{this.state.userName}</Text>
                    <Button primary rounded block style={{ marginLeft: 16, marginRight: 16 }}>
                        <Text style={{ color: color.color_ffffff, textAlign: 'center' }}>
                            {this.isLogin ? I18n.t('logout') : I18n.t('login')}
                        </Text>
                    </Button>
                </View>
                {this.isLogin ? <ContentList url={`lg/collect/list/index/json`} index={0} /> : <Text></Text>}
            </Container>
        );


    }
}