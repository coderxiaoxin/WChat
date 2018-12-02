
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Alert,
    DeviceEventEmitter,
    FlatList,
    Dimensions
} from 'react-native';
import InputCarousel from './InputCarousel'

type Props = {};
let inputSearchType="none";//搜索方式  名称或者聊天记录或者不指定
let getWidth = Dimensions.get('window').width;
let getHeight = Dimensions.get('window').height;
export default class searchPage extends Component<Props> {
    static navigationOptions = {
        //对页面的配置
        header:null,
    };
    constructor(props) {
        super(props);
        this.state = {
            title: "随行消息通知",
            listenerComponent: "searchPage",
            searchResultShow: false,
            searchType:"none",//搜索方式  名称或者聊天记录或者不指定
            messageObject: {
                app:[
                    {
                    ID: "1",
                    appName: "随机项目",
                    message: "2018-09-28最新的内容最新的内容最新的内容最新的内容最新的内容最新的内容",
                    time: "1分钟前",
                    count: "2",
                    icon: require('../../assets/images/1.png'),
                    detail: "这是app的信息这这这是app的信息这这是app的信息这是app的信",
                    searchType: 'name',
                },
                    {
                        ID: "12",
                        appName: "12随机项目",
                        message: "2018-09-28最新的内容最新的内容最新的内容最新的内容最新的内容最新的内容",
                        time: "1分钟前",
                        count: "2",
                        icon: require('../../assets/images/1.png'),
                        detail: "这是app的信息这这这是app的信息这这是app的信息这是app的信",
                        searchType: 'name',
                    },
                    {
                        ID: "2",
                        appName: "保证金系统",
                        message: "2018-09-28最新的内容",
                        time: "2分钟前",
                        count: "12",
                        icon: require('../../assets/images/2.png'),
                        detail: "这是app的信息这是app的信息这是app的信息这是app的信息这是app的信息",
                        searchType: 'name',
                    },
                ],
                content:[
                    {
                    ID: "3",
                    appName: "水利项目",
                    message: "2018-09-2018-09-28最新的内容最新的内容最新的内容最新的内容最新的内容最新的内容",
                    time: "09月28日",
                    count: "23",
                    icon: require('../../assets/images/3.png'),
                    detail: "这是app的信息这是app的信息这是app的信息这是app的信息这是app的信息",
                    searchType: 'content',
                },
                    {
                        ID: "4",
                        appName: "泉州水利",
                        message: "2018-09-2018-09-28最新的内容最新的内容最新的内容最新的内容最新的内容最新的内容",
                        time: "09月26日",
                        count: "2",
                        icon: require('../../assets/images/4.png'),
                        detail: "这是app的信息这是app的信息这是app的信息这是app的信息这是app的信息",
                        searchType: 'content',
                    },
                    {
                        ID: "5",
                        appName: "光泽",
                        message: "2018-09-28最新的内容",
                        time: "09月1日",
                        count: "21",
                        icon: require('../../assets/images/5.png'),
                        detail: "这是app的信息这是app的信息这是app的信息这是app的信息这是app的信息",
                        searchType: 'content',
                    },
                    {
                        ID: "6",
                        appName: "多标段",
                        message: "2018-09-2018-09-28最新的内容最新的内容最新的内容最新的内容最新的内容最新的内容",
                        time: "2017年04月28日",
                        count: "21",
                        icon: require('../../assets/images/6.png'),
                        detail: "这是app的信息这是app的信息这是app的信息这是app的信息这是app的信息",
                        searchType: 'content',
                    },],
            }

        };
        this.groupTypeName=this.groupTypeName.bind(this)
        this.groupTypeContent=this.groupTypeContent.bind(this)
    }
    componentDidMount() {
        const {navigate}=this.props.navigation;
        // 添加监听者
        this.listener = DeviceEventEmitter.addListener('searchPage', (receiveArr) => {
            //当是输入框发生变化只要name改变
            if(receiveArr.receiveComponent==="inputCarousel"){
                this.setState({
                    searchResultShow:true,
                    searchType:receiveArr.searchType||"none"
                })
                inputSearchType=receiveArr.searchType||"none"
            }
        })
    }
    componentWillUnmount() {
        // 销毁监听者
        this.listener.remove();
    }
    goBack() {
        this.props.navigation.goBack();
    }
    groupTypeName(){
        this.refs.InputCarousel.search("name");
    }
    groupTypeContent(){
        this.refs.InputCarousel.search("content");
    }
    _renderRowListView(rowData) {
        const { navigate } = this.props.navigation;
        return (
            <View style={{marginTop:2,height:70}} key={rowData.ID}>
                <TouchableOpacity style={styles.message} onPress={() => {
                    navigate("applicationContent",{rowData:rowData });
                }}>
                    <View style={{flex: 1, flexDirection:"row",height:60,alignItems:'center',justifyContent: 'space-between',}}>
                        <View style={{flexDirection:"row",}}>
                            <View style={{width:60}}>
                                <Image resizeMode="contain" style={{height:60}} source={rowData.icon}>
                                </Image>
                            </View>
                            {
                                rowData.searchType==="name"?<View style={{justifyContent:"center",}}>
                                    <Text numberOfLines={1} style={{color: "#000",fontSize:16,width:getWidth-100}}>{rowData.appName}</Text>
                                </View>:
                                    <View style={{ flexDirection:"column",}}>
                                        <View style={styles.rowFull}>
                                            <Text numberOfLines={1} style={{marginTop:5,color: "#000",fontSize:16,width:getWidth-100}}>{rowData.appName}</Text>
                                        </View>
                                        <View style={[styles.rowFull,{marginRight:10}]}>
                                            <Text  style={{marginTop:5,fontSize:12,width:getWidth-100}}>205条聊天记录</Text>
                                        </View>
                                    </View>
                            }

                        </View>
                    </View>
                </TouchableOpacity>
            </View>)
    }
    _renderSeparator(sectionID, RowID) {
        return (
            <View style={{flex: 1, backgroundColor: "#eeeeee", height:2}} key={sectionID + RowID}>
            </View>
        );
    }
    keyExtractor(item,index) {
        return item.ID
    }
    ListFooterComponent(){
        return (
            <View
                style={[styles.footer]}>
                <Text>已经到底了</Text>
            </View>
        );
    }
    ListHeaderComponent(){
        let text=inputSearchType==="name"?"应用":"聊天记录";
            return (
                <View style={styles.header}>
                    <Text>{text}</Text>
                </View>
            );
    }
    ListEmptyComponent(){
        return (
            <View
                style={styles.emptyText}>
                <Text>列表为空，试试下拉刷新数据</Text>
            </View>
        );
    }
    refreshData(){}
    //搜索结果
    searchResult(){
        if(this.state.searchType==="name"||this.state.searchType==="content")
        {
           let messageList= this.state.searchType==="name"?this.state.messageObject.app:this.state.messageObject.content
            return (
                <FlatList
                    data={messageList}
                    renderItem={({item}) => this._renderRowListView(item)}
                    ItemSeparatorComponent={(sectionID, RowID) => this._renderSeparator(sectionID, RowID)}
                    keyExtractor={this.keyExtractor}
                    ListEmptyComponent={this.ListEmptyComponent}
                    ListHeaderComponent={this.ListHeaderComponent}
                    ListFooterComponent={this.ListFooterComponent}
                    onRefresh={() => this.refreshData()}
                    refreshing={false}
                />
            )
        }
        else {
            return (
                <View style={{backgroundColor:'#eeeeee'}}>
                    <View>
                        {
                            this.state.messageObject.app.map((rowData, index) => {
                                if(index<2) {
                                    return (
                                        <View key={rowData.ID}>
                                            {
                                                index == 0 ?
                                                    <View style={styles.topStyle}><Text>应用</Text></View> : null
                                            }
                                            <View style={{marginTop: 2, height: 70}}>
                                                <TouchableOpacity style={styles.message} onPress={() => {
                                                }}>
                                                    <View style={{
                                                        flex: 1,
                                                        flexDirection: "row",
                                                        height: 60,
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}>
                                                        <View style={{flexDirection: "row",}}>
                                                            <View style={{width: 60}}>
                                                                <Image resizeMode="contain" style={{height: 60}}
                                                                       source={rowData.icon}>
                                                                </Image>
                                                            </View>
                                                            <View style={{justifyContent: "center",}}>
                                                                <Text numberOfLines={1} style={{
                                                                    color: "#000",
                                                                    fontSize: 16,
                                                                    width: getWidth - 100
                                                                }}>{rowData.appName}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }
                                else if(index==2)
                                {
                                    return (<View  key={rowData.ID} style={[styles.more]}>
                                        <TouchableOpacity  onPress={() => {
                                            this.setState({
                                                searchType:"name",
                                            })
                                        }}>
                                            <Text style={{color:"#076ebd"}}>查看更多应用>></Text>
                                        </TouchableOpacity>
                                    </View>)
                                }
                            })
                        }

                    </View>
                    <View style={{marginTop:20}}>
                        {
                            this.state.messageObject.content.map((rowData,index) => {
                                if(index<2) {
                                    return (
                                        <View key={rowData.ID}>
                                            {
                                                index === 0 ?
                                                    <View style={styles.topStyle}><Text>聊天记录</Text></View> : null
                                            }
                                            <View style={{marginTop: 2, height: 70}} key={rowData.ID}>
                                                <TouchableOpacity style={styles.message} onPress={() => {
                                                }}>
                                                    <View style={{
                                                        flex: 1,
                                                        flexDirection: "row",
                                                        height: 60,
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}>
                                                        <View style={{flexDirection: "row",}}>
                                                            <View style={{width: 60}}>
                                                                <Image resizeMode="contain" style={{height: 60}}
                                                                       source={rowData.icon}>
                                                                </Image>
                                                            </View>
                                                            <View style={{flexDirection: "column",}}>
                                                                <View style={styles.rowFull}>
                                                                    <Text numberOfLines={1} style={{
                                                                        marginTop: 5,
                                                                        color: "#000",
                                                                        fontSize: 16,
                                                                        width: getWidth - 100
                                                                    }}>{rowData.appName}</Text>
                                                                </View>
                                                                <View style={[styles.rowFull, {marginRight: 10}]}>
                                                                    <Text style={{
                                                                        marginTop: 5,
                                                                        fontSize: 12,
                                                                        width: getWidth - 100
                                                                    }}>205条聊天记录</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }
                                else if(index===2)
                                {
                                    return (<View  key={rowData.ID} style={[styles.more]}>
                                        <TouchableOpacity  onPress={() => {
                                            this.setState({
                                                searchType:"content"
                                            })
                                        }}>
                                            <Text style={{color:"#076ebd"}}>查看更多聊天记录>></Text>
                                        </TouchableOpacity>
                                    </View>)
                                }
                            })
                        }
                    </View>
                </View>
            )

        }
    }
    noSearch() {
        return (
            <View style={{height: getHeight - 60, backgroundColor: "#fff"}}>
                <View style={[{height:100,justifyContent: 'center', alignItems: 'center'}]}>
                    <View style={[{flexDirection: 'column',}]}>
                        <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                            <Text style={[styles.search, {color: "#abaaa6"}]}
                                  onPress={this.goBack.bind(this)}>搜索指定内容</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <Text style={[styles.search]} onPress={this.groupTypeName}>群名称</Text>
                            <View style={{paddingRight: 40, paddingLeft: 40,}}>
                            </View>
                            <Text style={[styles.search]} onPress={this.groupTypeContent}>群内容</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        const {navigate}=this.props.navigation;
        let pageView = this.state.searchResultShow ? this.searchResult(): this.noSearch();    // 菜单
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={false}
                    hidden={false}
                    animated={true}
                    barStyle={'light-content'}
                    ref={(c) => this.statusBar = c}
                    backgroundColor={'black'}
                    StatusBarAnimation={'slide  '}
                />
                <View style={{height:60,flexDirection: 'row',backgroundColor:'#eeeeee'}}>
                    <View style={{flex:1}}>
                        <InputCarousel ref="InputCarousel" listenerComponent={this.state.listenerComponent} ></InputCarousel>
                    </View>
                    <View style={styles.btn}>
                        <Text style={styles.search}  onPress={this.goBack.bind(this)}>取消</Text>
                    </View>
                </View>
                <View>
                    {pageView}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        marginTop:15,
    },
    btn:{
        width:55,
        // marginLeft:-5,
        marginRight:5,
        // backgroundColor:'#34a3e7',
        height:45,
        justifyContent:'center',
        alignItems: 'center'
    },
    search:{
        color:'#14e026',
        fontSize:17,
        fontWeight:'bold'
    },
    message:{
        flex: 1,
        backgroundColor:'#fff',
        marginLeft: 5,
        marginRight: 5,
        paddingLeft:5,
        borderColor: '#ccc',
    },
    // 行充满
    rowFull:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    emptyText: {
        height: 50,
        flex: 1,
        backgroundColor:"#fff",
        alignItems: 'center',
        justifyContent: 'center',
    },
    header:{
        flex: 1,
        backgroundColor:'#fff',
        padding:10,
        borderBottomColor: "#eeeeee",
        borderBottomWidth:2
    },
    footer: {
        height: 80,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#fff",
    },
    topStyle:{
        backgroundColor:'#fff',
        padding:10,
        borderBottomColor: "#eeeeee",
        borderBottomWidth:2
    },
    more:{
        backgroundColor:'#fff',
        padding:10,
        borderTopColor: "#eeeeee",
        borderTopWidth:2
    }
});
