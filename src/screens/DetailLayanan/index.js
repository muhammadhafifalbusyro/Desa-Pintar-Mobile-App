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

class DetailLayanan extends React.Component {
  state = {
    promosi: false,
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

          <View style={styles.boxContainer}>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('TambahLayanan')}>
              <View style={{...styles.boxContent, backgroundColor: '#ffda77'}}>
                <Text style={styles.text1}>Surat Keterangan Domisili</Text>
                <Icon name="chevron-right" size={40} color="grey" />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.boxContainer}>
            <View style={styles.boxContent}>
              <Text style={styles.text1}>Surat Pengantar SKCK</Text>
              <Icon name="chevron-right" size={40} color="grey" />
            </View>
          </View>
          <View style={styles.boxContainer}>
            <View style={{...styles.boxContent, backgroundColor: '#aee6e6'}}>
              <Text style={styles.text1}>Surat Keterangan Keahlian</Text>
              <Icon name="chevron-right" size={40} color="grey" />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default DetailLayanan;

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
});
