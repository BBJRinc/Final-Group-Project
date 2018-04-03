import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons';

export default class TaskDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render(){
    const finalDate = this.props.date/1000
    return (
      <DatePicker
        style={{width: 125}}
        date={this.state.date}
        showIcon={true}
        mode="datetime"
        placeholder={this.props.date === "" ? "Due date..." : moment.unix(finalDate).format('MM-DD-YYYY')}
        format="YYYY-MM-DD"
        minDate="2017-05-01"
        maxDate="2021-06-01"
        confirmBtnText='Save'
        cancelBtnText='Cancel'
        color='black'
        customStyles={{
          dateInput:{borderWidth: 0},
          btnConfirm:{height:20, margin:0, marginRight:10, marginTop:10, padding:0},
          btnCancel:{height:20, margin:0, marginLeft:10, marginTop:10, padding:0},
          }}
        onDateChange={(date) => {this.props.selectDate(date)}}
      />
    )
  }
}