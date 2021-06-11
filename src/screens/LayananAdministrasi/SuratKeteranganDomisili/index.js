import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput,
  ImageBackground,
  ToastAndroid,
  Modal,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SuratKeteranganDomisili extends React.Component {
  state = {
    icon: true,
    promosi: false,
    nama: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    agama: '',
    pekerjaan: '',
    alamat: '',
    keperluan: '',
    token: '',
    modalVisible: false,
    loading: false,
  };
  componentDidMount() {
    this.getData();
  }

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
              tempatLahir: reJson.profile.tempat_lahir,
              tanggalLahir: reJson.profile.tanggal_lahir,
              jenisKelamin: reJson.profile.kelamin,
              alamat: reJson.profile.alamat,
              agama: reJson.profile.agama,
              pekerjaan: reJson.profile.pekerjaan,
              token: value,
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
          this.setState({loading: false});
          console.log(er);
          ToastAndroid.show(
            'Gagal mengambil data',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    });
  };
  iconRender = () => {
    if (this.state.icon) {
      return (
        <Icon
          name="plus"
          size={20}
          onPress={() => this.setState({icon: !this.state.icon})}
          color="#444444"
        />
      );
    } else {
      return (
        <Icon
          name="minus"
          size={20}
          onPress={() => this.setState({icon: !this.state.icon})}
          color="#444444"
        />
      );
    }
  };

  accordion = () => {
    if (this.state.icon) {
      return false;
    } else {
      return (
        <View style={styles.persyaratanContentBox2}>
          <Text style={{marginBottom: 10, color: '#444444'}}>
            Persyaratan yang harus dibawa :{'\n'}1.KTP{'\n'}2.Formulir isian
          </Text>
          <Text style={{color: '#444444'}}>
            Alur layanan :{'\n'}1.Pengisian form{'\n'}2.Ambil surat di kantor
            desa
          </Text>
        </View>
      );
    }
  };
  tambahLayanan = () => {
    this.setState({modalVisible: true});
    const url = 'https://api.istudios.id/v1/domisili/';

    const formData = new FormData();
    formData.append('keperluan', this.state.keperluan);
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
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
          this.setState({modalVisible: false});
        } else {
          ToastAndroid.show(
            'Gagal ditambahkan',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.setState({modalVisible: false});
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
  };
  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            ToastAndroid.show(
              'Tunggu proses selesai',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                height: 100,
                width: 100,
                backgroundColor: 'white',
                elevation: 5,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#19d2ba" />
              <Text>Loading...</Text>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={30}
            color="white"
            onPress={() => this.props.navigation.goBack()}
          />
          <Text style={styles.textHeader}>Layanan</Text>
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
          <View style={styles.boxTitle}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: 'grey',
              }}>
              Surat Keterangan Domisili
            </Text>
          </View>
          <View style={styles.boxTitle2}>
            <View style={styles.persyaratanContent}>
              <View style={styles.persyaratanContentBox}>
                <Text style={styles.textPersyaratan}>Persyaratan dan Alur</Text>
                {this.iconRender()}
              </View>
              {this.accordion()}
            </View>
          </View>
          <Text style={{padding: 10, color: '#444444'}}>
            Silakan lengkapi isian di bawah ini
          </Text>
          <View style={styles.boxInput}>
            <View style={styles.childBoxInput}>
              <Text style={styles.label}>Nama Lengkap</Text>
              {/* <TextInput style={styles.textInput} /> */}
              <View
                style={{
                  ...styles.textInput,
                  justifyContent: 'center',
                  padding: 5,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                }}>
                <Text>{this.state.nama}</Text>
              </View>
            </View>
          </View>
          <View style={styles.boxInput}>
            <View style={styles.childBoxInput}>
              <Text style={styles.label}>Tempat/ Tanggal Lahir</Text>
              <View
                style={{
                  ...styles.textInput,
                  justifyContent: 'center',
                  padding: 5,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                }}>
                <Text>
                  {this.state.tempatLahir}, {this.state.tanggalLahir}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.boxInput}>
            <View style={styles.childBoxInput}>
              <Text style={styles.label}>Jenis Kelamin</Text>
              <View
                style={{
                  ...styles.textInput,
                  justifyContent: 'center',
                  padding: 5,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                }}>
                <Text>{this.state.jenisKelamin}</Text>
              </View>
            </View>
          </View>
          <View style={styles.boxInput}>
            <View style={styles.childBoxInput}>
              <Text style={styles.label}>Agama</Text>
              <View
                style={{
                  ...styles.textInput,
                  justifyContent: 'center',
                  padding: 5,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                }}>
                <Text>{this.state.agama}</Text>
              </View>
            </View>
          </View>
          <View style={styles.boxInput}>
            <View style={styles.childBoxInput}>
              <Text style={styles.label}>Pekerjaan</Text>
              <View
                style={{
                  ...styles.textInput,
                  justifyContent: 'center',
                  padding: 5,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                }}>
                <Text>{this.state.pekerjaan}</Text>
              </View>
            </View>
          </View>
          <View style={styles.boxInput}>
            <View style={styles.childBoxInput}>
              <Text style={styles.label}>Alamat</Text>
              <View
                style={{
                  ...styles.textInput,
                  justifyContent: 'center',
                  padding: 5,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                }}>
                <Text>{this.state.alamat}</Text>
              </View>
            </View>
          </View>
          <View style={styles.boxInput}>
            <View style={styles.childBoxInput}>
              <Text style={styles.label}>Keperluan</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.keperluan}
                onChangeText={(teks) => this.setState({keperluan: teks})}
              />
            </View>
          </View>
          <View style={styles.boxLogout}>
            <TouchableNativeFeedback>
              <View style={styles.buttonLogout}>
                <Text
                  style={styles.textButtonLogout}
                  onPress={() => this.tambahLayanan()}>
                  SUBMIT
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default SuratKeteranganDomisili;

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
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#19D2BA',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  textHeader: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  boxContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContent: {
    height: 100,
    width: '100%',
    backgroundColor: 'orange',
    borderRadius: 5,
    elevation: 3,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  images: {
    height: 80,
    width: 80,
    borderRadius: 5,
  },
  text1: {
    marginLeft: 5,
    width: '60%',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  boxTitle: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  boxTitle2: {
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  boxInput: {
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  childBoxInput: {
    width: '100%',
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
    borderColor: '#d1d1d1',
    backgroundColor: 'white',
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
  boxLogout: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogout: {
    height: 45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19D2BA',
    borderRadius: 5,
    elevation: 5,
  },
  textButtonLogout: {
    color: 'white',
  },
  persyaratanContent: {
    width: '100%',
    padding: 5,
    backgroundColor: '#ffeab1',
    borderRadius: 5,
  },
  persyaratanContentBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  persyaratanContentBox2: {
    width: '100%',
    padding: 10,
  },
  textPersyaratan: {
    fontWeight: 'bold',
    color: '#444444',
  },
});
