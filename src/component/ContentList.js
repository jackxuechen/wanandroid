import React from 'react';
import { FlatList, Dimensions, Text, TouchableOpacity, View, Image, } from 'react-native';
import { apiGet, apiPost } from "../api/ApiUrl";
import { color } from '../values/color';
import { Card } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from '../locales/i18n'
import { withNavigation } from 'react-navigation';

class ContentList extends React.PureComponent {

    constructor(props) {
        super(props)
        this.index = this.props.index
        this.state = {
            itemChanged: false,
            selected: new Map(),
            liked: new Map(),
            refreshing: true,
            listData: [],
        }
    }

    componentDidMount() {
        return this.fetchListData(this.index)
    }



    fetchListData(index) {
        apiGet(this.props.url.replace('index', index))
            .then(response => {

                this.setState(
                    (state) => {
                        state.refreshing = false
                        state.listData = state.listData.concat(response.data.datas)
                        if (!this.props.defaultLike) {
                            state.listData.forEach(element => {
                                state.liked.set(element.id, element.collect)
                            });
                        }
                        return { state }
                    }
                )
            }
            )
            .catch(error => {
                this.setState(
                    (state) => {
                        state.refreshing = false
                        return { state }
                    })

            })
    }


    render() {
        return (
            <FlatList
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    this.state.listData = []
                    this.fetchListData(this.props.index)
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
            return { state }
        });
        this.props.navigation.navigate('Web', { url: link })
    };
    _onPressLike = (id, like, item) => {
        this.setState((state) => {
            state.itemChanged = !state.itemChanged
            state.liked.set(id, like)
            if (this.props.defaultLike) {
                state.liked.delete(id)
                state.selected.delete(id)
                state.listData.splice(state.listData.indexOf(item), 1)
            }
            return { state }
        })
    }

    _renderItem = ({ item }) => (
        <BlogListItem
            id={this.props.defaultLike ? item.originId : item.id}
            onPressItem={this._onPressItem}
            onPressLike={this._onPressLike}
            selected={this.state.selected.get(item.id)}
            liked={this.props.defaultLike ? true : this.state.liked.get(item.id)}
            item={item}
        />
    );

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
export default withNavigation(ContentList);