import {
  Button,
  Container,
  Content,
  Icon,
  Input,
  Item,
  Label,
  Left
}
from "native-base";
import React, { Component } from "react";
import { View, StatusBar, Text, TextInput, StyleSheet } from "react-native"
import Axios, {setClientToken} from '../../Axios';
import {decode, encode} from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (!global.btoa) {
global.btoa = encode;
}

if (!global.atob) {
global.atob = decode;
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      icon: "eye",
      email: '',
      password: '',
      errors: {},
      isAuthorized: false,
      isLoading: false,
      name: '',
    }
  }

  componentWillUnmount() {}

  onEmailChange = email => {
    this.setState({email});
  };

  onPasswordChange = password => {
    this.setState({password});
  };

  onPressLogin() {
    const bodyFormData = new FormData();
    bodyFormData.append('password', this.state.password);
    bodyFormData.append('email', this.state.email);
    console.log(bodyFormData);

    const onSuccess = ({data}) => {
      console.log(data);
      if(data.status == 502){
        alert('Username atau Password Salah !')
      }
      else{
        AsyncStorage.setItem('user', JSON.stringify(data.data));
        this.setState({isLoading: false, isAuthorized: true});
        AsyncStorage.setItem('token', JSON.stringify(this.state.isAuthorized));
        let id_role = data.data[0]['id_roll'];
        console.log(id_role);
        if(id_role === '0'){
          this.props.navigation.navigate(this.state.isAuthorized ? 'Home' : 'Login' )  
        }
        else if(id_role === '1'){
          this.props.navigation.navigate(this.state.isAuthorized ? 'HomeSiswa' : 'Login' )  
        }
      }
      
    };

    const onFailure = error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    };

    Axios.post('/login', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(onSuccess)
      .catch(onFailure);
  }


  _changeSecure = () => {
    this.setState(prevState => ({
      icon: prevState.icon === "eye" ? "eye-off" : "eye",
      hidden: !prevState.hidden,
    }))
  }

  render() {
    return (
      <Container>
        <Content>
          <Text style={style.h1} onPress={()=> this.props.navigation.navigate('Home')} >Log in </Text>

          <View style={style.stripLogin} />

          <Text style={[style.descText, { marginLeft: 20 }]}>Please Log in to your kuis account.</Text>

          <View style={{ marginHorizontal: 18, marginTop: 100 }}>
            <View style={style.itemForm}>
              <Item floatingLabel>
                <Icon active
                  name="mail"
                  type="Feather"
                />
                <Label style={{ color: 'grey', paddingLeft: 10 }}>Email Address</Label>
                <Input 
                value={this.state.email}
                onSubmitEditing={event =>
                  this.passwordInput.wrappedInstance.focus()
                }
                onChangeText={this.onEmailChange}
                />
              </Item>
            </View>
            <View style={[style.itemForm, { marginTop: 10 }]}>
              <Item floatingLabel>
                <Icon active
                  name='lock'
                  type='Feather'
                />
                <Label style={{ color: 'grey', paddingLeft: 10 }}>
                  Password
                </Label>
                <Input
                  secureTextEntry={this.state.hidden}
                  value={this.state.password}
                  onSubmitEditing={this.onPressLogin.bind(this)}
                  onChangeText={this.onPasswordChange}
                />
                <Icon active
                  name={this.state.icon}
                  type="Feather"
                  onPress={() => this._changeSecure()} />
              </Item>
            </View>
          </View>

          <Text style={{
            color: '#ff2360',
            marginTop: 10,
            alignSelf: 'flex-end',
            marginRight: 20,
            fontWeight: 'bold'
          }}
            onPress={() => this.props.navigation.navigate('ForgotPass')}
          >
            Forgot Password?
            </Text>

          <Button style={
            [style.buttonForm,
            style.colorPrimary]}
            onPress={this.onPressLogin.bind(this)}
          >
            <Text style={[style.colorPrimaryText, style.buttonFormText]}>
              Log in
            </Text>
          </Button>

          <Text style={{
            fontSize: 14,
            color: 'grey',
            marginTop: 26,
            alignSelf: 'center',
            marginRight: 10
          }}>
            Don't have account?
            <Text style={style.linkText}
              onPress={() => this.props.navigation.navigate('Register')}
            >
              Create.
            </Text>
          </Text>

        </Content>
      </Container>
    );
  };
}

const style = StyleSheet.create({
  h1: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: '15%',
    marginLeft: 20
  },
  itemForm: {
    borderWidth: 1,
    height: 80,
    paddingHorizontal: 16,
    borderColor: '#eceff1',
    borderRadius: 10,
    paddingTop: 10
  },
  stripLogin: {
    width: 80,
    height: 10,
    backgroundColor: '#ff2360',
    marginTop: 10,
    marginLeft: 20
  },
  descText: {
    color: 'grey',
    fontSize: 16,
    marginTop: 20,
  },
  linkText: {
    fontWeight: "bold",
    color: '#ff2360'
  },
  buttonForm: {
    marginHorizontal: '20%',
    width: '60%',
    height: 60,
    borderRadius: 50,
    padding: 20,
    marginTop: 50
  },
  buttonFormText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "center",
    width: '100%'
  },
  colorPrimary: {
    backgroundColor: '#ff2360'
  },
  colorPrimaryText: {
    color: '#FFFFFF'
  },

});
