import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { 
    Button, 
    Body,
    Container,
    Content,
    Card,
    CardItem,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Title,
    Thumbnail,
    ListItem,
    Switch,
    Footer

 } from 'native-base';
 import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isAuthorized: true,
    };
  }

  async removeItemValue(key) {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}


  render() {
    return (
        <Container>
           <Header style={{ backgroundColor: 'white'}} >
                <StatusBar backgroundColor="white" barStyle="dark-content"/>
                <Left>
                <Button transparent>
                    <Icon name='arrow-back' onPress={()=> this.props.navigation.goBack()} style={{color: 'black'}} />
                </Button>
                </Left>
                <Body>
                <Title style={{color: 'black', marginLeft: 25}} >  Settings </Title>
                </Body>
                </Header>
            <Content>
                <ListItem icon>
                    <Left>
                    <Button style={{ backgroundColor: "#000000" }}>
                        <Icon active name="lock" type="AntDesign" />
                    </Button>
                    </Left>
                    <Body>
                        <Text>Change Password</Text>
                    </Body>
                    <Right>
                        <Icon active name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem icon>
                    <Left>
                    <Button style={{ backgroundColor: "#000000" }}>
                        <Icon active name="help" type="Entypo" />
                    </Button>
                    </Left>
                    <Body>
                    <Text>Help</Text>
                    </Body>
                    <Right>
                    <Icon active name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem icon>
                    <Left>
                    <Button style={{ backgroundColor: "#000000" }}>
                        <Icon active name="contacts" type="MaterialCommunityIcons" />
                    </Button>
                    </Left>
                    <Body>
                    <Text>Contact</Text>
                    </Body>
                    <Right>
                    <Icon active name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem icon>
                    <Left>
                    <Button style={{ backgroundColor: "#000000" }}>
                        <Icon active name="filetext1" type="AntDesign" />
                    </Button>
                    </Left>
                    <Body>
                    <Text>Term of Service</Text>
                    </Body>
                    <Right>
                    <Icon active name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem icon >
                    <Left>
                    <Button style={{ backgroundColor: "#000000" }}>
                        <Icon active name="exclamationcircleo" type="AntDesign"/>
                    </Button>
                    </Left>
                    <Body>
                    <Text>About</Text>
                    </Body>
                    <Right>
                    <Icon active name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem icon 
                    onPress={()=>{
                        AsyncStorage.setItem('token', JSON.stringify(false));
                        this.removeItemValue('user');
                        AsyncStorage.getItem('token', (error, result) => {
                            if (result) {
                                let resultParsed = JSON.parse(result);
                                console.log(resultParsed);
                                this.props.navigation.navigate(resultParsed? 'Home' : 'Login');
                            }
                        });
                        
                    }} >
                    <Left>
                    <Button style={{ backgroundColor: "#000000" }}>
                        <Icon active name="poweroff" type="AntDesign" />
                    </Button>
                    </Left>
                    <Body>
                    <Text>Log Out</Text>
                    </Body>
                </ListItem>
                
            </Content> 
        </Container>
      
      

    );
  }
}
