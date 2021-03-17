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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const widthDim = Dimensions.get('window').width;

class Layanan extends React.Component {
  state = {
    layananList: [
      {
        id: 1,
        nama: 'Administrasi',
        bg: '#FFDA77',
        nav: 'DetailLayanan',
        img: require('../../assets/images/folderIcon.png'),
      },
      {
        id: 2,
        nama: 'Perizinan',
        bg: '#FFA45B',
        nav: null,
        img: require('../../assets/images/cardIcon.png'),
      },
      {
        id: 3,
        nama: 'Pendidikan',
        bg: '#AEE6E6',
        nav: null,
        img: require('../../assets/images/hatIcon.png'),
      },
      {
        id: 4,
        nama: 'CCTV',
        bg: '#AEE6E6',
        nav: 'CCTV',
        img: require('../../assets/images/cctvIcon.png'),
      },
    ],
    search: '',
  };

  renderListApp = () => {
    if (this.state.search == '') {
      return this.state.layananList.map((value, key) => {
        if (value.nav != null) {
          return (
            <View style={styles.boxRenderList} key={key}>
              <TouchableNativeFeedback
                onPress={() => this.props.navigation.navigate(value.nav)}>
                <View style={styles.boxIconContainer}>
                  <Image source={value.img} />
                </View>
              </TouchableNativeFeedback>
              <Text style={styles.imageBox}>{value.nama}</Text>
            </View>
          );
        } else {
          return (
            <View style={styles.boxRenderList} key={key}>
              <View style={styles.boxIconContainer}>
                <Image source={value.img} />
              </View>
              <Text style={styles.imageBox}>{value.nama}</Text>
            </View>
          );
        }
      });
    } else {
      let newData = this.state.layananList.filter((elemen) => {
        let nameLowerCase = elemen.nama.toLowerCase();
        let searchLowerCase = this.state.search.toLowerCase();
        return nameLowerCase.includes(searchLowerCase);
      });
      console.log(newData);
      return newData.map((value, key) => {
        if (value.nav != null) {
          return (
            <View style={styles.boxRenderList} key={key}>
              <TouchableNativeFeedback
                onPress={() => this.props.navigation.navigate(value.nav)}>
                <View style={styles.boxIconContainer}>
                  <Image source={value.img} />
                </View>
              </TouchableNativeFeedback>
              <Text style={styles.imageBox}>{value.nama}</Text>
            </View>
          );
        } else {
          return (
            <View style={styles.boxRenderList} key={key}>
              <View style={styles.boxIconContainer}>
                <Image source={value.img} />
              </View>
              <Text style={styles.imageBox}>{value.nama}</Text>
            </View>
          );
        }
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Layanan</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <Text style={styles.teks}>
            Silahkan cari layanan yang anda butuhkan :
          </Text>
          <View style={styles.contentContainer}>
            <View style={styles.boxContentSearch}>
              <TextInput
                placeholder="Cari Layanan"
                style={{width: '85%'}}
                onChangeText={(teks) => {
                  this.setState({search: teks});
                }}
                placeholderTextColor="#444444"
              />
              <Icon name="search" size={20} color="grey" />
            </View>
          </View>
          {/* {this.state.layananList.map((value, key) => {
            if (value.nav != null) {
              return (
                <View style={styles.boxContainer} key={key}>
                  <TouchableNativeFeedback
                    onPress={() => this.props.navigation.navigate(value.nav)}>
                    <View
                      style={{...styles.boxContent, backgroundColor: value.bg}}>
                      <Text style={styles.text1}>{value.nama}</Text>
                      <Icon name="chevron-right" size={40} color="grey" />
                    </View>
                  </TouchableNativeFeedback>
                </View>
              );
            } else {
              return (
                <View style={styles.boxContainer} key={key}>
                  <View
                    style={{...styles.boxContent, backgroundColor: value.bg}}>
                    <Text style={styles.text1}>{value.nama}</Text>
                    <Icon name="chevron-right" size={40} color="grey" />
                  </View>
                </View>
              );
            }
          })} */}
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            {this.renderListApp()}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Layanan;

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
  teks: {
    marginTop: 5,
    padding: 10,
    fontWeight: 'bold',
    color: '#444444',
  },
  contentContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContentSearch: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
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
  boxRenderList: {
    height: widthDim / 2,
    width: widthDim / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxIconContainer: {
    height: widthDim / 2.5,
    width: widthDim / 2.5,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444444',
    marginTop: 5,
  },
});
