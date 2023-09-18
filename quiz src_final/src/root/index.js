/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';
import Route from './Route';
import Home from './src/home/Home';
import Quiz from './src/quiz/CreateQuis'
import Hasil from './src/result/Hasil'
import Torai from './torai'
import Pilih from './src/quiz/Pilih'
import Login from './src/auth/Login'
import Profile from './src/home/Profile'
import Register from './src/auth/Register'
import Quis from './src/quiz/Quis'
import Kuis from './src/quiz/Kuis'
import Tabel from './src/result/Tabel'
import HSiswa from './src/result/HasilSiswa'
import TSiswa from './src/result/TableSiswa'
import Join from './src/quiz/JoinQuis'
import Link from './src/quiz/Link'

AppRegistry.registerComponent(appName, () => Route );
