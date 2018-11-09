import React from 'react';
import { FlatList, Dimensions, Text, TouchableOpacity, View, Image, } from 'react-native';
import { apiGet, apiPost } from "../api/ApiUrl";
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
            banner: null,
            liked: new Map(),
            itemChanged: false,
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
                    (state) => {
                        state.itemChanged = !state.itemChanged
                        state.refreshing = false
                        state.banner = bannerData.data
                        state.listData = listData.data.datas
                        state.listData.forEach(element => {
                            state.liked.set(element.id, element.collect)
                        });
                        return { state }
                    }
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
                this.setState(
                    (state) => {
                        state.itemChanged = !state.itemChanged
                        state.listData = this.state.listData.concat(response.data.datas)
                        state.listData.forEach(element => {
                            state.liked.set(element.id, element.collect)
                        });
                        return { state }
                    }
                )
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
        );
    }


    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id, link) => {
        this.setState((state) => {
            state.itemChanged = !state.itemChanged
            state.selected.set(id, true)
            return { state };
        });
        this.props.navigation.navigate('Web', { url: link })
    };

    _renderItem = ({ item }) => (
        <BlogListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={this.state.selected.get(item.id)}
            onPressLike={this._onPressLike}
            liked={this.state.liked.get(item.id)}
            item={item}
        />
    );
    _onPressLike = (id, like, item) => {
        this.setState((state) => {
            state.itemChanged = !state.itemChanged
            state.liked.set(id, like)
            return { state }
        })
    }

}

class BlogListItem extends React.PureComponent {

    render() {
        const textColor = this.props.selected ? color.color_888888 : color.color_333333;
        const liked = this.props.liked;
        return (
            <TouchableOpacity onPress={() => {
                this.props.onPressItem(this.props.id, this.props.item.link);
            }}>
                <Card style={{ padding: 8 }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', alignItems: 'stretch', marginTop: 4 }}>
                        <Text style={{ color: textColor, fontSize: 16, marginBottom: 4, maxWidth: 300 }}>
                            {this.props.item.title}
                        </Text>
                        <TouchableOpacity onPress={() => {
                            apiPost(`lg/${liked ? 'uncollect_originId' : 'collect'}/${this.props.id}/json`)
                                .then(reslut => {
                                    if (reslut.errorCode == 0) {
                                        this.props.onPressLike(this.props.id, !liked, this.props.item)
                                    }
                                })
                                .catch(error => {

                                })
                        }}>
                            <Icon name={liked ? 'md-heart-dislike' : 'md-heart'} size={25}
                                color={liked ? color.color_888888 : color.color_f03838} />

                        </TouchableOpacity>
                    </View>
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