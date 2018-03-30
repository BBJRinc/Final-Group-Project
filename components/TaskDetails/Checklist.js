import React, { Component } from 'react'
import { Modal, TouchableHighlight } from 'react-native';
import {
    Container, Header, CheckBox, Left, Body, Right, Button, Title, Text, Input, Item, Content, Form, Footer, View,
    SwipeRow
} from 'native-base';
import IconI from 'react-native-vector-icons/Ionicons';

export default class Checklist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checklistItems: [],
            newChecklistItem: '',
            editting: false
        }
    }
    componentDidMount() {
        // console.lo
        // const{checklistitemid, content} = this.props.checklistItems
        this.setState({ checklistItems: this.props.checklistItems })
    }
    editContent(e) {
        this.setState({ editting: !this.state.editting })
    }
    handleChecklistItem(item) {
        console.log(item)
        this.setState({ newChecklistItem: item.item })
    }
    updateContent(text) {
        console.log(text.id)
        const { id } = text
        // let body = this.state.newChecklistItem
        // axios.put(`/api/checklist/{id},`, body).then(res=>{
        //     this.setState({checklistItems:res.data})
        // });
        this.setState({ editting: !this.state.editting })
    }
    addChecklistItem(e) {
        // add an axios call to get all checklist items by id from the database
        const { checklistItems, newChecklistItem } = this.state
        this.setState({ checklistItems: [...checklistItems, newChecklistItem] });
        this.setState({ newChecklistItem: '' })
        // this.newChecklistItem.clear()
        // axios.put('/api/checklistItem').then(res=>{
        //     console.log(res)
        //     this.setState({checklistItems:res.data})
        // })
    }
    render() {
        const { padding, addItemMargin, inputSize, separate } = styles
        console.log(this.state)
        let checklist = this.state.checklistItems.map((item, i) => {
            if (this.state.editting === false) {
                return (<SwipeRow
                    rightOpenValue={-75}
                    right={
                        <Button danger onPress={() => alert('Trash')}>
                            <IconI active name="ios-trash-outline" />
                        </Button>
                    }
                    body={
                        <Item key={i}>
                            <CheckBox checked={this.state.checked}
                                onPress={() => this.setState({ checked: !this.state.checked })}
                                style={{ borderColor: 'gray', borderRadius: 0, marginRight: 20, height: 20, width: 20, borderRadius: 2 }} />
                            {
                                this.state.editting === false
                                    ?
                                    <View style={{borderColor:'transparent'}}><Text
                                        style={{borderColor:'transparent'}}
                                        onLongPress={(e, item) => this.editContent(e, item)}>{item.content}</Text></View>

                                    :
                                    <View><Input
                                        disabled style={[padding, addItemMargin, inputSize]}
                                        onChangeText={(item) => this.handleChecklistItem({ id: i, item })}
                                        onEndEditing={(e) => this.addChecklistItem(e)} /></View>}
                        </Item>
                    }

                />)
            } else {
                return (<Item key={i}>
                    <CheckBox checked={this.state.checked} onPress={() => this.setState({ checked: !this.state.checked })} style={{ borderColor: 'gray', borderRadius: 0, marginRight: 20, height: 20, width: 20, borderRadius: 2 }} />
                    <Input style={[padding, addItemMargin, inputSize]} onChangeText={(item) => this.handleChecklistItem({ id: i, item })} onEndEditing={(text) => this.updateContent({ id: item.checklistitemid, text })} >{item.content}</Input>
                </Item>
                )
            }
        })
        return (
            <View>
                <Item style={separate}>
                    <IconI active name='md-checkbox-outline' size={15} style={padding} />
                    <Input disabled placeholder='Checklist...' style={[inputSize]} name='checklist' onChangeText={(text) => this.handleChecklistName({ id: i, name: text })} />
                </Item>
                {checklist}
                <Item>
                    <Input placeholder='Add item...' style={[padding, addItemMargin, inputSize]} value={this.state.newChecklistItem} onChangeText={(item) => this.handleChecklistItem({ item })} onEndEditing={(e) => this.addChecklistItem(e)} />
                </Item>
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
