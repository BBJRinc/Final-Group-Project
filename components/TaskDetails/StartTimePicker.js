import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
// import Icon from 'react-native-vector-icons';

export default class StartTimePicker extends Component {
 constructor(props) {
   super(props)
   this.state = {
     time: ''
   }
 }
 setDate(date) {
   // console.log(date, "DSAFSDFASDFASDFASDFASDFASD")
   // let unixdate = moment().format('YYYY-MM-DD, h:m')
   // console.log(unixdate)
   this.setState({ time: date })
   this.props.setTaskStartTime(date);
 }
 render() {
  //  console.log('StartTimePicker:', this.state)
  //  const finalDate = this.props.startTime / 1000
   return (
     <DatePicker
       style={{ width: 300 }}
       date={this.state.time}
       showIcon={true}
       mode="time"
       format='h:mm'
       confirmBtnText='Save'
       cancelBtnText='Cancel'
       color='black'
       customStyles={{
         dateInput: { borderWidth: 0, height: 20, marginLeft:10, marginRight:20 },
         btnConfirm: { height: 20, margin: 0, marginRight: 10, marginTop: 10, padding: 0 },
         btnCancel: { height: 20, margin: 0, marginLeft: 10, marginTop: 10, padding: 0 },
       }}
       onDateChange={(date) => this.setDate(date) }
     />
   )
 }
}