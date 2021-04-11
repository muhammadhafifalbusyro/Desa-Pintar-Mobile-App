import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  ToastAndroid,
  TextInput,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;
const accessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA3ODMyODMwLCJqdGkiOiJhMGU1ZTRjYzYxZDI0MWVjOWIyZTIxOTQxZWEyMDFlNSIsInVzZXJfaWQiOjF9.n33NInIK_xvOg74F1KMJIBikzlZn2_6dZAr8qEip8WM';

class Beranda extends React.Component {
  state = {
    navDef: 'Berita',
    nav: ['Berita', 'Informasi', 'Potensi'],
    data: [],
    dataInformasi: [],
    dataPotensi: [],
    loading: false,
    search: '',
  };
  componentDidMount() {
    this.getDataBerita();
    this.getDataInformasi();
    this.getDataPotensi();
    this.getBidang();
  }
  getBidang = () => {
    console.log('mulllaaaiiiii');
    AsyncStorage.getItem('access').then((value) => {
      this.setState({loading: true});
      const token = value;
      const url = 'https://api.istudios.id/v1/sigbidang/me/';
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          // if (resJson.data) {
          //   this.setState({dataKategori: resJson.data});
          //   ToastAndroid.show(
          //     'Data berhasil didapatkan',
          //     ToastAndroid.SHORT,
          //     ToastAndroid.CENTER,
          //   );
          // } else {
          //   console.log('error');
          //   ToastAndroid.show(
          //     'Data gagal didapatkan',
          //     ToastAndroid.SHORT,
          //     ToastAndroid.CENTER,
          //   );
          // }
          if (resJson.kepemilikan) {
            console.log(resJson.kepemilikan);
            AsyncStorage.setItem(
              'latitude',
              JSON.stringify(resJson.kepemilikan[0].latitude),
            );
            AsyncStorage.setItem(
              'longitude',
              JSON.stringify(resJson.kepemilikan[0].longitude),
            );
            ToastAndroid.show(
              'Data berhasil didapatkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else {
            this.setState({loading: false});
            console.log('error');
            ToastAndroid.show(
              'Data gagal didapatkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        })
        .catch((er) => {
          this.setState({loading: false});
          ToastAndroid.show(
            'Data gagal didapatkan',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    });
  };
  getDataBerita = () => {
    AsyncStorage.getItem('access').then((value) => {
      this.setState({loading: true});
      const url = 'https://api.istudios.id/v1/artikel/';
      const token = value;
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
          if (resJson.data) {
            this.setState({data: resJson.data, loading: false});
          } else if (resJson.code) {
            this.setState({loading: false});
            ToastAndroid.show(
              resJson.code,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else {
            this.setState({loading: false});
            ToastAndroid.show(
              resJson.code,
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
  getDataInformasi = () => {
    AsyncStorage.getItem('access').then((value) => {
      this.setState({loading: true});
      const url = 'https://api.istudios.id/v1/informasi/';
      const token = value;
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
          if (resJson.data) {
            this.setState({dataInformasi: resJson.data, loading: false});
          } else if (resJson.code) {
            this.setState({loading: false});
            ToastAndroid.show(
              resJson.code,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else {
            this.setState({loading: false});
            ToastAndroid.show(
              resJson.code,
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
  getDataPotensi = () => {
    AsyncStorage.getItem('access').then((value) => {
      this.setState({loading: true});
      const url = 'https://api.istudios.id/v1/potensi/?include[]=kategori';
      const token = value;
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
          if (resJson.data) {
            this.setState({dataPotensi: resJson.data, loading: false});
          } else if (resJson.code) {
            this.setState({loading: false});
            ToastAndroid.show(
              resJson.code,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else {
            this.setState({loading: false});
            ToastAndroid.show(
              resJson.code,
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
  renderInfo = () => {
    if (this.state.navDef == 'Berita') {
      return this.state.data.map((value, key) => {
        return (
          <View key={key} style={styles.boxContainer}>
            <TouchableNativeFeedback
              onPress={() =>
                this.props.navigation.navigate('DetailBeranda', {
                  item: value,
                })
              }>
              <View style={styles.boxContent}>
                <Image source={{uri: value.gambar}} style={styles.images} />
                <Text style={styles.text1}>{value.judul}</Text>
                <Icon name="chevron-right" size={40} color="grey" />
              </View>
            </TouchableNativeFeedback>
          </View>
        );
      });
    } else if (this.state.navDef == 'Informasi') {
      return this.state.dataInformasi.map((value, key) => {
        return (
          <View key={key} style={styles.boxContainer}>
            <TouchableNativeFeedback
              onPress={() =>
                this.props.navigation.navigate('DetailBeranda', {
                  item: value,
                })
              }>
              <View style={styles.boxContent}>
                <Image source={{uri: value.gambar}} style={styles.images} />
                <Text style={styles.text1}>{value.judul}</Text>
                <Icon name="chevron-right" size={40} color="grey" />
              </View>
            </TouchableNativeFeedback>
          </View>
        );
      });
    } else if (this.state.navDef == 'Potensi') {
      return (
        <View style={styles.boxContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.boxContentSearch}>
              <TextInput
                placeholder="Cari Potensi"
                style={{width: '100%'}}
                value={this.state.search}
                onChangeText={(teks) => this.setState({search: teks})}
                // placeholderTextColor="#d1d1d1"
              />
              <Icon name="search" size={20} color="#d1d1d1" />
            </View>
          </View>
          {this.filterPotensi()}
        </View>
      );
    }
  };
  filterPotensi = () => {
    if (this.state.search == '') {
      return this.state.dataPotensi.map((value, key) => {
        let isiFil = value.isi == null ? '' : value.isi;
        let newIsi = [];
        for (let x = 0; x <= 101; x++) {
          if (x <= 100) {
            newIsi.push(isiFil[x]);
          } else {
            newIsi.push(' ...');
          }
        }
        return (
          // <TouchableNativeFeedback
          //   key={key}
          //   onPress={() =>
          //     this.props.navigation.navigate('DetailBeranda', {
          //       item: value,
          //     })
          //   }>
          //   <View style={{...styles.boxContent, marginBottom: 10}}>
          //     <Image source={{uri: value.gambar}} style={styles.images} />
          //     <Text style={styles.text1}>{value.nama_usaha}</Text>
          //     <Icon name="chevron-right" size={40} color="grey" />
          //   </View>
          // </TouchableNativeFeedback>
          <View
            key={key}
            style={{
              paddingBottom: 15,
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 5,
              elevation: 3,
              marginBottom: 10,
            }}>
            <Image
              source={{uri: value.gambar}}
              style={{
                height: 200,
                width: '100%',
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 8,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'green',
                }}>
                {/* #{value.kategori == null ? '' : value.kategori.nama} */}#
              </Text>
              <View
                style={{
                  padding: 4,
                  borderRadius: 3,
                  backgroundColor: '#FFDA77',
                  borderColor: '#FFDA77',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'white',
                  }}>
                  {value.kategori == null ? '' : value.kategori.nama}
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#444444',
                }}>
                {value.nama_usaha}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#444444',
                }}>
                {isiFil.length <= 100 ? isiFil : newIsi}
              </Text>
            </View>
          </View>
        );
      });
    } else {
      let newDataPotensi = this.state.dataPotensi.filter((elemen) => {
        let nameLowerCase =
          elemen.nama_usaha == null ? '' : elemen.nama_usaha.toLowerCase();
        let searchLowerCase = this.state.search.toLowerCase();
        return nameLowerCase.includes(searchLowerCase);
      });
      return newDataPotensi.map((value, key) => {
        let isiFil = value.isi == null ? '' : value.isi;
        let newIsi = [];
        for (let x = 0; x <= 101; x++) {
          if (x <= 100) {
            newIsi.push(isiFil[x]);
          } else {
            newIsi.push(' ...');
          }
        }
        return (
          <View
            key={key}
            style={{
              paddingBottom: 15,
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 5,
              elevation: 3,
              marginBottom: 10,
            }}>
            <Image
              source={{uri: value.gambar}}
              style={{
                height: 200,
                width: '100%',
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 8,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'green',
                }}>
                {/* #{value.kategori == null ? '' : value.kategori.nama} */}#
              </Text>
              <View
                style={{
                  padding: 4,
                  borderRadius: 3,
                  backgroundColor: '#FFDA77',
                  borderColor: '#FFDA77',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'white',
                  }}>
                  {value.kategori == null ? '' : value.kategori.nama}
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#444444',
                }}>
                {value.nama_usaha}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#444444',
                }}>
                {isiFil.length <= 100 ? isiFil : newIsi}
              </Text>
            </View>
          </View>
        );
      });
    }
  };
  onrefresh = () => {
    this.getDataPotensi();
    this.getDataBerita();
    this.getDataInformasi();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Beranda</Text>
        </View>
        <ScrollView
          style={styles.scroll}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              colors={['#19D2BA']}
              onRefresh={() => this.onrefresh()}
            />
          }>
          <View style={styles.boxBanner}>
            <Image
              source={require('../../assets/images/banner.png')}
              style={styles.banner}
            />
          </View>
          <View style={styles.containerNav}>
            {this.state.nav.map((value, key) => {
              if (value == this.state.navDef) {
                return (
                  <TouchableNativeFeedback
                    key={key}
                    onPress={() => this.setState({navDef: value})}>
                    <View style={styles.boxNav}>
                      <Text style={styles.textNav}>{value}</Text>
                    </View>
                  </TouchableNativeFeedback>
                );
              } else {
                return (
                  <TouchableNativeFeedback
                    key={key}
                    onPress={() => this.setState({navDef: value})}>
                    <View style={{...styles.boxNav, backgroundColor: 'white'}}>
                      <Text style={{...styles.textNav, color: '#444444'}}>
                        {value}
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                );
              }
            })}
          </View>
          {this.renderInfo()}
        </ScrollView>
      </View>
    );
  }
}
export default Beranda;

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
  boxBanner: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: 150,
    width: '100%',
    borderRadius: 10,
  },
  containerNav: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxNav: {
    height: 40,
    width: width / 3.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19D2BA',
    borderRadius: 5,
    elevation: 5,
  },
  textNav: {
    color: 'white',
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
    backgroundColor: 'white',
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
    color: '#444444',
  },
  contentContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContentSearch: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
