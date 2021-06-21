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

class SuratPembagianWarisan extends React.Component {
  state = {
    loading: false,
    kematian: '',
    nama: '',
    tempat_kesepakatan: '',
    tanggalKesepakatan: 'DD/MM/YYYY',
    tanggalMeninggal: 'DD/MM/YYYY',
    visibleTanggalKesepakatan: false,
    visibleTanggalMeninggal: false,
    paramPembagianWarisan: '',
    ahliWaris: [
      {
        nama: '',
        umur: '',
      },
    ],
    pembagianWarisan: [
      {
        nama: '',
        items: [
          {
            nama: '',
            keterangan: '',
          },
        ],
      },
    ],
    data: [],
    kematianID: '',
    defaultName: 'Select ...',
    modalVisible: false,
    visible: false,
    token: '',
    saksi: '',
    warisan_berupa: '',
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
  showTanggalKesepakatan = () => {
    this.setState({visibleTanggalKesepakatan: true});
  };
  hideTanggalKesepakatan = () => {
    this.setState({visibleTanggalKesepakatan: false});
  };
  handleConfirmTanggalKesepakatan = (date) => {
    // console.log(date);
    console.log(moment(date).format('YYYY-MM-DD'));
    this.setState({tanggalKesepakatan: moment(date).format('DD/MM/YYYY')});
    this.hideTanggalKesepakatan();
  };
  showTanggalMeninggal = () => {
    this.setState({visibleTanggalMeninggal: true});
  };
  hideTanggalMeninggal = () => {
    this.setState({visibleTanggalMeninggal: false});
  };
  handleConfirmTanggalMeninggal = (date) => {
    // console.log(date);
    console.log(moment(date).format('YYYY-MM-DD'));
    this.setState({tanggalMeninggal: moment(date).format('DD/MM/YYYY')});
    this.hideTanggalMeninggal();
  };
  inputNamaAhliWaris = (text, index) => {
    const {ahliWaris} = this.state;
    const newAhliWaris = [...ahliWaris];
    newAhliWaris[index].nama = text;
    this.setState({ahliWaris: newAhliWaris});
  };
  inputUmurAhliWaris = (text, index) => {
    const {ahliWaris} = this.state;
    const newAhliWaris = [...ahliWaris];
    newAhliWaris[index].umur = text;
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
      umur: '',
    });
    this.setState({ahliWaris: this.state.ahliWaris});
  };
  tambahPembagianWarisan = () => {
    this.state.pembagianWarisan.push({
      nama: '',
      items: [
        {
          nama: '',
          keterangan: '',
        },
      ],
    });
    this.setState({pembagianWarisan: this.state.pembagianWarisan});
  };
  deletePembagianWarisan = (index) => {
    const newDelete = this.state.pembagianWarisan.filter((value, key) => {
      return index != key;
    });
    this.setState({pembagianWarisan: newDelete});
  };
  inputNamaPembagianWarisan = (text, index) => {
    const {pembagianWarisan} = this.state;
    const newPembagianWarisan = [...pembagianWarisan];
    pembagianWarisan[index].nama = text;
    this.setState({pembagianWarisan: newPembagianWarisan});
  };
  inputItemsNamaPembagianWarisan = (text, index, mainIndex) => {
    const {pembagianWarisan} = this.state;
    const newItemNama = [...pembagianWarisan];
    newItemNama[mainIndex].items[index].nama = text;
    this.setState({pembagianWarisan: newItemNama});
  };
  inputItemsKeteranganPembagianWarisan = (text, index, mainIndex) => {
    const {pembagianWarisan} = this.state;
    const newItemKeterangan = [...pembagianWarisan];
    newItemKeterangan[mainIndex].items[index].keterangan = text;
    this.setState({pembagianWarisan: newItemKeterangan});
  };
  tambahItemsPembagianWarisan = (id) => {
    console.log(id);
    const {pembagianWarisan} = this.state;
    const newTambah = [...pembagianWarisan];
    newTambah[id].items.push({
      nama: '',
      keterangan: '',
    });
    this.setState({pembagianWarisan: newTambah});
  };
  deleteItemsPembagianWarisan = (index, mainIndex) => {
    const {pembagianWarisan} = this.state;
    const newDelete = [...pembagianWarisan];
    const n = newDelete[mainIndex].items.filter((value, key) => {
      return key != index;
    });
    newDelete[mainIndex].items = n;
    this.setState({pembagianWarisan: newDelete});
  };
  tambahLayanan = () => {
    const {
      defaultName,
      kematianID,
      ahliWaris,
      pembagianWarisan,
      nama,
      tanggalKesepakatan,
      tanggalMeninggal,
      tempat_kesepakatan,
      saksi,
      warisan_berupa,
    } = this.state;
    let blankNameAhliWaris = 0;
    let blankUmurAhliWaris = 0;

    for (let x = 0; x < ahliWaris.length; x++) {
      if (ahliWaris[x].nama == '') {
        blankNameAhliWaris += 1;
      } else if (ahliWaris[x].umur == '') {
        blankUmurAhliWaris += 1;
      }
    }

    let blankNamePembagianWarisan = 0;
    for (let x = 0; x < pembagianWarisan.length; x++) {
      if (pembagianWarisan[x].nama == '') {
        blankNamePembagianWarisan += 1;
      }
    }
    let blankNameItemsPembagianWarisan = 0;
    let blankKeteranganItemsPembagianWarisan = 0;
    let itemsWarisanLength = 0;
    for (let x = 0; x < pembagianWarisan.length; x++) {
      if (pembagianWarisan[x].items) {
        if (pembagianWarisan[x].items.length == 0) {
          itemsWarisanLength += 1;
        }
        for (let i = 0; i < pembagianWarisan[x].items.length; i++) {
          if (pembagianWarisan[x].items[i].nama == '') {
            blankNameItemsPembagianWarisan += 1;
          } else if (pembagianWarisan[x].items[i].keterangan == '') {
            blankKeteranganItemsPembagianWarisan += 1;
          }
        }
      }
    }
    let saksiArr = saksi.split(',');
    let warisanBerupaArr = warisan_berupa.split(',');
    console.log('default name= ' + defaultName);
    console.log('nama= ' + nama);
    console.log('tgl kesepakaatn= ' + tanggalKesepakatan);
    console.log('tanggalMeninggal= ' + tanggalMeninggal);
    console.log('tempat_kesepakatan= ' + tempat_kesepakatan);
    console.log('blankname ahli waris= ' + blankNameAhliWaris);
    console.log('umur ahli waris= ' + blankUmurAhliWaris);
    console.log('saksiar length= ' + saksiArr.length);
    console.log('warisan berupa lengt= ' + warisanBerupaArr.length);
    console.log('nama pembagian warisan= ' + blankNamePembagianWarisan);
    console.log(
      'nama item pembagian warusan= ' + blankNameItemsPembagianWarisan,
    );
    console.log(
      'keterangan item pembagina warusan= ' +
        blankKeteranganItemsPembagianWarisan,
    );
    console.log('ahli earis length= ' + ahliWaris.length);
    console.log('pembaina warusan length= ' + pembagianWarisan.length);
    console.log('item warisna lengt= ' + itemsWarisanLength);
    if (
      (defaultName != 'Select ...' &&
        nama != '' &&
        tanggalKesepakatan != 'DD/MM/YYYY' &&
        tanggalMeninggal != 'DD/MM/YYYY',
      tempat_kesepakatan != '' &&
        blankNameAhliWaris == 0 &&
        blankUmurAhliWaris == 0 &&
        saksiArr.length != 0 &&
        warisanBerupaArr.length != 0 &&
        blankNamePembagianWarisan == 0 &&
        blankNameItemsPembagianWarisan == 0 &&
        blankKeteranganItemsPembagianWarisan == 0 &&
        ahliWaris.length != 0 &&
        pembagianWarisan.length != 0 &&
        itemsWarisanLength == 0)
    ) {
      this.setState({modalVisible: true});
      const url = 'https://api.istudios.id/v1/layanansurat/bagi_warisan/';

      const datas = {
        atribut: {
          kematian_id: kematianID,
          pasangan: {
            nama: nama,
            tanggal_meninggal: '',
          },
          ahli_waris: ahliWaris,
          saksi: saksiArr,
          item_warisan: warisanBerupaArr,
          pembagian_warisan: pembagianWarisan,
          tanggal_kesepakatan: tanggalKesepakatan,
          tempat_kesepakatan: tanggalMeninggal,
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
                            kematianID: value.id,
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
        <DateTimePickerModal
          isVisible={this.state.visibleTanggalKesepakatan}
          mode="date"
          onConfirm={(date) => this.handleConfirmTanggalKesepakatan(date)}
          onCancel={() => this.hideTanggalKesepakatan()}
        />
        <DateTimePickerModal
          isVisible={this.state.visibleTanggalMeninggal}
          mode="date"
          onConfirm={(date) => this.handleConfirmTanggalMeninggal(date)}
          onCancel={() => this.hideTanggalMeninggal()}
        />
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
              onPress={() => console.log(this.state.ahliWaris)}
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: 'grey',
              }}>
              Surat Pembagian Warisan
            </Text>
          </View>
          <View style={{paddingHorizontal: 10, paddingTop: 10}}>
            <Text style={{color: 'grey', fontWeight: 'bold'}}>Kematian</Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              width: '100%',
              paddingTop: 10,
              paddingBottom: 5,
            }}>
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
          <View
            style={{width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Nama
            </Text>
            <TextInput
              onChangeText={(teks) => this.setState({nama: teks})}
              value={this.state.nama}
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
            style={{paddingHorizontal: 10, width: '100%', paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Tanggal Kesepakatan
            </Text>
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
                {this.state.tanggalKesepakatan}
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
                  name="calendar"
                  size={25}
                  color="grey"
                  onPress={() => this.showTanggalKesepakatan()}
                />
              </View>
            </View>
          </View>
          <View
            style={{paddingHorizontal: 10, width: '100%', paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Tanggal Meninggal
            </Text>
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
                {this.state.tanggalMeninggal}
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
                  name="calendar"
                  size={25}
                  color="grey"
                  onPress={() => this.showTanggalMeninggal()}
                />
              </View>
            </View>
          </View>
          <View
            style={{width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Tempat Kesepakatan
            </Text>
            <TextInput
              onChangeText={(teks) => this.setState({tempat_kesepakatan: teks})}
              value={this.state.tempat_kesepakatan}
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
                    Umur
                  </Text>
                  <TextInput
                    value={value.umur}
                    keyboardType="numeric"
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
          <View
            style={{width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{marginBottom: 3, color: 'grey', fontWeight: 'bold'}}>
              Saksi
            </Text>
            <Text style={{marginBottom: 10, color: 'grey', fontSize: 10}}>
              Saksi bisa lebih dari satu, pisahhkan dengan tanda koma (,)
            </Text>
            <TextInput
              onChangeText={(teks) => this.setState({saksi: teks})}
              value={this.state.saksi}
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
            <Text style={{marginBottom: 3, color: 'grey', fontWeight: 'bold'}}>
              Warisan berupa
            </Text>
            <Text style={{marginBottom: 10, color: 'grey', fontSize: 10}}>
              warisan bisa lebih dari satu, pisahhkan dengan tanda koma (,)
            </Text>
            <TextInput
              onChangeText={(teks) => this.setState({warisan_berupa: teks})}
              value={this.state.warisan_berupa}
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
              Pembagian Warisan
            </Text>
            <TouchableNativeFeedback
              onPress={() => this.tambahPembagianWarisan()}>
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
          {this.state.pembagianWarisan.map((value, mainKey) => {
            return (
              <View style={{width: '100%'}} key={mainKey}>
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
                    onChangeText={(text) =>
                      this.inputNamaPembagianWarisan(text, mainKey)
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
                    paddingHorizontal: 25,
                    paddingVertical: 5,
                  }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      color: 'grey',
                      fontWeight: 'bold',
                    }}>
                    Items
                  </Text>
                  <TouchableNativeFeedback
                    onPress={() => this.tambahItemsPembagianWarisan(mainKey)}>
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
                      <Text style={{color: 'white', marginLeft: 5}}>
                        Tambah List
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
                {value.items.map((value, key) => {
                  return (
                    <View style={{width: '100%'}} key={key}>
                      <View
                        style={{
                          width: '100%',
                          paddingHorizontal: 25,
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
                          onChangeText={(text) =>
                            this.inputItemsNamaPembagianWarisan(
                              text,
                              key,
                              mainKey,
                            )
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
                          paddingHorizontal: 25,
                          paddingVertical: 5,
                        }}>
                        <Text
                          style={{
                            marginBottom: 10,
                            color: 'grey',
                            fontWeight: 'bold',
                          }}>
                          Keterangan
                        </Text>
                        <TextInput
                          value={value.keterangan}
                          onChangeText={(text) =>
                            this.inputItemsKeteranganPembagianWarisan(
                              text,
                              key,
                              mainKey,
                            )
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
                          paddingHorizontal: 25,
                          paddingVertical: 5,
                        }}>
                        <TouchableNativeFeedback
                          onPress={() =>
                            this.deleteItemsPembagianWarisan(key, mainKey)
                          }>
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
                  <TouchableNativeFeedback
                    onPress={() => this.deletePembagianWarisan(mainKey)}>
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
export default SuratPembagianWarisan;

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
