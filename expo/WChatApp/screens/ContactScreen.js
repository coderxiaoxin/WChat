import React, { Component } from 'react';
import { Text, View,StyleSheet,StatusBar } from 'react-native';

export default class ContactScreen extends React.Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        title: '联系人',
    };

    render(){
        return(
            <View style={styles.contairs}>
            <StatusBar
                translucent={false}
                hidden={false}
                animated={true}
                barStyle={'dark-content'}
                ref={(c) => this.statusBar = c}
                backgroundColor={'black'}
                StatusBarAnimation={'slide  '}
            />
                <Text>123</Text>
                </View>
        )
    }
}

const styles=StyleSheet.create({
    contairs:{
        flex:1
    }
})
