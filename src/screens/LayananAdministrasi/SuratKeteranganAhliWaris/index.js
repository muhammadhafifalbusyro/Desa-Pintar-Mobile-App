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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const heigtDim = Dimensions.get('window').height;
const axios = require('axios');

class SuratKeteranganAhliWaris extends React.Component {
  state = {
    ahliWaris: [
      {
        nama: '',
        pekerjaan: '',
        umur: '',
        alamat: '',
      },
    ],
    indexPekerjaanList: '',
    pekerjaanList: [
      {
        id: 1,
        nama: 'dokter',
      },
      {
        id: 2,
        nama: 'programmer',
      },
    ],
    visiblePekerjaanList: false,
    data: [],
    visible: false,
    modalVisible: false,
    defaultAlmarhum: 'Select ...',
    nama_pasangan: '',
    pekerjaan_pasangan: '',
    umur_pasangan: '',
    alamat_pasangan: '',
    nama_saksi1: '',
    pekerjaan_saksi1: '',
    umur_saksi1: '',
    alamat_saksi1: '',
    nama_saksi2: '',
    pekerjaan_saksi2: '',
    umur_saksi2: '',
    alamat_saksi2: '',
    kematian_id: '',
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
    const {
      defaultAlmarhum,
      kematian_id,
      nama_pasangan,
      pekerjaan_pasangan,
      umur_pasangan,
      alamat_pasangan,
      nama_saksi1,
      pekerjaan_saksi1,
      umur_saksi1,
      alamat_saksi1,
      nama_saksi2,
      pekerjaan_saksi2,
      umur_saksi2,
      alamat_saksi2,
      ahliWaris,
    } = this.state;

    let blankNama = 0;
    let blankPekerjaan = 0;
    let blankUmur = 0;
    let blankAlamat = 0;

    for (let x = 0; x < ahliWaris.length; x++) {
      if (ahliWaris[x].nama == '') {
        blankNama += 1;
      } else if (ahliWaris[x].pekerjaan == '') {
        blankPekerjaan += 1;
      } else if (ahliWaris[x].umur == '') {
        blankUmur += 1;
      } else if (ahliWaris[x].alamat == '') {
        blankAlamat += 1;
      }
    }
    if (
      defaultAlmarhum != 'Select ...' &&
      nama_pasangan != '' &&
      pekerjaan_pasangan != '' &&
      umur_pasangan != '' &&
      alamat_pasangan != '' &&
      nama_saksi1 != '' &&
      pekerjaan_saksi1 != '' &&
      umur_saksi1 != '' &&
      alamat_saksi1 != '' &&
      nama_saksi2 != '' &&
      umur_saksi2 != '' &&
      pekerjaan_saksi2 != '' &&
      alamat_saksi2 != '' &&
      blankNama == 0 &&
      blankUmur == 0 &&
      blankPekerjaan == 0 &&
      blankAlamat == 0 &&
      ahliWaris.length != 0
    ) {
      this.setState({modalVisible: true});
      const url = 'https://api.istudios.id/v1/layanansurat/skaw/';

      const datas = {
        atribut: {
          kematian_id,
          pasangan: {
            nama: nama_pasangan,
            pekerjaan: pekerjaan_pasangan,
            umur: umur_pasangan,
            alamat: alamat_pasangan,
            tanggal_meninggal: '2020-01-01',
          },
          ahli_waris: ahliWaris,
          saksi: [
            {
              nama: nama_saksi1,
              pekerjaan: pekerjaan_saksi1,
              umur: umur_saksi1,
              alamat: alamat_saksi1,
            },
            {
              nama: nama_saksi2,
              pekerjaan: pekerjaan_saksi2,
              umur: umur_saksi2,
              alamat: alamat_saksi2,
            },
          ],
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
          console.log(er.response);
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
  inputNamaAhliWaris = (text, index) => {
    const {ahliWaris} = this.state;
    const newAhliWaris = [...ahliWaris];
    newAhliWaris[index].nama = text;
    this.setState({ahliWaris: newAhliWaris});
  };
  _inputPekerjaanAhliWaris = (job) => {
    const {ahliWaris, indexPekerjaanList} = this.state;
    const newAhliWaris = [...ahliWaris];
    newAhliWaris[indexPekerjaanList].pekerjaan = job;
    this.setState({ahliWaris: newAhliWaris, visiblePekerjaanList: false});
  };
  inputPekerjaanAhliWaris = (text, index) => {
    const {ahliWaris} = this.state;
    const newAhliWaris = [...ahliWaris];
    newAhliWaris[index].pekerjaan = text;
    this.setState({ahliWaris: newAhliWaris});
  };
  inputUmurAhliWaris = (text, index) => {
    const {ahliWaris} = this.state;
    const newAhliWaris = [...ahliWaris];
    newAhliWaris[index].umur = text;
    this.setState({ahliWaris: newAhliWaris});
  };
  inputAlamatAhliWaris = (text, index) => {
    const {ahliWaris} = this.state;
    const newAhliWaris = [...ahliWaris];
    newAhliWaris[index].alamat = text;
    this.setState({ahliWaris: newAhliWaris});
  };

  deleteAhliWaris = (index) => {
    const newDelete = this.state.ahliWaris.filter((value, key) => {
      return index != key;
    });
    this.setState({ahliWaris: newDelete});
  };
  tambahAhliWaris = () => {
    this.state.ahliWaris.push({
      nama: '',
      pekerjaan: '',
      umur: '',
      alamat: '',
    });
    this.setState({ahliWaris: this.state.ahliWaris});
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
                            defaultAlmarhum: value.nama,
                            kematian_id: value.id,
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
        {/* <Modal
          visible={this.state.visiblePekerjaanList}
          animationType="slide"
          transparent={true}
          onRequestClose={() => this.setState({visiblePekerjaanList: false})}>
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
                <Text style={{fontWeight: 'bold', color: 'grey'}}>
                  Pilih Pekerjaan
                </Text>
              </View>
              <ScrollView style={{flex: 1, padding: 10}}>
                {this.state.pekerjaanList.map((value, key) => {
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
                        style={{color: 'grey'}}
                        onPress={() =>
                          this.inputPekerjaanAhliWaris(value.nama)
                        }>
                        {value.nama}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal> */}
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
              Surat Keterangan Ahli Waris
            </Text>
          </View>
          <View
            style={{paddingHorizontal: 10, paddingBottom: 5, paddingTop: 10}}>
            <Text style={{color: 'grey', fontWeight: 'bold'}}>Almarhum</Text>
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
              <Text style={{color: '#444444'}}>
                {this.state.defaultAlmarhum}
              </Text>
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
          <View
            style={{width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Nama Pasangan
            </Text>
            <TextInput
              value={this.state.nama_pasangan}
              onChangeText={(teks) => this.setState({nama_pasangan: teks})}
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
              Pekerjaan Pasangan
            </Text>
            <TextInput
              value={this.state.pekerjaan_pasangan}
              onChangeText={(teks) => this.setState({pekerjaan_pasangan: teks})}
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
              Umur Pasangan
            </Text>
            <TextInput
              value={this.state.umur_pasangan}
              onChangeText={(teks) => this.setState({umur_pasangan: teks})}
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
              Alamat Pasangan
            </Text>
            <TextInput
              value={this.state.alamat_pasangan}
              onChangeText={(teks) => this.setState({alamat_pasangan: teks})}
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
              Nama Saksi 1
            </Text>
            <TextInput
              value={this.state.nama_saksi1}
              onChangeText={(teks) => this.setState({nama_saksi1: teks})}
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
              Pekerjaan Saksi 1
            </Text>
            <TextInput
              value={this.state.pekerjaan_saksi1}
              onChangeText={(teks) => this.setState({pekerjaan_saksi1: teks})}
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
              Umur Saksi 1
            </Text>
            <TextInput
              value={this.state.umur_saksi1}
              onChangeText={(teks) => this.setState({umur_saksi1: teks})}
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
              Alamat Saksi 1
            </Text>
            <TextInput
              value={this.state.alamat_saksi1}
              onChangeText={(teks) => this.setState({alamat_saksi1: teks})}
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
              Nama Saksi 2
            </Text>
            <TextInput
              value={this.state.nama_saksi2}
              onChangeText={(teks) => this.setState({nama_saksi2: teks})}
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
              Pekerjaan Saksi 2
            </Text>
            <TextInput
              value={this.state.pekerjaan_saksi2}
              onChangeText={(teks) => this.setState({pekerjaan_saksi2: teks})}
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
              Umur Saksi 2
            </Text>
            <TextInput
              value={this.state.umur_saksi2}
              onChangeText={(teks) => this.setState({umur_saksi2: teks})}
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
              Alamat Saksi 2
            </Text>
            <TextInput
              value={this.state.alamat_saksi2}
              onChangeText={(teks) => this.setState({alamat_saksi2: teks})}
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
              Ahli Waris
            </Text>
            <TouchableNativeFeedback onPress={() => this.tambahAhliWaris()}>
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
          {this.state.ahliWaris.map((value, key) => {
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
                    onChangeText={(text) => this.inputNamaAhliWaris(text, key)}
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
                    Pekerjaan
                  </Text>
                  <TextInput
                    value={value.pekerjaan}
                    onChangeText={(text) =>
                      this.inputPekerjaanAhliWaris(text, key)
                    }
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
                    Umur
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    value={value.umur}
                    onChangeText={(text) => this.inputUmurAhliWaris(text, key)}
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
                    Alamat
                  </Text>
                  <TextInput
                    value={value.alamat}
                    onChangeText={(text) =>
                      this.inputAlamatAhliWaris(text, key)
                    }
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
                    onPress={() => this.deleteAhliWaris(key)}>
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
              onPress={() => this.props.navigation.goBack()}>
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
export default SuratKeteranganAhliWaris;

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
