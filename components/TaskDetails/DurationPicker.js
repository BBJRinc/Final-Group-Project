import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet, StatusBar, Modal, TouchableHighlight } from 'react-native'
import { Header, Container } from 'native-base'
import IconE from 'react-native-vector-icons/Entypo'

export default class DurationPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hours: '00',
      minutes: '00',
    }
    this.updateHour = this.updateHour.bind(this)
    this.updateMin = this.updateMin.bind(this)

  }
  updateHour(value) {
    this.setState({ hours: value })
  }
  updateMin(value) {
    this.setState({ minutes: value })
  }

  render() {
    const { text, pickerView, headerBackground, pickerContainer, pickerViewLeft, pickerViewRight, picker, bottomView } = style
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.showDurationPicker}
        >
          <View style={{ backgroundColor: 'black' }}>
            <Header style={headerBackground}>
              <StatusBar backgroundColor='red' barStyle='light-content' />
              <Text style={text}>Duration</Text>
            </Header>
            <View style={ pickerContainer}>
              <View style={ pickerView }><Text style={ pickerViewLeft }>hours</Text><Text style={ pickerViewRight }>min</Text></View>
              <Picker selectedValue={this.state.hours} onValueChange={(value) => this.updateHour(value)} style={ picker }>
                <Picker.Item label="00" value="00" color='#fff' />
                <Picker.Item label="01" value="01" color='#fff' />
                <Picker.Item label="02" value="02" color='#fff' />
                <Picker.Item label="03" value="03" color='#fff' />
                <Picker.Item label="04" value="04" color='#fff' />
                <Picker.Item label="05" value="05" color='#fff' />
                <Picker.Item label="06" value="06" color='#fff' />
                <Picker.Item label="07" value="07" color='#fff' />
                <Picker.Item label="08" value="08" color='#fff' />
                <Picker.Item label="09" value="09" color='#fff' />
                <Picker.Item label="10" value="10" color='#fff' />
                <Picker.Item label="11" value="11" color='#fff' />
                <Picker.Item label="12" value="12" color='#fff' />
                <Picker.Item label="13" value="13" color='#fff' />
                <Picker.Item label="14" value="14" color='#fff' />
                <Picker.Item label="15" value="15" color='#fff' />
                <Picker.Item label="16" value="16" color='#fff' />
                <Picker.Item label="17" value="17" color='#fff' />
                <Picker.Item label="18" value="18" color='#fff' />
                <Picker.Item label="19" value="19" color='#fff' />
                <Picker.Item label="20" value="20" color='#fff' />
                <Picker.Item label="21" value="21" color='#fff' />
                <Picker.Item label="22" value="22" color='#fff' />
                <Picker.Item label="23" value="23" color='#fff' />
                <Picker.Item label="24" value="24" color='#fff' />
              </Picker>
              <Picker selectedValue={this.state.minutes} onValueChange={this.updateMin} style={{ width: 200, paddingRight: 50 }}>
                <Picker.Item label="00" value="00" color='#fff' />
                <Picker.Item label="15" value=".15" color='#fff' />
                <Picker.Item label="30" value=".30" color='#fff' />
                <Picker.Item label="45" value=".45" color='#fff' />
              </Picker>
            </View>
            <View style={ bottomView }>
                <Text style={text} onPress={(e)=>this.props.cancelDuration(e)}>Cancel</Text>
              <Text style={text} onPress={(e)=>this.props.saveDuration((e),this.state)}>Save</Text>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const style = {
  pickerView: {
    height: 35,
    borderWidth: .75,
    borderBottomColor: '#1b1b1b',
    borderTopColor: '#1b1b1b',
    width: 275,
    position: 'absolute',
    marginLeft: 50,
    paddingLeft: 70,
    marginTop: 90,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  headerBackground:{
    backgroundColor: '#1b1b1b', 
    alignItems: 'center'
  }, 
  pickerContainer:{
    flexDirection: 'row', 
    backgroundColor: '#000', 
    justifyContent: 'center'
  },
  pickerViewLeft:{
    color: '#fff', 
    paddingTop: 8, 
    fontSize: 15
  },
  pickViewRight:{
    color: '#fff', 
    paddingTop: 8, 
    paddingRight: 15, 
    fontSize: 15
  },
  picker:{
    width: 200, 
    paddingLeft: 25
  },
  bottomView:{
    height: 35, 
    backgroundColor: '#1b1b1b', 
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingRight: 20, 
    paddingLeft: 20, 
    marginBottom: 300
  },
  text:{
    color:'#fff'
  }
}