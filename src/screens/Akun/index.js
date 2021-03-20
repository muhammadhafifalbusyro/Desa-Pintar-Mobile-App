import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  ToastAndroid,
  RefreshControl,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Akun extends React.Component {
  state = {
    nama: '',
    nik: '',
    tempatLahir: '',
    tanggalLahir: '',
    alamat: '',
    jenisKelamin: '',
    pendidikanTerakhir: '',
    potensi: '',
    no_hp: '',
    loading: false,
    modalVisible: false,
    ubahPassword: '',
    confirmPassword: '',
    active: false,
  };
  componentDidMount() {
    this.getData();
  }
  submit = () => {
    AsyncStorage.getItem('access').then((value) => {
      const {ubahPassword, confirmPassword} = this.state;
      const url = 'https://api.istudios.id/v1/users/change_password/';
      if (
        ubahPassword != '' &&
        confirmPassword != '' &&
        ubahPassword == confirmPassword
      ) {
        this.setState({active: true});
        const formData = new FormData();
        formData.append('password', ubahPassword);
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            // this.setState({modalVisible: false});
            if (json.data) {
              this.setState({
                modalVisible: false,
                active: false,
                ubahPassword: '',
                confirmPassword: '',
              });
              ToastAndroid.show(
                'Password Berhasil Diubah',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            } else {
              this.setState({
                modalVisible: false,
                active: false,
                ubahPassword: '',
                confirmPassword: '',
              });
              ToastAndroid.show(
                'Password Gagal Diubah',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }
          })
          .catch((error) => {
            this.setState({
              modalVisible: false,
              active: false,
              ubahPassword: '',
              confirmPassword: '',
            });
            console.log(error);
            ToastAndroid.show(
              'Kesalahan Jaringan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          });
      } else if (
        ubahPassword != '' &&
        confirmPassword != '' &&
        ubahPassword != confirmPassword
      ) {
        ToastAndroid.show(
          'Password Tidak Sama',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        ToastAndroid.show(
          'Data tidak boleh kosong',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    });
  };
  getData = () => {
    AsyncStorage.getItem('access').then((value) => {
      this.setState({loading: true});
      console.log('ini token profil ' + value);
      const url = 'https://api.istudios.id/v1/users/me';
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
        .then((res) => res.json())
        .then((reJson) => {
          console.log(reJson);
          if (reJson.profile) {
            this.setState({
              nama: reJson.profile.nama,
              nik: reJson.profile.nik,
              tempatLahir: reJson.profile.tempat_lahir,
              tanggalLahir: reJson.profile.tanggal_lahir,
              jenisKelamin: reJson.profile.kelamin,
              pendidikanTerakhir: reJson.profile.pendidikan,
              potensi: reJson.profile.potensi,
              alamat: reJson.profile.alamat,
              no_hp: reJson.profile.no_hp,
              loading: false,
            });
            ToastAndroid.show(
              'Berhasil mengambil data',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else {
            this.setState({loading: false});
            ToastAndroid.show(
              'Gagal mengambil data',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        })
        .catch((er) => {
          console.log(er);
          this.setState({loading: false});
          ToastAndroid.show(
            'Jaringan error',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    });
  };
  createTwoButtonAlert = () => {
    Alert.alert('Ubah Password', 'Apa anda yakin untuk mengubahnya ?', [
      {
        text: 'Batalkan',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Ubah', onPress: () => this.submit()},
    ]);
  };
  createTwoButtonAlertLogout = () => {
    Alert.alert('Logout', 'Apa anda yakin keluar akun ?', [
      {
        text: 'Batalkan',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Keluar', onPress: () => this.props.navigation.replace('Login')},
    ]);
  };
  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() =>
            this.setState({
              modalVisible: false,
              ubahPassword: '',
              confirmPassword: '',
            })
          }>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}>
            <View
              style={{
                width: '90%',
                backgroundColor: 'white',
                borderRadius: 5,
                paddingVertical: 30,
                paddingHorizontal: 20,
                alignItems: 'center',
              }}>
              <TextInput
                secureTextEntry={true}
                style={{
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#d1d1d1',
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                placeholder="Buat Kata Sandi Baru"
                value={this.state.ubahPassword}
                onChangeText={(teks) => this.setState({ubahPassword: teks})}
              />
              <TextInput
                secureTextEntry={true}
                style={{
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#d1d1d1',
                  borderRadius: 5,
                }}
                placeholder="Konfirmasi Kata Sandi"
                value={this.state.confirmPassword}
                onChangeText={(teks) => this.setState({confirmPassword: teks})}
              />
              <TouchableNativeFeedback
                onPress={() => this.createTwoButtonAlert()}>
                <View
                  style={{
                    marginTop: 10,
                    height: 50,
                    width: '100%',
                    backgroundColor: '#FA7F72',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {this.state.active == true ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      Ubah
                    </Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Akun</Text>
        </View>
        <ScrollView
          style={styles.scroll}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              colors={['#19D2BA']}
              onRefresh={() => this.getData()}
            />
          }>
          <View style={styles.boxProfile}>
            <Image
              source={require('../../assets/images/ilu_login.png')}
              style={styles.profileImage}
            />
            <View style={styles.profileContent}>
              <Text style={styles.textProfileContent}>{this.state.nama}</Text>
              <Text style={styles.textProfileContent}>{this.state.nik}</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EditProfile')}
                style={styles.buttonEditProfile}
                activeOpacity={0.8}
                delayPressIn={1}>
                <Text style={styles.textButtonEditProfile}>Edit Profil</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.boxProfile2}>
            <Text style={styles.textProfile}>Tempat & Tanggal Lahir</Text>
            <Text style={styles.textprofile2}>
              {this.state.tempatLahir}, {this.state.tanggalLahir}
            </Text>
          </View>
          <View style={styles.boxProfile2}>
            <Text style={styles.textProfile}>Nomor Kontak</Text>
            <Text style={styles.textprofile2}>{this.state.no_hp}</Text>
          </View>
          <View style={styles.boxProfile2}>
            <Text style={styles.textProfile}>Alamat</Text>
            <Text style={styles.textprofile2}>{this.state.alamat}</Text>
          </View>
          <View style={styles.boxProfile2}>
            <Text style={styles.textProfile}>Jenis Kelamin</Text>
            <Text style={styles.textprofile2}>{this.state.jenisKelamin}</Text>
          </View>
          <View style={styles.boxProfile2}>
            <Text style={styles.textProfile}>Pendidikan Terakhir</Text>
            <Text style={styles.textprofile2}>
              {this.state.pendidikanTerakhir}
            </Text>
          </View>
          <View style={styles.boxProfile2}>
            <Text style={styles.textProfile}>Potensi</Text>
            <Text style={styles.textprofile2}>{this.state.potensi}</Text>
          </View>
          <View style={styles.boxPassword}>
            <TouchableNativeFeedback
              onPress={() => this.setState({modalVisible: true})}>
              <View style={{...styles.buttonLogout, backgroundColor: 'orange'}}>
                <Text style={styles.textButtonLogout}>Ubah Password</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.boxLogout}>
            <TouchableNativeFeedback
              onPress={() => this.createTwoButtonAlertLogout()}>
              <View style={styles.buttonLogout}>
                <Text style={styles.textButtonLogout}>LOGOUT</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Akun;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    flex: 1,
  },
  header: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#19D2BA',
  },
  textHeader: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  boxProfile: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  textProfileContent: {
    marginLeft: 10,
    color: '#444444',
  },
  buttonEditProfile: {
    padding: 5,
    backgroundColor: '#FA7F72',
    marginLeft: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 3,
  },
  textButtonEditProfile: {
    color: 'white',
    fontSize: 12,
  },
  boxProfile2: {
    padding: 15,
  },
  textProfile: {
    color: '#444444',
  },
  textprofile2: {
    color: '#444444',
    fontWeight: 'bold',
  },
  boxPassword: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxLogout: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogout: {
    height: 45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA7F72',
    borderRadius: 5,
    elevation: 5,
  },
  textButtonLogout: {
    color: 'white',
  },
});
