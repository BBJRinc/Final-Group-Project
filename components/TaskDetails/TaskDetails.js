import React, { Component } from 'react';
import { Modal, TouchableHighlight } from 'react-native';
import { Container, Header, CheckBox, Left, Body, Right, Button, Title, Text, Input, Item, Content, Form, Footer, View, SwipeRow } from 'native-base';
import TaskDatePicker from './TaskDatePicker.js';
import DurationPicker from './DurationPicker';
import Activity from './Activity';
import Checklist from './Checklist';
import axios from 'axios';
import moment from 'moment';

import Labels from './Labels';
import IconE from 'react-native-vector-icons/Entypo';
import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

const PubIpAdress = '192.168.3.132';

export default class TaskDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {

            userID: '',
            taskid: '',
            userToken: '',
            createdDate: '',
            description: '',
            duedate: '',
            checklistItems: [],
            activity: [],
            taskname: '',
            color: '#838C91',
            user: 'Brandon Allred',
            comment: '',
            comments: [],
            hours: '00',
            minutes: '00',
            milliseconds: 0,
            completed: false,
            durationModalVisable: false,
            showChecklist: false,
            LabelModalVisable: false,
            startTime: null,
            editTitle: false,
            date: ''
            // members: [],
            // newChecklistItem: '',
            // modalVisable:false,
        }
        this.handleLabelColor = this.handleLabelColor.bind(this)
        this.selectDate = this.selectDate.bind(this)
        this.saveDuration = this.saveDuration.bind(this)
        this.cancelDuration = this.cancelDuration.bind(this)
        this.setModalVisible = this.setModalVisible.bind(this)
        this.updateChecklist = this.updateChecklist.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.selectedTask)
        if (nextProps.selectedTask.taskid) {
            const {
            taskid, taskname, updatedat,
                userid, starttime, isrecurring, duration,
                duedate, description, createdat, completed,
                comments, color, checkitems, token } = nextProps.selectedTask
                
            this.setState({
                userID: userid,
                userToken: this.props.token,
                taskid: taskid,
                taskname: taskname,
                createdDate: '',
                description: description,
                duedate: duedate,
                label: color,
                checklistItems: checkitems || [],
                color: color,
                date: duedate,
                comments: comments || [],
                milliseconds: duration,
                completed: completed,
                startTime: starttime
            });
        } else {
            this.setState({
                userID: '',
                taskid: '',
                userToken: this.props.token,
                createdDate: '',
                description: '',
                duedate: '',
                label: '',
                checklistItems: [],
                activity: [],
                taskname: '',
                color: '#838C91',
                user: 'Brandon Allred',
                comment: '',
                comments: [],
                hours: '00',
                minutes: '00',
                milliseconds: 0,
                completed: false,
                durationModalVisable: false,
                showChecklist: false,
                LabelModalVisable: false,
                startTime: null,
                editTitle: false
            });

        }
    }
    componentDidMount(){

    }
    updateTaskOnClick() {
        axios({
            method: 'put',
            url: `http://${PubIpAdress}:4040/api/task/${this.props.selectedTask.taskid}`,
            headers: {
                "token": this.props.token
            },
            data: {
                taskname: this.state.taskname,
                duedate: this.state.duedate,
                starttime: this.state.starttime,
                description: this.state.description,
                completed: this.state.completed,
                color: this.state.color,
                isrecurring: this.state.isrecurring,
                duration: this.state.milliseconds
            }
        }).then(() => {
            this.props.selectedTaskUpdate();
        })
    }



    editDescription(value) {
        this.setState({ description: value })
    }
    addComment(text) {
        this.setState({ comment: text })
    }

    //methods used on the Labels comp

    handleLabelColor(color) {
        this.setState({
            color: color.color,
            ModalVisable: this.state.LabelModalVisable
        })
    }
    selectDate(date) {
        let  newDate = moment(date, "YYYY-MM-DD").valueOf()
        let finalDate = newDate/1000
        this.setState({
            date: finalDate
        })
    }

    //   These methods are used on the DurationPicker component

    setModalVisible() {
        this.setState({
            durationModalVisable: !this.state.durationModalVisable
        });
    }
    updateChecklist(checklist) {
        this.setState({ checklistItems: checklist })
    }
    saveDuration(e, state) {
        const { minutes, hours } = state
        let minuteMilliseconds = minutes * 1 * (1000 * 60 * 100)
        let hourMilliseconds = hours * 1 * (60 * 60 * 1000)
        this.setState({
            milliseconds: minuteMilliseconds + hourMilliseconds
        });
        this.setModalVisible();
    }
    cancelDuration(e) {
        this.setState({
            hours: '00',
            minutes: '00',
            milliseconds: 0
        });
        this.setModalVisible();
    }
    editTitleText(value) {
        this.setState({ taskname: value })
    }
    editTitle() {
        this.setState({ editTitle: !this.state.editting })
    }
    render() {
        console.log(this.state)
        const { inlineLabelStyle, padding, margin, separate, inputSize, header, inputColor, inputRight, inputBox_1, header_top, header_bottom, createChecklist, Label, addItemMargin, userInitialStyle, activityContent, iconSize, commentStyle, labelStyle } = styles
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    onRequestClose={() => { this.props.showMenuItem('showTaskDetails'); this.updateTaskOnClick() }}
                    visible={this.props.showTaskDetails}>
                    <View style={[header, { backgroundColor: this.state.color }]}>
                        <View style={header_top}>
                            <Right style={{ marginBottom: 0, paddingBottom: 0 }}>
                                <TouchableHighlight style={{ alignItems: 'center' }}
                                    onPress={() => {
                                        this.props.showMenuItem('showTaskDetails');
                                        this.updateTaskOnClick();
                                    }}>
                                    <IconI name='ios-close' size={35} color={'#fff'} />
                                </TouchableHighlight>
                            </Right>
                            {/* <Right> */}
                            {/* <Button transparent>
                                    <IconE name='dots-three-horizontal' style={iconStyle}/>
                                </Button> */}
                            {/* </Right> */}
                        </View>
                        <View style={header_bottom}>
                            <Left style={{ justifyContent: 'center', alignContent: 'center' }}>
                                {
                                    this.state.taskname === ''
                                        ?
                                        <Item style={{ alignItems: 'center', borderBottomColor: 'transparent' }}>
                                            <Input style={{ color: '#fff', alignItems: 'center', height: 30, borderWidth: 0, alignContent: 'center', marginTop: -6, marginBottom: 5 }} value={this.state.taskname} placeholder={'click to add a title'} onChangeText={(value) => this.editTitleText(value)} onEndEditing={(e) => this.editTitle(e)} />
                                        </Item>
                                        :
                                        null
                                }
                                {
                                    this.state.editTitle === false
                                        ?
                                        <Text style={{ color: '#fff', height: 30, alignItems: 'center', alignContent: 'center' }} onPress={(e) => this.editTitle(e)}>{this.state.taskname}</Text>
                                        :
                                        <Item style={{ alignItems: 'center', borderBottomColor: 'transparent' }}>
                                            <Input style={{ color: '#fff', alignItems: 'center', height: 30, borderWidth: 0, alignContent: 'center', marginTop: -6 }} value={this.state.taskname} placeholder={'click to add a title'} onChangeText={(value) => this.editTitleText(value)} onEndEditing={(e) => this.editTitle(e)} />
                                        </Item>
                                }
                            </Left>
                        </View>
                    </View>
                    <Content style={{ backgroundColor: '#efefef', padding: 0, margin: 0 }}>
                        <SwipeRow
                            leftOpenValue={75}
                            rightOpenValue={-75}
                            left={
                                <Button success onPress={() => alert('Add')}>
                                    <IconF active name="check" />
                                </Button>
                            }
                            body={
                                this.state.completed === false
                                    ?
                                    <Text>  Swipe to complete</Text>
                                    :
                                    <Text style={{ backgroundColor: 'lightgreen', height: 30, width: 400 }}>Complete</Text>

                            }
                            right={
                                <Button danger onPress={() => alert('Trash')}>
                                    <IconI active name="ios-trash-outline" size={20} />
                                </Button>
                            }
                        />

                        <Item regular style={inputBox_1} >
                            <Input placeholder='Tap to add a description' onChangeText={(description) => this.setState({ description })} value={this.state.description} />
                        </Item>
                        <Item style={[inputSize, margin, { justifyContent: 'space-between' }]}>
                            <IconF active name='clock' size={15} />
                            {/* <Input placeholder='Due date...' placeholderTextColor={'black'}/> */}

                            {/* This is the DatePicker -------------------------------------------- */}

                            <TaskDatePicker
                                selectDate={this.selectDate}
                                date={this.state.date} />

                            {/* This is the DurationPicker -------------------------------------------- */}

                            <DurationPicker
                                showDurationPicker={this.state.durationModalVisable}
                                saveDuration={this.saveDuration}
                                cancelDuration={this.cancelDuration}
                                setModalVisible={this.setModalVisible}
                                duration={this.state.milliseconds} />
                            <TouchableHighlight style={{ alignItems: 'center' }}
                                onPress={() => {
                                    this.setModalVisible(!this.state.LabelModalVisable);
                                }}>
                                <Text style={{ color: '#585858', fontSize: 17 }}>
                                    <IconE name='time-slot' size={15} color={'#303030'} />
                                    {this.state.milliseconds === null ? 'Duration' : this.state.milliseconds / (60 * 60 * 1000)}
                                </Text>
                            </TouchableHighlight>
                        </Item>
                        <Item style={labelStyle}>
                            <IconSLI active name='tag' size={15} />
                            <Labels
                                labelColor={this.handleLabelColor}
                                color={this.state.color}
                                isVisable={this.state.LabelModalVisable} />
                            {this.state.color !== null ? <View style={[inlineLabelStyle, { backgroundColor: this.state.color }]} /> : null}
                        </Item>

                        {/* This is the checklist comp------------------------------------------- */}

                        <Item style={separate}>
                            <IconI active name='md-checkbox-outline' size={15} style={padding} />
                            <Input disabled placeholder='Checklist...' style={[inputSize]} name='checklist' onChangeText={(text) => this.handleChecklistName({ id: i, name: text })} />
                        </Item>
                        <Checklist
                            showChecklist={this.state.showChecklist}
                            color={this.state.color}
                            checklistItems={this.state.checklistItems}
                            taskid={this.state.taskid}
                            token={this.state.userToken}
                            updateChecklist={this.updateChecklist} />
                        <Item disabled style={separate}>
                            <IconF name='activity' style={[iconSize, padding]} />
                            <Input disabled placeholder='Activity' style={[padding, inputSize]} placeholder='Activity' />
                            <IconSLI name='settings' style={{ paddingRight: 15 }} size={15} />
                        </Item>
                    </Content>
                    <Activity user={this.state.user} />
                </Modal>
            </View>
        );
    }
}
const styles = ({
    padding: {
        paddingLeft: 10
    },
    inlineLabelStyle: {
        height: 10,
        width: 25,
        justifyContent: 'flex-end',
        marginLeft: 230
    },
    margin: {
        paddingLeft: 10,
        backgroundColor: '#fff',
        paddingRight: 20
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
    commentStyle: {
        borderBottomColor: 'transparent',
        justifyContent: 'flex-start'
    },
    labelStyle: {
        height: 40,
        alignContent: 'center',
        backgroundColor: '#fff',
        paddingLeft: 10,
        flex: 1,
        alignItems: 'center'
    }
});