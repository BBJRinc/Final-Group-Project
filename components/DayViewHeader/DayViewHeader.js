import React, { Component } from 'react'
import { View, StyleSheet } from "react-native";
import { Container, Icon, Header, Left, Right, Body, Title, } from 'native-base';
import IconF from 'react-native-vector-icons/Feather';
import IconEV from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import moment from 'moment';

export default class DayViewHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dateToDisplay: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        let date = moment(nextProps.selectedDay).format("LL")
        this.setState({
            dateToDisplay: date
        })
    }

    render() {
        // console.log('day header props', this.props)
        const { nextDay, previousDay } = this.props
        return (
                <Header style={styles.header}>

                    <Left Icon style={styles.left}>
                        <IconF name="chevron-left"
                            color="#ffffff"
                            size={25}
                            onPress={() => previousDay()}
                        />
                    </Left>

                    <Body style={styles.body}>
                        <Title style={styles.text}>
                            {this.state.dateToDisplay}
                        </Title>
                    </Body>

                    <Right Icon style={styles.right}>
                        <IconF
                            name="chevron-right"
                            color="#ffffff"
                            size={25}
                            onPress={() => nextDay()}
                        />
                    </Right>

                </Header>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 30,
        backgroundColor: 'rgba(0, 0, 0, .85)',

    },
    body: {
        width: '100%',
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
    }

})