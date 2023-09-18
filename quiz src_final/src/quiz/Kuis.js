import React, {Component} from 'react';
import {View} from 'react-native';
import { 
  Container,
  Button,
  Content,
  Text,
  ListItem,
  Radio,
  Left,
  Right,
  Input
 } from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Axios from '../../Axios';

export default class Soal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      halaman: 0,
      selected: '',
      loading: false,
      questions: [],
      answers: [5],
      data: [
        {
          soal: 'uraoan soalnya',
          a: 'shbjkvdhjs',
          b: 'kdsvjusac',
          c: 'asiuhfiu',
          d: 'aksvuh',
        },
        {
          soal: 'ahjgfsh',
          a:
            'Irure cillum sit aliqua tempor commodo voluptate officia id veniam duis do laboris tempor laboris.',
          b: 'Nulla eiusmod eiusmod cupidatat et duis adipisicing sint.',
          c: 'Nisi pariatur exercitation reprehenderit deserunt dolore.',
          d:
            'Ex reprehenderit excepteur qui dolore ea mollit labore minim laboris.',
        },
        {
          soal: 'akjsbvjkfa',
          a:
            'Ut aliqua consectetur elit irure sint do mollit laborum Lorem nostrud.',
          b: 'Enim commodo cillum dolore nostrud nostrud ad ut occaecat.',
          c:
            'Fugiat quis nostrud non et incididunt proident labore non qui mollit incididunt aliqua.',
          d: 'Pariatur deserunt in proident consectetur consectetur excepteur.',
        },
        {
          soal: 'ahsvbhjavbhja',
          a: 'asdasd',
          b: 'asdaasf',
          c: 'asfasf',
          d: 'asfasfas',
        },
        {
          soal: 'bjaehjbjh',
          a: 'aksviua',
          b: 'kajshvku',
          c: 'asfasf',
          d: 'asfasfas',
        },
      ],
    };
  }

  onSubmitAnswer() {
    let nomor = this.state.halaman+1;
    let answer = this.state.selected;
    this.state.answers[this.state.halaman] = 
    {
      id_quis: 1,
      id_user: 1,
      nomor_soal: nomor,
      jawaban: answer
    } 
  }

  onPressFinish(){
    console.log(JSON.stringify(this.state.answers));
  }

  componentDidMount() {
    Axios.get('/soal?id_quis=1').then (res => {
      this.setState({questions: res.data});
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

  render() {
    //console.log(JSON.stringify(this.state.questions));

    return (
      <View style={{flex: 1, padding: 32}}>
        {this.state.loading ? (
          <View>
            <Text>Loading</Text>
          </View>
        ) : (
          <View>
            <View>
              <Text style={{fontSize: 22, marginBottom: 16}}>
                {this.state.halaman + 1 + '. '}
                {this.state.data.length != 0 ? (
                  <Text>
                    {this.state.data[this.state.halaman].soal}
                  </Text>
                ) : null}
              </Text>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                value={this.state.selected}
                onPress={() => {
                  this.setState({selected: 'a'}); 
                  this.onSubmitAnswer();
                }}>
                {this.state.selected == 'a' && (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: 'blue',
                      marginRight: 12,
                    }}
                  />
                )}
                <Text>
                  a. {this.state.data[this.state.halaman].a}{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  this.setState({selected: 'b'}); 
                  this.onSubmitAnswer();
                }}>
                {this.state.selected == 'b' && (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: 'blue',
                      marginRight: 12,
                    }}
                  />
                )}
                <Text>b. {this.state.data[this.state.halaman].b} </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  this.setState({selected: 'c'});
                  this.onSubmitAnswer();
                }}>
                {this.state.selected == 'c' && (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: 'blue',
                      marginRight: 12,
                    }}
                  />
                )}
                <Text>c. {this.state.data[this.state.halaman].c} </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  this.setState({selected: 'd'}); 
                  this.onSubmitAnswer();
                }}>
                {this.state.selected == 'd' && (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: 'blue',
                      marginRight: 12,
                    }}
                  />
                )}
                <Text>d. {this.state.data[this.state.halaman].a} </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            {this.state.halaman + 1 != this.state.data.length ? (
              <Text style={{marginTop: 32,  }}
              onPress={() => {
                this.setState({halaman: this.state.halaman - 1}, );
                this.setState({selected: ''});
                }     
              }>{this.state.halaman + 1}</Text> ) : null}

              {this.state.halaman + 1 != this.state.questions.length ? (
                <Text
                  style={{marginTop: 32, marginLeft: 8, fontSize: 32}}
                  onPress={() => {
                    this.setState({halaman: this.state.halaman + 1});
                    this.setState({selected: ''});
                    }     
                  }>
                  {this.state.halaman + 2}
                </Text>
              ) : null}
            </View>
            <View style={{alignItems: 'center'}} style={{borderRadius: 20}}>
              <Button style={{
                    borderRadius: 15,
                    marginHorizontal: 100, 
                    marginTop: 50, 
                    backgroundColor: '#ff2360'}}
                    block large
                    onPress={ this.onPressFinish.bind(this) }>
                    <Text>Selesai</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}