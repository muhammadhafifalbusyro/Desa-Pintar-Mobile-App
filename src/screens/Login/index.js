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
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends React.Component {
  state = {
    username: '7501065706620001',
    password: '19620617',
    // username:'',
    // password:'',
    loading: false,
  };
  login = () => {
    this.setState({loading: true});
    const {username, password} = this.state;
    if (username != '' && password != '') {
      const url = 'https://api.istudios.id/v1/token/';
      const formData = new FormData();
      formData.append('username', this.state.username);
      formData.append('password', this.state.password);
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
          if (resJson.access) {
            AsyncStorage.setItem('access', resJson.access);
            AsyncStorage.setItem('refresh', resJson.refresh);
            this.props.navigation.replace('MainScreens');
            this.setState({loading: false});
          } else if (resJson.detail) {
            ToastAndroid.show(
              resJson.detail,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            this.setState({loading: false});
          } else {
            ToastAndroid.show(
              'Jaringan error',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            this.setState({loading: false});
          }
        })
        .catch((er) => {
          console.log(er);
          ToastAndroid.show(
            'Login gagal',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.setState({loading: false});
        });
    } else {
      ToastAndroid.show(
        'Data tidak boleh kosong',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  loading = () => {
    if (this.state.loading) {
      return <ActivityIndicator size={'small'} color="white" />;
    } else {
      return <Text style={styles.textButton}>LOGIN</Text>;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.boxLogo}>
            <Image source={require('../../assets/images/desapintar.png')} />
          </View>
          <View style={styles.boxInput}>
            <View style={styles.childBoxInput}>
              <Text style={styles.label}>NIK</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.username}
                keyboardType={'number-pad'}
                onChangeText={(teks) => this.setState({username: teks})}
              />
            </View>
          </View>
          <View style={styles.boxInput}>
            <View style={styles.childBoxInput}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(teks) => this.setState({password: teks})}
              />
            </View>
          </View>
          <View style={styles.boxButton}>
            <TouchableNativeFeedback onPress={() => this.login()}>
              <View style={styles.button}>{this.loading()}</View>
            </TouchableNativeFeedback>
          </View>
          <View style={[styles.boxLogo, styles.boxLogoBottom]}>
            <Image source={require('../../assets/images/ilu_login.png')} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    flex: 1,
  },
  boxLogo: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxLogoBottom: {
    height: 200,
  },
  boxInput: {
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  childBoxInput: {
    width: '90%',
  },
  label: {
    marginBottom: 5,
    color: 'grey',
  },
  textInput: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  boxButton: {
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  textButton: {
    color: 'white',
  },
  button: {
    height: 45,
    width: '90%',
    borderRadius: 5,
    borderColor: 'grey',
    backgroundColor: '#19D2BA',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
