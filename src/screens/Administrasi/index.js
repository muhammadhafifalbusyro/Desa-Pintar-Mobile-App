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
    search: '',
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
        namaLayanan: 'Surat Keterangan Keluarga Miskin (Santunan Duka)',
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
        namaLayanan: 'Keterangan Tidak Memiliki Bantuan Sosial (Santunan Duka)',
        nav: 'KeteranganTidakMemilikiBantuanSosial',
        background: 'white',
      },
      {
        id: 6,
        namaLayanan: 'Surat Keterangan Ahli Waris Non Tunggal (Santunan Duka)',
        nav: 'SuratKeteranganAhliWarisNonTunggal',
        background: 'white',
      },
      {
        id: 7,
        namaLayanan: 'Surat Keterangan Ahli Waris Tunggal (Santunan Duka)',
        nav: 'SuratKeteranganAhliWarisTunggal',
        background: 'white',
      },
      {
        id: 8,
        namaLayanan: 'Permohonan Peminjaman BRI',
        nav: 'PermohonanPeminjamanBRI',
        background: 'white',
      },
      {
        id: 9,
        namaLayanan: 'SKTM Keluarga',
        nav: 'SKTMKeluarga',
        background: 'white',
      },
      {
        id: 10,
        namaLayanan: 'Surat Pengantar Balik Nama Token Listrik',
        nav: 'SuratPengantarBalikNamaTokenListrik',
        background: 'white',
      },
      {
        id: 11,
        namaLayanan: 'Surat Keterangan Perekaman',
        nav: 'SuratKeteranganPerekaman',
        background: 'white',
      },
      {
        id: 12,
        namaLayanan: 'Orang Yang Sama (Perbedaan Nama)',
        nav: 'OrangYangSama',
        background: 'white',
      },
      {
        id: 13,
        namaLayanan: 'Surat Keterangan Ahli Waris',
        nav: 'SuratKeteranganAhliWaris',
        background: 'white',
      },
      {
        id: 14,
        namaLayanan: 'Surat Keterangan Hak Milik',
        nav: 'SuratKeteranganHakMilik',
        background: 'white',
      },
      {
        id: 15,
        namaLayanan: 'Surat Keterangan Asal Usul Kayu',
        nav: 'SuratKeteranganAsalUsulKayu',
        background: 'white',
      },
      {
        id: 16,
        namaLayanan: 'Surat Kelahiran',
        nav: 'SuratKelahiran',
        background: 'white',
      },
      {
        id: 17,
        namaLayanan: 'Surat Keterangan Pisah (Belum Cerai)',
        nav: 'SuratKeteranganPisah',
        background: 'white',
      },
      {
        id: 18,
        namaLayanan: 'Surat Keterangan Duda/Janda',
        nav: 'SuratKeteranganDudaJanda',
        background: 'white',
      },
      {
        id: 19,
        namaLayanan: 'Surat Kehilangan',
        nav: 'SuratKehilangan',
        background: 'white',
      },
      {
        id: 20,
        namaLayanan: 'Surat Izin Keramaian',
        nav: 'SuratIzinKeramaian',
        background: 'white',
      },
      {
        id: 21,
        namaLayanan: 'Surat Izin Pesta',
        nav: 'SuratIzinPesta',
        background: 'white',
      },
      {
        id: 22,
        namaLayanan: 'Surat Keterangan Kematian',
        nav: 'SuratKeteranganKematian',
        background: 'white',
      },
      {
        id: 23,
        namaLayanan: 'Surat Keterangan Pelaku Perikanan',
        nav: 'SuratKeteranganPelakuPerikanan',
        background: 'white',
      },
      {
        id: 24,
        namaLayanan: 'Surat Keterangan Penguburan',
        nav: 'SuratKeteranganPenguburan',
        background: 'white',
      },
      {
        id: 25,
        namaLayanan: 'Surat Keterangan Catatan Kepolisian',
        nav: 'SuratKeteranganCatatanKepolisian',
        background: 'white',
      },
      {
        id: 26,
        namaLayanan: 'Surat Pengantar Rapid Tes',
        nav: 'SuratPengantarRapidTes',
        background: 'white',
      },
      {
        id: 27,
        namaLayanan: 'Surat Keterangan Penduduk',
        nav: 'SuratKeteranganPenduduk',
        background: 'white',
      },
      {
        id: 28,
        namaLayanan: 'Surat Keterangan Tempat Tinggal',
        nav: 'SuratKeteranganTempatTinggal',
        background: 'white',
      },
      {
        id: 29,
        namaLayanan: 'Surat Keterangan di Luar Daerah',
        nav: 'SuratKeteranganDiluarDaerah',
        background: 'white',
      },
      {
        id: 30,
        namaLayanan: 'Surat Keterangan Siswa Tidak Mampu',
        nav: 'SuratKeteranganSiswaTidakMampu',
        background: 'white',
      },
      {
        id: 31,
        namaLayanan: 'Surat Keterangan Belum Menikah',
        nav: 'SuratKeteranganBelumMenikah',
        background: 'white',
      },
      {
        id: 32,
        namaLayanan: 'Surat Keterangan Usaha',
        nav: 'SuratKeteranganUsaha',
        background: 'white',
      },
      {
        id: 33,
        namaLayanan: 'Surat Keterangan Buku Nikah Hilang',
        nav: 'SuratKeteranganBukuNikahHilang',
        background: 'white',
      },
    ],
  };
  renderListApp = () => {
    if (this.state.search == '') {
      return this.state.detailLayanan.map((value, key) => {
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
      });
    } else {
      let newData = this.state.detailLayanan.filter((elemen) => {
        let nameLowerCase = elemen.namaLayanan.toLowerCase();
        let searchLowerCase = this.state.search.toLowerCase();
        return nameLowerCase.includes(searchLowerCase);
      });
      console.log(newData);
      return newData.map((value, key) => {
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
      });
    }
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
          <View style={styles.contentContainer}>
            <View style={styles.boxContentSearch}>
              <TextInput
                placeholder="Cari Layanan"
                style={{width: '85%'}}
                onChangeText={(teks) => {
                  this.setState({search: teks});
                }}
                // placeholderTextColor="#d1d1d1"
              />
              <Icon name="search" size={20} color="#d1d1d1" />
            </View>
          </View>
          {/* {this.state.detailLayanan.map((value, key) => {
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
          })} */}
          {this.renderListApp()}
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
  contentContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContentSearch: {
    height: 45,
    width: '95%',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
