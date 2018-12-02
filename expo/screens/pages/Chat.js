
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
    FlatList,
    Dimensions,
    DeviceEventEmitter
} from 'react-native';
import MyStorage from '../store/ChatStore'
import Common from '../common/Utils'
type Props = {};
let appInfo=[];
let pageIndex=1;
let pageSize=4;
let storage;
let getWidth = Dimensions.get('window').width;
let getHeight = Dimensions.get('window').height;
export default class applicationContent extends Component<Props> {
    static navigationOptions = {
        //对页面的配置
        header:null,
    };
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        appInfo=params.rowData;
        this.state = {
            title:params.rowData.appName||"应用名称",
            messageList: [],
            isRefresh:false,
            listenerComponent:"applicationContent",
            inverted:true,
        };
        storage=MyStorage._getStorage();
        global.storage = storage;
        this.refreshData=this.refreshData.bind(this)
        this.onMessage=this.onMessage.bind(this)
        this.onNotification=this.onNotification.bind(this)
        this.refreshData(this.state.title,false);
    }
    componentWillUnmount() {//移除返回按钮事件监听
        DeviceEventEmitter.removeListener('onMessage', this.onMessage);
        DeviceEventEmitter.removeListener('onNotification', this.onNotification);
        this.listener.remove();
    }
    componentDidMount() {//注册返回按钮事件监听

        DeviceEventEmitter.addListener('onMessage',this.onMessage);
        DeviceEventEmitter.addListener('onNotification', this.onNotification);
        this.listener = DeviceEventEmitter.addListener('applicationContent', (receiveArr) => {
            this.refreshData(this.state.title,false)
            DeviceEventEmitter.emit("homePage", "refreshData")
        })

    }
    componentDidUpdate()
    {
        // this.refs.flatlist.scrollToEnd()
    }
    //事件处理逻辑
    onMessage(e) {
        var groupList=JSON.parse(e.content);
        var isRead=false;
        if(groupList.group_name===this.state.title)
        {
            isRead=true;
        }
        Common.onMessage(e,isRead);
        this.refreshData(groupList.group_name,true);
    }
    //通知处理逻辑
    onNotification(e)
    {
        Common.onNotification(e);
    }
    goBack() {
        this.props.navigation.goBack();
    }
    _renderRowListView(rowData) {
        const { navigate } = this.props.navigation;
        var imageList=Common.getImage();
        return (
                <View style={{marginTop:2,}} key={rowData.group_id}>
                    <View style={{flex: 1, flexDirection:"row",alignItems:'center',justifyContent: 'space-between',}}>
                        <View style={{flexDirection:"row",padding:10}}>
                            <View style={{width:45}}>
                                <Image resizeMode="contain" style={{height:40,backgroundColor:"#fff"}}  source={imageList[rowData.icon]}>
                                </Image>
                            </View>
                            <View style={{ flexDirection:"column",backgroundColor:"#fff",marginLeft:10,maxWidth:getWidth-80}}>
                                <Text  style={{padding:10,fontSize:16}}>{rowData.msg}</Text>
                            </View>
                        </View>
                    </View>
                </View>)


    }
    _renderSeparator(sectionID, RowID) {
        return (
            <View style={{flex: 1, backgroundColor: "#eeeeee", height: 0.5}} key={sectionID + RowID}>
            </View>
        );
    }
    keyExtractor(item,index) {
        return item.group_id
    }
    refreshData(group_name,isNotice,onRefresh){//isNotice=true,表示新消息来临的刷新，onRefresh=true表示到底部的刷新
        MyStorage.getAllDataForKey(this.state.title,(list)=> {
            if (list.length != 0) {
                if (group_name === this.state.title) {
                    //这个app下的未读数据为0
                    MyStorage._idLoad("type", group_name, null, null, (groupDetail) => {
                        if (groupDetail.unReadNum != 0 || isNotice) {
                            list.map((item) => {//进来了表示已读
                                item.icon = groupDetail.icon || 0;
                                item.isRead = true;
                                MyStorage.saveIDExpires(
                                    item.group_name,
                                    item.group_id,
                                    item,
                                    null
                                );
                            });
                            groupDetail.unReadNum = 0
                            MyStorage.saveIDExpires(
                                "type",
                                group_name,
                                groupDetail,
                                null
                            );
                            DeviceEventEmitter.emit("homePage", "refreshData")
                        }
                        // list = [
                        //     {"group_name": "泉州水利", "group_id": "1", "msg": "1"},
                        //     {"group_name": "泉州水利", "group_id": "2", "msg": "领导班子成员集体谈话中强调2"},
                        //     {
                        //         "group_name": "泉州水利",
                        //         "group_id": "3",
                        //         "msg": "20111111111111111111111111111111111111111113年10月31日，在同全国妇联新一届领导班子成员集体谈话中强调3"
                        //     },
                        //     {"group_name": "泉州水利", "group_id": "4", "msg": "2011111111子成员集体谈话中强调4"},
                        //     {"group_name": "泉州水利", "group_id": "5", "msg": "2011111111111111员集体谈话中强调5"},
                        //     {"group_name": "泉州水利", "group_id": "6", "msg": "201111成员集体谈话中强调6"},
                        //     {
                        //         "group_name": "泉州水利",
                        //         "group_id": "7",
                        //         "msg": "20111111111111111111111111111111111111111113年10月31日，在同全国妇联新一届领导班子成员集体谈话中强调7"
                        //     },
                        //     {"group_name": "泉州水利", "group_id": "8", "msg": "20111111111111111111班子成员集体谈话中强调8"},
                        //     {
                        //         "group_name": "泉州水利",
                        //         "group_id": "9",
                        //         "msg": "20111111111111111111111111111111111111111113年10月31日，在同全国妇联新一届领导班子成员集体谈话中强调9"
                        //     },
                        //     {"group_name": "泉州水利", "group_id": "10", "msg": "2011111届领导班子成员集体谈话中强调10"},
                        //     {
                        //         "group_name": "泉州水利",
                        //         "group_id": "11",
                        //         "msg": "20111111111111111111111111111111111111111113年10月31日，在同全国妇联新一届领导班子成员集体谈话中强调11"
                        //     },
                        //     {"group_name": "泉州水利", "group_id": "12", "msg": "导班子成员集体谈话中强调12"},
                        //     {"group_name": "泉州水利", "group_id": "13", "msg": "子成员集体谈话中强调13"},
                        //     {"group_name": "泉州水利", "group_id": "14", "msg": "14"},
                        //     {"group_name": "泉州水利", "group_id": "15", "msg": "在同全国妇联新一届领导班子成员集体谈话中强调15"},
                        //     {
                        //         "group_name": "泉州水利",
                        //         "group_id": "16",
                        //         "msg": "20111111111111111111111111111111111111111113年10月31日，在成员集体谈话中强调16"
                        //     },
                        //     {
                        //         "group_name": "泉州水利",
                        //         "group_id": "17",
                        //         "msg": "20111111111111111111111111111111111111111113年10月31日，在同全国妇联新一届领导班子成员集体谈话中强调17"
                        //     },
                        //     {"group_name": "泉州水利", "group_id": "18", "msg": "201111111班子成员集体谈话中强调18"}
                        // ];
                        var LIST = [];
                        if(onRefresh)
                        {
                            pageIndex=1;
                        }
                        if (pageIndex * pageSize >= list.length) {
                            LIST = list;
                        }
                        else {
                            LIST = Common.subArray(list, list.length - pageIndex * pageSize);
                            pageIndex++
                        }

                        var item = Common.reverse(LIST);
                        this.setState({
                            messageList: item
                        })
                    }, (errorData) => {//全部过期的数据
                        Alert.alert(
                            'list1',
                            JSON.stringify("1"),
                            [],
                            {cancelable: true}
                        )
                    })
                }
            }
            else
            {
                this.setState({
                    messageList: []
                })
            }
        },(errorData)=>{//全部过期的数据
        })
    }
    onEndReached() {
        this.refreshData(this.state.title,false,false)
    }
    render() {
        const {navigate}=this.props.navigation;
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
                    <TouchableOpacity  onPress={this.goBack.bind(this)}>
                        <View style={{flex: 1, justifyContent: "center", marginLeft: 10}}>
                            <Image resizeMode="contain" source={require('../../assets/images/Return.png')}>
                            </Image>
                        </View>
                    </TouchableOpacity>
                    <View style={[{flex: 1},styles.center]}>
                        <Text style={{color: "#fff", fontSize: 18,fontWeight:"bold"}}>{this.state.title}</Text>
                    </View>
                    <TouchableOpacity style={styles.center}  onPress={()=>{
                        navigate("appDetail",{appInfo:appInfo });
                    }}>
                        <Image resizeMode="contain" source={require('../../assets/images/more.png')}>
                        </Image>
                    </TouchableOpacity>
                </View>
                {
                    this.state.messageList.length==0?(null):(
                        <FlatList
                            ref="flatlist"
                            data={this.state.messageList}
                            renderItem={({item}) => this._renderRowListView(item)}
                            ItemSeparatorComponent={(sectionID, RowID) => this._renderSeparator(sectionID, RowID)}
                            keyExtractor={this.keyExtractor}
                            onRefresh={() => this.refreshData(this.state.title,false,true)}
                            refreshing={false}
                            inverted={this.state.inverted}
                            onEndReached={() => this.onEndReached()}
                            onEndReachedThreshold={10}
                        //     getItemLayout={(data, index) => (
                        //     {length:10, offset:10*index, index}
                        // )}
                        //     initialScrollIndex={this.state.messageList.length-1}
                        />
                    )
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    center:{
        justifyContent: "center",
        alignItems: "center"
    },
    emptyText: {
        height: 50,
        flex: 1,
        backgroundColor:"#fff",
        alignItems: 'center',
        justifyContent: 'center',
    },
});
