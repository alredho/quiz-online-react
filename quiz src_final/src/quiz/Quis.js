import React, {Component} from 'react';
import {View } from 'react-native';
import { 
  Container,
  Button,
  Content,
  Text,
  Spinner,
  ListItem,
  Radio,
  Left,
  Right,
 } from 'native-base';
import Axios from '../../Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Soal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      halaman: 0,
      selected: '',
      loading: true,
      questions: [],
      answers: [],
      id_quiz: this.props.navigation.getParam('id_quiz','0'),
      id_user: '0',
      
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
          let resultParsed = JSON.parse(result)
          this.setState({
              id_user: resultParsed[0]['id_user']
          });
      }
    });

    let url = '/soal?id_quis='+this.state.id_quiz;
    console.log(this.state.id_quiz);
    console.log(url);
    Axios.get(url).then (res => {
      this.setState({questions: res.data, loading: false});
    }).catch((error) => {
        if (error.response) {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
        } else if (error.request) {
          //console.log(error.request);
        } else {
          //console.log('Error', error.message);
        }
        console.log(error.config);
      })
  }

  onSubmitAnswer = answer => {
    let nomor_soal = this.state.halaman+1;
    this.state.answers[this.state.halaman] = 
    {
      nomor: nomor_soal,
      id_quiz: this.state.id_quiz,
      id_user: this.state.id_user,
      jawaban: this.state.selected
    } 
  }

  onPressFinish(){
    
    const bodyFormData = new FormData();
    bodyFormData.append('answers', JSON.stringify(this.state.answers));

    const onSuccess = ({data}) => {
      alert('Selesai mengerjakan soal !');
      this.props.navigation.navigate('HasilSiswa',{
        id_user: this.state.id_user
      });
      console.log(this.state.answers);
      console.log(data);
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

    Axios.post('/soal_isi', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(onSuccess)
      .catch(onFailure);
    
  }

  render() {

    return (
      <View style={{flex: 1, 
                    padding: 32, 
                    marginTop: 40, 
                    marginHorizontal:18, 
                    borderWidth: 1, 
                    borderColor: '#ff2360', 
                    borderRadius: 10, 
                    marginBottom: 50}}>
        {this.state.loading ? (
          <View>
            <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
              <Spinner color='red' />
            </Content>
          </View>
        ) : (
          <View >
            <View style={{marginHorizontal: 16, marginTop: 50, alignItems: 'center'}}>
          <Text style={{fontSize: 28, fontWeight: 'bold'}}>Quiz</Text>
        </View>
            <View style={{marginTop: 30 }}>
              <Text style={{fontSize: 22, marginBottom: 16}}>
                {this.state.halaman + 1 + '. '}
                {this.state.questions.length != 0 ? (
                  <Text>
                    {this.state.questions[this.state.halaman].pertanyaan}
                  </Text>
                ) : null}
              </Text>
              <View>
            <ListItem>
              <Left>
              <Text>
                  A. {this.state.questions[this.state.halaman].pilihan_A}{' '}
                </Text>
              </Left>
              <Right>
              <Radio onPress={() => {
                    this.setState({ selected: 'A' });
                  }}
                    selected={this.state.selected === 'A'}
                  />
              </Right>
            </ListItem>
          </View>

          <View>
            <ListItem>
              <Left>
              <Text>
                  B. {this.state.questions[this.state.halaman].pilihan_B}{' '}
                </Text>
              </Left>
              <Right>
                <Radio onPress={() => {
                    this.setState({ selected: 'B' });
                  }}
                    selected={this.state.selected === 'B'}
                  />
              </Right>
            </ListItem>
          </View>
          <View>
            <ListItem>
              <Left>
              <Text>
                  C. {this.state.questions[this.state.halaman].pilihan_C}{' '}
                </Text>
              </Left>
              <Right>
                <Radio onPress={() => {
                    this.setState({ selected: 'C' });
                  }}
                    selected={this.state.selected === 'C'}
                  />
              </Right>
            </ListItem>
          </View>
          <View>
            <ListItem>
              <Left>
              <Text>
                  D. {this.state.questions[this.state.halaman].pilihan_D}{' '}
                </Text>
              </Left>
              <Right>
                <Radio onPress={() => {
                    this.setState({ selected: 'D' });
                  }}
                    selected={this.state.selected === 'D'}
                  />
              </Right>
            </ListItem>
          </View>
        </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            {this.state.halaman + 1 != this.state.questions.length ? (
              <Text style={{marginTop: 32,  }}
              onPress={() => {
                  this.setState({halaman: this.state.halaman - 1});
                  this.onSubmitAnswer();
                  this.setState({selected: ''});
                  
              }}>{this.state.halaman + 1}</Text> ) : null}

              {this.state.halaman + 1 != this.state.questions.length ? (
                <Text
                  style={{marginTop: 32, marginLeft: 8, fontSize: 32}}
                  onPress={() => {
                      this.setState({halaman: this.state.halaman + 1});
                      this.onSubmitAnswer();
                      this.setState({selected: ''});
                  }}>
                  {this.state.halaman + 2}
                </Text>
              ) : null}
          </View>
          <View style={{alignItems: 'center'}} style={{borderRadius: 20}}>
              {this.state.halaman + 1 == this.state.questions.length ? (  
                <Button style={{
                  borderRadius: 15,
                  marginHorizontal: 100, 
                  marginTop: 50, 
                  backgroundColor: '#ff2360'}}
                  block large
                  onPress={()=>{
                    this.onSubmitAnswer();
                    console.log(this.state.answers);
                    this.onPressFinish();
                  }}
                  >
                  <Text>Selesai</Text>
                </Button>
              ) : null}
          </View>
        </View>
        )}
      </View>
    );
  }
}