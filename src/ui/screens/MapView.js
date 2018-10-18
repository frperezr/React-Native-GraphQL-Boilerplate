import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class MapView extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  render() {
    return (
      <View>
        <Text>MapView Screen</Text>
      </View>
    );
  }
}

export default MapView;
