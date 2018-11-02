import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import { Text, ActivityIndicator, Button } from 'react-native'
import { apiGet } from '../api/ApiUrl';
import I18n from '../locales/i18n';
import { color } from '../values/color';

export default class ProjectScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            tabTitleArr: []
        }
    }


    componentDidMount() {
        this.requsetTabTitle()
    }
    requsetTabTitle() {
        apiGet('project/tree/json')
            .then(response => {
                this.setState({
                    isLoading: false,
                    tabTitleArr: response.data
                })
            })
            .catch(reason => {
                this.state = {
                    isLoading: false,
                    tabTitleArr: []
                }
            })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size='large' color={color.color_5b71f9} style={{ backgroundColor: color.color_ffffff }} />
            )
        }
        if (this.state.tabTitleArr.size == 0) {
            return (
                <Button title={I18n.t('fetch_error')}
                    onPress={() => {
                        this.requsetTabTitle()
                    }} />
            )
        }
        return (
            <Container>
                <Header hasTabs style={{ height: 10 }} />
                <Tabs renderTabBar={() => <ScrollableTab />}>
                    {
                        this.state.tabTitleArr.map((item, key) => {
                            return (
                                <Tab heading={item.name}>
                                    <Text>{item.name}</Text>
                                </Tab>
                            )
                        })
                    }
                </Tabs>
            </Container>
        );
    }
}