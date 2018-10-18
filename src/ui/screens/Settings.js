import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class Settings extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  render() {
    return (
      <View>
        <Text>Settings Screen</Text>
      </View>
    );
  }
}

export default Settings;
