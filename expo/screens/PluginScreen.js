import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList
} from 'react-native';
import Layout from '../constants/Layout'
import { MonoText } from '../components/StyledText';

export default class PluginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PluginGroup: [
                [
                    {
                        Name: "朋友圈",
                        Icon: require("../assets/images/朋友圈.png"),
                        Action: {}
                    }
                ], [
                    {
                        Name: "扫一扫",
                        Icon: require("../assets/images/扫一扫.png"),
                        Action: {}
                    }, {
                        Name: "摇一摇",
                        Icon: require("../assets/images/摇一摇.png"),
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