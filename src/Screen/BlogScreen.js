import React from 'react';
import { FlatList, Dimensions, Text, TouchableOpacity, View, Image, } from 'react-native';
import { apiGet } from "../api/ApiUrl";
import Swiper from 'react-native-swiper'
import { color } from '../values/color';
import { Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from '../locales/i18n'

export default class BlogScreen extends React.PureComponent {
    index
    constructor(props) {
        super(props)
        this.index = 0
        this.state = {
            selected: new Map(),
            refreshing: true,
            listData: null,
            banner: null
        }
    }


    componentDidMount() {
        return this.fetchBannerAndListData()
    }

    fetchBannerAndListData() {
        this.index = 0
        Promise
            .all([apiGet('banner/json'), apiGet(`article/list/${this.index}/json`)])
            .then(value => {
                let bannerData = value[0]
                let listData = value[1]
                this.setState(
                    Object.assign({}, this.state,
                        {
                            refreshing: false,
                            banner: bannerData.data,
                            listData: listData.data.datas
                        })
                )
            })
            .catch(reason => {
                this.setState(Object.assign({}, this.state, {
                    refreshing: false,
                }))
            })
    }

    fetchListData(index) {
        apiGet(`article/list/${index}/json`)
            .then(response => {
                this.setState(Object.assign({}, this.state,
                    {
                        listData: this.state.listData.concat(response.data.datas)
                    }))
            }
            )
            .catch(error => {
                this.setState(Object.assign({}, this.state, {
                    refreshing: false,
                }))
            })
    }


    render() {

        return (
            <View>
                <FlatList
                    ListHeaderComponent={
                        this.state.banner != null ?
                            <View style={{ height: 220 }}>
                                <Swiper style={styles.wrapper} autoplay={true}>
                                    {
                                        this.state.banner.map(
                                            (item, key) => {
                                                return (
                                                    <View style={styles.slide1}>
                                                        <TouchableOpacity onPress={() => {
                                                            this.props.navigation.navigate('Web', { url: item.url })
                                                        }}>
                                                            <Image source={{ uri: item.imagePath }}
                                                                style={{ width: Dimensions.get('window').width, height: 200 }} />
                                                            <Text style={styles.text}>{item.title}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            }
                                        )
                                    }
                                </Swiper>
                            </View> : <View />

                    }
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.fetchBannerAndListData()
                    }}
                    onEndReached={() => {
                        this.fetchListData(++this.index)
                    }}
                    onEndReachedThreshold={1}
                    data={this.state.listData}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }


    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id, link) => {
        this.setState((state) => {
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id));
            return { selected };
        });
        this.props.navigation.navigate('Web', { url: link })
    };

    _renderItem = ({ item }) => (
        <MyListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            item={item}
        />
    );

}

class MyListItem extends React.PureComponent {

    render() {
        const textColor = this.props.selected ? color.color_888888 : color.color_333333;
        return (
            <TouchableOpacity onPress={() => {
                this.props.onPressItem(this.props.id, this.props.item.link);
            }}>
                <Card style={{ padding: 8 }}>
                    <Text style={{ color: textColor, fontSize: 16, marginBottom: 4 }}>
                        {this.props.item.title}
                    </Text>
                    {
                        this.props.item.desc !== null ?
                            <Text style={{ color: color.color_888888, fontSize: 14 }}>
                                {this.props.item.desc}
                            </Text>
                            : <Text />
                    }
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                        <Icon name='ios-time' size={20} />
                        <Text style={{ marginLeft: 4 }}>{this.props.item.niceDate}</Text>
                        <Text style={{ marginLeft: 4 }}>{I18n.t('author')}[{this.props.item.author}]</Text>
                        <Text style={{ marginLeft: 4 }}>{I18n.t('author')}[{this.props.item.author}]</Text>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = {
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        flex: 1,
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        height: 20,
        width: Dimensions.get('window').width,
        backgroundColor: color.color_5b71f9,
        textAlign: 'center'
    }
}