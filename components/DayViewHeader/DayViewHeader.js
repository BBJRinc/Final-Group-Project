import React, { Component } from 'react'
import { View, Image, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
import { Container, Separator, Content, Icon, Header, ListIcon, Footer, Button, Text, List, Left, Right, Body, ListItem, } from 'native-base';
import moment from 'moment';
import IconF from 'react-native-vector-icons/Feather';
import IconEV from 'react-native-vector-icons/EvilIcons';


export default class DayViewHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            yesterday: '',
            today: '',
            tomorrow: '',
            currentDate: ''
        }
    }

    componentDidMount() {
        let date = moment().format("YYYY-MM-DD")
        let todaysDate = moment(date, "YYYY-MM-DD").valueOf();
        console.log('todaysDate in Unix: ', todaysDate)
        this.setState({
            currentDate: todaysDate
        })
    }



    render() {
        return (
            <Container>

                <Header>

                    <Left Icon>
                        <IconF name="chevron-left"
                            color="#000000"
                            size={15}
                            onPress={() => { }}
                        />
                    </Left>

                    <Body>
                        {this.state.currentDate}
                    </Body>

                    <Right>
                        <IconF
                            name="chevron-right"
                            color="#000000"
                            size={15}
                            onPress={() => { }}
                        />
                    </Right>

                </Header>

            </Container>
        )
    }
}