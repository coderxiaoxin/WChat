/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View, BackHandler, DeviceEventEmitter } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import AppNavigator from './src/route/AppNavigator'
var {NativeModules}=require('react-native');
var MPush = NativeModules.MPush;


type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props)
    this.state={
      deviceIdBtnTitle:"123"
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {/* <AppNavigator /> */}
        <Text>456</Text>
        <Text>{this.state.deviceIdBtnTitle}</Text>
      </View>
    );
  }

  getDeviceId() {
    var that = this;
    MPush.getDeviceId(function(args) {
        that.setState({
            deviceIdBtnTitle: args
        });
    });
}
  //绑定事件
  componentDidMount() {
    DeviceEventEmitter.addListener('onMessage', this.onMessage);
    DeviceEventEmitter.addListener('onNotification', this.onNotification);
    this.getDeviceId();
  }
  //解绑事件
  componentWillUnmount() {
    DeviceEventEmitter.removeListener('onMessage', this.onMessage);
    DeviceEventEmitter.removeListener('onNotification', this.onNotification);
  }
  //事件处理逻辑
  onMessage(e) {
    alert("Message Received. Title:" + e.title + ", Content:" + e.content);
  }
  onNotification(e) {
    alert("Notification Received.Title:" + e.title + ", Content:" + e.content);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
