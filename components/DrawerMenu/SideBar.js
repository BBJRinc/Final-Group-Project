import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
import { Container,  Separator, Content, Icon, Header, ListIcon, Footer, Button, Text, List, Left, Right, Body, ListItem, } from 'native-base';
import IconE from 'react-native-vector-icons/Entypo';
import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconEV from 'react-native-vector-icons/EvilIcons';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import IconOC from 'react-native-vector-icons/Octicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMAT from 'react-native-vector-icons/MaterialIcons';

const headerPic = './HeaderPic.jpg';

function applyLetterSpacing(string, count = 10) {
    return string.split('').join('\u200A'.repeat(count));
}
const appName = applyLetterSpacing('CALENTASK');


export default class SideBar extends Component {

    render() {
        // console.log('Props on SideBar: ', this.props)
        return (
            <Container style={styles.root}>

                {/* <Header style={{ backgroundColor: "#4f6d7a",  width: '100%' }}>
                    <ImageBackground source={require(headerPic)} style={styles.header}>
                        <Text style={{ color: '#ffffff', fontFamily: "AppleGothic", fontWeight: 'bold' }}>{appName}</Text>
                    </ImageBackground>
                </Header> */}
                <Header style={{ backgroundColor: "#4f6d7a", justifyContent: "center", alignItems: 'center' }}>
                    <Image source={require(headerPic)} style={styles.header}/>
                        <Text style={{ color: '#ffffff', fontFamily: "AppleGothic", fontWeight: 'bold' }}>{appName}</Text>
                </Header>

                <Content>

                    {/* Header Title for each category */}
                    <Separator style={styles.separate}>
                        <Text style={styles.sepText}>Calendar</Text>
                    </Separator>

                    {/* Begins SideBar list of menu items */}
                    {/* Format as follows */}
                    {/* Icon | description + onPress event | right side as needed */}
                    <List>
                        {/* CALENDAR */}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconF name="calendar" color="#4f6d7a" size={25} style={styles.iconStyle} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text onPress={() => {
                                    this.props.onClose();
                                    this.props.showMenuItem('showCalendar');
                                }}
                                    style={styles.text}>Calendar</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                            {/* End of Calender Item */}
                        </ListItem>


                        {/* VIEW TODAY */}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconMAT name="view-day" color="#4f6d7a" size={25} style={styles.iconStyle} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text onPress={() => {
                                    this.props.onClose();
                                }}
                                    style={styles.text}>View Today</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                            {/* End of View Today Item */}
                        </ListItem>


                        <Separator style={styles.separate}>
                            <Text style={styles.sepText}>Task Management</Text>
                        </Separator>

                        {/* NEW TASK */}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconMAT name="add-circle-outline" color="#800000" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text onPress={() => {
                                    this.props.onClose();
                                    this.props.showMenuItem('showTaskDetails', true)
                                }}
                                    style={styles.text}>Create new task</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                            {/* End of New Task Item */}
                        </ListItem>


                        {/* ONGOING TASKS */}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconF name="folder" color="#800000" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text onPress={() => {
                                    this.props.onClose();
                                    this.props.showMenuItem('showOngoing')
                                }}
                                    style={styles.text}>Ongoing tasks</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                            {/* End ofOngoing Tasks Item*/}
                        </ListItem>


                        {/* UNSCHEDULED TASKS*/}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconF name="check-square" color="#800000" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text onPress={() => {
                                    this.props.onClose();
                                    this.props.showMenuItem('showTasks')
                                }}
                                    style={styles.text}>Unscheduled tasks</Text>
                            </Body>
                            <Right style={styles.listit}>
                            {!this.props.unschedCount ? 
                            null 
                            :
                            <View style={styles.badge}>
                                <Text style={{color: '#fff'}}>{this.props.unschedCount}</Text>
                            </View>
                             }
                            </Right>
                            {/* End of Unscheduled Tasks Item */}
                        </ListItem>


                        <Separator style={styles.separate}>
                            <Text style={styles.sepText}>Settings</Text>
                        </Separator>

                        {/* STYLE AND LAYOUT */}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconMCI name="invert-colors" color="#696969" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text onPress={() => {
                                    this.props.onClose();
                                    // this.props.showMenuItem('')
                                }}
                                    style={styles.text}>Themes & Style</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                            {/*  End of Style and Layout Item*/}
                        </ListItem>


                        {/* SETTINGS */}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconMCI name="settings" color="#696969" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text onPress={() => {
                                    this.props.onClose();
                                    // this.props.showMenuItem('')
                                }}
                                    style={styles.text}>Settings</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                            {/* End of Settings Item */}
                        </ListItem>


                        {/* HELP & FEEDBACK */}
                        <ListItem icon>
                            <Left>
                                <IconE name="help-with-circle" color="#696969" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text onPress={() => {
                                    this.props.onClose();
                                    // this.props.showMenuItem('')
                                }}
                                    style={styles.text}>Help & Feedback</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                            {/* End of Help & Feedback Item */}
                        </ListItem >


                        {/* Log Out */}
                        <ListItem icon>
                            <Left>
                                <IconF name="log-out" color="#000000" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text onPress={() => this.props.logout()}
                                    style={styles.text}>Log out</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                            {/* End of Log Out Item */}
                        </ListItem >

                    </List>
                    {/* End of List */}

                </Content>

                {/* <Footer style={{ backgroundColor: "#ffffff" }} /> */}

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flex: 1,
        height: null,
        width: null,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // justifyContent: "center",
        // alignItems: "center",

    },
    iconStyle: {
        paddingTop: 20,
        paddingBottom: 10,
    },
    listit: {
        borderBottomWidth: 0,
    },
    text: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 20,
    },
    sepText: {
        color: '#000000',
        fontSize: 16,
    },
    separate: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
    },
    button: {
        backgroundColor: 'transparent',
        width: '100%',
    },
    badge: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff0000',
        width: 23.5,
        borderRadius: 10
    }
})