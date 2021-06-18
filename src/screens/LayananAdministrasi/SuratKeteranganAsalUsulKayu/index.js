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

class SuratKeteranganAsalUsulKayu extends React.Component {
  state = {
    daftarKayu: [
      {
        jenis: '',
        jumlah: '',
        panjang: '',
        lebar: '',
        tebal: '',
      },
    ],
    jumlahKayu: '',
    nama: '',
    umur: '',
    pekerjaan: '',
    alamat: '',
    kota_tujuan: '',
    modalVisible: false,
    token: '',
  };
  componentDidMount() {
    AsyncStorage.getItem('access').then((value) => {
      this.setState({token: value});
    });
  }

  tambahLayanan = () => {
    const {
      nama_dokumen_salah,
      nama_dokumen_benar,
      nama_orang_salah,
      nama_orang_benar,
    } = this.state;
    if (
      nama_dokumen_salah != '' &&
      nama_orang_salah != '' &&
      nama_dokumen_benar != '' &&
      nama_orang_benar != ''
    ) {
      this.setState({modalVisible: true});
      const url = 'https://api.istudios.id/v1/layanansurat/bedanama/';

      const datas = {
        atribut: {
          dokumen_salah: {
            nama_dokumen: nama_dokumen_salah,
            nama_orang: nama_orang_salah,
          },
          dokumen_benar: {
            nama_dokumen: nama_dokumen_benar,
            nama_orang: nama_orang_benar,
          },
        },
      };
      axios
        .post(url, datas, {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        })
        .then((resJson) => {
          console.log(resJson.data);
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
  inputJenisKayu = (text, index) => {
    const {daftarKayu} = this.state;
    const newDaftarKayu = [...daftarKayu];
    newDaftarKayu[index].jenis = text;
    this.setState({daftarKayu: newDaftarKayu});
  };
  inputJumlahKayu = (text, index) => {
    const {daftarKayu} = this.state;
    const newDaftarKayu = [...daftarKayu];
    newDaftarKayu[index].jumlah = text;
    this.setState({daftarKayu: newDaftarKayu});
  };
  inputPanjangKayu = (text, index) => {
    const {daftarKayu} = this.state;
    const newDaftarKayu = [...daftarKayu];
    newDaftarKayu[index].panjang = text;
    this.setState({daftarKayu: newDaftarKayu});
  };
  inputLebarKayu = (text, index) => {
    const {daftarKayu} = this.state;
    const newDaftarKayu = [...daftarKayu];
    newDaftarKayu[index].lebar = text;
    this.setState({daftarKayu: newDaftarKayu});
  };
  inputTebalKayu = (text, index) => {
    const {daftarKayu} = this.state;
    const newDaftarKayu = [...daftarKayu];
    newDaftarKayu[index].tebal = text;
    this.setState({daftarKayu: newDaftarKayu});
  };
  deleteDaftarKayu = (index) => {
    const newDelete = this.state.daftarKayu.filter((value, key) => {
      return index != key;
    });
    this.setState({daftarKayu: newDelete});
  };
  tambahDaftarKayu = () => {
    this.state.daftarKayu.push({
      jenis: '',
      jumlah: '',
      panjang: '',
      lebar: '',
      tebal: '',
    });
    this.setState({daftarKayu: this.state.daftarKayu});
  };

  totalJumlahKayu = () => {
    const {daftarKayu} = this.state;
    let newJumlahKayu = 0;
    for (let x = 0; x < daftarKayu.length; x++) {
      if (daftarKayu[x].jumlah == '') {
        let jumlah = 0;
        newJumlahKayu += jumlah;
        console.log(daftarKayu);
      } else if (daftarKayu[x].jumlah != '') {
        let jumlah = parseInt(daftarKayu[x].jumlah);
        newJumlahKayu += jumlah;
      }
    }
    return newJumlahKayu;
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
        <ScrollView style={styles.scroll}>
          <View style={styles.boxTitle}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: 'grey',
              }}>
              Surat Keterangan Asal Usul Kayu
            </Text>
          </View>
          <View
            style={{width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Nama
            </Text>
            <TextInput
              value={this.state.nama}
              onChangeText={(teks) => this.setState({nama: teks})}
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
              Umur
            </Text>
            <TextInput
              value={this.state.umur}
              onChangeText={(teks) => this.setState({umur: teks})}
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
              Pekerjaan
            </Text>
            <TextInput
              value={this.state.pekerjaan}
              onChangeText={(teks) => this.setState({pekerjaan: teks})}
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
              Alamat
            </Text>
            <TextInput
              value={this.state.alamat}
              onChangeText={(teks) => this.setState({alamat: teks})}
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
              Kota Tujuan
            </Text>
            <TextInput
              value={this.state.kota_tujuan}
              onChangeText={(teks) => this.setState({kota_tujuan: teks})}
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
              Daftar Kayu
            </Text>
            <TouchableNativeFeedback onPress={() => this.tambahDaftarKayu()}>
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
          {this.state.daftarKayu.map((value, key) => {
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
                    Jenis
                  </Text>
                  <TextInput
                    value={value.jenis}
                    onChangeText={(text) => this.inputJenisKayu(text, key)}
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
                    Jumlah
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    value={value.jumlah}
                    onChangeText={(text) => this.inputJumlahKayu(text, key)}
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
                    Panjang
                  </Text>
                  <TextInput
                    value={value.panjang}
                    onChangeText={(text) => this.inputPanjangKayu(text, key)}
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
                    Lebar
                  </Text>
                  <TextInput
                    value={value.lebar}
                    onChangeText={(text) => this.inputLebarKayu(text, key)}
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
                    Tebal
                  </Text>
                  <TextInput
                    value={value.tebal}
                    onChangeText={(text) => this.inputTebalKayu(text, key)}
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
                    onPress={() => this.deleteDaftarKayu(key)}>
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
              paddingVertical: 5,
            }}>
            <Text
              style={{
                marginBottom: 10,
                color: 'grey',
                fontWeight: 'bold',
              }}>
              Total Jumlah Kayu
            </Text>
            <View
              style={{
                width: '100%',
                height: 45,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'grey',
                justifyContent: 'center',
                padding: 5,
                backgroundColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>{this.totalJumlahKayu()}</Text>
            </View>
          </View>
          <View style={{padding: 10, flexDirection: 'row', width: '100%'}}>
            <TouchableNativeFeedback
              onPress={() => alert('Belum dihubungkan ke API !')}>
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
            <TouchableNativeFeedback>
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
export default SuratKeteranganAsalUsulKayu;

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
