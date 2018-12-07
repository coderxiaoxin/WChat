import React from 'react';
import { createSwitchNavigator,createAppContainer  } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

var AppNavigator= createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});

const AppContainer = createAppContainer(MainTabNavigator);
export default AppContainer;