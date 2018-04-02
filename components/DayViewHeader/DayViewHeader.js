import React, { Component } from 'react'
import { View, Image, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
import { Container, Separator, Content, Icon, Header, ListIcon, Footer, Button, Text, List, Left, Right, Body, ListItem, } from 'native-base';
import moment from 'moment';
import IconF from 'react-native-vector-icons/Feather';
import IconEV from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';


export default class DayViewHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentDate: ''
        }
    }

    componentDidMount() {
        let today = moment().format("MMM Do YY")
        this.setState({
            currentDate: today
        })
    }

    render() {
        const { nextDay, previousDay } = this.props
        return (
            <Container>

                <Header>

                    <Left Icon>
                        <IconF name="chevron-left"
                            color="#000000"
                            size={15}
                            onPress={() => getPreviousDay()}
                        />
                    </Left>

                    <Body>
                        <Text>
                            {this.state.currentDate}
                        </Text>
                    </Body>

                    <Right>
                        <IconF
                            name="chevron-right"
                            color="#000000"
                            size={15}
                            onPress={() => nextDay()}
                        />
                    </Right>

                </Header>

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 10,
        width: '100%',
        backgroundColor: '#ffffff',
    },
    text:{
        color: "#000000"
    }

})