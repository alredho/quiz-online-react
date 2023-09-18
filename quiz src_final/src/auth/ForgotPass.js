import {
    Button,
    Container,
    Content,
    Form,
    Icon,
    Input,
    Item,
    Label,
    Left
}
    from "native-base";
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ForgotPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    sendOTP = () => {
        alert('OTP Code has been send on your email, valid in 5 minute');
    }

    render() {
        return (
            <Container>
                <Content>
                    <Text style={style.h1}>Forgot Password</Text>

                    <View style={style.stripLogin} />

                    <Text style={[style.descText, { marginLeft: 20 }]}>Please input your Email Account to send verification</Text>


                    <View style={{ marginHorizontal: 18, marginTop: 15 }}>
                        {/* Email */}
                        <View style={style.itemForm}>
                            <Item floatingLabel>
                                <Icon active
                                    name="mail"
                                    type="Feather"
                                />
                                <Label style={{ color: 'grey', paddingLeft: 10 }}>Email Address</Label>
                                <Input />
                            </Item>
                        </View>
                    </View>

                    <Button style={[style.colorPrimary, style.buttonForm]}
                        onPress={() => this.sendOTP()}>
                        <Text style={[style.colorPrimaryText, style.buttonFormText]}>
                            Send
                        </Text>
                    </Button>

                    <View style={{ marginHorizontal: 18, marginTop: 15 }}>
                        {/* Email */}
                        <View style={style.itemForm}>
                            <Item floatingLabel>
                                <Icon active
                                    name="key"
                                    type="FontAwesome5"
                                />
                                <Label style={{ color: 'grey', paddingLeft: 10 }}>OTP Code</Label>
                                <Input />
                            </Item>
                        </View>
                    </View>

                    <Button style={
                        [style.buttonForm,
                        style.colorPrimary]}
                        onPress={() => this.props.navigation.navigate('newPass')}>
                        <Text style={[style.colorPrimaryText, style.buttonFormText]}>
                            Verify
                        </Text>
                    </Button>

                </Content>
            </Container>
        );
    };
}

const style = StyleSheet.create({
    h1: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: '15%',
        marginLeft: 20
    },
    itemForm: {
        borderWidth: 1,
        height: 80,
        paddingHorizontal: 16,
        borderColor: '#eceff1',
        borderRadius: 10,
        paddingTop: 10
    },
    stripLogin: {
        width: 80,
        height: 10,
        backgroundColor: '#ff2360',
        marginTop: 10,
        marginLeft: 20
    },
    descText: {
        color: 'grey',
        fontSize: 16,
        marginTop: 20
    },
    linkText: {
        fontWeight: "bold",
        color: '#ff2360',
        width: '100%',
        textAlign: 'center',
        fontSize: 18
    },
    buttonForm: {
        marginHorizontal: '20%',
        width: '60%',
        height: 60,
        borderRadius: 50,
        padding: 20,
        marginVertical: 10
    },
    buttonFormText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: "center",
        width: '100%'
    },
    colorPrimary: {
        backgroundColor: '#ff2360'
    },
    colorPrimaryText: {
        color: '#FFFFFF'
    },

});
