import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import PluginScreen from '../screens/PluginScreen';
import MyScreen from '../screens/MyScreen';

export default createBottomTabNavigator({
  HomeScreen,
  ContactScreen,
  PluginScreen,
  MyScreen
}, {
  navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case "HomeScreen": return (
            <TabBarIcon
              focused={focused}
              img={require('../assets/tabBarIcon/chat.png')}
              focusimg={require('../assets/tabBarIcon/chat_focus.png')}
            />
          );
          case "ContactScreen":return (
            <TabBarIcon
              focused={focused}
              img={require('../assets/tabBarIcon/contact.png')}
              focusimg={require('../assets/tabBarIcon/contact_focus.png')}
            />
          );
          case "PluginScreen":return (
            <TabBarIcon
              focused={focused}
              img={require('../assets/tabBarIcon/plugin.png')}
              focusimg={require('../assets/tabBarIcon/plugin_focus.png')}
            />
          );
          case "MyScreen":return (
            <TabBarIcon
              focused={focused}
              img={require('../assets/tabBarIcon/my.png')}
              focusimg={require('../assets/tabBarIcon/my_focus.png')}
            />
          )
        }
      }
    })
  })