import React from 'react';
import { Platform, View, Text,Image,StyleSheet,StatusBar,FlatList,TouchableOpacity } from 'react-native';

export default class MyScreen extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
            <StatusBar
                translucent={false}
                hidden={false}
                animated={true}
                barStyle={'dark-content'}
                ref={(c) => this.statusBar = c}
                backgroundColor={'black'}
                StatusBarAnimation={'slide  '}
            /></View>
        )
    }
    static navigationOptions = {
        title: '我',
    };
}