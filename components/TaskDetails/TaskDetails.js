import React, { Component } from 'react';
import { Modal, TouchableHighlight } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, Input, Item, Content, Form, Footer, View } from 'native-base';
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
            user: 'Brandon Allred',
            date: '',
            comment: '',
            // modalVisable:false,
            LabelModalVisable: false,
            hours: '00',
            minutes: '00',
            milliseconds: 0,
            durationModalVisable: false
        }
        this.handleLabelColor = this.handleLabelColor.bind(this)
        this.selectDate = this.selectDate.bind(this)
        this.saveDuration = this.saveDuration.bind(this)
        this.cancelDuration = this.cancelDuration.bind(this)
        this.setModalVisible = this.setModalVisible.bind(this)
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
    addComment(text) {
        this.setState({ comment: text })
    }

    //methods used on the Labels comp
    handleLabelColor(color) {
        this.setState({ color: color.color, ModalVisable: this.state.LabelModalVisable })
    }
    selectDate(date) {
        console.log(date)
        this.setState({ date: date })
    }

    //   These methods are used on the DurationPicker component

    setModalVisible() {
        this.setState({ durationModalVisable: !this.state.durationModalVisable });
    }
    saveDuration(e, state) {
        console.log(state)
        const { minutes, hours } = state
        let minuteMilliseconds = minutes * 1 * (1000 * 60 * 100)
        let hourMilliseconds = hours * 1 * (60 * 60 * 1000)
        this.setState({ milliseconds: minuteMilliseconds + hourMilliseconds });
        this.setModalVisible();
    }
    cancelDuration(e) {
        console.log(e)
        this.setState({ hours: '00', minutes: '00', milliseconds: 0 });
        this.setModalVisible();
    }
    render() {
        console.log(this.state)
        console.log(this.props, "these are the props")
        const { padding, margin, separate, inputSize, header, inputColor, inputRight, inputBox_1, header_top, header_bottom, createChecklist, Label, addItemMargin, userInitialStyle, activityContent, iconSize, commentStyle, labelStyle } = styles
        let checklist = this.state.checklistItems.map((item, i) => {
            return (
                <Item key={i}>
                    <Input placeholder='Add item...' style={[padding, addItemMargin, inputSize]} onChangeText={(item) => this.handleChecklistItem({ id: i, item })} onEndEditing={(e) => this.addChecklistItem(e)} />
                </Item>
            )
        })
        return (
            <View style={{ marginTop: 22 }}>
                <Modal animationType="slide"
                    transparent={false}
                    visible={this.props.showTaskDetails}>
                    <View style={[header, { backgroundColor: this.state.color }]}>
                        <View style={header_top}>
                            <Left>
                                <TouchableHighlight style={{ alignItems: 'center' }}
                                    onPress={() => {
                                        this.props.showMenuItem('showTaskDetails');
                                    }}>
                                    <IconI name='ios-close' size={30} color={'#fff'} />
                                </TouchableHighlight>
                            </Left>
                            <Right>
                                {/* <Button transparent>
                                    <IconE name='dots-three-horizontal' style={iconStyle}/>
                                </Button> */}
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
                            {/* <Input placeholder='Due date...' placeholderTextColor={'black'}/> */}
                            <TaskDatePicker selectDate={this.selectDate} date={this.state.date} />
                            <DurationPicker 
                                showDurationPicker={this.state.durationModalVisable}
                                saveDuration={this.saveDuration}
                                cancelDuration={this.cancelDuration}
                                setModalVisible={this.setModalVisible} />
                            <TouchableHighlight style={{ alignItems: 'center' }}
                                onPress={() => {
                                    this.setModalVisible(!this.state.LabelModalVisable);
                                }}>
                                <Text style={{color:'#585858', fontSize:17}}>  <IconE name='time-slot' size={15} color={'#303030'}/>  Duration</Text>
                            </TouchableHighlight>
                        </Item>
                        <Item style={labelStyle}>
                            <IconSLI active name='tag' size={15} />
                            <Labels 
                            labelColor={this.handleLabelColor} 
                            color={this.state.color} 
                            isVisable={this.state.LabelModalVisable} />
                            {this.state.color !== '' ? <View style={{ height: 10, width: 25, backgroundColor: this.state.color, justifyContent: 'flex-end', marginLeft: 230 }} /> : null}
                        </Item>
                        <Item style={margin}>
                            <IconI active name='ios-person-outline' size={25} />
                            <Input placeholder='Members...' style={[padding, inputSize]} />
                        </Item>
                        <Item style={separate}>
                            <IconI active name='md-checkbox-outline' size={15} style={padding} />
                            <Input disabled placeholder='Checklist...' style={[inputSize]} name='checklist' onChangeText={(text) => this.handleChecklistName({ id: i, name: text })} />
                        </Item>
                        {checklist}
                        <Item disabled style={separate}>
                            <IconF name='activity' style={[iconSize, padding]} />
                            <Input placeholder='Activity' style={[padding, inputSize]} placeholder='Activity' />
                            <IconSLI name='settings' style={{ paddingRight: 15 }} size={15} />
                        </Item>
                    </Content>
                    <Content style={activityContent}>
                        <Item>
                            <View style={userInitialStyle}><Text><Text>{this.state.user.split(' ').map((item, i) => { if (i <= 1) return item[0] }).join('')}</Text></Text></View>
                            <Input placeholder='Add a comment...' style={ commentStyle } onChangeText={(text) => this.addComment(text)} />
                        </Item>
                    </Content>
                </Modal>
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
    createChecklist: {
        paddingTop: 8,
        height: 37
    },
    userInitialStyle: {
        marginRight: 70,
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    activityContent: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row'
    },
    commentStyle:{
        borderBottomColor: 'transparent', 
        justifyContent: 'flex-start'
    },
    labelStyle:{
        height: 40, 
        alignContent: 'center', 
        backgroundColor: '#fff', 
        paddingLeft: 10, 
        flex: 1, 
        alignItems: 'center'
    }
});