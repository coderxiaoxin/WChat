import React from 'react';
import { Platform, View, Text,Image,StyleSheet,StatusBar,FlatList,TouchableOpacity } from 'react-native';
import {MonoText} from '../compos/MonoText'
import Store from '../store/ChatStore'
import Layout from "../compos/Layout"

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            ChatList:[],
            title:"聊天"
        }
        this.loadChatList();
    }

    loadChatList(){
        // {
        //     id:"123",
        //     nickName:"系统消息",
        //     lastMessage:"123456",
        //     icon:require('../assets/img/tabBarIcon/chat.png'),
        //     time:"2018-12-13 20:31",
        //     unReadNum:10,
        //     noNotice:true
        // }
        var self=this;
        Store._noIdLoad("chat",null,null,(res)=>{
            self.state.ChatList=res;
        },err=>{});
    }

    static navigationOptions = {
        title: '聊天',
    };

    render() {
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
                <FlatList
                    data={this.state.ChatList}
                    renderItem={({item}) => this._renderRowListView(item)}
                    ItemSeparatorComponent={(sectionID, RowID) => this._renderSeparator(sectionID, RowID)}
                    keyExtractor={this.keyExtractor}
                    ListEmptyComponent={this.ListEmptyComponent}
                    onRefresh={() => this.refreshData()}
                    ListHeaderComponent={this.ListHeaderComponent}
                    refreshing={false}
                />
            </View>
        )
    }

    _renderRowListView(rowData){
        //const { navigate } = this.props.navigation;
        return (
                <View style={{marginTop:2,height:70,borderBottomWidth:1,borderBottomColor:"#ccc",marginLeft:10,marginRight:10}} key={rowData.id}>
                    <TouchableOpacity style={styles.message} onPress={() => {
                        navigate("Chat",{rowData:rowData });
                    }}>
                        <View style={{flex: 1, flexDirection:"row",height:60,alignItems:'center',justifyContent: 'space-between',}}>
                            <View style={{flexDirection:"row",}}>
                                <View style={{width:60}}>
                                    <Image resizeMode="contain" style={{height:50,width:50}} source={rowData.icon}>
                                    </Image>
                                </View>
                                <View style={{ flexDirection:"column",}}>
                                    <View style={styles.rowFull}>
                                        <Text numberOfLines={1} style={{color: "#000",fontSize:16,width:Layout.window.width-200}}>{rowData.nickName}</Text>
                                        <Text style={{color: "#abaaa6"}}>{rowData.time}</Text>
                                    </View>
                                    <View style={[styles.rowFull,{marginRight:10}]}>
                                        <Text numberOfLines={1} style={{color: "#abaaa6",marginTop:10,width:Layout.window.width-120}}>{rowData.lastMessage}</Text>
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
        return item.id
    }
    ListEmptyComponent(){
        return (
            <View
                style={styles.emptyText}>
                <Text>空空如也~</Text>
            </View>
        );
    }
    refreshData(){
        Store.getAllDataForKey("type",(list)=>{
            this.setState({
                ChatList:list
            })
        },(errorData)=>{//全部过期的数据
        })
    }
    ListHeaderComponent(){
        return (
                <View style={{height:58,borderBottomColor:'#DEDDE2',backgroundColor:"#F0EFF0",borderBottomWidth:0.5,justifyContent:'center'}}>
                    <TouchableOpacity style={styles.search} onPress={() => {
                        Store._removeAll()
                    }}>
                        <View style={{height:38, flexDirection:"row",justifyContent: "center",alignItems:'center'}}>

                            <Text style={{color: "#abaaa6", fontSize: 16}}>搜索</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        )
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
  