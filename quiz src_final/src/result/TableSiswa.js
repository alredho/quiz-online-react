import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Axios from '../../Axios';

export default class Tabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      id_quiz: this.props.navigation.getParam('id_quiz','0'),
      id_user: this.props.navigation.getParam('id_user','0'),
    };
  }

  componentDidMount() {
    let url = '/hasil?id_user='+this.state.id_user+'&id_quis='+this.state.id_quiz;
    console.log(this.state.id_user);
    console.log(url);
    Axios.get(url).then (res => {
      this.setState({ lists : res.data});
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      })
  }

  render() {
    return (
      <View style={{margin: 20 }}>
        <View style={{marginHorizontal: 16, marginTop: 50}}>
          <Text style={{fontSize: 28, fontWeight: 'bold', margin: 10}}>Result Quis</Text>
        </View>
        
      {this.state.lists.map( list => 
          <View style={[style.styleView], {
            backgroundColor: '#ffa1a1', 
            borderStyle: 'solid', 
            borderColor: 'black', 
            borderWidth: 2,
            marginTop: 20}} key={list.id_quiz} >
            <View style={[style.Stylenilai]}>
              <Text style={{fontSize: 18, }}>nilai</Text>
            </View>
            <View style={[style.styleView]}>
              <View style={[style.Stylenilai]}  >
                <Text style={{fontSize: 18}}> {list.nilai} </Text>
              </View>
            </View>
          </View>
        )}
    </View>
    );
  }
}

const style = StyleSheet.create({

  styleView: {
    justifyContent: 'space-around', 
    flexDirection: 'row', 
    borderStyle: 'solid', 
    borderColor: 'black', 
    borderWidth: 2,
  },

  Stylenilai: {
    width : '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },



});