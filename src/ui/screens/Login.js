import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  render() {
    return (
      <View>
        <Text>Login Screen</Text>
      </View>
    );
  }
}

export default Login;
