import React from 'react';
import {ActivityIndicator, FlatList, Dimensions,Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {apiGet} from "../api/ApiUrl";
import Swiper from 'react-native-swiper'

export default class BlogScreen extends React.PureComponent {
    index

    constructor(props) {
        super(props)
        this.index = 0
        this.state = {
            selected: (new Map(): Map<string, boolean>),
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
                            <View style={{height: 220}}>
                                <Swiper style={styles.wrapper} autoplay={true}>
                                    {
                                        this.state.banner.map(
                                            (item,key) => {
                                                return (
                                                    <View style={styles.slide1}>
                                                        <Image source={{uri: item.imagePath}}
                                                               style={{width:Dimensions.get('window').width,height: 200}}/>
                                                        <Text style={styles.text}>{item.title}</Text>
                                                    </View>
                                                )
                                            }
                                        )
                                    }
                                </Swiper>
                            </View> : <View/>

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

    _onPressItem = (id: string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {selected};
        });
    };

    _renderItem = ({item}) => (
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
        const textColor = this.props.selected ? "red" : "black";
        return (
            <TouchableOpacity onPress={() => {
                this.props.onPressItem(this.props.id);
            }}>
                <View>
                    <Text style={{color: textColor, fontSize: 20}}>
                        {this.props.item.title}
                    </Text>
                    <Text>
                        {this.props.item.desc}
                    </Text>
                    <View style={{backgroundColor: 'black', height: 1}}/>
                </View>
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
        backgroundColor: '#9DD6EB',
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    }
}
