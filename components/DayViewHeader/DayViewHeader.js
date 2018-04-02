import React, {Component} from 'react'
import { View, Image, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
import { Container,  Separator, Content, Icon, Header, ListIcon, Footer, Button, Text, List, Left, Right, Body, ListItem, } from 'native-base';
import moment from 'moment';
import IconF from 'react-native-vector-icons/Feather';
import IconEV from 'react-native-vector-icons/EvilIcons';

export default class DayViewHeader extends Component{
    render(){
        return(
            <Container>

                <Header>
                    <Left Icon>
                    <IconF name="chevron-left" color="#000000" size={15}/>
                    </Left>

                </Header>

            </Container>
        )
    }
}