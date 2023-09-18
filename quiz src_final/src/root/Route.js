import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import 'react-native-gesture-handler';
import Login from './src/auth/Login';
import Home from './src/home/Home';
import Register from './src/auth/Register';
import Setting from './src/home/Setting';
import Manage from './Manager';
import ForgotPass from './src/auth/ForgotPass';
import NewPass from './src/auth/NewPass';
import Profile from './src/home/Profile';
import EditProfile from './src/home/EditProfile';
import Hasil from './src/result/Hasil';
import Pilih from './src/quiz/Pilih';
import Link from './src/quiz/Link';
import HomeSiswa from './src/home/HomeSiswa';
import HasilSiswa from './src/result/HasilSiswa';
import JoinQuis from './src/quiz/JoinQuis';
import Quis from './src/quiz/Quis';
import CreateQuis from './src/quiz/CreateQuis';
import Tabel from './src/result/Tabel';
import TabelSiswa from './src/result/TableSiswa';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text onPress={()=>this.props.navigation.navigate('App')} >
             Home Screen
        </Text>
      </View>
    );
  }
}

const AuthNavigator = createStackNavigator({
  Login: {
      screen: Login,
  },
  Register: {
      screen: Register,
  },
  NewPass: {
      screen: NewPass
  },
  ForgotPass: {
      screen: ForgotPass,
  }
},
{
    initialRouteName:'Login',
    headerMode: 'none'
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Setting: {
      screen: Setting
  },
  Profile:{
    screen: Profile
  },
  EditProfile: {
    screen: EditProfile
  },
  Quis: {
    screen: Quis,
  },
  CreateQuis: {
    screen: CreateQuis,
  },
  Hasil: {
    screen: Hasil,
  },
  Pilih: {
    screen: Pilih,
  },
  Link: {
    screen: Link,
  },
  HomeSiswa: {
    screen: HomeSiswa,
  },
  HasilSiswa: {
    screen: HasilSiswa,
  },
  JoinQuis: {
    screen: JoinQuis,
  },
  Tabel: {
    screen: Tabel,
  },
  TabelSiswa: {
    screen: TabelSiswa,
  }
},
{
    initialRouteName:'Home',
    headerMode: 'none'
});


const AuthManager = createSwitchNavigator({
  Manage: {
    screen: Manage,
  },
  Home: {
    screen: AppNavigator,
  },
  Login: {
    screen: AuthNavigator,
  }
 },
 {
   initialRouteName: 'Manage',
   headerMode: 'none'
 });

export default createAppContainer(AuthManager);