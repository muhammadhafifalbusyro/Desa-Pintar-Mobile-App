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
    AsyncStorage.getItem('access').then((value) => {
      this.setState({loading: true});
      const url =
        'https://api.istudios.id/v1/lapor/?include[]=kategori&include[]=status';
      const token = value;
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
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
  renderStatus = (status) => {
    if (status == null) {
      return (
        <View style={{...styles.statusBox, backgroundColor: 'white'}}>
          <Text style={styles.text2}>{status == null ? '' : status.nama}</Text>
        </View>
      );
    } else if (status != null && status.nama == 'Belum Ditanggapi') {
      return (
        <View style={{...styles.statusBox, backgroundColor: '#c1a1d3'}}>
          <Text style={styles.text2}>{status == null ? '' : status.nama}</Text>
        </View>
      );
    } else if (status != null && status.nama == 'Ditanggapi') {
      return (
        <View style={{...styles.statusBox, backgroundColor: '#ffc754'}}>
          <Text style={styles.text2}>{status == null ? '' : status.nama}</Text>
        </View>
      );
    } else if (status != null && status.nama == 'Direalisasikan') {
      return (
        <View style={{...styles.statusBox, backgroundColor: '#e8eae6'}}>
          <Text style={styles.text2}>{status == null ? '' : status.nama}</Text>
        </View>
      );
    } else if (status != null && status.nama == 'Tidak Relevan') {
      return (
        <View style={{...styles.statusBox, backgroundColor: '#ec4646'}}>
          <Text style={styles.text2}>{status == null ? '' : status.nama}</Text>
        </View>
      );
    } else {
      return (
        <View style={{...styles.statusBox, backgroundColor: 'white'}}>
          <Text style={styles.text2}>{status == null ? '' : status.nama}</Text>
        </View>
      );
    }
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
            let isiFil = value.isi;
            let newIsi = [];
            for (let x = 0; x <= 101; x++) {
              if (x <= 100) {
                newIsi.push(isiFil[x]);
              } else {
                newIsi.push(' ...');
              }
            }

            let dateFil = value.created_at;
            let newTahun = [];
            let newBulan = [];
            let newTanggal = [];
            let newTime = [];
            for (let x = 0; x <= 3; x++) {
              newTahun.push(dateFil[x]);
            }
            for (let x = 5; x <= 6; x++) {
              newBulan.push(dateFil[x]);
            }
            for (let x = 8; x <= 9; x++) {
              newTanggal.push(dateFil[x]);
            }
            for (let x = 11; x <= 15; x++) {
              newTime.push(dateFil[x]);
            }
            let bulanFilter = '';
            for (let x = 1; x <= 12; x++) {
              if ('0' == newBulan[0] && '1' == newBulan[1]) {
                bulanFilter = 'Januari';
              } else if ('0' == newBulan[0] && '2' == newBulan[1]) {
                bulanFilter = 'Februari';
              } else if ('0' == newBulan[0] && '3' == newBulan[1]) {
                bulanFilter = 'Maret';
              } else if ('0' == newBulan[0] && '4' == newBulan[1]) {
                bulanFilter = 'April';
              } else if ('0' == newBulan[0] && '5' == newBulan[1]) {
                bulanFilter = 'Mei';
              } else if ('0' == newBulan[0] && '6' == newBulan[1]) {
                bulanFilter = 'Juni';
              } else if ('0' == newBulan[0] && '7' == newBulan[1]) {
                bulanFilter = 'Juli';
              } else if ('0' == newBulan[0] && '8' == newBulan[1]) {
                bulanFilter = 'Agustus';
              } else if ('0' == newBulan[0] && '9' == newBulan[1]) {
                bulanFilter = 'September';
              } else if ('1' == newBulan[0] && '0' == newBulan[1]) {
                bulanFilter = 'Oktober';
              } else if ('1' == newBulan[0] && '1' == newBulan[1]) {
                bulanFilter = 'November';
              } else if ('1' == newBulan[0] && '2' == newBulan[1]) {
                bulanFilter = 'Desember';
              }
            }
            return (
              <View key={key} style={styles.boxContent}>
                <View style={styles.childBoxContent}>
                  <Image source={{uri: value.gambar}} style={styles.image} />
                  <View style={styles.content1}>
                    <Text style={styles.text1}>
                      #{value.kategori == null ? '' : value.kategori.nama}
                    </Text>
                    {this.renderStatus(value.status)}
                  </View>
                  <View style={styles.boxTitle}>
                    <Text style={styles.textTitle}>{value.judul}</Text>
                    <Text style={{color: 'purple', fontSize: 12}}>
                      {newTanggal} {bulanFilter} {newTahun}, {newTime} WITA
                    </Text>
                  </View>
                  <View style={styles.boxDesc}>
                    <Text style={styles.textDesc}>
                      {isiFil.length <= 100 ? isiFil : newIsi}
                    </Text>
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
    paddingTop: 10,
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
    paddingBottom: 20,
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
    paddingVertical: 4,
    paddingHorizontal: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTitle: {
    fontWeight: 'bold',
    color: '#444444',
    width: '50%',
  },
  textDesc: {
    fontSize: 12,
    color: '#444444',
  },
  boxDesc: {
    paddingHorizontal: 10,
  },
});
