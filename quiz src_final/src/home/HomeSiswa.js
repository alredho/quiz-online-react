import React, {Component} from 'react';
import {View,StatusBar, StyleSheet} from 'react-native';
import {
    Body,
    Container,
    Content,
    Card,
    CardItem,
    Icon,
    Text,
    Thumbnail
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
               _token: "",
              _email: "",
              name: '',
              id_user: '',
              id_role: 0,
              email: '',
              id_user: null
        };
        this.getData();
    }

    componentDidMount(){
      AsyncStorage.getItem('user', (error, result) => {
        if (result) {
            let resultParsed = JSON.parse(result)
            this.setState({
                name: resultParsed[0]['nama'],
                email: resultParsed[0]['email'],
                id_user: resultParsed[0]['id_user']
            });
        }
      });
    }

    CreateQuis = () => {
        this.props.navigation.navigate('CreateQuis');
      }

    getData = async () => {
      try {
         const token = await AsyncStorage.getItem('token');
         const email = await AsyncStorage.getItem('email');
          if (token !== null) {
              this.setState({
                _token: token,
                 _email: email,
                })
            }
        } catch (e) {
            console.log(e)
        }
    }


    render(){
      const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        return (
            <Container >
                <StatusBar backgroundColor="white" barStyle="dark-content"/>
                <Content backgroundColor='#ff2360' >
                  <Text>{this.token}</Text>
                  <Thumbnail large source={{uri: uri}} 
                  style={{alignSelf: 'center', marginTop: 60, height: 100, width: 100}} 
                  
                  />
                  <Text style={{alignSelf: 'center', marginTop: 15}} > {this.state.name} </Text>
                  <Text style={{alignSelf: 'center', marginTop: 5, fontSize: 10, color: 'grey'}} > {this.state.email} </Text>
                  <View style={{marginTop: 60, justifyContent: 'space-around', flexDirection: 'row'}} >
                    <Card style={{borderRadius: 20}} >
                      <CardItem button 
                          navigation={this.props.navigation}
                          onPress={() => this.props.navigation.navigate('JoinQuis')} style={style.itemCard} >
                        <Body style={{justifyContent: 'center'}} >
                          <Icon name='paw' style={{alignSelf: 'center'}} />
                          <Text style={{alignSelf: 'center'}} > Join Quiz </Text>
                        </Body>
                      </CardItem>
                    </Card>
                    <Card style={{borderRadius: 20}} >
                      <CardItem button onPress={ () => 
                        this.props.navigation.navigate('HasilSiswa', {
                        id_user: this.state.id_user
                        }) } style={style.itemCard} >
                        <Body style={{justifyContent: 'center'}}>
                          <Icon name='paw' style={{alignSelf: 'center'}} />
                          <Text style={{alignSelf: 'center'}} > Quiz Result </Text>
                        </Body>
                      </CardItem>
                    </Card>
                  </View>
                  <View style={{marginTop: 40, justifyContent: 'space-around', flexDirection: 'row'}} >
                    <Card style={{borderRadius: 20}} >
                      <CardItem button  onPress={() => this.props.navigation.navigate('Profile')} style={style.itemCard} >
                        <Body style={{justifyContent: 'center'}}>
                          <Icon name='person' style={{alignSelf: 'center'}} />
                          <Text style={{alignSelf: 'center'}} > Profile </Text>
                        </Body>
                      </CardItem>
                    </Card>
                    <Card style={{borderRadius: 20}} >
                      <CardItem button onPress={() => this.props.navigation.navigate('Setting')} style={style.itemCard} >
                        <Body style={{justifyContent: 'center'}}>
                          <Icon name='settings' style={{alignSelf: 'center'}} />
                          <Text style={{alignSelf: 'center'}} > Settings </Text>
                        </Body>
                      </CardItem>
                    </Card>
                  </View>
                </Content>
            </Container>
        );
    }


}

const style = StyleSheet.create({
  itemCard: {
    backgroundColor: '#ff2360',
    borderWidth: 0.5,
    borderColor: 'grey',
    height: 150,
    width: 150,
    borderRadius: 20
  }
  
})