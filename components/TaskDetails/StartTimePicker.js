import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
// import Icon from 'react-native-vector-icons';

export default class StartTimePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: ''
    }
  }
  setDate(date) {
      console.log(date,'THis is the dated;lkjsd;lfkjas;dlfkja;sdlkfj')
    // console.log(date, "DSAFSDFASDFASDFASDFASDFASD")
    // let unixdate = moment().format('YYYY-MM-DD, h:m')
    // console.log(unixdate)
    // this.setState({ duedate: date })
  }
  render() {
    console.log(this.state)
    const finalDate = this.props.startTime / 1000
    return (
      <DatePicker
        style={{ width: 125 }}
        date={this.state.date}
        showIcon={true}
        mode="time"
        format='MMMM Do YYYY, h:mm:ss a'
        confirmBtnText='Save'
        cancelBtnText='Cancel'
        color='black'
        customStyles={{
          dateInput: { borderWidth: 0, height: 20, marginLeft:10, marginRight:20 },
          btnConfirm: { height: 20, margin: 0, marginRight: 10, marginTop: 10, padding: 0 },
          btnCancel: { height: 20, margin: 0, marginLeft: 10, marginTop: 10, padding: 0 },
        }}
        onDateChange={(date) => { this.setState({ date: date });  this.props.selectDate()}}
      />
    )
  }
}