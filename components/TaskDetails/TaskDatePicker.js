import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
// import Icon from 'react-native-vector-icons';

export default class TaskDatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: ''
    }
  }
  setDate(date) {
    // console.log(date, "DSAFSDFASDFASDFASDFASDFASD")
    // let unixdate = moment().format('YYYY-MM-DD, h:m')
    // console.log(unixdate)
    this.setState({ duedate: date })
  }
  render() {
    console.log(this.state)
    const finalDate = this.props.selectedDay / 1000
    return (
      <DatePicker
        style={{ width: 300 }}
        date={moment().format('MMMM Do YYYY, h:mm:ss a')}
        showIcon={true}
        mode="datetime"
        format='MMMM Do YYYY, h:mm:ss a'
        confirmBtnText='Save'
        cancelBtnText='Cancel'
        placeholder={this.state.date}
        color='black'
        customStyles={{
          dateInput: { borderWidth: 0, height: 20, width: 30 },
          btnConfirm: { height: 20, margin: 0, marginRight: 10, marginTop: 10, padding: 0 },
          btnCancel: { height: 20, margin: 0, marginLeft: 10, marginTop: 10, padding: 0 },
        }}
        onDateChange={(date) => { this.setState({ date: date }); this.props.selectDate(); }}
      />
    )
  }
}