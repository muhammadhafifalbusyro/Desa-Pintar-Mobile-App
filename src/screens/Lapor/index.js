import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const accessToken =
//   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA3ODMyODMwLCJqdGkiOiJhMGU1ZTRjYzYxZDI0MWVjOWIyZTIxOTQxZWEyMDFlNSIsInVzZXJfaWQiOjF9.n33NInIK_xvOg74F1KMJIBikzlZn2_6dZAr8qEip8WM';

class Lapor extends React.Component {
  state = {
    data: [],
    loading: false,
  };
  componentDidMount() {
    this.getDataLapor();
  }
  getDataLapor = () => {
    AsyncStorage.getItem('access').then(value => {
      this.setState({loading: true});
      const url = 'https://api.istudios.id/v1/lapor/?include[]=kategori.*';
      const token = value;
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson.data);
          if (resJson.data) {
            this.setState({data: resJson.data, loading: false});
            ToastAndroid.show(
              'Data berhasil didapatkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else {
            this.setState({loading: false});
            ToastAndroid.show(
              'Data gagal didapatkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        })
        .catch(er => {
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
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Lapor Online</Text>
        </View>
        <ScrollView
          style={styles.scroll}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              colors={['#19D2BA']}
              onRefresh={() => this.getDataLapor()}
            />
          }>
          {this.state.data.map((value, key) => {
            return (
              <View key={key} style={styles.boxContent}>
                <View style={styles.childBoxContent}>
                  <Image source={{uri: value.gambar}} style={styles.image} />
                  <View style={styles.content1}>
                    <Text style={styles.text1}>
                      #{value.kategori == null ? '' : value.kategori.nama}
                    </Text>
                    <View style={styles.statusBox}>
                      <Text style={styles.text2}>Belum ditanggapiee</Text>
                    </View>
                  </View>
                  <View style={styles.boxTitle}>
                    <Text style={styles.textTitle}>{value.judul}</Text>
                  </View>
                  <View style={styles.boxDesc}>
                    <Text style={styles.textDesc}>{value.isi}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => this.props.navigation.navigate('BuatLaporan')}>
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}
export default Lapor;

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
  boxContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childBoxContent: {
    height: 300,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
  },
  image: {
    height: 200,
    width: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  content1: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  statusBox: {
    backgroundColor: '#FA7F72',
    padding: 4,
    borderRadius: 3,
  },
  text1: {
    color: 'green',
  },
  text2: {
    fontSize: 12,
    color: 'white',
  },
  boxTitle: {
    paddingHorizontal: 10,
  },
  textTitle: {
    fontWeight: 'bold',
    color: '#444444',
  },
  textDesc: {
    fontSize: 12,
    color: '#444444',
  },
  boxDesc: {
    paddingHorizontal: 10,
  },
});
