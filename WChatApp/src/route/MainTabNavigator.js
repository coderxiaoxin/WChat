import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import PluginScreen from '../screens/PluginScreen';
import MyScreen from '../screens/MyScreen'
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../compos/TabBarIcon';

// const HomeStack = createStackNavigator({
//   Home: HomeScreen
// });

// HomeStack.navigationOptions = {
//   tabBarLabel: '聊天',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       img={require('../assets/img/tabBarIcon/chat.png')}
//       focusimg={require('../assets/img/tabBarIcon/chat_focus.png')}
//     />
//   ),
// };

// const ContactStack = createStackNavigator({
//   Contact: ContactScreen
// })

// ContactStack.navigationOptions = {
//   tabBarLabel: '联系人',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       img={require('../assets/img/tabBarIcon/contact.png')}
//       focusimg={require('../assets/img/tabBarIcon/contact_focus.png')}
//     />
//   ),
// };

// const PluginStack = createStackNavigator({
//   Plugin: PluginScreen
// })

// PluginStack.navigationOptions = {
//   tabBarLabel: '发现',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       img={require('../assets/img/tabBarIcon/plugin.png')}
//       focusimg={require('../assets/img/tabBarIcon/plugin_focus.png')}
//     />
//   ),
// };

// const MyStack = createStackNavigator({
//   My: MyScreen
// })

// MyStack.navigationOptions = {
//   tabBarLabel: '我',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       img={require('../assets/img/tabBarIcon/my.png')}
//       focusimg={require('../assets/img/tabBarIcon/my_focus.png')}
//     />
//   )
// };

export default createBottomTabNavigator({
  HomeScreen,
  ContactScreen,
  PluginScreen,
  MyScreen
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case "HomeScreen": return (
            <TabBarIcon
              focused={focused}
              img={require('../assets/img/tabBarIcon/chat.png')}
              focusimg={require('../assets/img/tabBarIcon/chat_focus.png')}
            />
          );
          case "ContactScreen":return (
            <TabBarIcon
              focused={focused}
              img={require('../assets/img/tabBarIcon/contact.png')}
              focusimg={require('../assets/img/tabBarIcon/contact_focus.png')}
            />
          );
          case "PluginScreen":return (
            <TabBarIcon
              focused={focused}
              img={require('../assets/img/tabBarIcon/plugin.png')}
              focusimg={require('../assets/img/tabBarIcon/plugin_focus.png')}
            />
          );
          case "MyScreen":return (
            <TabBarIcon
              focused={focused}
              img={require('../assets/img/tabBarIcon/my.png')}
              focusimg={require('../assets/img/tabBarIcon/my_focus.png')}
            />
          )
        }
      }
    })
  })