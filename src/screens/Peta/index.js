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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

var _mapView = MapView;

class Peta extends React.Component {
  state = {
    // data: [
    //   {
    //     id: 1,
    //     kategori: 'pertanian',
    //     title: 'Hama Wereng',
    //     deskripsi: 'Hama wereng adalah hama',
    //     image:
    //       'https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/10/5-Characters-Sanji-Can-Beat.jpg',
    //     status: 'belum ditanggapi',
    //   },
    //   {
    //     id: 2,
    //     kategori: 'pertanian',
    //     title: 'Ikan Mati',
    //     deskripsi: 'Ikan abis tuh mati',
    //     image:
    //       'https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/10/5-Characters-Sanji-Can-Beat.jpg',
    //     status: 'belum ditanggapi',
    //   },
    // ],
    data: [],
    loading: false,
    dota: [
      {
        latitude: 0.78203012095,
        longitude: 122.860741697,
      },
      {
        latitude: 0.78203012095,
        longitude: 122.856768,
      },
      {
        latitude: 0.78203012095,
        longitude: 122.86777,
      },
    ],
    latitude: 0.0,
    longitude: 0.0,
  };
  componentDidMount() {
    this.getLatitude();
    this.getLongitude();
    this.getBidang();
  }
  getLatitude = () => {
    AsyncStorage.getItem('latitude').then((value) => {
      console.log(value);
      this.setState({latitude: JSON.parse(value)});
    });
  };
  getLongitude = () => {
    AsyncStorage.getItem('longitude').then((value) => {
      this.setState({longitude: JSON.parse(value)});
    });
  };
  getBidang = () => {
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
            this.setState({
              data: resJson.kepemilikan,
              loading: false,
              // latitude: resJson.kepemilikan.latitude,
              // longitude: resJson.kepemilikan.longitude,
            });
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
  toFocused = () => {
    console.log('mulai');
    const LATITUDE = this.state.latitude;
    const LONGITUDE = this.state.longitude;
    _mapView.animateToRegion(
      {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      },
      1000,
    );
    console.log('selesai');
  };
  render() {
    console.log(this.state.latitude);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Peta</Text>
        </View>
        <ScrollView
          style={styles.scroll}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              colors={['#19D2BA']}
              onRefresh={() => this.getBidang()}
            />
          }>
          <View style={styles.boxMap}>
            {/* <MapView
              style={{
                height: 150,
                width: '100%',
              }}
              initialRegion={{
                latitude: 0.7818,
                longitude: 122.8608,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
              }}
            /> */}
            <MapView
              ref={(mapView) => {
                _mapView = mapView;
              }}
              style={{
                height: 150,
                width: '100%',
              }}
              initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
              }}>
              {this.state.data.map((value, key) => {
                return (
                  <MapView.Marker
                    key={key}
                    coordinate={{
                      latitude: value.latitude,
                      longitude: value.longitude,
                    }}
                    title={value.namabidang}
                    description={value.penggunaan_tanah}
                  />
                );
              })}
            </MapView>
          </View>
          <View style={styles.boxTitle}>
            <Text style={styles.title}>Bidang Tanah dan Properti</Text>
          </View>
          {this.state.data.map((value, key) => {
            return (
              <View key={key} style={styles.boxContainer}>
                <TouchableNativeFeedback
                  onPress={() =>
                    this.props.navigation.navigate('PetaDetail', {
                      bidang: value.bidang,
                      nbt: value.nbt,
                      geometry: value.geometry,
                      namabidang: value.namabidang,
                      gambar: value.gambar_atas,
                      latitude: value.latitude,
                      longitude: value.longitude,
                      luas: value.luas,
                      status_hak: value.status_hak,
                      penggunaan_tanah: value.penggunaan_tanah,
                      pemanfaatan_tanah: value.pemanfaatan_tanah,
                      rtrw: value.rtrw,
                    })
                  }>
                  <View style={styles.boxContent}>
                    <Image
                      source={{
                        uri: value.gambar_atas,
                      }}
                      style={styles.images}
                    />
                    <Text style={styles.text1}>{value.namabidang}</Text>
                    <Icon name="chevron-right" size={40} color="grey" />
                  </View>
                </TouchableNativeFeedback>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => this.toFocused()}>
          <Icon name="crosshair" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}
export default Peta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  addButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19D2BA',
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    bottom: 30,
    right: 30,
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
  boxMap: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxTitle: {
    height: 50,
    width: '100%',
    borderColor: 'grey',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    elevation: 3,
    marginVertical: 5,
  },
  title: {
    fontWeight: 'bold',
    color: '#444444',
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
  },
});
