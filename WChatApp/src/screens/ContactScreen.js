import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';

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
