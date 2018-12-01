import HomeScreen from '../screens/HomeScreen';
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../compos/TabBarIcon'

const HomeStack = createStackNavigator({
    Home: HomeScreen,
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

  export default createBottomTabNavigator({
    HomeStack
  })