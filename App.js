import React from 'react';
import MainNavigator from './src/navigation';

class App extends React.Component {
  render() {
    console.log('hello');
    return <MainNavigator />;
  }
}
export default App;

// // import React from 'react';
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// //   ScrollView,
// //   Platform,
// //   SafeAreaView,
// //   Button,
// // } from 'react-native';

// // import ImagePicker from 'react-native-image-picker';
// // const options = {
// //   title: 'Select Avatar',
// //   storageOptions: {
// //     skipBackup: true,
// //     path: 'images',
// //   },
// // };

// // export default class App extends React.Component {
// //   state = {
// //     avatarSource: '',
// //     fileName: '',
// //     type: '',
// //     uri: '',
// //     fileSize: '',
// //   };
// //   pickerImage = () => {
// //     ImagePicker.showImagePicker(options, response => {
// //       console.log('Response = ', response);

// //       if (response.didCancel) {
// //         console.log('User cancelled image picker');
// //       } else if (response.error) {
// //         console.log('ImagePicker Error: ', response.error);
// //       } else if (response.customButton) {
// //         console.log('User tapped custom button: ', response.customButton);
// //       } else {
// //         const source = {uri: response.uri};
// //         const fileName = response.fileName;
// //         const type = response.type;
// //         const uri = response.uri;
// //         const fileSize = response.fileSize;

// //         this.setState({
// //           avatarSource: source,
// //           fileName: fileName,
// //           type: type,
// //           uri: uri,
// //           fileSize: fileSize,
// //         });
// //       }
// //     });
// //   };
// //   render() {
// //     return (
// //       <View>
// //         <Button title="klik" onPress={() => this.pickerImage()} />
// //       </View>
// //     );
// //   }
// // }

// import React from 'react';
// import {View, Text} from 'react-native';
// import MapView, {Polyline, Polygon} from 'react-native-maps';

// const COORDINATES = [
//   {latitude: 37.8025259, longitude: -122.4351431},
//   {latitude: 37.7896386, longitude: -122.421646},
//   {latitude: 37.7665248, longitude: -122.4161628},
//   {latitude: 37.7734153, longitude: -122.4577787},
//   {latitude: 37.7948605, longitude: -122.4596065},
//   {latitude: 37.8025259, longitude: -122.4351431},
// ];
// // const CORR = [
// //   [37.8025259, -122.4351431],
// //   [37.7896386, -122.421646],
// //   [37.7665248, -122.4161628],
// //   [37.7734153, -122.4577787],
// //   [37.7948605, -122.4596065],
// //   [37.8025259, -122.4351431],
// // ];
// const region = {
//   latitude: 37.78825,
//   longitude: -122.4324,
//   latitudeDelta: 0.09,
//   longitudeDelta: 0.09,
// };
// const CORRR = [
//   {longitude: 122.86067468122086, latitude: 0.781962414844489},
//   {longitude: 122.86066905983787, latitude: 0.782097926975666},
//   {longitude: 122.86082618826985, latitude: 0.782093469438839},
//   {longitude: 122.86079387778285, latitude: 0.781954357297433},
//   {longitude: 122.86067468122086, latitude: 0.781962414844489},
// ];

// const regionWil = {
//   latitude: 0.78222222,
//   longitude: 122.85999,
//   latitudeDelta: 0.009,
//   longitudeDelta: 0.009,
// };
// export default class App extends React.Component {
//   render() {
//     return (
//       <MapView style={{flex: 1}} region={regionWil} showsUserLocation={true}>
//         <Polygon
//           coordinates={CORRR}
//           strokeColor="red"
//           strokeWidth={2}
//           fillColor="red"
//         />
//       </MapView>
//     );
//   }
// }
