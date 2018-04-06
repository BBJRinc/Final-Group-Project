import React, { Component } from 'react';
import { ListView, StyleSheet, Modal } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Left, Right, Body, Title, Footer, FooterTab } from 'native-base';
import FooterMenu from '../Footer/FooterMenu';
import axios from 'axios';

const PubIpAddress = '192.168.3.149';

const datas = [
    {name: 'Simon Mignolet', age: 31},
    {name: 'Nathaniel Clyne', age: 23},
    {name: 'Dejan Lovren', age: 15},
    {name: 'Mama Sakho', age: 38},
    {name: 'Alberto Moreno', age: 31},
    {name: 'Emre Can', age: 56},
    {name: 'Joe Allen', age: 41},
    {name: 'Phil Coutinho', age: 32},
    
  ];

export default class Ongoing extends Component{
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          basic: true,
          listViewData: [],
        };
      }

    componentDidMount(){
        axios({
            method: 'get',
            url: `http://${PubIpAddress}:4040/api/inprogress`,
            headers: {
                "token": this.props.token
            }
        }).then(resp => {
            this.setState({listViewData: resp.data});
        });
    }

    updateList() {
        axios({
            method: 'get',
            url: `http://${PubIpAddress}:4040/api/inprogress`,
            headers: {
                "token": this.props.token
            }
        }).then(resp => {
            // console.log(resp.data)
            this.setState({ listViewData: resp.data });
            this.props.setCount(resp.data.length);
        });
    }

    deleteTask(id){
        axios.delete(`http://${PubIpAddress}:4040/api/inprogress/${id}`).then(resp => {
            this.setState({listViewData: resp.data});
        });
    }

    render(){
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return(
                <Modal  
                    animationType="slide"
                    transparent={false}
                    visible={this.props.visible}
                    onShow={this.updateList()}
                    onRequestClose={() => this.props.showMenuItem('showOngoing')}
                    >
                    <Header style={styles.header}>
                        <Left style={{flex: 1}}>
                            <Title style={styles.black}>Ongoing Tasks</Title>                                                
                        </Left>
                        <Right>
                            <Button transparent onPress={() => this.props.showMenuItem('showOngoing')}>
                                <Icon name="close" style={styles.black}/>
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                        <ListItem onPress={() => this.props.onTaskPress(data, 'showOngoing')}>
                            <Text> {data.taskname} </Text> 
                        </ListItem>}
                        renderLeftHiddenRow={data =>
                        <Button full onPress={() => this.props.onTaskPress(data, 'showOngoing')}>
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
      backgroundColor: '#000'
    },
    black: {
        color: '#fff',
        fontSize: 18
    }
  });