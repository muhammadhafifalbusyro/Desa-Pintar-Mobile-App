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
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SuratKeteranganKeluargaMiskin extends React.Component {
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
                color: 'grey',
              }}>
              Surat Keterangan Keluarga Miskin (Santunan Duka)
            </Text>
          </View>
          <View
            style={{paddingHorizontal: 10, paddingBottom: 5, paddingTop: 10}}>
            <Text style={{color: 'grey', fontWeight: 'bold'}}>Kematian</Text>
          </View>
          <View style={{padding: 10, width: '100%'}}>
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
              <Text style={{color: '#444444'}}>hallo</Text>
              <View
                style={{
                  height: 35,
                  width: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderLeftWidth: 1,
                  borderColor: 'grey',
                }}>
                <Icon name="chevron-down" size={30} color="grey" />
              </View>
            </View>
          </View>
          <View style={{padding: 10, flexDirection: 'row', width: '100%'}}>
            <TouchableNativeFeedback>
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
            <TouchableNativeFeedback>
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
export default SuratKeteranganKeluargaMiskin;

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
