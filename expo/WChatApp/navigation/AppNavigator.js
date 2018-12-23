import React from 'react';
import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';


var MainTab = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});

export default AppNavigator = createStackNavigator({
  "Main": MainTab,
  "Chat":HomeScreen
}, {
    initialRouteName: "Main",
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal
    }),
    navigationOptions: (options) => {
      console.log(options);
      return {
        title:options.navigation.state.routeName,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
  });


// const AppContainer = createAppContainer(AppNavigator);
// export default AppContainer;