import React, { Component } from "react";
import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Title, Button, Text } from "native-base";

const backImage = './homeScreen.jpg';

export default class LoginScreen extends Component {
    constructor(props){
        super(props)
    }
    render() {
        // console.log('Props inc to LoginScreen Comp ',this.props)
        return (
            <ImageBackground source={require(backImage)}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                <Text style={{
                    flex: 1,
                    color: "#ffffff",
                    backgroundColor: 'transparent',
                    fontSize: 35,
                    letterSpacing: 17,
                    fontFamily: "AppleGothic",
                    textAlign: 'center',
                    top: 225

                }}>CALENTASK</Text>


                <Button rounded large light title="LOGIN"
                    onPress={() => this.props.login()}
                    style={{
                        width: 200,
                        height: 50,
                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                        alignContent: 'center',
                        justifyContent: 'center',
                        marginLeft: '25%',
                        marginTop: 250,
                        
                    }}
                >
                <Text
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        letterSpacing: 4,
                        fontFamily: "AppleGothic",
                        color: "#ffffff"
                        
                    }}
                >LOGIN</Text>
                </Button>

                <ScrollView />

                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 50,
                    bottom: 20,
                    backgroundColor: '#00000000',
                    alignItems: 'center',
                    justifyContent: "center"
                }}>
                    <Text style={{
                        color: '#ffffff',
                        fontSize: 15,
                        bottom: 5,
                        alignItems: 'center',
                        color: 'rgba(155,155,155,1)',
                    }}
                    >Don't have an account?</Text>

                    <Button transparent
                        title="Sign Up"
                        onPress={() => this.props.login()}
                    >
                        <Text style={{
                            fontSize: 15,
                            color: "rgba(74,144,226,1)",
                        }} >Sign Up</Text>
                    </Button>

                </View>
            </ImageBackground>
        );
    }
}