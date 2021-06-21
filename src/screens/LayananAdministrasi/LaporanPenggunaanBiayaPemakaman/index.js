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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const axios = require('axios');
const moment = require('moment');

class LaporanPenggunaanBiayaPemakaman extends React.Component {
  state = {
    itemPemakaman: [
      {
        nama: '',
        volume: '',
        satuan: '',
        harga: '',
      },
    ],
    hubungan_keluarga: '',
    uang_nominal: '',
    unag_kalimat: '',
    nama_almarhum: '',
    visible: false,
    modalVisible: false,
    token: '',
  };
  componentDidMount() {
    AsyncStorage.getItem('access').then((value) => {
      this.setState({token: value});
    });
  }
  tambahItemPemakaman = () => {
    this.state.itemPemakaman.push({
      nama: '',
      volume: '',
      satuan: '',
      harga: '',
    });
    this.setState({ahliWaris: this.state.ahliWaris});
  };
  deleteItemPemakaman = (index) => {
    const newDelete = this.state.itemPemakaman.filter((value, key) => {
      return index != key;
    });
    this.setState({itemPemakaman: newDelete});
  };
  inputNamaItem = (text, index) => {
    const {itemPemakaman} = this.state;
    const newItemPemakaman = [...itemPemakaman];
    newItemPemakaman[index].nama = text;
    this.setState({itemPemakaman: newItemPemakaman});
  };
  inputVolumeItem = (text, index) => {
    const {itemPemakaman} = this.state;
    const newItemPemakaman = [...itemPemakaman];
    newItemPemakaman[index].volume = text;
    this.setState({itemPemakaman: newItemPemakaman});
  };
  inputSatuanItem = (text, index) => {
    const {itemPemakaman} = this.state;
    const newItemPemakaman = [...itemPemakaman];
    newItemPemakaman[index].satuan = text;
    this.setState({itemPemakaman: newItemPemakaman});
  };
  inputHargaItem = (text, index) => {
    const {itemPemakaman} = this.state;
    const newItemPemakaman = [...itemPemakaman];
    newItemPemakaman[index].harga = text;
    this.setState({itemPemakaman: newItemPemakaman});
  };
  tambahLayanan = () => {
    const {
      hubungan_keluarga,
      uang_nominal,
      unag_kalimat,
      nama_almarhum,
      itemPemakaman,
    } = this.state;
    let blankName = 0;
    let blankVolume = 0;
    let blankSatuan = 0;
    let blankHarga = 0;

    for (let x = 0; x < itemPemakaman.length; x++) {
      if (itemPemakaman[x].nama == '') {
        blankName += 1;
      } else if (itemPemakaman[x].volume == '') {
        blankVolume += 1;
      } else if (itemPemakaman[x].satuan == '') {
        blankSatuan += 1;
      } else if (itemPemakaman[x].harga == '') {
        blankHarga += 1;
      }
    }

    if (
      hubungan_keluarga != '' &&
      uang_nominal != '' &&
      unag_kalimat != '' &&
      nama_almarhum != '' &&
      blankName == 0 &&
      blankVolume == 0 &&
      blankSatuan == 0 &&
      blankHarga == 0 &&
      itemPemakaman.length != 0
    ) {
      this.setState({modalVisible: true});
      const url = 'https://api.istudios.id/v1/layanansurat/biayapemakaman/';

      const datas = {
        atribut: {
          hubungan_keluarga: hubungan_keluarga,
          uang_nominal: uang_nominal,
          uang_kalimat: unag_kalimat,
          nama_almarhum: nama_almarhum,
          item_pemakaman: itemPemakaman,
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
        <ScrollView style={styles.scroll}>
          <View style={styles.boxTitle}>
            <Text
              onPress={() => console.log(this.state.ahliWaris)}
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: 'grey',
              }}>
              Laporan Penggunaan Biaya Pemakaman
            </Text>
          </View>
          <View
            style={{width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Hubungan Keluarga
            </Text>
            <TextInput
              value={this.state.hubungan_keluarga}
              onChangeText={(teks) => this.setState({hubungan_keluarga: teks})}
              style={{
                width: '100%',
                height: 45,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'grey',
              }}
            />
          </View>
          <View
            style={{width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Uang Nominal
            </Text>
            <TextInput
              value={this.state.uang_nominal}
              onChangeText={(teks) => this.setState({uang_nominal: teks})}
              keyboardType="numeric"
              style={{
                width: '100%',
                height: 45,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'grey',
              }}
            />
          </View>
          <View
            style={{width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Uang Kalimat
            </Text>
            <TextInput
              value={this.state.unag_kalimat}
              onChangeText={(teks) => this.setState({unag_kalimat: teks})}
              keyboardType="numeric"
              style={{
                width: '100%',
                height: 45,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'grey',
              }}
            />
          </View>
          <View
            style={{width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Nama Almarhum
            </Text>
            <TextInput
              value={this.state.nama_almarhum}
              onChangeText={(teks) => this.setState({nama_almarhum: teks})}
              style={{
                width: '100%',
                height: 45,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'grey',
              }}
            />
          </View>
          <View
            style={{width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Item Pemakaman
            </Text>
            <TouchableNativeFeedback onPress={() => this.tambahItemPemakaman()}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 150,
                  height: 35,
                  backgroundColor: '#61d1de',
                  borderRadius: 3,
                }}>
                <Icon name="plus" size={20} color="white" />
                <Text style={{color: 'white', marginLeft: 5}}>Tambah List</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          {this.state.itemPemakaman.map((value, key) => {
            return (
              <View style={{width: '100%'}} key={key}>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      color: 'grey',
                      fontWeight: 'bold',
                    }}>
                    Nama
                  </Text>
                  <TextInput
                    value={value.nama}
                    onChangeText={(text) => this.inputNamaItem(text, key)}
                    style={{
                      width: '100%',
                      height: 45,
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: 'grey',
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      color: 'grey',
                      fontWeight: 'bold',
                    }}>
                    Volume
                  </Text>
                  <TextInput
                    value={value.volume}
                    keyboardType="numeric"
                    onChangeText={(text) => this.inputVolumeItem(text, key)}
                    style={{
                      width: '100%',
                      height: 45,
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: 'grey',
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      color: 'grey',
                      fontWeight: 'bold',
                    }}>
                    Satuan
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    value={value.satuan}
                    onChangeText={(text) => this.inputSatuanItem(text, key)}
                    style={{
                      width: '100%',
                      height: 45,
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: 'grey',
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      color: 'grey',
                      fontWeight: 'bold',
                    }}>
                    Harga
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    value={value.harga}
                    onChangeText={(text) => this.inputHargaItem(text, key)}
                    style={{
                      width: '100%',
                      height: 45,
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: 'grey',
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}>
                  <TouchableNativeFeedback
                    onPress={() => this.deleteItemPemakaman(key)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 150,
                        height: 35,
                        backgroundColor: '#ff9c96',
                        borderRadius: 3,
                      }}>
                      <Icon name="trash" size={20} color="white" />
                      <Text style={{color: 'white', marginLeft: 5}}>
                        Hapus List
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            );
          })}
          <View
            style={{
              width: '100%',
              paddingHorizontal: 10,
              paddingVertical: 15,
              flexDirection: 'row',
            }}>
            <TouchableNativeFeedback onPress={() => this.tambahLayanan()}>
              <View
                style={{
                  height: 40,
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  backgroundColor: '#61d1de',
                }}>
                <Text style={{color: 'white'}}>Submit</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.goBack()}>
              <View
                style={{
                  height: 40,
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  backgroundColor: '#ff9c96',
                  marginLeft: 20,
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
export default LaporanPenggunaanBiayaPemakaman;

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
