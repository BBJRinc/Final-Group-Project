import React, { Component } from 'react'
import { View, StyleSheet } from "react-native";
import { Container, Icon, Header, Left, Right, Body, Title, Text } from 'native-base';
import IconF from 'react-native-vector-icons/Feather';
import IconEV from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import moment from 'moment';

export default class DayViewHeader extends Component {

    render() {
        console.log('this.props.selectedDay: ', this.props.selectedDay)
        let date = moment(this.props.selectedDay).format("ll")
        // let newDate = new Date().toDateString()
        //  moment(this.props.selectedDay).format("ll")
        // console.log('day header date', newDate)
        const { nextDay, previousDay } = this.props
        return (
                <Header style={styles.header}>

                    <Left Icon style={styles.left}>
                        <IconF name="chevron-left"
                            color="#ffffff"
                            size={28}
                            onPress={() => previousDay()}
                        />
                    </Left>

                    <Body style={styles.body}>
                        <Text style={styles.text}>
                            {date}
                        </Text>
                    </Body>

                    <Right Icon style={styles.right}>
                        <IconF
                            name="chevron-right"
                            color="#ffffff"
                            size={28}
                            onPress={() => nextDay()}
                        />
                    </Right>

                </Header>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 35,
        backgroundColor: 'rgba(0, 0, 0, .85)',
        justifyContent: "center"

    },
    body: {
        flex: 1,
    },
    right: {
        flex: 1,
        paddingLeft:0
    },
    left:{
        flex: 1,
        paddingRight:0
    },
    text: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 20
    }

})