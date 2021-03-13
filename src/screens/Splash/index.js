import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableNativeFeedback,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

class Splash extends React.Component {
  componentDidMount = () => {
    // Remember the timer handle
    this.timerHandle = setTimeout(() => {
      this.props.navigation.replace('Login');
      this.timerHandle = 0;
    }, 4000);
  };
  componentWillUnmount = () => {
    // Is our timer running?
    if (this.timerHandle) {
      // Yes, clear it
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/desapintar.png')}
          style={{height: 100, width: 200}}
          resizeMode="contain"
        />
        <ActivityIndicator
          size="large"
          color="#19D2BA"
          style={{marginTop: 20}}
        />
      </View>
    );
  }
}
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
