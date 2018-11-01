import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {Body, Header, Left, Right, Title, Container} from "native-base";
import I18n from '../locales/i18n'

export default class BlogScreen extends Component {

    render() {
        return (

            <Container>
                <Header>
                    <Left/>
                    <Body>
                    <Title>{I18n.t('blog')}</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={{height: 200}}>
                    <Swiper autoplay={true} style={styles.wrapper}>
                        <View style={styles.slide1}>
                            <Text style={styles.text}>Hello Swiper</Text>
                        </View>
                        <View style={styles.slide2}>
                            <Text style={styles.text}>Beautiful</Text>
                        </View>
                        <View style={styles.slide3}>
                            <Text style={styles.text}>And simple</Text>
                        </View>
                    </Swiper>
                </View>
            </Container>

        );
    }
}


const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})