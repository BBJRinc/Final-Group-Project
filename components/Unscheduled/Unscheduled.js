import React, { Component } from 'react';
import { ListView, StyleSheet, Modal } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Left, Right, Body, Title, Footer, FooterTab } from 'native-base';
import FooterMenu from '../Footer/FooterMenu';
import axios from 'axios';

const PubIpAddress = '192.168.3.149';

export default class Unscheduled extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: [],
        };
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `http://${PubIpAddress}:4040/api/unscheduled`,
            headers: {
                "token": this.props.token
            }
        }).then(resp => {
            // console.log(resp.data)
            this.setState({ listViewData: resp.data });
            this.props.setCount(resp.data.length);
        });
    }
    updateList() {
        axios({
            method: 'get',
            url: `http://${PubIpAddress}:4040/api/unscheduled`,
            headers: {
                "token": this.props.token
            }
        }).then(resp => {
            // console.log(resp.data)
            this.setState({ listViewData: resp.data });
            this.props.setCount(resp.data.length);
        });
    }
    deleteTask(id) {
        // console.log(id)
        axios({
            method: 'delete',
            url: `http://${PubIpAddress}:4040/api/unscheduled/${id}`,
            headers: {
                "token": this.props.token
            }
        }).then(resp => {
            // console.log(resp.data);
            this.setState({ listViewData: resp.data });
        });
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.visible}
                    onShow={() => this.updateList()}
                    onRequestClose={() => this.props.showMenuItem('showTasks')}
                >
                    <Header style={styles.header}>
                        <Left style={{ flex: 1 }}>
                            <Title style={styles.black}>Unscheduled Tasks</Title>
                        </Left>
                        <Right>
                            <Button transparent onPress={() => this.props.showMenuItem('showTasks')}>
                                <Icon name="close" style={styles.black} />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <List
                            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                            renderRow={data =>
                                <ListItem onPress={() => this.props.onTaskPress(data, 'showTasks')}>
                                    <Text> {data.taskname} </Text>
                                </ListItem>}
                            renderLeftHiddenRow={data =>
                                <Button full onPress={() => this.props.onTaskPress(data, 'showTasks')}>
                                    <Icon active name="information-circle" />
                                </Button>}
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full danger onPress={() => this.deleteTask(data.taskid)}>
                                    <Icon active name="trash" />
                                </Button>}
                            leftOpenValue={75}
                            rightOpenValue={-75}
                        />
                    </Content>
                </Modal>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#000',
        width: '100%'
    },
    black: {
        color: '#fff',
        fontSize: 18
    }
});