import React, { Component } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import {
    Button, 
    Body,
    Container,
    Content,
    DatePicker,
    Form,
    Header,
    Item,
    Input,
    Icon,
    Label,
    Left,
    Right,
    Text,
    Title,
    Thumbnail
} from 'native-base';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render() {
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    return (
      <Container>
          <Header style={{ backgroundColor: 'white'}} >
            <StatusBar backgroundColor="white" barStyle="dark-content"/>
            <Left>
              <Button transparent onPress={()=> this.props.navigation.goBack()} >
                <Icon name='x' type='Feather' style={{color: 'black'} } />
              </Button>
            </Left>
            <Body>
              <Title style={{color: 'black', marginLeft: 25}} >  Edit Profile </Title>
            </Body>
            <Right>
                <Button transparent>
                <Icon name='check' type='Feather' style={{color: 'black'}} />
              </Button>
            </Right>
          </Header>
        <Content  >
          <View style={{flex: 1}} >
            <Thumbnail large source={{uri: uri}} 
                      style={{alignSelf: 'center', marginTop: 40, height: 100, width: 100}}
            />
          </View>
            <View style={{ marginTop: 30, width: '90%', alignSelf: 'center' }} >
            <Form>
                <Item rounded style={{marginBottom: 20}} >
                    <Input placeholder='Username'/>
                </Item>
                <Item rounded style={{marginBottom: 20}} >
                    <Input placeholder='Gender'/>
                </Item>
                <Item rounded style={{marginBottom: 20}} >
                        <DatePicker
                        defaultDate={null}
                        minimumDate={new Date(1900, 1, 1)}
                        maximumDate={new Date(2030, 12, 31)}
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Date of Birth"
                        textStyle={{ color: "grey" }}
                        onDateChange={null}
                        disabled={false}
                        style={{width: '100%'}}
                        />
                </Item>
                <Item rounded style={{marginBottom: 20}} >
                    <Input placeholder='Institution'/>
                </Item>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  cardList: {
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: "#69dffa",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 15,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }

})
