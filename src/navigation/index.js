import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Login from '../screens/Login';
import Beranda from '../screens/Beranda';
import Layanan from '../screens/Layanan';
import Peta from '../screens/Peta';
import Lapor from '../screens/Lapor';
import Akun from '../screens/Akun';
import Splash from '../screens/Splash';
import BuatLaporan from '../screens/BuatLaporan';
import PetaDetail from '../screens/PetaDetail';
import PetaPreview from '../screens/PetaPreview';
import DetailBeranda from '../screens/DetailBeranda';
import EditProfile from '../screens/EditProfile';
import EditPotensi from '../screens/EditPotensi';
import TambahPotensi from '../screens/TambahPotensi';
import CCTV from '../screens/CCTV';
import TambahPotensi2 from '../screens/TambahPotensi2';
import PotensiMasyarakat from '../screens/PotensiMasyarakat';
import PotensiBidang from '../screens/PotensiBidang';
import PetaPreviewBidang from '../screens/PetaPreviewBidang';
import SuratKeteranganDomisili from '../screens/LayananAdministrasi/SuratKeteranganDomisili';
import Administrasi from '../screens/Administrasi';
import SuratKeteranganKeluargaMiskin from '../screens/LayananAdministrasi/SuratKeteranganKeluargaMiskin';
import SuratPembagianWarisan from '../screens/LayananAdministrasi/SuratPembagianWarisan';
import LaporanPenggunaanBiayaPemakaman from '../screens/LayananAdministrasi/LaporanPenggunaanBiayaPemakaman';
import KeteranganTidakMemilikiBantuanSosial from '../screens/LayananAdministrasi/KeteranganTidakMemilikiBantuanSosial';
import SuratKeteranganAhliWarisNonTunggal from '../screens/LayananAdministrasi/SuratKeteranganAhliWarisNonTunggal';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function layananStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="Layanan" component={Layanan} />
      <Stack.Screen name="Administrasi" component={Administrasi} />
      <Stack.Screen
        name="SuratKeteranganDomisili"
        component={SuratKeteranganDomisili}
      />
      <Stack.Screen
        name="SuratKeteranganKeluargaMiskin"
        component={SuratKeteranganKeluargaMiskin}
      />
      <Stack.Screen
        name="SuratPembagianWarisan"
        component={SuratPembagianWarisan}
      />
      <Stack.Screen
        name="LaporanPenggunaanBiayaPemakaman"
        component={LaporanPenggunaanBiayaPemakaman}
      />
      <Stack.Screen
        name="KeteranganTidakMemilikiBantuanSosial"
        component={KeteranganTidakMemilikiBantuanSosial}
      />
      <Stack.Screen
        name="SuratKeteranganAhliWarisNonTunggal"
        component={SuratKeteranganAhliWarisNonTunggal}
      />
      <Stack.Screen name="CCTV" component={CCTV} />
    </Stack.Navigator>
  );
}

function petaStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="Peta" component={Peta} />
      <Stack.Screen name="PetaDetail" component={PetaDetail} />
      <Stack.Screen name="PetaPreview" component={PetaPreview} />
    </Stack.Navigator>
  );
}

function laporStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="Lapor" component={Lapor} />
      <Stack.Screen name="BuatLaporan" component={BuatLaporan} />
    </Stack.Navigator>
  );
}
function berandaStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="Beranda" component={Beranda} />
      <Stack.Screen name="DetailBeranda" component={DetailBeranda} />
      <Stack.Screen name="PotensiMasyarakat" component={PotensiMasyarakat} />
      <Stack.Screen name="PotensiBidang" component={PotensiBidang} />
      <Stack.Screen name="PetaPreviewBidang" component={PetaPreviewBidang} />
    </Stack.Navigator>
  );
}
function AkunStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="Akun" component={Akun} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditPotensi" component={EditPotensi} />
      <Stack.Screen name="TambahPotensi" component={TambahPotensi} />
      <Stack.Screen name="TambahPotensi2" component={TambahPotensi2} />
    </Stack.Navigator>
  );
}
function MainScreens() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let sizeIcon;

          if (route.name === 'Beranda') {
            iconName = focused ? 'home' : 'home';
            sizeIcon = size;
          } else if (route.name === 'Layanan') {
            iconName = focused ? 'grid' : 'grid';
            sizeIcon = size;
          } else if (route.name === 'Peta') {
            iconName = focused ? 'map' : 'map';
            sizeIcon = size;
          } else if (route.name === 'Lapor') {
            iconName = focused ? 'alert-circle' : 'alert-circle';
            sizeIcon = size;
          } else if (route.name === 'Akun') {
            iconName = focused ? 'user' : 'user';
            sizeIcon = size;
          }

          return <Icon name={iconName} size={sizeIcon} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#19D2BA',
        inactiveTintColor: 'grey',
        showLabel: false,
      }}>
      <Tab.Screen name="Beranda" component={berandaStack} />
      <Tab.Screen name="Layanan" component={layananStack} />
      <Tab.Screen name="Peta" component={petaStack} />
      <Tab.Screen name="Lapor" component={laporStack} />
      <Tab.Screen name="Akun" component={AkunStack} />
      {/* <Tab.Screen
        name="BuatLaporan"
        component={BuatLaporan}
        options={{tabBarVisible: false, tabBarButton: () => null}}
      />
      <Tab.Screen
        name="PetaDetail"
        component={PetaDetail}
        options={{tabBarVisible: false, tabBarButton: () => null}}
      />
      <Tab.Screen
        name="PetaPreview"
        component={PetaPreview}
        options={{tabBarVisible: false, tabBarButton: () => null}}
      />
      <Tab.Screen
        name="DetailLayanan"
        component={DetailLayanan}
        options={{tabBarVisible: false, tabBarButton: () => null}}
      />
      <Tab.Screen
        name="TambahLayanan"
        component={TambahLayanan}
        options={{tabBarVisible: false, tabBarButton: () => null}}
      />
      <Tab.Screen
        name="DetailBeranda"
        component={DetailBeranda}
        options={{tabBarVisible: false, tabBarButton: () => null}}
      /> */}
    </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainScreens" component={MainScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
