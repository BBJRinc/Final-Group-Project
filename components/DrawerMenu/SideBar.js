import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
import { Container, Separator, Content, Icon, Header, ListIcon, Footer, Button, Text, List, Left, Right, Body, ListItem, } from 'native-base';
import IconE from 'react-native-vector-icons/Entypo';
import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconEV from 'react-native-vector-icons/EvilIcons';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import IconOC from 'react-native-vector-icons/Octicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMAT from 'react-native-vector-icons/MaterialIcons';

const headerPic = './HeaderPic.jpg'


export default class SideBar extends Component {

    render() {
        return (
            <Container style={styles.root}>

                <Header style={{ backgroundColor: "#4f6d7a" }}>
                    <ImageBackground source={require(headerPic)} style={styles.header}>
                    </ImageBackground>
                </Header>

                <Content>

                    <Separator style={styles.separate}>
                        <Text style={styles.sepText}>Calender</Text>
                    </Separator>
                    <List>
                        {/* CALENDER */}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconF name="calendar" color="#4f6d7a" size={25} style={styles.iconStyle} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text style={styles.text}>Calender</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                        </ListItem>

                        {/* VIEW TODAY */}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconF name="log-out" color="#4f6d7a" size={25} style={styles.iconStyle} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text style={styles.text}>View Today</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                        </ListItem>

                        <Separator style={styles.separate}>
                            <Text style={styles.sepText}>Task Management</Text>
                        </Separator>
                        {/* NEW TASK */}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconMAT name="add-circle-outline" color="#F45B69" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text style={styles.text}>Create new task</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                        </ListItem>

                        {/* ONGOING TASKS */}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconF name="folder" color="#F45B69" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text style={styles.text}>Ongoing tasks</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                        </ListItem>

                        {/* UNSCHEDULED TASKS*/}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconF name="check-square" color="#F45B69" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text style={styles.text}>Unscheduled tasks</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                        </ListItem>

                        <Separator style={styles.separate}>
                            <Text style={styles.sepText}>Settings</Text>
                        </Separator>
                        {/* STYLE AND LAYOUT */}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconMCI name="invert-colors" color="#c0c0c0" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text style={styles.text}>Themes & Style</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                        </ListItem>

                        {/* SETTINGS */}
                        <ListItem icon style={styles.listit}>
                            <Left>
                                <IconMCI name="settings" color="#c0c0c0" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text style={styles.text}>Settings</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                        </ListItem>

                        {/* HELP & FEEDBACK */}
                        <ListItem icon>
                            <Left>
                                <IconE name="help-with-circle" color="#c0c0c0" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                                <Text style={styles.text}>Help & Feedback</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                        </ListItem >

                        {/* <ListItem style={styles.listit}>
                        </ListItem> */}

                        {/* LOG OUT BUTTON */}
                        <ListItem Icon style={styles.listit}>
                            <Left>
                                <IconF name="log-out" color="#000000" size={25} />
                            </Left>
                            <Body style={styles.listit}>
                            <Text style={styles.text}>Log Out</Text>
                            </Body>
                            <Right style={styles.listit}>
                            </Right>
                        </ListItem>

                    </List>

                </Content>

                <Footer style={{ backgroundColor: "#ffffff" }} />

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    header: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: "#4f6d7a",
    },
    iconStyle: {
        paddingTop: 20,
        paddingBottom: 10,
    },
    listit:{
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
    separate:{
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
    },
    button:{
        backgroundColor:'transparent',
        width: '100%',
    }
})