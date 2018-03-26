import React, { Component } from 'react';
import { ListView, StyleSheet } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Left, Right, Body, Title, Footer, FooterTab } from 'native-base';
import FooterMenu from '../footer/FooterMenu';
import axios from 'axios';


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

export default class Unscheduled extends Component{
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          basic: true,
          listViewData: [],
        };
      }

    componentDidMount(){
        axios.get('http://192.168.1.9:4040/api/unscheduled').then(resp => {
            console.warn(resp.data);
            this.setState({listViewData: resp.data});
        });
    }

    render(){
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return(
            <Container>
                <Header style={styles.header}>
                    <Left style={{width: 300}}>
                        <Title style={styles.black}>Unscheduled Tasks</Title>                                                
                    </Left>
                    <Right>
                        <Button transparent>
                            <Icon name="close" style={styles.black}/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                <List
                    dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                    renderRow={data =>
                    <ListItem>
                        <Text> {data.taskname} </Text> 
                    </ListItem>}
                    renderLeftHiddenRow={data =>
                    <Button full onPress={() => alert(data)}>
                        <Icon active name="information-circle" />
                    </Button>}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                    <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                        <Icon active name="trash" />
                    </Button>}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#f2f2f2'
    },
    black: {
        color: 'black',
        fontSize: 18
    }
  });