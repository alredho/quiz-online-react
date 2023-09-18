import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';
import Axios from '../../Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CreateQuis extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        quizzes: [],
        id_user: this.props.navigation.getParam('id_user', '0'),
        id_quiz: this.props.navigation.getParam('id_quiz', '0'),
    };
    console.log(this.state.id_quiz);
  }

  onChangeIdQuiz(value){
    this.setState({id_quiz: value});
  }

  onValueChange2(value) {
    this.setState({
      id_quiz: value
    });
  }

  async  getFromStorage(){
    const res = await AsyncStorage.getItem('user', (error, result) => {
      if (result) {
          let resultParsed = JSON.parse(result)
          this.setState({
              id_user: resultParsed[0]['id_user']
          });
          console.log(resultParsed[0]['id_user']);
          console.log(this.state.id_user);
      }
    });

    return await res;
  }

  async getFromServer(){
    let url = '/quiz?id_user='+this.state.id_user;
    console.log(this.state.id_user);
    console.log(this.state.id_quiz);
    console.log(url);
    const res = await Axios.get(url).then (res => {
      this.setState({quizzes: res.data});
      console.log(res.data);
    });
    return await res;
  }

  componentDidMount(){
      this.getFromServer();
  }

  render() {
    return (
      <View>
          <View style={{marginHorizontal: 16, marginTop: 50}}>
          <Text style={{fontSize: 28, fontWeight: 'bold', marginTop: 10, marginLeft: 20}}>Result Quiz</Text>
          <View style={{width: 80, height: 10,backgroundColor: '#ff2360',marginTop: 10, marginLeft: 20}} />
        </View>
        <List style={{marginHorizontal: 16, marginTop: 30, border: 1 ,borderRadius: 10}}>
            {this.state.quizzes.map(quiz => 
                <ListItem key={quiz.id_quiz} value={quiz.id_quiz} 

                onValueChange={this.onValueChange2.bind(this)}
                onPress={() => this.props.navigation.navigate('Tabel',{id_quiz: quiz.id_quiz})}
                >
                    <Left>
                        <Text >{quiz.judul}</Text>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward"/>
                    </Right>
              </ListItem>
            )}
          </List>
      </View>
    );
  }
}
