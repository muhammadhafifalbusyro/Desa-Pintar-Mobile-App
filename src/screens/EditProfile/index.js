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
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

class EditProfile extends React.Component {
  state = {
    nama: '',
    nik: '',
    tanggalLahir: '',
    tempatLahir: '',
    alamat: '',
    jenisKelamin: '',
    pendidikanTerakhir: '',
    potensi: '',
    no_hp: '',
    loading: false,
    loadingSimpan: false,
  };
  componentDidMount() {
    this.getData();
  }
  updateData = () => {
    AsyncStorage.getItem('access').then((value) => {
      this.setState({loadingSimpan: true});
      const url = `https://api.istudios.id/v1/penduduk/${this.state.id}/`;
      const formData = new FormData();
      formData.append('nik', this.state.nik);
      formData.append('no_hp', this.state.no_hp),
        formData.append('pendidikan', this.state.pendidikanTerakhir);
      fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${value}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
          if (resJson.data) {
            ToastAndroid.show(
              'Berhasil ditambahkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            this.setState({loadingSimpan: false});
            this.props.navigation.goBack();
          } else {
            ToastAndroid.show(
              'Gagal ditambahkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            this.setState({loadingSimpan: false});
          }
        })
        .catch((er) => {
          console.log(er);
          ToastAndroid.show(
            'Jaringan error',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.setState({modalVisible: false});
        });
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
              id: reJson.profile.id,
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
          this.setState({loading: false});
          console.log(er);
          ToastAndroid.show(
            'Jaringan error',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    });
  };
  render() {
    return (
      <View style={styles.container}>
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
              {this.state.loadingSimpan ? (
                <View style={styles.buttonEditProfile}>
                  <ActivityIndicator size="small" color="white" />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.buttonEditProfile}
                  activeOpacity={0.8}
                  delayPressIn={1}
                  onPress={() => this.updateData()}>
                  <Text style={styles.textButtonEditProfile}>Simpan</Text>
                </TouchableOpacity>
              )}
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
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  ...styles.textprofile2,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  width: '90%',
                  height: 40,
                  borderRadius: 5,
                }}
                keyboardType="number-pad"
                value={this.state.no_hp}
                onChangeText={(teks) => this.setState({no_hp: teks})}
              />
              <Icon name="clipboard" size={25} color="#444444" />
            </View>
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
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  ...styles.textprofile2,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  width: '90%',
                  height: 40,
                  borderRadius: 5,
                }}
                value={this.state.pendidikanTerakhir}
                onChangeText={(teks) =>
                  this.setState({pendidikanTerakhir: teks})
                }
              />
              <Icon name="clipboard" size={25} color="#444444" />
            </View>
          </View>
          <View style={styles.boxProfile3}>
            <View>
              <Text style={styles.textProfile}>Potensi</Text>
              <Text style={styles.textprofile2}>{this.state.potensi}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.navigation.navigate('EditPotensi')}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 5,
                backgroundColor: '#19D2BA',
                borderRadius: 3,
              }}>
              <Text style={{color: 'white'}}>Edit Potensi</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default EditProfile;

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
    backgroundColor: '#19D2BA',
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
  boxProfile3: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textProfile: {
    color: '#444444',
  },
  textprofile2: {
    color: '#444444',
    fontWeight: 'bold',
  },
  boxLogout: {
    padding: 15,
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
