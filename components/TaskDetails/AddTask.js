import React, { Component } from 'react';
import { Modal, TouchableHighlight, StatusBar } from 'react-native';
import { View, Input, Header, Right, Left, Content, Title, Button, Item, Body } from 'native-base';
import IconI from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

<<<<<<< HEAD
const PubIpAddress = '192.168.3.176'
=======
const PubIpAddress = '192.168.3.132';
>>>>>>> master

export default class AddTask extends Component {

    constructor(props) {
        super(props)
        this.state = {
            taskname: '',
        }
    }

    handleTaskName(text) {
        this.setState({ taskname: text })
    }
    saveTaskName() {
        axios({
            method: 'post',
            url: `http://${PubIpAddress}:4040/api/task`,
            headers: {
                "token": this.props.token
            },
            data: {
                taskname: this.state.taskname,
            }
        }).then((res) => {
            this.props.setSelectedTask(res.data)
            this.props.showMenuItem('showAddTask');
            this.props.showMenuItem('showTaskDetails');
        })
    }
    render() {
        const { contentView, inputStyle } = style
        return (
                <Modal
                    style={contentView}
                    animationType="slide"
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={() => this.props.showMenuItem('showAddTask')} >
                    <Header style={{ backgroundColor: '#000' }}>
                        <StatusBar barStyle='light-content' />
                        <Left>

                        </Left>
                        <Body><Title style={{ color: '#fff' }}>Add Task</Title></Body>
                        <Right>
                            <Button transparent onPress={() => this.props.showMenuItem('showAddTask')}>
                                <IconI name='ios-close' color='#fff' size={20} />
                            </Button>
                        </Right>
                    </Header>
                    <Content style={{ backgroundColor: '#00000099' }}>
                        <Item style={[contentView, { borderWidth: 1, borderBottomColor: '#fff' }]}>
                            <Input placeholder={'click to add a new task'} style={inputStyle} onChangeText={(text) => this.handleTaskName(text)} onEndEditing={() => this.saveTaskName()} />
                        </Item>
                    </Content>
                </Modal>
        )
    }
}
style = {
    contentView: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: (225, 225, 225, .8),
        marginTop: 225
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'black',
        color: 'white',
        height: 40
    }
}