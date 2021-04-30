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

class PotensiBidang extends React.Component {
  
  
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
          <Text style={styles.textHeader}>Peta</Text>
        </View>
        <ScrollView
          style={styles.scroll}
          >
          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              marginTop: 15,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#444444',
            }}>
            {this.props.route.params.item.nama_usaha}
          </Text>
          <View style={styles.cameraContainer}>
            <ImageBackground
              style={styles.boxCamera}
              source={{
                uri: this.props.route.params.item.gambar,
              }}>
              <TouchableNativeFeedback
                onPress={() =>
                  this.props.navigation.navigate('PetaPreviewBidang', {
                    koordinat: this.props.route.params.item.koordinat,
                    namabidang: this.props.route.params.item.nama_usaha,
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
            {this.props.route.params.item.luas == null
              ? ''
              : this.props.route.params.item.luas}
          </Text>
          <Text
            style={{marginHorizontal: 10, marginBottom: 5, color: '#444444'}}>
            Status Hak:{' '}
            {this.props.route.params.item.status_hak == null
              ? ''
              : this.props.route.params.item.status_hak}
          </Text>
          <Text
            style={{marginHorizontal: 10, marginBottom: 5, color: '#444444'}}>
            Penggunaan Tanah:{' '}
            {this.props.route.params.item.penggunaan_tanah == null
              ? ''
              : this.props.route.params.item.penggunaan_tanah}
          </Text>
          <Text
            style={{marginHorizontal: 10, marginBottom: 5, color: '#444444'}}>
            Pemanfaatan Tanah:{' '}
            {this.props.route.params.item.pemanfaatan_tanah == null
              ? ''
              : this.props.route.params.item.pemanfaatan_tanah}
          </Text>
          <Text
            style={{marginHorizontal: 10, marginBottom: 10, color: '#444444'}}>
            RT/RW:{' '}
            {this.props.route.params.item.rtrw == null
              ? ''
              : this.props.route.params.item.rtrw}
          </Text>
          <View style={{width:'100%',marginVertical:20}}>
              <View
                style={{
                  ...styles.childBox,
                  width:'100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ffda77',
                  borderColor: 'white',
                }}
                placeholder="Masukan Deskripsi"
                textAlignVertical="top">
                <Text style={{color: '#444444'}}>#{this.props.route.params.item.jenis_promosi == null
              ? ''
              : this.props.route.params.item.jenis_promosi}</Text>
              </View>
          </View>
          <Text
            style={{marginHorizontal: 10, marginBottom: 10, color: '#444444'}}>
            Harga:{' '}
            {this.props.route.params.item.harga == null
              ? ''
              : this.props.route.params.item.harga}
          </Text>
          <Text
            style={{marginHorizontal: 10, marginBottom: 10, color: '#444444'}}>
            
            {this.props.route.params.item.isi == null
              ? ''
              : this.props.route.params.item.isi}
          </Text>
        </ScrollView>
      </View>
    );
  }
}
export default PotensiBidang;

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
    height: 35,
    width: '100%',
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
