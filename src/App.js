import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { YellowBox } from 'react-native';

import Login from './ui/screens/Login';
import MapViewScreen from './ui/screens/MapView';
import Settings from './ui/screens/Settings';
import { withProvider } from './ui/HOC/ApolloHOC';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
const MapView = withProvider(MapViewScreen);
const Setting = withProvider(Settings);
const AuthStack = createStackNavigator({ Login }, { navigationOptions: { header: null } });
const AppStack = createBottomTabNavigator({
  MapView: {
    screen: MapView,
    navigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-map" color={tintColor} size={24} />
      ),
    },
  },
  Settings: {
    screen: Setting,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-information-circle" color={tintColor} size={24} />
      ),
    },
  },
}, {
  initialRouteName: 'MapView',
  order: ['MapView', 'Settings'],
  navigationOptions: {
    tabBarVisible: true,
  },
  tabBarOptions: {
    activeTintColor: '#B77022',
    inactiveTintColor: 'grey',
    style: {
      backgroundColor: '#323232',
    },
  },
});

const RootStack = createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
