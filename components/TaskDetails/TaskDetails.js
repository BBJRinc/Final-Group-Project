import React, { Component } from 'react';
import { View } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Title, Text, Input, Item, Content, Form } from 'native-base';
import TaskDatePicker from './TaskDatePicker.js'
import IconE from 'react-native-vector-icons/Entypo'
import IconI from 'react-native-vector-icons/Ionicons'
import IconF from 'react-native-vector-icons/Feather'
import IconFA from 'react-native-vector-icons/FontAwesome'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'



export default class HeaderIconTextExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            duedate: '',
            label: '',
            members: [],
            checklistItems: [{ name: '', item: [''] }],
            newItems: [],
            activity: [],
            newChecklist: false
        }
    }
    createNewChecklist(e) {
        console.log(e)
        this.setState({
            checklistItems: this.state.checklistItems.concat([{ name: '', item: [''] }])
        })
    }
    handleChecklistName(text) {
        console.log(text)
        const { id, name } = text
        const newName = this.state.checklistItems.map((checklist, cidx) => {
            if (id !== cidx) return checklist
            return { ...checklist, name: name }
        })
        this.setState({ checklistItems: newName })
    }
    handleChecklistItem(text) {
        const { id, item } = text
        console.log(id, text.text)
        const newItem = this.state.checklistItems.map((checklist, cidx) => {
            if (id !== cidx) return checklist
            return { ...checklist, item: text }
        })
        this.setState({ checklistItems: newItem })
    }
    addChecklistrow(e) {
        console.log(e)
        const { id } = e
        const newItem = this.state.checklistItems.map((checklist, cidx) => {
            if (id === cidx) return checklist
            return { ...checklist, item: '' }
        })
        this.setState({ checklistItems: newItem })
    }
    render() {
        console.log(this.state)
        const { padding, margin, separate, inputSize, header, inputColor, inputRight, inputBox_1, header_top, header_bottom, listItems, createChecklist } = styles
        let newChecklistItem = this.state.checklistItems.forEach((item,i)=>{
             return <Item style={{ paddingTop: 10 }} key={i}><Input placeholder='Add item...' style={padding} style={inputSize} onChangeText={(item) => this.handleChecklistItem({ id: i, item })} onEndEditing={(e) => this.addChecklistrow({ id: i, e })} />{item.id}</Item>  
        })
        console.log(newChecklistItem)
        // let checklists = this.state.checklistItems.map((item, i) => {
        //     return <Text key={i} style={listItems}>{item}</Text>
        // })
        // let newChecklist = this.state.checklist.map((item, i)=>{
        //     return (
        //          <Item regular style={separate} key={i}>
        //                 <IconI active name='md-checkbox-outline' size={15} style={padding} />
        //                 <Input placeholder='Checklist...' style={padding} style={inputSize} name='checklist' value={this.state.label} onPress={(e)=>this.createNewChecklist(e)}></Input>
        //         </Item>
        //     )
        // })
        // let newChecklistItem = this.state.
        return (
            <Container>
                <View style={header}>
                    <View style={header_top}>
                        <Left>
                            <Button transparent>
                                <IconI name='ios-close' size={30} color={'#fff'} />
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent>
                                <IconE name='dots-three-horizontal' size={20} color={'#fff'} />
                            </Button>
                        </Right>
                    </View>
                    <View style={header_bottom}>
                        <Left>
                            <Title style={{ color: '#fff' }}>Task Name</Title>
                        </Left>
                    </View>
                </View>
                <Content style={{ backgroundColor: '#efefef' }}>
                    <Item regular style={inputBox_1} >
                        <Input placeholder='Tap to add a description' onChangeText={(description) => this.setState({ description })} />
                    </Item>
                    <Item style={margin}>
                        <IconF active name='clock' size={15} />
                        <Input placeholder='Due date...'   />
                        <TaskDatePicker style={padding} style={inputSize}/>
                    </Item>
                    <Item style={margin}>
                        <IconSLI active name='tag' size={15} />
                        <Input placeholder='Label...' style={padding} style={inputSize} />
                    </Item>
                    <Item style={margin}>
                        <IconI active name='ios-person-outline' size={30} />
                        <Input placeholder='Members...' style={padding} style={inputSize} />
                    </Item>

                    {
                        this.state.checklistItems.map((item, i) => {
                            if (i === 0) {
                                return null
                            }
                            else if(i===1) {
                                return <Content key={i}>
                                    <Item regular style={separate}>
                                        <IconI active name='md-checkbox-outline' size={15} style={padding} />
                                        <Input placeholder='Checklist...' style={padding} style={inputSize} name='checklist' onChangeText={(text) => this.handleChecklistName({ id: i, name: text })} />
                                    </Item>
                                    <Item>
                                        <Input placeholder='Add item...' style={padding} style={inputSize} onChangeText={(item) => this.handleChecklistItem({ id: i, item })} onEndEditing={(e) => this.addChecklistrow({ id: i, e })} />
                                    </Item>
                                    {console.log(newChecklistItem)}
                                    {newChecklistItem}
                                    {/* {
                                    item.id>=0
                                       ?
                                    <Item style={{paddingTop:10}}>
                                        <Input placeholder='Add item...' style={padding} style={inputSize} onChangeText={(item) => this.handleChecklistItem({ id: i, item })} onEndEditing={(e) => this.addChecklistrow({ id: i, e })} />
                                    </Item>
                                    :
                                    null
                                    } */}
                                </Content>
                            }
                        })}
                    <Item style={separate} onPress={(e) => this.createNewChecklist(e)}>
                        <IconI active name='md-checkbox-outline' size={15} style={padding} />
                        <Text placeholder='Checklist...' style={createChecklist} name='checklist'> Checklist...</Text>
                    </Item>
                    <Item disabled style={separate}>
                        <IconF name='activity' size={15} style={padding} />
                        <Input placeholder='Activity' style={padding} style={inputSize} placeholder='Activity' />
                        <IconSLI name='settings' style={{ paddingRight: 15 }} size={15} />
                    </Item>
                    {/* {checklists} */}
                </Content>
            </Container>
        );
    }
}
const styles = ({
    padding: {
        paddingLeft: 10
    },
    margin: {
        paddingLeft: 10,
        backgroundColor: '#fff'
    },
    separate: {
        marginTop: 10,
        paddingLeft: 10,
        backgroundColor: '#fff'
    },
    inputSize: {
        height: 35,
    },
    header: {
        backgroundColor: '#00aeef',
        height: 100,
        paddingTop: 20,
        // flexDirection: 'row',
        paddingRight: 15,
        paddingLeft: 15
    },
    header_top: {
        paddingTop: 10,
        flexDirection: 'row'
    },
    header_bottom: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 0,

    },
    inputColor: {
        backgroundColor: '#fff'
    },
    inputRight: {
        borderRight: 'transparent'
    },
    inputBox_1: {
        borderColor: 'transparent',
        backgroundColor: '#fff',
        marginBottom: 10
    },
    listItems: {
        padding: 10,

    },
    createChecklist: {
        // justifyContent:'center',
        // alignContent:'center',
        paddingTop: 8,
        height: 37
    }
});