import React, { Component } from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import { 
    Header,
    Container,
    Content,
    Text,
    Item,
    Picker,
    Form
   } from 'native-base';

export default class Lanjutan extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected2: undefined
    };
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  render() {
    return (
        <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>
        <Content>
          <View style={{marginHorizontal: 16, marginTop: 50}}>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginTop: 10, marginLeft: 20}}>Create Quiz</Text>
            <View style={{width: 80, height: 10,backgroundColor: '#ff2360',marginTop: 10, marginLeft: 20}} />
          </View>
          <View style={{marginHorizontal: 20, marginTop: 50}}>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Pilihan Ganda" value="key0" />
                <Picker.Item label="Essay" value="key1" />
              </Picker>
            </Item>
          </Form>
          </View>
       </Content>
    </Container> 
    );
  }
}
