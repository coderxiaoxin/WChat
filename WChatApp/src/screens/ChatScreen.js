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

export default class applicationContent extends Component{
    constructor(props){
        super(props);
        const {rowData}=this.props;
        this.state={
            Name:"系统消息",
            MessageList:[]
        }
    }

    static navigationOptions = {
        //对页面的配置
        header:null,
    };

    goBack() {
        this.props.navigation.goBack();
    }

    render(){
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
                            <Image resizeMode="contain" source={require('../assets/img/image/Return.png')}>
                            </Image>
                        </View>
                    </TouchableOpacity>
                    <View style={[{flex: 1},styles.center]}>
                        <Text style={{color: "#fff", fontSize: 18,fontWeight:"bold"}}>{this.state.Name}</Text>
                    </View>
                    <TouchableOpacity style={styles.center}  onPress={()=>{
                        navigate("appDetail",{appInfo:appInfo });
                    }}>
                        <Image resizeMode="contain" source={require('../assets/img/image/more.png')}>
                        </Image>
                    </TouchableOpacity>
                </View>
                {
                    this.state.MessageList.length==0?(null):(
                        <FlatList
                            ref="flatlist"
                            data={this.state.MessageList}
                            renderItem={({item}) => this._renderRowListView(item)}
                            ItemSeparatorComponent={(sectionID, RowID) => this._renderSeparator(sectionID, RowID)}
                            keyExtractor={this.keyExtractor}
                            onRefresh={() => this.refreshData(this.state.Name,false,true)}
                            refreshing={false}
                            inverted={this.state.inverted}
                            onEndReached={() => this.onEndReached()}
                            onEndReachedThreshold={10}
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