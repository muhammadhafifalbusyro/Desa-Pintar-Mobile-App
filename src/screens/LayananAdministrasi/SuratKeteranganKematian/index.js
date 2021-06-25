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

const axios = require('axios');
class SuratKeteranganKematian extends React.Component {
  state = {
    data: [],
    token: '',
    loading: false,
    modalVisible: false,
    visible: false,
    defaultName: 'Select ...',
    pendudukID: '',
  };
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    this.setState({loading: true});
    AsyncStorage.getItem('access').then((value) => {
      const url = 'https://api.istudios.id/v1/kematian/';
      fetch(url, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson.data) {
            this.setState({data: resJson.data, token: value, loading: false});
            ToastAndroid.show(
              'Data berhasil didapatkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else {
            this.setState({loading: false});
            ToastAndroid.show(
              'Data gagal di dapatkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        })
        .catch((er) => {
          this.setState({loading: false});
          ToastAndroid.show(
            'Network error',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    });
  };
  tambahLayanan = () => {
    const {pendudukID, defaultName} = this.state;

    if (defaultName != 'Select ...') {
      this.setState({modalVisible: true});
      const url = 'https://api.istudios.id/v1/layanansurat/kematian/';

      const datas = {
        atribut: {
          kematian_id: pendudukID,
        },
      };
      axios
        .post(url, datas, {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        })
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
    } else {
      ToastAndroid.show(
        'Data tidak boleh kosong',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.visible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => this.setState({visible: false})}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}>
            <View
              style={{
                height: '40%',
                width: '90%',
                backgroundColor: 'white',
                elevation: 5,
                borderRadius: 5,
              }}>
              <View
                style={{
                  height: 50,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: 'rgba(0,0,0,0.3)',
                }}>
                <Text style={{fontWeight: 'bold', color: '#444444'}}>
                  Pilih Nama
                </Text>
              </View>
              <ScrollView style={{flex: 1, padding: 10}}>
                {this.state.data.map((value, key) => {
                  return (
                    <View
                      key={key}
                      style={{
                        height: 40,
                        marginBottom: 3,
                        width: '100%',
                        padding: 5,
                        borderBottomWidth: 1,
                        borderColor: 'rgba(0,0,0,0.3)',
                      }}>
                      <Text
                        onPress={() =>
                          this.setState({
                            defaultName: value.nama,
                            pendudukID: value.id,
                            visible: false,
                          })
                        }>
                        {value.nama}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>
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
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}>
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
              Surat Keterangan Kematian
            </Text>
          </View>
          <View
            style={{paddingHorizontal: 10, paddingBottom: 5, paddingTop: 10}}>
            <Text style={{color: 'grey', fontWeight: 'bold'}}>Kematian</Text>
          </View>
          <View style={{padding: 10, width: '100%'}}>
            <View
              style={{
                height: 45,
                width: '100%',
                flexDirection: 'row',
                borderRadius: 5,
                borderColor: 'grey',
                borderWidth: 1,
                alignItems: 'center',
                paddingHorizontal: 5,
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#444444'}}>{this.state.defaultName}</Text>
              <View
                style={{
                  height: 35,
                  width: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderLeftWidth: 1,
                  borderColor: 'grey',
                }}>
                <Icon
                  name="chevron-down"
                  size={30}
                  color="grey"
                  onPress={() => this.setState({visible: true})}
                />
              </View>
            </View>
          </View>
          <View style={{padding: 10, flexDirection: 'row', width: '100%'}}>
            <TouchableNativeFeedback onPress={() => this.tambahLayanan()}>
              <View
                style={{
                  height: 40,
                  width: 100,
                  backgroundColor: '#61d1de',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>Submit</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => this.props.navigaiton.goBack()}>
              <View
                style={{
                  height: 40,
                  width: 100,
                  backgroundColor: '#ff9c96',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Text style={{color: 'white'}}>Batal</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default SuratKeteranganKematian;

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
