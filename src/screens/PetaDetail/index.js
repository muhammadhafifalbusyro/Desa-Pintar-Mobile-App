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
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

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
  };
  methodeView = () => {
    if (this.state.metodeDefault == 'Jual') {
      return (
        <View style={{width: '100%'}}>
          <View style={styles.boxContent}>
            <Text style={styles.text1}>Harga Per M2</Text>
            <TextInput style={styles.childBox} placeholder="Masukan Harga" />
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
            />
          </View>
          <View style={styles.boxContent}>
            <TouchableNativeFeedback>
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
            <TextInput style={styles.childBox} placeholder="Masukan Harga" />
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
            />
          </View>
          <View style={styles.boxContent}>
            <TouchableNativeFeedback>
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
            <Text style={styles.text1}>Narasi</Text>
            <TextInput
              style={{
                ...styles.childBox,
                height: 150,
              }}
              placeholder="Masukan Narasi"
              textAlignVertical="top"
            />
          </View>
          <View style={styles.boxContent}>
            <TouchableNativeFeedback>
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
          {this.methodeView()}
        </View>
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.dropdown}
          animationType="slide"
          transparent={true}
          onRequestClose={() => this.setState({dropdown: false})}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
        <ScrollView style={styles.scroll}>
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
                uri:
                  'https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/10/5-Characters-Sanji-Can-Beat.jpg',
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
            Luas : 2500m2
          </Text>
          <Text
            style={{marginHorizontal: 10, marginBottom: 5, color: '#444444'}}>
            Status Hak : 2500m2
          </Text>
          <Text
            style={{marginHorizontal: 10, marginBottom: 5, color: '#444444'}}>
            Penggunaan Tanah : 2500m2
          </Text>
          <Text
            style={{marginHorizontal: 10, marginBottom: 5, color: '#444444'}}>
            Pemanfaatan Tanah : 2500m2
          </Text>
          <Text
            style={{marginHorizontal: 10, marginBottom: 10, color: '#444444'}}>
            RT/RW : 2500m2
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
  textLihat: {
    color: '#444444',
  },
});
