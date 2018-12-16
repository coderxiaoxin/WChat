import React from 'react';
import { createSwitchNavigator,createAppContainer,createStackNavigator  } from 'react-navigation';
import ChatScreen from '../screens/ChatScreen'
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import MainTabNavigator from './MainTabNavigator';

var MainTab= createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});

var AppNavigator=createStackNavigator({
  "Main":MainTab,
  "Chat":ChatScreen
},{
  initialRouteName: "Main",
  transitionConfig:()=>({
    screenInterpolator:CardStackStyleInterpolator.forHorizontal
  })
});


const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;