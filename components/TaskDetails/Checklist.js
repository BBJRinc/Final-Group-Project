import React, { Component } from 'react'
import { Modal, TouchableHighlight, ListView } from 'react-native';
import {
    Container, Header, CheckBox, Left, Body, Right, Button, Title, Text, Input, Item, Content, Form, Footer, View,
    SwipeRow, ListItem, List
} from 'native-base';
import axios from 'axios'
import IconI from 'react-native-vector-icons/Ionicons';

const PubIpAdress = '192.168.1.12'

export default class Checklist extends Component {
    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
            checklistItems: [],
            newChecklistItem: '',
            taskid: null,
            editting: false
        }
    }

    componentDidMount() {
        const { checklistItems, taskId } = this.props
        console.log(checklistItems, taskId)
        this.setState({ checklistItems: checklistItems, taskid: taskId })
    }

    editContent(e) {
        this.setState({ editting: !this.state.editting })
    }

    handleChecklistItem(item) {
        console.log(item)
        this.setState({ newChecklistItem: item.item })
    }
    markComplete(data) {
        console.log(data.id, data.completed)
        let completed =
            this.state.checklistItems.map((item, i) => {
                if (data.id === item.checklistitemid) {
                    item.completed = !data.completed
                    return item
                } else {
                    return item
                }
            })
        // axios.put('./api/checklist').then(res=>{
        // console.log(res)
        // this.setState({checklistItems:res.data})
        // })
        this.setState({
            checklistItems: completed
        })
    }
    updateContent(text) {
        console.log(text.id)
        const { id } = text
        // let body = this.state.newChecklistItem
        // axios.put(`/api/checklist/{id},`, body).then(res=>{
        //     this.setState({checklistItems:res.data})
        // });
        this.setState({ editting: !this.state.editting });

    }

    addChecklistItem(e) {
        const { checklistItems, newChecklistItem, taskid } = this.state
        let itemid = taskid
        console.log(newChecklistItem)
        console.log(itemid)
        axios({
            method: 'post',
            url: `http://${PubIpAdress}:4040/api/checklist/${itemid}`,
            data: {
                content: newChecklistItem
            },
            headers: {
                "token": this.props.token,
            },
        }).then(resp => {
            console.log(resp.data)
            this.setState({ checklistItems: resp.data });
        });
        this.setState({ newChecklistItem: '' })
    }
    deleteRow(secId, rowId, rowMap, data) {
        const { checklistitemid } = data
        let itemid = checklistitemid
        console.log(itemid)
        // rowMap[`${secId}${rowId}`].props.closeRow();
        // const newData = [...this.state.checklistItems];
        // newData.splice(rowId, 1);
        // this.setState({ checklistItems: newData });
        axios({
            method: 'delete',
            url: `http://${PubIpAdress}:4040/api/checklist/${itemid}`,
            headers: {
                "token": this.props.token
            }
        }).then(resp => {
            console.log(resp.data)
            this.setState({ checklistItems: resp.data });
        });
    }
    render() {
        const { padding, addItemMargin, inputSize, separate } = styles
        console.log(this.state)
        console.log(this.props.token)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        return (
            <View style={{ backgroundColor: '#efefef' }}>
                    <List
                    dataSource={this.ds.cloneWithRows(this.state.checklistItems)}
                    renderRow={data =>
                        <ListItem style={{ paddingLeft: 10, alignContent: 'center', alignItems: 'center', backgroundColor: '#efefef' }} onLongPress={(e, item) => this.editContent(e, item)}>
                            <CheckBox
                                checked={data.completed}
                                onPress={(e) => this.markComplete({ completed: data.completed, id: data.checklistitemid })}
                                style={{ borderColor: 'gray', borderRadius: 0, marginRight: 20, height: 20, width: 20, borderRadius: 2, paddingTop: 2 }} value={data.content} />
                            {
                                this.state.editting === false
                                    ?
                                    <Text onLongPress={(e, item) => this.editContent(e, item)} style={{ height: 30, alignContent: 'center', alignItems: 'center', fontSize: 16 }}>{data.content}</Text>
                                    :
                                    <Input style={{ height: 30, alignContent: 'center', justifyContent: 'center' }} onChangeText={(item) => this.handleChecklistItem({ id: item })} onEndEditing={(text) => this.updateContent({ id: text })} value={data.content} />
                            }
                        </ListItem>
                    }
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                        <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap, data)}>
                            <IconI active name="ios-trash-outline" size={20} />
                        </Button>
                    }
                    rightOpenValue={-75}
                />
                <View>

                    <Item>
                        <Input placeholder='Add item...' style={[padding, addItemMargin, inputSize]} value={this.state.newChecklistItem} onChangeText={(item) => this.handleChecklistItem({ item })} onEndEditing={(e) => this.addChecklistItem(e)} />
                    </Item>
                </View>

            </View>

        )
    }
}

const styles = ({
    padding: {
        paddingLeft: 10
    },
    inputSize: {
        height: 40,
    },
    addItemMargin: {
        marginLeft: 10
    },
    separate: {
        marginTop: 10,
        paddingLeft: 10,
        backgroundColor: '#fff'
    },
})
