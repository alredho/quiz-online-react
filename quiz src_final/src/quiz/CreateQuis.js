import React, {Component} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import { 
  Header,
  Container,
  Left,
  Button,
  Body,
  Right,
  Title,
  Icon,
  Content,
  Text,
  Footer,
  FooterTab,
  Item,
  Label,
  Input,
  Card,
  users,
  CardItem,
  DatePicker
 } from 'native-base';
 import Axios from '../../Axios';

export default class Quis extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      subject: '',
      id_user: this.props.navigation.getParam('id_user','0'),
      id_quiz: ''
    };
    
  }

  onChangeId = id => {
    this.setState({id_quiz: id});
  }

  onChangeTitle = title => {
    this.setState({title});
  }

  onChangeSubject = subject => {
    this.setState({subject});
  };

  onPressCreate() {
    const bodyFormData = new FormData();
    bodyFormData.append('judul', this.state.title);
    bodyFormData.append('mata_pelajaran', this.state.subject);
    bodyFormData.append('id_user', this.state.id_user);
    console.log(this.state.id_user);
    
    console.log(bodyFormData);

    const onSuccess = ({data}) => {
      console.log(data);
      console.log(data[0]['id_quiz']);
      this.props.navigation.navigate('Pilih',{
        id_quiz: data[0]['id_quiz'],
      });
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

    Axios.post('/quiz', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(onSuccess)
      .catch(onFailure);
  }

  render() {
    return(
      <Container>
      <StatusBar backgroundColor="white" barStyle="dark-content"/>
      <Content>
        <View style={{marginHorizontal: 16, marginTop: 50}}>
          <Text style={{fontSize: 28, fontWeight: 'bold', marginTop: 10, marginLeft: 20}}>Create Quiz</Text>
          <View style={{width: 80, height: 10,backgroundColor: '#ff2360',marginTop: 10, marginLeft: 20}} />
        </View>
        <View style={{marginHorizontal: 20, marginTop: 50}}>
          <Item rounded>
            <Input placeholder='Judul Quis'
            value={this.state.title}
            onChangeText={this.onChangeTitle}
            />
          </Item>
        </View>
        <View  style={{marginHorizontal: 20, marginTop: 20}}>
          <Item rounded>
            <Input placeholder='Mata Pelajaran'
            value={this.state.subject}
            onChangeText={this.onChangeSubject}
            />
          </Item>
        </View>
          <View style={{marginTop: 20, alignItems: 'center'}}>
        <Button style={{
               borderRadius: 15,
               marginHorizontal: 150, 
               marginTop: 5, 
               backgroundColor: '#ff2360'}}
               block large
               onPress={
                
                this.onPressCreate.bind(this)
               
              }
                >
               <Text>Next</Text>
        </Button>
        </View>
     </Content>
      </Container>
    ) ;
  }
}
