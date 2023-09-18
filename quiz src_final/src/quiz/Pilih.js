import React, { Component } from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import Axios from '../../Axios';
import { Container, Header, Content, ListItem, Text, Radio, Right, Left, Form, Item, Label, Input, Button } from 'native-base';
export default class RadioButtonExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
     halaman: 0,
     soal: [],
     id_quiz: this.props.navigation.getParam('id_quiz', '0'),
     jawaban_benar: '',
     pertanyaan: '',
     pilihan_A: '',
     pilihan_B: '',
     pilihan_C: '',
     pilihan_D: '',
   };
  }

  onSoalChange = pertanyaan => {
    this.setState({pertanyaan});
  };

  onOpsiBenarChange = jawaban_benar => {
    this.setState({jawaban_benar});
  };

  onOpsiAChange = pilihan_A => {
    this.setState({pilihan_A});
  };

  onOpsiBChange = pilihan_B => {

    this.setState({pilihan_B});
  };

  onOpsiCChange = pilihan_C => {
    this.setState({pilihan_C});
  };

  onOpsiDChange = pilihan_D => {
    this.setState({pilihan_D});
  };

  check = () => {
    alert('Posted successfully')
  }

  onSubmitSoal = answer => {
    let nomor = this.state.halaman+1;
    this.state.soal[this.state.halaman] = 
    {
      id_quis: this.state.id_quiz,
      nomor_soal: nomor,
      jawaban_benar: this.state.jawaban_benar,
      pertanyaan: this.state.pertanyaan,
      pilihan_A: this.state.pilihan_A,
      pilihan_B: this.state.pilihan_B,
      pilihan_C: this.state.pilihan_C,
      pilihan_D: this.state.pilihan_D,
    } 
  }

  resetState(){
    this.setState({pertanyaan: ''});
    this.setState({pilihan_A: ''});
    this.setState({pilihan_B: ''});
    this.setState({pilihan_C: ''});
    this.setState({pilihan_D: ''});
    this.setState({jawaban_benar: ''});
  }

  onPressFinish(){
    
    const bodyFormData = new FormData();
    bodyFormData.append('soal', JSON.stringify(this.state.soal));

    const onSuccess = ({data}) => {
      console.log(this.state.soal);
      console.log(data);
      this.props.navigation.navigate('Link',{
        id_quiz: this.state.id_quiz,
      });
    };

    const onFailure = error => {
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
    };

    Axios.post('/soal', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(onSuccess)
      .catch(onFailure);
    
  }

  componentDidMount(){
    console.log(this.state.id_quiz);
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>
        <Content>
          <View>
          <View style={{marginHorizontal: 16, marginTop: 50}}>
          <Text style={{fontSize: 28, fontWeight: 'bold', marginTop: 10, marginLeft: 20}}>Create Quiz</Text>
          <View style={{width: 80, height: 10,backgroundColor: '#ff2360',marginTop: 10, marginLeft: 20}} />
        </View>
        <View>
        <Form style={{marginLeft: 20, marginRight: 20}}>
          <Item floatingLabel>
            <Input placeholder = "Masukan Soal"
              value={this.state.pertanyaan}
            onChangeText={this.onSoalChange}/>
          </Item>
        </Form>
      </View>
      <View style={{marginHorizontal: 16, marginTop: 20}}>
        <View>
        <ListItem>
            <Left>
              <Input placeholder = "Pilihan A" 
              value={this.state.pilihan_A}
              onChangeText={this.onOpsiAChange} />
            </Left>
            <Right>
            <Radio onPress={() => this.setState({ jawaban_benar: 'A' })}
              selected={this.state.jawaban_benar === 'A'}
            />
            </Right>
          </ListItem>
        </View>
        <View>
        <ListItem>
            <Left>
            <Input placeholder = "Pilihan B"
            value={this.state.pilihan_B}
            onChangeText={this.onOpsiBChange}/>
            </Left>
            <Right>
            <Radio onPress={() => this.setState({ jawaban_benar: 'B' })}
                  selected={this.state.jawaban_benar === 'B' }
                />
            </Right>
          </ListItem>
        </View>
        <View>
        <ListItem>
            <Left>
            <Input placeholder = "Pilihan C"
            value={this.state.pilihan_C}
            onChangeText={this.onOpsiCChange}/>
            </Left>
            <Right>
            <Radio onPress={() => this.setState({ jawaban_benar: 'C' })}
              selected={this.state.jawaban_benar === 'C'}
            />
            </Right>
          </ListItem>
        </View>
        <View>
        <ListItem>
            <Left>
            <Input placeholder = "Pilihan D"
            value={this.state.pilihan_D}
            onChangeText={this.onOpsiDChange}/>
            </Left>
            <Right>
              <Radio onPress={() => this.setState({ jawaban_benar: 'D' })}
              selected={this.state.jawaban_benar == 'D'}
            />
            </Right>
          </ListItem>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            {this.state.halaman + 1 != this.state.soal.length ? (
              <Text style={{marginTop: 32,  }}
              onPress={() => {
                if(this.state.jawaban_benar === ''){
                  alert('Pilih jawaban yang benar !')
                }
                else{
                  this.setState({halaman: this.state.halaman + 1});
                  this.onSubmitSoal();
                  this.resetState();
                }
              }}>{this.state.halaman + 1}</Text> ) : null}

              {this.state.halaman + 1 != this.state.soal.length ? (
                <Text
                  style={{marginTop: 32, marginLeft: 8, fontSize: 32}}
                  onPress={() => {
                    if(this.state.jawaban_benar === ''){
                      alert('Pilih jawaban yang benar !')
                    }
                    else{
                      this.setState({halaman: this.state.halaman + 1});
                      this.onSubmitSoal();
                      this.resetState();
                    }
                  }}>
                  {this.state.halaman + 2}
                </Text>
              ) : null}
          </View>
          <View style={{alignItems: 'center'}} style={{borderRadius: 20}}>
            <Button style={{
                  borderRadius: 15,
                  marginHorizontal: 150, 
                  marginTop: 20, 
                  backgroundColor: '#ff2360'}}
                  block large
                  onPress={ () => {
                    if(this.state.jawaban_benar === ''){
                      alert('Pilih jawaban benar !')  
                    }
                    else{
                      this.onSubmitSoal();
                      this.onPressFinish();
                    } 
                  }}>
                  <Text>Selesai</Text>
            </Button>
          </View> 
          </View>
        </Content>
      </Container>
    );
  }
}