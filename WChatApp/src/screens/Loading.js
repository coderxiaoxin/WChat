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
    DeviceEventEmitter,
    ImageBackground 
} from 'react-native';
import Layout from '../compos/Layout'

export default class Loading extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <ImageBackground  source={require('../assets/img/image/loading.jpeg')} resizeMode="cover" style={{width:Layout.window.width,height:Layout.window.height,alignItems: 'center',}}>
                    <Image source={require('../assets/img/image/logo.png')} resizeMethod="auto" style={{width:100,height:100,marginTop:130}}></Image>
                    <View style={{flex:1}}></View>
                    <Text style={{marginBottom:50}}>加载中...</Text>
                </ImageBackground >
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }
  });
  