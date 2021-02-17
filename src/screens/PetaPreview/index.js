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
import MapView, {Polygon, Polyline} from 'react-native-maps';

const CORRR = [
  {longitude: 122.86067468122086, latitude: 0.781962414844489},
  {longitude: 122.86066905983787, latitude: 0.782097926975666},
  {longitude: 122.86082618826985, latitude: 0.782093469438839},
  {longitude: 122.86079387778285, latitude: 0.781954357297433},
  {longitude: 122.86067468122086, latitude: 0.781962414844489},
];

const regionWil = {
  latitude: 0.7818,
  longitude: 122.8608,
  latitudeDelta: 0.0009,
  longitudeDelta: 0.0009,
};

class PetaPreview extends React.Component {
  state = {
    kordinat: [],
  };
  componentDidMount() {
    this.cordinateFilter();
  }
  cordinateFilter = () => {
    const data = this.props.route.params.geometry.coordinates[0];
    console.log(data.length);
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      newData.push({longitude: data[i][0], latitude: data[i][1]});
    }
    console.log(newData);
    this.setState({kordinat: newData});
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
          <Text style={styles.textHeader}>Peta</Text>
        </View>
        <View style={styles.boxMap}>
          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              marginTop: 15,
              marginBottom: 15,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#444444',
            }}>
            {this.props.route.params.namabidang}
          </Text>
          {/* <MapView
            style={{
              height: '100%',
              width: '100%',
            }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          /> */}
          <MapView
            style={{height: '100%', width: '100%'}}
            region={regionWil}
            showsUserLocation={true}>
            <Polygon
              coordinates={this.state.kordinat}
              strokeColor="red"
              strokeWidth={2}
              fillColor="rgba(252,3,3,0.5)"
            />
          </MapView>
        </View>
      </View>
    );
  }
}
export default PetaPreview;

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
  boxMap: {
    backgroundColor: '#ffda77',
  },
});
