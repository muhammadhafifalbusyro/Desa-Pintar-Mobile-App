import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  ToastAndroid,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const width = Dimensions.get('window').width;

class DetailBeranda extends React.Component {
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
          <Text style={styles.textHeader}>Beranda</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.boxBanner}>
            <Image
              source={{uri: this.props.route.params.item.gambar}}
              style={styles.banner}
            />
          </View>
          <View style={styles.containerNav}>
            <Text style={styles.title}>
              {this.props.route.params.item.judul}
            </Text>
          </View>
          <View style={styles.textBox}>
            <Text style={{color: '#444444'}}>
              {this.props.route.params.item.isi}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default DetailBeranda;

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
  boxBanner: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: 150,
    width: '100%',
    borderRadius: 10,
  },
  containerNav: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
  },
  textBox: {
    padding: 10,
  },
  boxNav: {
    height: 40,
    width: width / 3.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19D2BA',
    borderRadius: 5,
    elevation: 5,
  },
  textNav: {
    color: 'white',
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
    backgroundColor: 'white',
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
});
