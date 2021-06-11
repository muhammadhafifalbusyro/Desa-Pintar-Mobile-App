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
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class Administrasi extends React.Component {
  state = {
    promosi: false,
    detailLayanan: [
      {
        id: 1,
        namaLayanan: 'Surat Keterangan Domisili',
        nav: 'SuratKeteranganDomisili',
        background: 'white',
      },
      {
        id: 2,
        namaLayanan: 'Surat Keterangan Keluarga Miskin',
        nav: 'SuratKeteranganKeluargaMiskin',
        background: 'white',
      },
      {
        id: 3,
        namaLayanan: 'Surat Pembagian Warisan',
        nav: 'SuratPembagianWarisan',
        background: 'white',
      },
      {
        id: 4,
        namaLayanan: 'Laporan Penggunaan Biaya Pemakaman',
        nav: 'LaporanPenggunaanBiayaPemakaman',
        background: 'white',
      },
      {
        id: 5,
        namaLayanan: 'Keterangan Tidak Memiliki Bantuan Sosial',
        nav: 'KeteranganTidakMemilikiBantuanSosial',
        background: 'white',
      },
      {
        id: 6,
        namaLayanan: 'Surat Keterangan Ahli Waris Non Tunggal',
        nav: 'SuratKeteranganAhliWarisNonTunggal',
        background: 'white',
      },
    ],
  };

  render() {
    return (
      <View style={styles.container}>
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
                color: '#444444',
              }}>
              Kependudukan
            </Text>
          </View>

          {this.state.detailLayanan.map((value, key) => {
            return (
              <View style={styles.boxContainer} key={key}>
                <TouchableNativeFeedback
                  onPress={() => this.props.navigation.navigate(value.nav)}>
                  <View
                    style={{
                      ...styles.boxContent,
                      backgroundColor: value.background,
                    }}>
                    <Text style={styles.text1}>{value.namaLayanan}</Text>
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
export default Administrasi;

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
    color: 'grey',
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
});
