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

const moment = require('moment');

class SuratPembagianWarisan extends React.Component {
  state = {
    kematian: '',
    nama: '',
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
  render() {
    return (
      <View style={styles.container}>
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
              <Text style={{color: '#444444'}}>hallo</Text>
              <View
                style={{
                  height: 35,
                  width: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderLeftWidth: 1,
                  borderColor: 'grey',
                }}>
                <Icon name="chevron-down" size={30} color="grey" />
              </View>
            </View>
          </View>
          <View
            style={{width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Nama
            </Text>
            <TextInput
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
            <TouchableNativeFeedback>
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
            <TouchableNativeFeedback>
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
