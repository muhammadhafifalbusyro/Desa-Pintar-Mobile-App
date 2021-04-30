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
  Modal,
  ToastAndroid,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

class PetaDetail extends React.Component {
  state = {
    promosi: false,
    dropdown: false,
    metodeDefault: 'Jual',
    metodeList: [
      {
        id: 1,
        metode: 'Jual',
      },
      {
        id: 2,
        metode: 'Sewa',
      },
      {
        id: 3,
        metode: 'Kerja Sama',
      },
    ],
    dataKategori: [],
    visibleKategori: false,
    kategoriID: '',
    kategori: 'Pilih Kategori',
    loading: false,
    harga: '',
    narasi: '',
    modalVisible: false,
    isi:''
  };
  componentDidMount() {
    this.getDataKategori();
  }
  submitData = () => {
    AsyncStorage.getItem('access').then((value) => {
      const {kategoriID, metodeDefault, harga, narasi,isi} = this.state;
      const url = 'https://api.istudios.id/v1/potensi/promosi/';

      console.log(this.state);
      if (metodeDefault != '' && harga != '' && narasi != '') {
        this.setState({modalVisible: true});
        const formData = new FormData();

        let makeKoordinat = {
          lat: this.props.route.params.latitude,
          lng: this.props.route.params.longitude,
        };

        formData.append('bidang', this.props.route.params.bidang);
        formData.append('jenis_promosi', metodeDefault);
        formData.append('nama_usaha', narasi);
        formData.append('isi',isi)
        formData.append('harga', harga);

        console.log(formData);

        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            // this.setState({modalVisible: false});
            if (json.data) {
              this.setState({modalVisible: false, harga: '', narasi: ''});
              ToastAndroid.show(
                'Promosi Berhasil Ditambahkan',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            } else {
              this.setState({modalVisible: false});
              ToastAndroid.show(
                'Potensi Gagal Ditambahkan',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }
          })
          .catch((error) => {
            this.setState({modalVisible: false});
            console.log(error);
            ToastAndroid.show(
              'Jaringan error',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          });
      } else if (metodeDefault == 'Kerja Sama' && narasi != '') {
        this.setState({modalVisible: true});
        const formData = new FormData();

        let makeKoordinat = {
          lat: this.props.route.params.latitude,
          lng: this.props.route.params.longitude,
        };

        formData.append('bidang', this.props.route.params.bidang);
        formData.append('jenis_promosi', metodeDefault);
        formData.append('nama_usaha', narasi);
        formData.append('harga', harga);

        console.log(formData);

        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            // this.setState({modalVisible: false});
            if (json.data) {
              this.setState({modalVisible: false, harga: '', narasi: ''});
              ToastAndroid.show(
                'Promosi Berhasil Ditambahkan',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            } else {
              this.setState({modalVisible: false});
              ToastAndroid.show(
                'Potensi Gagal Ditambahkan',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }
          })
          .catch((error) => {
            this.setState({modalVisible: false});
            console.log(error);
            ToastAndroid.show(
              'Jaringan error',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          });
      } else {
        ToastAndroid.show(
          'Data tidak boleh kosong',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    });
  };
  getDataKategori = () => {
    AsyncStorage.getItem('access').then((value) => {
      this.setState({loading: true});
      const token = value;
      const url = 'https://api.istudios.id/v1/kategoripotensi/';
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson.data) {
            this.setState({dataKategori: resJson.data, loading: false});
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
  methodeView = () => {
    if (this.state.metodeDefault == 'Jual') {
      return (
        <View style={{width: '100%'}}>
          <View style={styles.boxContent}>
            <Text style={styles.text1}>Harga Per M2</Text>
            <TextInput
              style={styles.childBox}
              placeholder="Masukan Harga"
              on
              keyboardType="number-pad"
              value={this.state.harga}
              onChangeText={(teks) => this.setState({harga: teks})}
            />
          </View>
          <View style={styles.boxContent}>
            <Text style={styles.text1}>Judul</Text>
            <TextInput
              style={styles.childBox}
              placeholder="Judul"
              value={this.state.narasi}
              onChangeText={(teks) => this.setState({narasi: teks})}
            />
          </View>
          <View style={styles.boxContent}>
            <Text style={styles.text1}>Narasi</Text>
            <TextInput
              style={{
                ...styles.childBox,
                height: 150,
              }}
              placeholder="Masukan Narasi"
              textAlignVertical="top"
              value={this.state.isi}
              onChangeText={(teks) => this.setState({isi: teks})}
            />
          </View>
          <View style={styles.boxContent}>
            <TouchableNativeFeedback onPress={() => this.submitData()}>
              <View
                style={{
                  ...styles.childBox,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#19D2BA',
                  borderColor: 'white',
                }}
                placeholder="Masukan Deskripsi"
                textAlignVertical="top">
                <Text style={{color: 'white'}}>PUBLISH</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      );
    } else if (this.state.metodeDefault == 'Sewa') {
      return (
        <View style={{width: '100%'}}>
          <View style={styles.boxContent}>
            <Text style={styles.text1}>Harga Sewa Per Tahun</Text>
            <TextInput
              style={styles.childBox}
              placeholder="Masukan Harga"
              keyboardType="number-pad"
              value={this.state.harga}
              onChangeText={(teks) => this.setState({harga: teks})}
            />
          </View>
          <View style={styles.boxContent}>
            <Text style={styles.text1}>Judul</Text>
            <TextInput
              style={styles.childBox}
              placeholder="Judul"
              value={this.state.narasi}
              onChangeText={(teks) => this.setState({narasi: teks})}
            />
          </View>
          <View style={styles.boxContent}>
            <Text style={styles.text1}>Narasi</Text>
            <TextInput
              style={{
                ...styles.childBox,
                height: 150,
              }}
              placeholder="Masukan Narasi"
              textAlignVertical="top"
              value={this.state.isi}
              onChangeText={(teks) => this.setState({isi: teks})}
            />
          </View>
          <View style={styles.boxContent}>
            <TouchableNativeFeedback onPress={() => this.submitData()}>
              <View
                style={{
                  ...styles.childBox,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#19D2BA',
                  borderColor: 'white',
                }}
                placeholder="Masukan Deskripsi"
                textAlignVertical="top">
                <Text style={{color: 'white'}}>PUBLISH</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      );
    } else if (this.state.metodeDefault == 'Kerja Sama') {
      return (
        <View style={{width: '100%'}}>
          <View style={styles.boxContent}>
            <Text style={styles.text1}>Judul</Text>
            <TextInput
              style={styles.childBox}
              placeholder="Judul"
              value={this.state.narasi}
              onChangeText={(teks) => this.setState({narasi: teks})}
            />
          </View>
          <View style={styles.boxContent}>
            <Text style={styles.text1}>Narasi</Text>
            <TextInput
              style={{
                ...styles.childBox,
                height: 150,
              }}
              placeholder="Masukan Narasi"
              textAlignVertical="top"
              value={this.state.isi}
              onChangeText={(teks) => this.setState({isi: teks})}
            />
          </View>
          <View style={styles.boxContent}>
            <TouchableNativeFeedback onPress={() => this.submitData()}>
              <View
                style={{
                  ...styles.childBox,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#19D2BA',
                  borderColor: 'white',
                }}
                placeholder="Masukan Deskripsi"
                textAlignVertical="top">
                <Text style={{color: 'white'}}>PUBLISH</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      );
    }
  };
  promosi = () => {
    if (this.state.promosi) {
      return (
        <View style={{width: '100%'}}>
          <View style={styles.boxContent}>
            <Text style={styles.text1}>Jual/Sewa/Kerja sama</Text>
            <View style={styles.childBox}>
              <Text style={{color: '#444444'}}>{this.state.metodeDefault}</Text>
              <Icon
                name="chevron-down"
                size={25}
                onPress={() => this.setState({dropdown: true})}
                color="grey"
              />
            </View>
          </View>
          {/* <View style={styles.boxContent}>
            <Text style={styles.text1}>Pilih Kategori</Text>
            <View style={styles.childBox}>
              <Text style={{color: '#444444'}}>{this.state.kategori}</Text>
              <Icon
                name="chevron-down"
                size={25}
                onPress={() => this.setState({visibleKategori: true})}
                color="grey"
              />
            </View>
          </View> */}
          {this.methodeView()}
        </View>
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
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
        <Modal
          visible={this.state.visibleKategori}
          animationType="slide"
          transparent={true}
          onRequestClose={() => this.setState({visibleKategori: false})}>
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
                <Text style={{fontWeight: 'bold'}}>Pilih Kategori</Text>
              </View>
              <ScrollView style={{flex: 1, padding: 10}}>
                {this.state.dataKategori.map((value, key) => {
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
                            kategoriID: value.id,
                            kategori: value.nama,
                            visibleKategori: false,
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
          visible={this.state.dropdown}
          animationType="slide"
          transparent={true}
          onRequestClose={() => this.setState({dropdown: false})}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}>
            <View
              style={{
                height: '30%',
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
                <Text style={{fontWeight: 'bold'}}>Pilih Metode</Text>
              </View>
              <ScrollView style={{flex: 1, padding: 10}}>
                {this.state.metodeList.map((value, key) => {
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
                            metodeDefault: value.metode,
                            dropdown: false,
                          })
                        }>
                        {value.metode}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={30}
            color="white"
            onPress={() => this.props.navigation.goBack()}
          />
          <Text style={styles.textHeader}>Peta</Text>
        </View>
        <ScrollView
          style={styles.scroll}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              colors={['#19D2BA']}
              onRefresh={() => {
                this.getDataKategori();
              }}
            />
          }>
          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              marginTop: 15,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#444444',
            }}>
            {this.props.route.params.namabidang}
          </Text>
          <View style={styles.cameraContainer}>
            <ImageBackground
              style={styles.boxCamera}
              source={{
                uri: this.props.route.params.gambar,
              }}>
              <TouchableNativeFeedback
                onPress={() =>
                  this.props.navigation.navigate('PetaPreview', {
                    geometry: this.props.route.params.geometry,
                    namabidang: this.props.route.params.namabidang,
                  })
                }>
                <View style={styles.boxLiihat}>
                  <Text style={styles.textLihat}>Lihat Peta</Text>
                </View>
              </TouchableNativeFeedback>
            </ImageBackground>
          </View>
          <Text
            style={{marginHorizontal: 10, marginBottom: 5, color: '#444444'}}>
            Luas:{' '}
            {this.props.route.params.luas == null
              ? ''
              : this.props.route.params.luas}
          </Text>
          <Text
            style={{marginHorizontal: 10, marginBottom: 5, color: '#444444'}}>
            Status Hak:{' '}
            {this.props.route.params.status_hak == null
              ? ''
              : this.props.route.params.status_hak}
          </Text>
          <Text
            style={{marginHorizontal: 10, marginBottom: 5, color: '#444444'}}>
            Penggunaan Tanah:{' '}
            {this.props.route.params.penggunaan_tanah == null
              ? ''
              : this.props.route.params.penggunaan_tanah}
          </Text>
          <Text
            style={{marginHorizontal: 10, marginBottom: 5, color: '#444444'}}>
            Pemanfaatan Tanah:{' '}
            {this.props.route.params.pemanfaatan_tanah == null
              ? ''
              : this.props.route.params.pemanfaatan_tanah}
          </Text>
          <Text
            style={{marginHorizontal: 10, marginBottom: 10, color: '#444444'}}>
            RT/RW:{' '}
            {this.props.route.params.rtrw == null
              ? ''
              : this.props.route.params.rtrw}
          </Text>
          <View style={styles.boxContent}>
            <TouchableNativeFeedback
              onPress={() => this.setState({promosi: !this.state.promosi})}>
              <View
                style={{
                  ...styles.childBox,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ffda77',
                  borderColor: 'white',
                }}
                placeholder="Masukan Deskripsi"
                textAlignVertical="top">
                <Text style={{color: '#444444'}}>PROMOSI</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          {this.promosi()}
        </ScrollView>
      </View>
    );
  }
}
export default PetaDetail;

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
    borderColor: '#d1d1d1',
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
  textLihat: {
    color: '#444444',
  },
});
