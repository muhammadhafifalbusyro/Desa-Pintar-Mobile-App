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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuratKeteranganPerekaman from '../SuratKeteranganPerekaman';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const axios = require('axios');
const heightDim = Dimensions.get('window').height;
const moment = require('moment');
class SuratIzinPesta extends React.Component {
  state = {
    tanggal: 'DD-MM-YYYY',
    tanggalView: 'DD-MM-YYYY',
    visibleTanggal: false,
    time: 'HH:MM',
    visibleTime: false,
    tempat: '',
    jenis_pesta: '',
    token: '',
    modalVisible: false,
  };
  componentDidMount() {
    AsyncStorage.getItem('access').then((value) =>
      this.setState({token: value}),
    );
  }
  showTanggal = () => {
    this.setState({visibleTanggal: true});
  };
  hideTanggal = () => {
    this.setState({visibleTanggal: false});
  };
  handleConfirmTanggal = (date) => {
    // console.log(date);
    console.log(moment(date).format('YYYY-MM-DD'));
    this.setState({
      tanggalView: moment(date).format('DD-MM-YYYY'),
      tanggal: moment(date).format('YYYY-MM-DD'),
    });
    this.hideTanggal();
  };

  showTime = () => {
    this.setState({visibleTime: true});
  };
  hideTime = () => {
    this.setState({visibleTime: false});
  };
  handleConfirmTime = (time) => {
    console.log(time);

    this.setState({
      time: moment(time).format('HH:mm'),
    });
    this.hideTime();
  };
  tambahLayanan = () => {
    const {tanggal, time, tempat, jenis_pesta} = this.state;
    const newJenisPesta = jenis_pesta.split(',');
    if (
      (tanggal != 'DD-MM-YYYY' && time != 'HH:MM',
      tempat != '' && jenis_pesta != '')
    ) {
      this.setState({modalVisible: true});
      const url = 'https://api.istudios.id/v1/layanansurat/izinpesta/';

      const datas = {
        atribut: {
          tanggal,
          waktu_mulai: time,
          tempat,
          jenis_pesta: newJenisPesta,
        },
      };
      console.log(datas);
      axios
        .post(url, datas, {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        })
        .then((resJson) => {
          console.log(resJson);
          if (resJson.data) {
            ToastAndroid.show(
              'Berhasil ditambahkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            this.setState({modalVisible: false});
          } else {
            ToastAndroid.show(
              'Gagal ditambahkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            this.setState({modalVisible: false});
          }
        })
        .catch((er) => {
          console.log(er.response);
          ToastAndroid.show(
            'Jaringan error',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.setState({modalVisible: false});
        });
    } else {
      ToastAndroid.show(
        'Data tidak boleh kosong',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
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
        <DateTimePickerModal
          isVisible={this.state.visibleTanggal}
          mode="date"
          onConfirm={(date) => this.handleConfirmTanggal(date)}
          onCancel={() => this.hideTanggal()}
        />
        <DateTimePickerModal
          isVisible={this.state.visibleTime}
          mode="time"
          onConfirm={(time) => this.handleConfirmTime(time)}
          onCancel={() => this.hideTime()}
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
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: 'grey',
              }}>
              Surat Izin Pesta
            </Text>
          </View>

          <View
            style={{paddingHorizontal: 10, width: '100%', paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Tanggal Mulai
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
              <Text style={{color: '#444444'}}>{this.state.tanggalView}</Text>
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
                  onPress={() => this.showTanggal()}
                />
              </View>
            </View>
          </View>
          <View
            style={{paddingHorizontal: 10, width: '100%', paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Waktu Mulai
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
              <Text style={{color: '#444444'}}>{this.state.time}</Text>
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
                  name="clock"
                  size={25}
                  color="grey"
                  onPress={() => this.showTime()}
                />
              </View>
            </View>
          </View>
          <View
            style={{width: '100%', paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{marginBottom: 10, color: 'grey', fontWeight: 'bold'}}>
              Tempat
            </Text>
            <TextInput
              value={this.state.tempat}
              onChangeText={(teks) => this.setState({tempat: teks})}
              textAlignVertical="top"
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
              Jenis Pesta
            </Text>
            <Text style={{marginBottom: 10, color: 'grey', fontSize: 10}}>
              Jika lebih dari satu pisahkan dengan tanda koma (,)
            </Text>
            <TextInput
              value={this.state.jenis_pesta}
              onChangeText={(teks) => this.setState({jenis_pesta: teks})}
              textAlignVertical="top"
              style={{
                width: '100%',
                height: 45,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'grey',
              }}
            />
          </View>
          <View style={{padding: 10, flexDirection: 'row', width: '100%'}}>
            <TouchableNativeFeedback onPress={() => this.tambahLayanan()}>
              <View
                style={{
                  height: 40,
                  width: 100,
                  backgroundColor: '#61d1de',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>Submit</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.goBack()}>
              <View
                style={{
                  height: 40,
                  width: 100,
                  backgroundColor: '#ff9c96',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
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
export default SuratIzinPesta;

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
