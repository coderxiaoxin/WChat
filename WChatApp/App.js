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
import AppNavigator from './src/route/AppNavigator';
var { NativeModules } = require('react-native');
var MPush = NativeModules.MPush;
import Store from './src/store/ChatStore'
import Loading from './src/screens/Loading'
import Login from './src/screens/Login'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deviceIdBtnTitle: "123",
      loadingState: false,
      user:null
    }
    var self=this;
    Store._noIdLoad("User",null,null,(res)=>{
      self.setState({
        user:res,
        loadingState:true
      });
    },(err)=>{
      self.setState({
        loadingState:true
      });
    })
  }


  render() {
    return (
      this.state.loadingState?
      this.state.user==null?
        <Login></Login>:
        <AppNavigator style={styles.container} />
        :<Loading></Loading>
    )
    // if (this.state.loadingState) {
    //   return (
    //     this.state.user==null?
    //     <Login></Login>:
    //     <AppNavigator style={styles.container} />
    //   );
    // } else {
    //     return(
    //       <Loading></Loading>
    //     )
    // }
  }
  //绑定事件
  componentDidMount() {
    DeviceEventEmitter.addListener('onMessage', this.onMessage);
    DeviceEventEmitter.addListener('onNotification', this.onNotification);
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
  }
});
