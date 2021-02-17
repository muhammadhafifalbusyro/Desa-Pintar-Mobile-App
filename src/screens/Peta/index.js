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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

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
  };
  componentDidMount() {
    this.getBidang();
  }
  getBidang = () => {
    AsyncStorage.getItem('access').then(value => {
      const token = value;
      const url = 'https://api.istudios.id/v1/sigbidang/me/';
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then(res => res.json())
        .then(resJson => {
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
            this.setState({data: resJson.kepemilikan});
            ToastAndroid.show(
              'Data berhasil didapatkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else {
            console.log('error');
            ToastAndroid.show(
              'Data gagal didapatkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        })
        .catch(er => {
          ToastAndroid.show(
            'Data gagal didapatkan',
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
          <Text style={styles.textHeader}>Peta</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.boxMap}>
            <MapView
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
            />
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
                    })
                  }>
                  <View style={styles.boxContent}>
                    <Image
                      source={{
                        uri:
                          'https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg',
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
