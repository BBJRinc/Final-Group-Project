import React, { Component } from 'react';
import { Modal, TouchableHighlight} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, Input, Item, Content, Form, Footer,View } from 'native-base';
import TaskDatePicker from './TaskDatePicker.js';
import DurationPicker from './DurationPicker'
import axios from 'axios';
import Labels from './Labels';
import IconE from 'react-native-vector-icons/Entypo';
import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

export default class TaskDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            duedate: '',
            label: '',
            members: [],
            checklistItems: [''],
            newChecklistItem: '',
            activity: [],
            name: '',
            color: '#838C91',
            user:'Brandon Allred',
            date:'',
            comment:'',
            // modalVisable:false,
            LabelModalVisable:false,
            hours: '00',
            minutes: '00',
            milliseconds: 0,
            DurationModalVisable: false
        }
        this.handleLabelColor = this.handleLabelColor.bind(this)
        this.selectDate = this.selectDate.bind(this)
        this.updateHour = this.updateHour.bind(this)
        this.updateMin = this.updateMin.bind(this)
        this.saveDuration = this.saveDuration.bind(this)
        this.cancelDuration = this.cancelDuration.bind(this)
    }
    // componentWillReceiveProps(props){
    // Componentwill receive task object from the app.js page

    // }
    handleChecklistItem(item) {
        console.log(item)
        this.setState({ newChecklistItem: [item.item] })
    }
    addChecklistItem(e) {
        // add an axios call to get all checklist items by id from the database
        console.log(e)
        const { checklistItems, newChecklistItem } = this.state
        this.setState({ checklistItems: newChecklistItem, newChecklistItem: '' })
        // axios.put('/api/checklistItem').then(res=>{
        //     console.log(res)
        //     this.setState({checklistItems:res.data})
        // })
    }
    handleLabelColor(color) {
        this.setState({ color: color.color, ModalVisable:this.state.LabelModalVisable})
    }
    selectDate(date){
        console.log(date)
        this.setState({date:date})
    }
    addComment(text){
        this.setState({comment:text})
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
  }
  updateHour(value) {
    console.log(value)
    this.setState({ hours: value })
  }
  updateMin(value) {
    this.setState({ minutes: value })
  }
  saveDuration(e){
    const { minutes, hours, milliseconds } = this.state
    let minuteMilliseconds = minutes*1*(1000*60*100)
    let hourMilliseconds = hours*1*(60*60*1000)
    this.setState({milliseconds:minuteMilliseconds+hourMilliseconds})
  }
  cancelDuration(e){
    this.setState({hours:'00', minutes:'00',milliseconds:0})
  }
    render() {
        console.log(this.state)
        console.log(this.props, "these are the props")
        const { padding, margin, separate, inputSize, header, inputColor, inputRight, inputBox_1, header_top, header_bottom, listItems, createChecklist, Label, addItemMargin } = styles
        let checklist = this.state.checklistItems.map((item, i) => {
            return (
                <Item key={i}>
                    <Input placeholder='Add item...' style={[padding, addItemMargin, inputSize]} onChangeText={(item) => this.handleChecklistItem({ id: i, item })} onEndEditing={(e) => this.addChecklistItem(e)} />
                </Item>
            )
        })
        return (
            <View style={{marginTop:22}}>
            <Modal animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}>
                <View style={[header, {backgroundColor:this.state.color}]}>
                    <View style={header_top}>
                        <Left>
                        <TouchableHighlight style={{alignItems:'center'}}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <IconI name='ios-close' size={30} color={'#fff'} />
            </TouchableHighlight>
                            {/* <Button transparent> */}
                            {/* </Button> */}
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
                    <Item style={[inputSize, margin]}>
                        <IconF active name='clock' size={15} />
                        {/* <Input placeholder='Due date...' /> */}
                        <TaskDatePicker selectDate={this.selectDate} date={this.state.date}/>   
                        {/* <DurationPicker /> */}
                    </Item>
                    <Item style={[{ height: 40, alignContent: 'center', backgroundColor: '#fff', paddingLeft: 10, flex: 1, alignItems:'center'}]}>
                        <IconSLI active name='tag' size={15} />
                        <Labels labelColor={this.handleLabelColor} color={this.state.color} isVisable={this.state.LabelModalVisable}/>{this.state.color !== '' ? <View style={{ height: 10, width: 25, backgroundColor: this.state.color, justifyContent: 'flex-end', marginLeft: 230 }} /> : null}
                    </Item>
                    <Item style={margin}>
                        <IconI active name='ios-person-outline' size={30} />
                        <Input placeholder='Members...' style={padding} style={inputSize} />
                    </Item>
                    <Item style={separate}>
                        <IconI active name='md-checkbox-outline' size={15} style={padding} />
                        <Input disabled placeholder='Checklist...' style={[inputSize]} name='checklist' onChangeText={(text) => this.handleChecklistName({ id: i, name: text })} />
                    </Item>
                    {checklist}
                    <Item disabled style={separate}>
                        <IconF name='activity' size={15} style={padding} />
                        <Input placeholder='Activity' style={padding} style={inputSize} placeholder='Activity' />
                        <IconSLI name='settings' style={{ paddingRight: 15 }} size={15} />
                    </Item>
                </Content>
                    <Content style={{ position:'absolute',bottom:10, flexDirection:'row'}}>
                        <Item>
                            <View style={{marginRight:70, height: 30, width: 30, borderRadius: 30 / 2, backgroundColor: 'gray', justifyContent:'center', alignItems:'center', marginLeft:10}}><Text><Text>{this.state.user.split(' ').map((item,i)=>{if(i<=1)return item[0]}).join('')}</Text></Text></View>
                            <Input placeholder='Add a comment...' style={{borderBottomColor:'transparent', justifyContent:'flex-start'}} onChangeText={(text)=>this.addComment(text)}/>
                        </Item>
                    </Content>
            </Modal>
            <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Click me</Text>
            </TouchableHighlight>
            </View>
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
    addItemMargin: {
        marginLeft: 10
    },
    separate: {
        marginTop: 10,
        paddingLeft: 10,
        backgroundColor: '#fff'
    },
    inputSize: {
        height: 40,
    },
    header: {
        height: 100,
        paddingTop: 20,
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
        paddingTop: 8,
        height: 37
    },
});