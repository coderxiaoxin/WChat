import React from 'react';
import { Platform, View, Text,Image,StyleSheet,StatusBar,FlatList,TouchableOpacity } from 'react-native';

export default class MyScreen extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View></View>
        )
    }
    static navigationOptions = {
        title: '我',
    };
}