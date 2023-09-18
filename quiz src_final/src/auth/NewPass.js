import {
    Button,
    Container,
    Content,
    Icon,
    Input,
    Item,
    Label,
    Left
}
    from "native-base";
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class NewPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: true,
            password1: true,
            icon: "eye",
            icon1: "eye",
        };
    }

    _verify = () => {
        alert('Your Password has been Changed!!');
        this.props.navigation.popToTop()
    }

    _changeSecure = () => {
        this.setState(prevState => ({
            icon: prevState.icon === "eye" ? "eye-off" : "eye",
            password: !prevState.password,
        }))
    }
    _changeSecure1 = () => {
        this.setState(prevState => ({
            icon1: prevState.icon1 === "eye" ? "eye-off" : "eye",
            password1: !prevState.password1,
        }))
    }

    render() {
        return (
            <Container>
                <Content>
                    <Text style={style.h1}>New Password</Text>

                    <View style={style.stripLogin} />

                    <Text style={[style.descText, { marginLeft: 20 }]}>Please input your New Password</Text>


                    <View style={{ marginHorizontal: 18, marginTop: 70 }}>
                        {/* Password */}
                        <View style={[style.itemForm, { marginTop: 10 }]}>
                            <Item floatingLabel>
                                <Icon active
                                    name='lock'
                                    type='Feather'
                                />
                                <Label style={{ color: 'grey', paddingLeft: 10 }}>
                                    Password
                                </Label>
                                <Input
                                    secureTextEntry={this.state.password}
                                />
                                <Icon active
                                    name={this.state.icon}
                                    type="Feather"
                                    onPress={() => this._changeSecure()} />
                            </Item>
                        </View>

                        {/* Repeat Password */}
                        <View style={[style.itemForm, { marginTop: 10 }]}>
                            <Item floatingLabel>
                                <Icon active
                                    name='lock'
                                    type='Feather'
                                />
                                <Label style={{ color: 'grey', paddingLeft: 10 }}>
                                    Repeat Password
                                </Label>
                                <Input
                                    secureTextEntry={this.state.password1}
                                />
                                <Icon active
                                    name={this.state.icon1}
                                    type="Feather"
                                    onPress={() => this._changeSecure1()} />
                            </Item>
                        </View>
                    </View>

                    <Button style={
                        [style.buttonForm,
                        style.colorPrimary]}
                        onPress={() => this._verify()}>
                        <Text style={[style.colorPrimaryText, style.buttonFormText]}>
                            Confirm
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
    buttonForm: {
        marginHorizontal: '20%',
        width: '60%',
        height: 60,
        borderRadius: 50,
        padding: 20,
        marginTop: 50
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
