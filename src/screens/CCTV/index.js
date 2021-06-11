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
  Dimensions,
  RefreshControl,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MapView, {Polygon, Polyline, Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';
import VideoPlayer from 'react-native-video-player'

const heighWind = Dimensions.get('window').height;
const widthWind = Dimensions.get('window').width

const CORRR = [
  {longitude: 122.86067468122086, latitude: 0.781962414844489},
  {longitude: 122.86066905983787, latitude: 0.782097926975666},
  {longitude: 122.86082618826985, latitude: 0.782093469438839},
  {longitude: 122.86079387778285, latitude: 0.781954357297433},
  {longitude: 122.86067468122086, latitude: 0.781962414844489},
];

const regionWil = {
  latitude: 0.781962414844489,
  longitude: 122.86067468122086,
  latitudeDelta: 0.009,
  longitudeDelta: 0.009,
};
var _mapView = MapView;
class CCTV extends React.Component {
  state = {
    showVideo: false,
    latWil: '',
    longWil: '',
    data: [
      {
        id: 11,
        nama: 'CCTV_1',
        link:
          'http://172321800422.ip-dynamic.com:1935/live/spbu.stream/playlist.m3u8',
        koordinat: {
          lat: 0.777398116662058,
          lng: 122.8607829233708,
        },
      },
      {
        id: 10,
        nama: 'CCTV_2',
        link: 'https://www.youtube.com/watch?v=JgZtjfjJ4eM',
        koordinat: {
          lat: 0.780962816649917,
          lng: 122.86310185039973,
        },
      },
      {
        id: 3,
        nama: 'CCTV_3',
        link: 'httpss',
        koordinat: {
          lat: 0.782100834154787,
          lng: 122.86368959325453,
        },
      },
      {
        id: 2,
        nama: 'CCTV_4',
        link: 'COBA',
        koordinat: {
          lat: 0.777454551840608,
          lng: 122.86540681269845,
        },
      },
      {
        id: 1,
        nama: 'CCTV_5',
        link: 'COBA',
        koordinat: {
          lat: 0.783146023036823,
          lng: 122.85785379849176,
        },
      },
    ],
    latitude: 0.0,
    longitude: 0.0,
    linkVideo: 'https://google.com',
  };
  componentDidMount() {
    this.getLatitude();
    this.getLongitude();
    this.getDataCoordinate();
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
  getDataCoordinate = () => {
    AsyncStorage.getItem('access').then((value) => {
      this.setState({loading: true});
      const token = value;
      const url = 'https://api.istudios.id/v1/cctv/';
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
          if (resJson.data) {
            console.log(resJson.kepemilikan);
            this.setState({
              data: resJson.data,
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
  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={{flex: 1, justifyContent: 'center'}}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.showVideo}
          animationType="fade"
          transparent={true}
          onRequestClose={() => this.setState({showVideo: false})}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: '100%',
                justifyContent:'center'
              }}>
              <VideoPlayer
                autoplay={true}
                video={{ uri: this.state.linkVideo }}
                disableSeek={true}
            />
            </View>
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                borderRadius: 60,
                borderWidth: 2,
                borderColor: 'white',
                position: 'absolute',
                top: 30,
                right: 30,
              }}
              activeOpacity={0.7}
              onPress={() => this.setState({showVideo: false})}>
              <Icon name="x" size={30} color="white" />
            </TouchableOpacity>
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
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              colors={['#19D2BA']}
              onRefresh={() => this.getDataCoordinate()}
            />
          }>
          <View style={styles.boxMap}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                marginTop: 15,
                marginBottom: 15,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#444444',
              }}>
              CCTV
            </Text>
            {/* <MapView
            style={{
              height: '100%',
              width: '100%',
            }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          /> */}
            <MapView
              ref={(mapView) => {
                _mapView = mapView;
              }}
              style={{
                height: heighWind - 100,
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
                  <Marker
                    key={key}
                    coordinate={{
                      latitude: value.koordinat.lat,
                      longitude: value.koordinat.lng,
                    }}
                    title={value.nama}
                    description={value.nama}
                    icon={require('../../assets/images/cctv.png')}
                    style={{height: 100, width: 100}}
                    onPress={() =>
                      this.setState({linkVideo: value.link, showVideo: true})
                    }
                  />
                );
              })}
            </MapView>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => this.toFocused()}>
          <Icon name="refresh-cw" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}
export default CCTV;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  cameraContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxCamera: {
    height: 200,
    width: '100%',
    borderRadius: 5,
    borderColor: 'grey',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  boxContent: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text1: {
    color: '#444444',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  childBox: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxLiihat: {
    height: 30,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffda77',
    margin: 10,
    borderRadius: 5,
  },
  boxMap: {
    backgroundColor: '#ffda77',
  },
});

// export default class CCTV extends React.Component {
//   ActivityIndicatorLoadingView() {
//     return (
//       <ActivityIndicator
//         color="#009688"
//         size="large"
//         style={styles.ActivityIndicatorStyle}
//       />
//     );
//   }
//   render() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: 'rgba(0,0,0,0.5)',
//         }}>
//         <View
//           style={{
//             backgroundColor: 'white',
//             width: '100%',
//             height: '100%',
//           }}>
//           <WebView
//             style={{flex: 1}}
//             source={{
//               uri:
//                 'https://cctvjss.jogjakota.go.id/atcs/ATCS_apmd.stream/playlist.m3u8',
//             }}
//             renderLoading={this.ActivityIndicatorLoadingView}
//           />
//         </View>
//         <TouchableOpacity
//           style={{
//             height: 50,
//             width: 50,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'red',
//             borderRadius: 60,
//             borderWidth: 2,
//             borderColor: 'white',
//             position: 'absolute',
//             top: 30,
//             right: 30,
//           }}
//           activeOpacity={0.7}
//           onPress={() => alert('asdf')}>
//           <Icon name="x" size={30} color="white" />
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }



