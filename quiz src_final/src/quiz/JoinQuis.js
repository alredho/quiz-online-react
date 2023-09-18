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
        
    };
  }

  onChangeCode = code => {
      this.setState({code});
  }

  onPressJoin(){
    
    const bodyFormData = new FormData();
    bodyFormData.append('code', this.state.code);

    const onSuccess = ({data}) => {
      if(data.status === 1){
        this.props.navigation.navigate('Quis',{id_quiz: this.state.code})
      }
      else if(data.status === 0){
        alert('Kode Salah !')
      }
      console.log(this.state.code); 
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

    Axios.post('/join', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(onSuccess)
      .catch(onFailure);
    
  }


  render() {
    return (
      <View style={{alignSelf: 'center', marginTop: 150 }} >
          <View style={{marginHorizontal: 16, marginTop: 50}}>
          <Text style={{fontSize: 28, fontWeight: 'bold', marginTop: 10, marginLeft: 20}}>Link Quis</Text>
          <View style={{width: 80, height: 10,backgroundColor: '#ff2360',marginTop: 10, marginLeft: 20}} />
        </View>
        <View style={{marginTop: 40, marginHorizontal:18, borderWidth: 1, borderColor: '#ff2360', borderRadius: 10}}>
        <Form>
            <Item stackedLabel>
              <Input placeholder="Code Here" 
              value={this.state.code}
              onChangeText={this.onChangeCode}  />
            </Item>
          </Form> 
        </View>
        <View style={{alignItems: 'center'}} style={{borderRadius: 20}}>
              <Button style={{
                    borderRadius: 15,
                    marginHorizontal: 100, 
                    marginTop: 50, 
                    backgroundColor: '#ff2360'}}
                    block large
                    onPress={ this.onPressJoin.bind(this) }>
                    <Text>Join !</Text>
              </Button>
          </View>
      </View>
    );
  }
}
