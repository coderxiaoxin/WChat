import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    StatusBar
} from 'react-native';
import Layout from '../compos/Layout'
import { MonoText } from '../compos/MonoText';

export default class PluginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PluginGroup: [
                [
                    {
                        Name: "朋友圈",
                        Icon: require("../assets/img/plugin/firend.png"),
                        Action: {}
                    }
                ], [
                    {
                        Name: "扫一扫",
                        Icon: require("../assets/img/plugin/scan.png"),
                        Action: {}
                    }, {
                        Name: "摇一摇",
                        Icon: require("../assets/img/plugin/snake.png"),
                        Action: {}
                    }
                ]
            ]
        };
    }

    static navigationOptions = {
        title: '发现',
    };

    render() {
        return (
            <View>
            <StatusBar
                translucent={false}
                hidden={false}
                animated={true}
                barStyle={'light-content'}
                ref={(c) => this.statusBar = c}
                backgroundColor={'black'}
                StatusBarAnimation={'slide  '}
            />
                <ScrollView style={style.contains}>
                    {
                        this.state.PluginGroup.map(item=>{
                            return (
                                <View key={item} style={style.btnGroup}>
                                    {
                                        item.map(btn=>{
                                            return (
                                                <TouchableOpacity key={btn.Name}>
                                                    <View style={style.btn}>
                                                        <Image style={style.btnIcon} source={btn.Icon} resizeMode="contain"></Image>
                                                        <MonoText style={style.btnText}>{btn.Name}</MonoText>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }

    Click(){

    }
}

const style=StyleSheet.create({
    contains:{
        width:Layout.window.width,
        height:Layout.window.height,
        backgroundColor:"#efefef"
    },
    btnGroup:{
        borderBottomWidth:0.5,
        borderBottomColor:"#ccc",
        marginTop:20
    },
    btn:{
        height:45,
        borderTopWidth:0.5,
        borderTopColor:"#ccc",
        backgroundColor:"#fff",
        alignItems:'center',
        flexDirection:"row"
    },
    btnIcon:{
        width:30,
        height:30,
        marginLeft:10
    },
    btnText:{
        lineHeight:30,
        marginLeft:10
    }
})