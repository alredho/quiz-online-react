import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';
import Axios from '../../Axios';

export default class CreateQuis extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        quizzes: [],
        id_user: this.props.navigation.getParam('id_user','0'),
    };
  }

  componentDidMount(){
    let url = '/hasil?id_user='+this.state.id_user;
    console.log(this.state.id_user);
    console.log(url);
    Axios.get(url).then (res => {
      this.setState({quizzes: res.data});
      console.log(res.data);
    })
    
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
                <ListItem key={quiz.id_quiz} 
                  onPress={() => this.props.navigation.navigate('TabelSiswa',{
                  id_quiz: quiz.id_quiz,
                  id_user: this.state.id_user,
                })}
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
