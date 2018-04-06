import React, { Component } from 'react'
import { Modal, TouchableHighlight, ListView } from 'react-native';
import {
    Container, Header, CheckBox, Left, Body, Right, Button, Title, Text, Input, Item, Content, Form, Footer, View,
    SwipeRow, ListItem, List
} from 'native-base';
import axios from 'axios'
import IconI from 'react-native-vector-icons/Ionicons';

const PubIpAddress = '192.168.3.176'

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
        const { checklistItems, taskid } = this.props
        this.setState({ checklistItems: checklistItems, taskid: taskid })
    }
    componentWillUnmount(){
        axios({
            method: 'put',
            url: `http://${PubIpAddress}:4040/api/checklist`,
            headers: {
                "token": this.props.token
            },
            data: {
                "checklistItems": this.state.checklistItems
            }
        });
    }

    editContent(e) {
        this.setState({ editting: !this.state.editting })
        this.props.updateChecklist(this.state.checklistItems)
    }

    handleChecklistItem(item) {
        this.setState({ newChecklistItem: item.item })
    }
    markComplete(data) {
        let completed =
            this.state.checklistItems.map((item, i) => {
                if (data.id === item.checklistitemid) {
                    item.completed = !data.completed
                    return item
                } else {
                    return item
                }
            })
        this.setState({
            checklistItems: completed
        })
    }
    updateContent(text, id) {
        let updatedCheckItem = this.state.checklistItems.map((item, i) => {
            if (id.id === item.checklistitemid) {
                item.content = text
                return item
            } else {
                return item
            }
        })
        this.setState({checklistItems:updatedCheckItem})
    }

    addChecklistItem(e) {
        const { checklistItems, newChecklistItem, taskid } = this.state
        let itemid = taskid
        if(newChecklistItem===''){
            return null
        } else {
        axios({
            method: 'post',
            url: `http://${PubIpAddress}:4040/api/checklist/${itemid}`,
            data: {
                content: newChecklistItem
            },
            headers: {
                "token": this.props.token,
            },
        }).then(resp => {
            this.setState({ checklistItems: resp.data });
        });
        this.setState({ newChecklistItem: '' })
    }
    }
    deleteRow(secId, rowId, rowMap, data) {
        const { checklistitemid } = data
        let itemid = checklistitemid
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.checklistItems];
        newData.splice(rowId, 1);
        this.setState({ checklistItems: newData });
        axios({
            method: 'delete',
            url: `http://${PubIpAddress}:4040/api/checklist/${itemid}`,
            headers: {
                "token": this.props.token
            }
        }).then(resp => {
            this.setState({ checklistItems: resp.data });
        });
    }
    render() {
        const { padding, addItemMargin, inputSize, separate } = styles
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        return (
            <View style={{ backgroundColor: '#efefef' }}>
                    <List
                    dataSource={this.ds.cloneWithRows(this.state.checklistItems)}
                    renderRow={data =>
                        <ListItem style={{ paddingLeft: 10, alignContent: 'center', alignItems: 'center', backgroundColor: '#efefef' }} onLongPress={(e, item) => this.editContent(e, item)}>
                            <CheckBox
                                iconProps='red'
                                checked={data.completed}
                                onPress={(e) => this.markComplete({ completed: data.completed, id: data.checklistitemid })}
                                style={{ borderColor: 'gray', borderRadius: 0, marginRight: 20, height: 20, width: 20, borderRadius: 2, paddingTop: 2 }} value={data.content} />
                            {
                                this.state.editting === false
                                    ?
                                    <Text onPress={(e, item) => this.editContent(e, item)} style={{ height: 20, alignContent: 'center', alignItems: 'center', fontSize: 17, marginTop: 6, paddingLeft: 5 }}>{data.content}</Text>
                                    :
                                    <Input style={{ height: 25, alignContent: 'center', justifyContent: 'center', marginBottom: 2 }} onChangeText={(text)=> this.updateContent(text, {id:data.checklistitemid})} onEndEditing={(e) => this.editContent( e )}>{data.content}</Input>
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
