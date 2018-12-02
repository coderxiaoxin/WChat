
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
    Dimensions,
    FlatList,
    mPush,
    DeviceEventEmitter,
    Alert
} from 'react-native';
import searchPage from './pages/Serach'
import Chat from './pages/Chat'
import MyStorage from './store/ChatStore'
import Common from './common/Utils'
import {MonoText} from '../components/StyledText'
let storage;
let getWidth = Dimensions.get('window').width;
let getHeight = Dimensions.get('window').height;
export default class homePage extends Component {
    static navigationOptions = {
        //对页面的配置
        header:null,
    };
    constructor(props) {
        super(props);
        this.state = {
            title:"聊天",
            listenerComponent:"homePage",
            groupList:[]
        };
        storage = MyStorage._getStorage();
        global.storage = storage;
        this.refreshData=this.refreshData.bind(this)
        this.onMessage=this.onMessage.bind(this)
        this.onNotification=this.onNotification.bind(this)
        // var e={"content":'{"group_name":"住建","group_id":"1458","msg":"每次调用setState时，BlinkApp 都会重新执行 render 方法重新渲染。这里我们使用定时器来不停调用setState，于是组件就会随着时间变化不停地重新渲染"}'}
        //     this.onMessage(e);
        this.refreshData();

    }
    componentWillUnmount() {//移除返回按钮事件监听
        DeviceEventEmitter.removeListener('onMessage', this.onMessage);
        DeviceEventEmitter.removeListener('onNotification', this.onNotification);
        this.listener.remove();
    }
    componentDidMount() {//注册返回按钮事件监听
        DeviceEventEmitter.addListener('onMessage', this.onMessage);
        DeviceEventEmitter.addListener('onNotification', this.onNotification);
        this.listener = DeviceEventEmitter.addListener('homePage', (receiveArr) => {
            this.refreshData();
        })
    }
    //事件处理逻辑
    onMessage(e) {
        var isRead=false;
        var icon=parseInt(8*Math.random());//随机图标
        var groupList=JSON.parse(e.content);
        groupList["isRead"]=isRead;
        groupList["icon"]=0;
        MyStorage.getAllDataForKey(groupList.group_name,(messageList)=>{
            if(messageList.length==0)
            {
                var item={
                    "appName":groupList.group_name,
                    "appID":groupList.group_name,
                    "noNotice":false,//消息勿打扰
                    "unReadNum":1,//未读
                    "lastMessage":groupList.msg||"",//最后一条数据
                    "icon":icon//图标
                }
                MyStorage.saveIDExpires(
                    "type",
                    groupList.group_name,
                    item,
                    null
                );
                this.refreshData();
            }
            else
            {
                //groupDetail这个应用的详情  messageList这个应用的所有数据
                MyStorage._idLoad("type",groupList.group_name,null,null,(groupDetail)=>{
                    var item={
                        "appName":groupList.group_name,
                        "appID":groupList.group_name,
                        "noNotice":groupDetail.noNotice,
                        "unReadNum":0,
                        "lastMessage":"",
                        "icon":groupDetail.icon,
                    }
                    messageList.map((messageItem)=>{
                        if(!messageItem.isRead)
                        {
                            item.unReadNum++;
                            item.lastMessage=groupList.msg||"";
                            //未读的重写这个应用的详情
                            MyStorage.saveIDExpires(
                                "type",
                                groupList.group_name,
                                item,
                                null
                            );
                        }
                    })
                    this.refreshData();
                },(errorData)=>{//全部过期的数据
                })
            }
        },(errorCallBack)=>{//全部过期的数据
        })
        MyStorage.saveIDExpires(
            groupList.group_name,
            groupList.group_id,
            groupList,
            null
        );
    }
    //通知处理逻辑
    onNotification(e)
    {
        Common.onNotification(e);
    }
    _renderRowListView(rowData) {
        const { navigate } = this.props.navigation;
        var imageList=Common.getImage();
        return (
                <View style={{marginTop:2,height:70}} key={rowData.appID}>
                    <TouchableOpacity style={styles.message} onPress={() => {
                        navigate("Chat",{rowData:rowData });
                    }}>
                        <View style={{flex: 1, flexDirection:"row",height:60,alignItems:'center',justifyContent: 'space-between',}}>
                            <View style={{flexDirection:"row",}}>
                                <View style={{width:60}}>
                                    <Image resizeMode="contain" style={{height:60}} source={imageList[rowData.icon]}>
                                    </Image>
                                </View>
                                <View style={{ flexDirection:"column",}}>
                                    <View style={styles.rowFull}>
                                        <Text numberOfLines={1} style={{color: "#000",fontSize:16,width:getWidth-200}}>{rowData.appName}</Text>
                                        <Text style={{color: "#abaaa6"}}>{rowData.time}</Text>
                                    </View>
                                    <View style={[styles.rowFull,{marginRight:10}]}>
                                        <Text numberOfLines={1} style={{color: "#abaaa6",marginTop:10,width:getWidth-120}}>{rowData.lastMessage}</Text>
                                        <View style={{marginTop:5,alignItems:"flex-end"}}>
                                            {
                                                rowData.unReadNum==0?(null):rowData.noNotice?( <View style={[styles.noNotice]}>
                                                    <Text style={{fontSize:13,textAlign:'center',color:'#fff'}}></Text>
                                                </View>):( <View style={[styles.circle]}>
                                                    <Text style={{fontSize:13,textAlign:'center',color:'#fff'}}>{rowData.unReadNum}</Text>
                                                </View>)
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>)
    }
    _renderSeparator(sectionID, RowID) {
        return (
            <View style={{flex: 1, backgroundColor: "#eeeeee", height: 0.5}} key={sectionID + RowID}>
            </View>
        );
    }
    keyExtractor(item,index) {
        return item.appID
    }
    ListFooterComponent(){
        return (
            <View
                style={styles.footer}>
                <Text>已经到底了</Text>
            </View>
        );
    }
    ListEmptyComponent(){
        return (
            <View
                style={styles.emptyText}>
                <Text>空空如也~</Text>
            </View>
        );
    }
    ListHeaderComponent(){
        return (
                <View style={{height:58,borderBottomColor:'#DEDDE2',backgroundColor:"#F0EFF0",borderBottomWidth:0.5,justifyContent:'center'}}>
                    <TouchableOpacity style={styles.search} onPress={() => {
                        MyStorage._removeAll()
                    }}>
                        <View style={{height:38, flexDirection:"row",justifyContent: "center",alignItems:'center'}}>

                            <Text style={{color: "#abaaa6", fontSize: 16}}>搜索</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        )
    }
    refreshData(){
        MyStorage.getAllDataForKey("type",(list)=>{
            this.setState({
                groupList:list
            })
        },(errorData)=>{//全部过期的数据
        })
    }
    render() {
        const { navigate } = this.props.navigation;
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
                <View style={{flexDirection: "row", height: 60,backgroundColor:'black',}}>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <MonoText style={{color: "#fff", fontSize: 18,fontWeight:"bold",lineHeight:60}}>{this.state.title}</MonoText>
                    </View>
                </View>
                <FlatList
                    data={this.state.groupList}
                    renderItem={({item}) => this._renderRowListView(item)}
                    ItemSeparatorComponent={(sectionID, RowID) => this._renderSeparator(sectionID, RowID)}
                    keyExtractor={this.keyExtractor}
                    ListEmptyComponent={this.ListEmptyComponent}
                    onRefresh={() => this.refreshData()}
                    ListHeaderComponent={this.ListHeaderComponent}
                    refreshing={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    search:{
        height:38,
        backgroundColor:'#fff',
        borderWidth:1,
        marginLeft: 5,
        marginRight: 5,
        borderColor: '#DEDDE2',
        borderRadius: 6,
    },
    message:{
        flex: 1,
        backgroundColor:'#fff',
        marginLeft: 5,
        marginRight: 5,
        paddingLeft:5,
        borderColor: '#ccc',
    },
    circle:{
        width: 20,
        height:20,
        backgroundColor:'#f76260',
        borderStyle:'solid',
        borderRadius:15,
        paddingBottom:2
    },
    noNotice:{
        width: 10,
        height:10,
        backgroundColor:'#f76260',
        borderStyle:'solid',
        borderRadius:15,
        paddingBottom:2
    },
    // 行充满
    rowFull:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    emptyText: {
        flex: 1,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#fff"
    },
});
