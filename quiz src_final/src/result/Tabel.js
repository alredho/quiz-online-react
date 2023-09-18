import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Axios from '../../Axios';

export default class Tabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      id_quiz: this.props.navigation.getParam('id_quiz','0')
    };
  }

  componentDidMount() {
    let url = '/hasil?id_quis='+this.state.id_quiz;
    console.log(this.state.id_quiz);
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
        <View style={[style.styleView]}>
          <View style={[style.StyleNama]}>
            <Text style={{fontSize: 18, }}>Nama</Text>
          </View>
          <View style={[style.StyleNilai]}>
          <Text>nilai</Text>
          </View>
      </View>
      {this.state.lists.map( list =>
        <View key={list.id_user} style={[style.styleView]}>
          <View style={[style.StyleNama]}>
            <Text style={{fontSize: 18}}> {list.nama_user} </Text>
          </View>
          <View style={[style.StyleNilai]}>
          <Text> {list.nilai} </Text>
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

  StyleNama: {
    width : '70%',
    padding: 10,
  },

  StyleNilai: {
    width : '30%', 
    height: 50, 
    borderColor: '#000000',
    justifyContent: 'center',
    borderStyle: 'solid', 
    borderWidth: 1,  
    backgroundColor: '#ffa1a1',
    alignItems: 'center'
  },


});
