import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen'
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../compos/TabBarIcon'

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: '聊天',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ContactStack = createStackNavigator({
  Contact: ContactScreen
})

ContactStack.navigationOptions = {
  tabBarLabel: '联系人',
  tabBarIcon: ({ focused }) => {
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  }
}

export default createBottomTabNavigator({
  Home:HomeStack,
  Contact:ContactStack
})