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
  ActivityIndicator,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const accessToken =
//   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA3ODMyODMwLCJqdGkiOiJhMGU1ZTRjYzYxZDI0MWVjOWIyZTIxOTQxZWEyMDFlNSIsInVzZXJfaWQiOjF9.n33NInIK_xvOg74F1KMJIBikzlZn2_6dZAr8qEip8WM';

class EditPotensi extends React.Component {
  state = {
    data: [],
    loading: false,
    loading2:false,
    popup:false,
    idKonten:''
  };
  componentDidMount() {
    this.getDataLapor();
  }
  deleteData=(id)=>{
    AsyncStorage.getItem('access').then((value) => {
      this.setState({loading2: true});
      const url = `https://api.istudios.id/v1/potensi/${id}/`;
      const token = value;
      fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson.data);
          if (resJson.data) {
            this.setState({loading2: false,popup:false});
            ToastAndroid.show(
              resJson.data.status,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            this.getDataLapor()
          } else {
            this.setState({loading2: false});
            ToastAndroid.show(
              'Data gagal dihapus',
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
  }
  getDataLapor = () => {
    AsyncStorage.getItem('access').then((value) => {
      this.setState({loading: true});
      const url = 'https://api.istudios.id/v1/potensi/?include[]=kategori';
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
  editPotensi=(id)=>{
    this.setState({popup:false})
    this.props.navigation.navigate('TambahPotensi2',{id:id})
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
        visible={this.state.popup}
          animationType="slide"
          transparent={true}
          onRequestClose={() => this.setState({popup: false})}
        >
          <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.1)',}}

          >
            <View style={{width:'80%',padding:10,backgroundColor:'white',borderRadius:5,alignItems:'center'}}>
              <View style={{width:'100%',padding:5,alignItems:'flex-end'}}>
                  <Icon name='x'color='red' size={20} onPress={()=>this.setState({popup:false})}/>
              </View>
              <Text style={{color:'#444444'}}>Silakan pilih aksi di bawah ini:</Text>
              <TouchableOpacity activeOpacity={0.7} delayPressIn={0.1} style={{height:45,width:'80%',backgroundColor:'#FFDA77',borderRadius:5,marginVertical:10,justifyContent:'center',alignItems:'center',}} onPress={()=>this.editPotensi(this.state.idKonten)}>
                  <Text style={{color:'white'}}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} delayPressIn={0.1} style={{height:45,width:'80%',backgroundColor:'#FA7F72',borderRadius:5,marginVertical:10,justifyContent:'center',alignItems:'center',}} onPress={()=>this.deleteData(this.state.idKonten)}>
                  {
                    this.state.loading2==true?
                    (
                      <ActivityIndicator size='small' color='white'/>
                    ):
                    (
                      <Text style={{color:'white'}}>Hapus</Text>
                    )
                  }
              </TouchableOpacity>
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
          <Text style={styles.textHeader}>Edit Potensi</Text>
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
            let isiFil = value.isi == null ? '' : value.isi;
            let newIsi = [];
            for (let x = 0; x <= 101; x++) {
              if (x <= 100) {
                newIsi.push(isiFil[x]);
              } else {
                newIsi.push(' ...');
              }
            }
            return (
              <View key={key} style={styles.boxContent}>
                <TouchableNativeFeedback onPress={()=>this.setState({popup:true,idKonten:value.id})}>
                <View style={styles.childBoxContent}>
                  <Image source={{uri: value.gambar}} style={styles.image} />
                  <View style={styles.content1}>
                    <Text style={styles.text1}>
                      {value.nama_usaha}
                    </Text>
                    <View
                      style={{
                        ...styles.statusBox,
                        backgroundColor: '#FFDA77',
                        borderColor: '#FFDA77',
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          ...styles.text2,
                        }}>
                        {value.kategori == null ? '' : value.kategori.nama}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.boxDesc}>
                    <Text style={styles.textDesc}>
                      {isiFil.length <= 100 ? isiFil : newIsi}
                    </Text>
                  </View>
                </View>
                </TouchableNativeFeedback>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => this.props.navigation.navigate('TambahPotensi')}>
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}
export default EditPotensi;

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
    paddingBottom: 15,
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
    color: '#444444',
    fontWeight:'bold'
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
