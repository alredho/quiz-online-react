import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Content, Spinner} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Manager extends Component {

  constructor(props) {
    super(props);
    this.isMounted= false;
    this.state = {
      isAuthorized: null,
      id_role: '',
    };

    
    AsyncStorage.getItem('token', (error, result) => {
      if (result) {
          let resultParsed = JSON.parse(result);
          console.log(resultParsed);
        
          if(resultParsed){
            AsyncStorage.getItem('user', (error, result) => {
              if (result) {
                  let resultParsed = JSON.parse(result)
                  console.log(resultParsed);
                  console.log(resultParsed[0]['id_roll']);
                  let id_role = resultParsed[0]['id_roll'];
   
                  this.props.navigation.navigate(id_role === '0' ? 'Home' : id_role === '1' ? 'HomeSiswa' : 'Login')
              }
            });
          }
          else{
            this.props.navigation.navigate('Login');
          }
          

      }
    });

  }  

  

 

  render() {
    return (
      <View  >
        <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <Spinner color='red' />
        </Content>
      </View>
    );
  }
}
