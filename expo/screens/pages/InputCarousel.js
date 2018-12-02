import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Image,
    View,
    Alert,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';
export default class InputCarousel extends Component {

    constructor(props){
        super(props);
        this.state={
            searchText:"",
        };
    }
    //搜索按钮点击
    search(type){
        const {listenerComponent} = this.props;
        var arr={
            receiveName:this.state.searchText||"",//输入框的值
            receiveComponent:"inputCarousel",
            searchType:type?type:"none",
            listenerComponent:listenerComponent
        };
        DeviceEventEmitter.emit(listenerComponent, arr)
    }
    setData(NAME){
        this.setState({
            searchText:NAME,
        })
    }
    goback() {
        this.props.navigation.goBack();
    }
    render()
    {
        return(
            <View style={styles.flex}>
                <View style={[styles.flexDirection, styles.inputHeight]}>
                    <View style={styles.flex}>
                        <TextInput
                            style={styles.input}
                            returnKeyType="search"
                            clearButtonMode="always"
                            placeholder="请输入关键字"
                            underlineColorAndroid='transparent'
                            onSubmitEditing={()=>this.search("none")}
                            defaultValue={this.props.searchText||""}
                            onChangeText={(searchText) => this.setState({searchText})}/>
                    </View>
                    {/*<View style={styles.btn}>*/}
                    {/*<Text style={styles.search} onPress={this.goback.bind(this)}>取消</Text>*/}
                    {/*</View>*/}
                </View>
                {/*<Text style={styles.tip}>已输入{this.state.searchText.length}个文字</Text>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    flex:{
        flex: 1,
    },
    flexDirection:{
        flexDirection:'row'
    },
    topStatus:{
        marginTop:25,
    },
    inputHeight:{
        height:45,
    },
    input:{
        height:45,
        borderWidth:1,
        marginLeft: 5,
        marginRight: 5,
        paddingLeft:5,
        borderColor: '#ccc',
        backgroundColor:"#fff",
        borderRadius: 10
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
        color:'green',
        fontSize:17,
        fontWeight:'bold'
    },
    tip:{
        marginLeft: 5,
        marginTop: 5,
        color: '#C0C0C0',
    },
});