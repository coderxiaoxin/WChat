/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform,StatusBar, StyleSheet, Text, View,BackHandler } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import AppNavigator from './src/route/AppNavigator'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
    );
  }
  componentWillUnmount() {//移除返回按钮事件监听
    this.backHandler && this.backHandler.remove();
  }
  componentDidMount() {//注册返回按钮事件监听
    this.backHandler = BackHandler.addEventListener('hardwareBackPress',
      this.backOption);
  }
  backOption = () => {
    if (current == true) {//如果是在首页
      if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        BackHandler.exitApp();
        return false;
      }

      lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出', ToastAndroid.SHORT);
      return true;
    } else {
      if (this.props && this.props.navigation) {
        this.props.navigator.pop();
      }
    }
  }
  onNavigationStateChange(prevState, newState, action)
    {//注册路由改变监听事件
        if (newState && newState.routes[newState.routes.length - 1].routeName == 'homePage') {//如果当前路由是Home页面，则需要处理安卓物理返回按键。
            current = true;
        } else {
            current = false;
        }
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
