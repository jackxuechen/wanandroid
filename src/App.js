import React, {Component} from 'react';
import {Button, Container, Content, Footer, FooterTab, Text, Header, Left, Right, Body, Title} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from './locales/i18n'

export default class App extends Component {

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                    <Title>test</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content/>
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="md-musical-notes" active size={30} color="#4F8EF7"/>
                            <Text>{I18n.t('blog')}</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="md-musical-notes" size={30} color="#4F8EF7"/>
                            <Text>{I18n.t('project')}</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="md-musical-notes" size={30} color="#4F8EF7"/>
                            <Text>{I18n.t('official_accounts')}</Text>
                        </Button>
                        <Button vertical size={30}>
                            <Icon name="md-musical-notes" size={30} color="#4F8EF7"/>
                            <Text>{I18n.t('knowledge_hierarchy')}</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="md-musical-notes" size={30} color="#4F8EF7"/>
                            <Text>{I18n.t('personal_center')}</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
