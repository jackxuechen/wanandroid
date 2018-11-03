import React from 'react';
import { FlatList, Dimensions, Text, TouchableOpacity, View, Image, } from 'react-native';
import { apiGet } from "../api/ApiUrl";
import { color } from '../values/color';
import { Card } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from '../locales/i18n'

export default class ContentList extends React.PureComponent {

    constructor(props) {
        super(props)
        this.index = this.props.index
        this.state = {
            selected: new Map(),
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
                this.setState(Object.assign({}, this.state,
                    {
                        refreshing:false,
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
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
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
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id));
            return { selected };
        });
        this.props.navigation.navigate('Web', { url: link })
    };

    _renderItem = ({ item }) => (
        <BlogListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            item={item}
        />
    );

}

class BlogListItem extends React.PureComponent {

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
                    </View>
                </Card>
            </TouchableOpacity>
        );
    }
}