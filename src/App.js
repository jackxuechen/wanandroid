import React, {Component} from 'react';
import {Body, Button, Container, Content, Footer, FooterTab, Header, Left, Right, Text, Title} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from './locales/i18n'

export default class App extends Component {

    titleArr = [I18n.t('blog'), I18n.t('project'), I18n.t('official_account'), I18n.t('knowledge_hierarchy'), I18n.t('personal_center')]

    constructor(props) {
        super(props)
        this.state = {
            footer: [true, false, false, false, false],
            title: this.titleArr[0],
        }
    }


    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                    <Title>{this.state.title}</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content/>
                <Footer>
                    <FooterTab>
                        <Button
                            onPress={() => {
                                this.switchFooter(0)
                            }}
                            vertical active={this.state.footer[0]}>
                            <Icon name="md-musical-notes" size={30} color="#4F8EF7"/>
                            <Text>{I18n.t('blog')}</Text>
                        </Button>
                        <Button
                            onPress={() => {
                                this.switchFooter(1)
                            }}
                            vertical active={this.state.footer[1]}>
                            <Icon name="md-musical-notes" size={30} color="#4F8EF7"/>
                            <Text>{I18n.t('project')}</Text>
                        </Button>
                        <Button
                            onPress={() => {
                                this.switchFooter(2)
                            }}
                            vertical active={this.state.footer[2]}>
                            <Icon name="md-musical-notes" size={30} color="#4F8EF7"/>
                            <Text>{I18n.t('official_account')}</Text>
                        </Button>
                        <Button
                            onPress={() => {
                                this.switchFooter(3)
                            }}
                            vertical active={this.state.footer[3]}>
                            <Icon name="md-musical-notes" size={30} color="#4F8EF7"/>
                            <Text>{I18n.t('knowledge_hierarchy')}</Text>
                        </Button>
                        <Button
                            onPress={() => {
                                this.switchFooter(4)
                            }}
                            vertical active={this.state.footer[4]}>
                            <Icon name="md-musical-notes" size={30} color="#4F8EF7"/>
                            <Text>{I18n.t('personal_center')}</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }


    switchFooter(number) {
        this.state.footer.forEach((value, index, array) => {
            if (number === index) {
                array[index] = true
            } else {
                array[index] = false
            }
        })
        this.setState(() => {
            return {
                footer: this.state.footer,
                title: this.titleArr[number]
            }
        })
    }
}
