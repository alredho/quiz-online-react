import {
    Button,
    Container,
    Content,
    Icon,
    Input,
    Item,
    Label,
    Left,
    Picker,
    Form
  }
  from "native-base";
  import React, { Component } from 'react';
  import { View, Text, StyleSheet } from 'react-native';
  import Axios from '../../Axios';
  
  export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: true,
            password1: true,
            icon: "eye",
            icon1: "eye",
            user_id : '',
            email: '',
            pword : '',
            pword1 : '',
            role: 0,
            name:'',
            selected2: 0,
        };
    }
    
      onValueChange2(value) {
        this.setState({
          selected2: value
        });
      }
  
      onEmailChange = email => {
          this.setState({email});
      };
      
      onUserIdChange = user_id => {
          this.setState({user_id});
      };
      
      onPwordChange = pword => {
        this.setState({pword});
      }
      
      onPwordChange1 = pword1 => {
          this.setState({pword1});
      }
      
      onRoleChange = role => {
          this.setState({role});
      }
  
      onNameChange = name => {
          this.setState({name});
      }
  
      onPressRegister() {
          const bodyFormData = new FormData();
          bodyFormData.append('id_user', this.state.user_id);
          bodyFormData.append('id_roll', this.state.selected2);
          bodyFormData.append('nama', this.state.name);
          bodyFormData.append('email', this.state.email);
          bodyFormData.append('password', this.state.pword);
          bodyFormData.append('password2', this.state.pword1);
          console.log(bodyFormData);
      
          const onSuccess = ({data}) => {
              console.log(data);
              console.log(data.status);
              const res = data.status;
              if(res === 500){
                  alert('User Id telah terdaftar')
              }
              else if(res === 501){
                  alert('Mohon isi seluruh data terlebih dahulu')
              }
              else if(res === 502){
                  alert('Username tidak valid')
              }
              else if(res === 503){
                  alert('Nama tidak valid')
              }
              else if(res === 504){
                  alert('Email tidak valid')
              }
              else if(res === 505){
                  alert('Password kurang dari 8 atau password tidak sama')
              }
              else if(res===200){
                  this.check();
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
      
          Axios.post('/user', bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(onSuccess)
            .catch(onFailure);
        }
  
    check = () => {
        alert('Your account has been registered, Please Login');
        this.props.navigation.navigate('Login');
    }
  
    _changeSecure = () => {
        this.setState(prevState => ({
            icon: prevState.icon === "eye" ? "eye-off" : "eye",
            password: !prevState.password,
        }))
    }
    _changeSecure1 = () => {
        this.setState(prevState => ({
            icon1: prevState.icon1 === "eye" ? "eye-off" : "eye",
            password1: !prevState.password1,
        }))
    }
  
    render() {
        return (
            <Container>
                <Content>
                    <Text style={style.h1}>Register</Text>
  
                    <View style={style.stripLogin} />
  
                    <Text style={[style.descText, { marginLeft: 20 }]}>Please Register your Account before using this App.</Text>
  
                    <View style={{ marginHorizontal: 18, marginTop: 10 }}>
  
                         {/* Name */}
                         <View style={style.itemForm}>
                            <Item floatingLabel>
                                <Icon active
                                    name="user"
                                    type="Feather"
                                />
                                <Label style={{ color: 'grey', paddingLeft: 10 }}>Nama</Label>
                                <Input
                                value={this.state.name}
                                onChangeText={this.onNameChange} />
                            </Item>
                        </View>
  
                    {/* user_id */}
                        <View style={style.itemForm}>
                            <Item floatingLabel>
                                <Icon active
                                    name="user"
                                    type="Feather"
                                />
                                <Label style={{ color: 'grey', paddingLeft: 10 }}>No. induk (NISN/NIS/NIP)</Label>
                                <Input
                                value={this.state.user_id}
                                onChangeText={this.onUserIdChange}
                                />
                            </Item>
                        </View>
  
                        {/* Role */}
                        <View style={style.itemForm}>
                        <Form>
                            <Item picker>
                            <Picker
                                mode="dropdown"
                                style={{ width: undefined ,color: 'grey', paddingLeft: 10}}
                                placeholder="Select Role"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}>
                                <Picker.Item  label="Teacher" value= {0} />
                                <Picker.Item label="Student" value={1} />
                            </Picker>
                            </Item>
                        </Form>
                        </View>
  
                        {/* Email */}
                        <View style={style.itemForm}>
                            <Item floatingLabel>
                                <Icon active
                                    name="mail"
                                    type="Feather"
                                />
                                <Label style={{ color: 'grey', paddingLeft: 10 }}>Email Address</Label>
                                <Input
                                value={this.state.email}
                                onChangeText={this.onEmailChange} />
                            </Item>
                        </View>
  
                        {/* Password */}
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
                                    secureTextEntry={this.state.password}
                                    value={this.state.pword}
                                    onChangeText={this.onPwordChange}
                                />
                                <Icon active
                                    name={this.state.icon}
                                    type="Feather"
                                    onPress={() => this._changeSecure()}
                                    />
                            </Item>
                        </View>
  
                        {/* Repeat Password */}
                        <View style={[style.itemForm, { marginTop: 10 }]}>
                            <Item floatingLabel>
                                <Icon active
                                    name='lock'
                                    type='Feather'
                                />
                                <Label style={{ color: 'grey', paddingLeft: 10 }}>
                                    Repeat Password
                                </Label>
                                <Input
                                    secureTextEntry={this.state.password1}
                                    value={this.state.pword1}
                                    onChangeText={this.onPwordChange1}
                                />
                                <Icon active
                                    name={this.state.icon1}
                                    type="Feather"
                                    onPress={() => this._changeSecure1()} />
                            </Item>
                        </View>
  
                    </View>
  
                    <Button style={
                        [style.buttonForm,
                        style.colorPrimary]}
                        onPress={this.onPressRegister.bind(this)}
                    >
                          <Text style={[style.colorPrimaryText, style.buttonFormText]}>
                            Register
                          </Text>
                    </Button>
  
                    <Text style={{
                        fontSize: 14,
                        color: 'grey',
                        marginTop: 20,
                        alignSelf: 'center',
                    }}>
                        Already have an account.
                    </Text>
                    <Text style={style.linkText}
                        onPress={() => this.props.navigation.goBack()}>
                        Login
                </Text>
  
                </Content>
            </Container>
        );
    };
  }
  
  const style = StyleSheet.create({
    h1: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: '5%',
        marginLeft: 20
    },
    itemForm: {
        borderWidth: 1,
        height: 80,
        paddingHorizontal: 16,
        borderColor: '#eceff1',
        borderRadius: 10,
        paddingTop: 5
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
        marginTop: 20
    },
    linkText: {
        fontWeight: "bold",
        color: '#ff2360',
        width: '100%',
        textAlign: 'center',
        fontSize: 18
    },
    buttonForm: {
        marginHorizontal: '20%',
        width: '60%',
        height: 60,
        borderRadius: 50,
        padding: 20,
        marginTop: 30
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