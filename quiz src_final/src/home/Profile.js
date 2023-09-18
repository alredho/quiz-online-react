import React, { Component } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import {
    Button, 
    Body,
    Container,
    Content,
    Card,
    CardItem,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Title,
    Thumbnail
} from 'native-base';
import Axios from '../../Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    Axios.get('/user?id_user=1').then (res => {
        this.setState({users: res.data});
    })
    this.state = {
        users: [],
        name: '',
        gender: '',
        email: '',
        dob: '',
        ins: '',
        id_user: '',
    };
  }

  componentDidMount(){
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
          let resultParsed = JSON.parse(result)
          this.setState({
              name: resultParsed[0]['nama'],
              email: resultParsed[0]['email'],
              gender: resultParsed[0]['gender'],
              dob: resultParsed[0]['tanggal_lahir'],
              ins: resultParsed[0]['institusi'],
              id_user: resultParsed[0]['id_user']
          });
      }
    });
  }

  render() {
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    return (
      <Container>
          <Header style={{ backgroundColor: 'white'}} >
            <StatusBar backgroundColor="white" barStyle="dark-content"/>
            <Left>
              <Button transparent>
                <Icon name='arrow-back' onPress={()=> this.props.navigation.goBack()} style={{color: 'black'}} />
              </Button>
            </Left>
            <Body>
              <Title style={{color: 'black', marginLeft: 25}} >  My Profile</Title>
            </Body>
          </Header>
        <Content  >
          <View >
            <Thumbnail large source={{uri: uri}} 
                      style={{alignSelf: 'center', marginTop: 40, height: 100, width: 100}}
            />
            <Text style={{alignSelf: 'center', marginTop: 10}} >
                Ini adalah Bio.
            </Text>
          </View>
          <View style={{ marginTop: 30, width: '90%', alignSelf: 'center' }} >
          <Card style={style.cardList} elevation={5} >
            <CardItem style={{borderRadius: 20}} >
              <Left>
                <Text style={style.leftText} > Nama </Text>
              </Left>
              <Right>
                <Text  style={style.rightText} >  {this.state.name} </Text>
              </Right>
             </CardItem>
           </Card>
           <Card style={style.cardList} elevation={5} >
            <CardItem style={{borderRadius: 20}} >
              <Left>
                <Text style={style.leftText} > User Id </Text>
              </Left>
              <Right>
                <Text  style={style.rightText} >  {this.state.id_user} </Text>
              </Right>
             </CardItem>
           </Card>
           <Card style={style.cardList} elevation={5} >
            <CardItem style={{borderRadius: 20}} >
              <Left>
                <Text style={style.leftText} > Gender </Text>
              </Left>
              <Right>
                <Text style={style.rightText} >  {this.state.gender} </Text>
              </Right>
             </CardItem>
           </Card>
           <Card style={style.cardList} elevation={5} >
            <CardItem style={{borderRadius: 20}} >
              <Left>
                <Text style={style.leftText} > Email </Text>
              </Left>
              <Right>
                <Text style={style.rightText} >  {this.state.email} </Text>
              </Right>
             </CardItem>
           </Card  >
           <Card style={style.cardList} elevation={5} >
            <CardItem style={{borderRadius: 20}} >
              <Left>
                <Text style={style.leftText} > Date of Birth </Text>
              </Left>
              <Right>
                <Text style={style.rightText} >  {this.state.dob} </Text>
              </Right>
             </CardItem>
           </Card>
           <Card style={style.cardList} elevation={5} >
            <CardItem style={{borderRadius: 20}} >
              <Left>
                <Text style={style.leftText} > Institution </Text>
              </Left>
              <Right>
                <Text style={style.rightText} >  {this.state.ins} </Text>
              </Right>
             </CardItem>
           </Card>
          </View>
          <Button style={{marginHorizontal: 18, marginTop:20, backgroundColor: '#ff2360',
          borderRadius: 20, width: '50%', alignSelf: 'center'
          }} block medium onPress={()=> this.props.navigation.navigate('EditProfile')} >
            <Text>
              Edit Profile
            </Text>
          </Button>
         
        </Content>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  leftText: {
    color: 'grey',
  },
  rightText: {
    color: 'black',
    fontWeight: 'bold'
  },
  cardList: {
    borderRadius: 20,
    shadowColor: "#69dffa",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 15,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }

})
