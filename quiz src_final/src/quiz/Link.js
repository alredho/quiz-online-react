import React, { Component } from 'react';
import { View } from 'react-native';
import { 
    Container,
    Button,
    Content,
    Text,
    Form,
    Item,
    Label,
    ListItem,
    Radio,
    Left,
    Right,
    Input
   } from 'native-base';
import Axios from '../../Axios';

export default class Link extends Component {
  constructor(props) {
    super(props);
    this.state = {
        code: '',
        id_quiz: this.props.navigation.getParam('id_quiz','0'),
    };
  }

  onChangeCode = code => {
      this.setState({code});
  }


  render() {
    return (
      <View style={{alignSelf: 'center', marginTop: 150 }} >
          <View style={{marginHorizontal: 16, marginTop: 50}}>
          <Text style={{fontSize: 28, fontWeight: 'bold', marginTop: 10, marginLeft: 20}}>Quiz Code</Text>
          <View style={{width: 80, height: 10,backgroundColor: '#ff2360',marginTop: 10, marginLeft: 20}} />
        </View>
        <View style={{marginTop: 40, borderWidth: 1, borderColor: '#ff2360', borderRadius: 10, padding: 10}}>
          <Text style={{fontSize: 24, alignSelf: 'center'}} > {this.state.id_quiz} </Text>
        </View>
        <View style={{alignItems: 'center'}} style={{borderRadius: 20}}>
              <Button style={{
                    borderRadius: 15,
                    marginHorizontal: 100, 
                    marginTop: 50, 
                    backgroundColor: '#ff2360'}}
                    block large
                    onPress={ ()=> alert('Under Construction') }>
                    <Text>Share !</Text>
              </Button>
          </View>
          <View style={{alignItems: 'center'}} style={{borderRadius: 20}}>
              <Button style={{
                    borderRadius: 15,
                    marginHorizontal: 100, 
                    marginTop: 50, 
                    backgroundColor: '#ff2360'}}
                    block large
                    onPress={ ()=> this.props.navigation.navigate('Home')}>
                    <Text>Home </Text>
              </Button>
          </View>
      </View>
    );
  }
}
