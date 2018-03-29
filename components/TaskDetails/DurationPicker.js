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
      milliseconds: 0,
      modalVisable: false
    }
    this.updateHour = this.updateHour.bind(this)
    this.updateMin = this.updateMin.bind(this)
    this.saveDuration = this.saveDuration.bind(this)
    this.cancelDuration = this.cancelDuration.bind(this)
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
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    const { text } = StyleSheet
    console.log(this.state)
    return (
      <View>
      <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    >
      <View style={{backgroundColor:'black'}}>
        <Header style={{backgroundColor:'#1b1b1b', alignItems:'center'}}>
          <StatusBar backgroundColor='red' barStyle='light-content' />
          <Text style={{color:'#fff'}}>Duration</Text>
        </Header>
        <View style={{flexDirection:'row',backgroundColor:'black', justifyContent:'center'}}>
          <View style={{height:35, borderWidth:.75, borderBottomColor:'#1b1b1b', borderTopColor:'#1b1b1b', width:275, position: 'absolute', marginLeft:50, paddingLeft:70,  marginTop:90, justifyContent:'space-between', flexDirection:'row'}}><Text style={{color:'white', paddingTop:8, fontSize:15}}>hours</Text><Text style={{color:'white', paddingTop:8, paddingRight:15, fontSize:15}}>min</Text></View>
          <Picker selectedValue={this.state.hours} onValueChange={(value) => this.updateHour(value)} style={{ width: 200, paddingLeft:25}}>
            <Picker.Item label="00" value="00" color='white' />
            <Picker.Item label="01" value="01" color='white' />
            <Picker.Item label="02" value="02" color='white' />
            <Picker.Item label="03" value="03" color='white' />
            <Picker.Item label="04" value="04" color='white' />
            <Picker.Item label="05" value="05" color='white' />
            <Picker.Item label="06" value="06" color='white' />
            <Picker.Item label="07" value="07" color='white' />
            <Picker.Item label="08" value="08" color='white' />
            <Picker.Item label="09" value="09" color='white' />
            <Picker.Item label="10" value="10" color='white' />
            <Picker.Item label="11" value="11" color='white' />
            <Picker.Item label="12" value="12" color='white' />
            <Picker.Item label="13" value="13" color='white' />
            <Picker.Item label="14" value="14" color='white' />
            <Picker.Item label="15" value="15" color='white' />
            <Picker.Item label="16" value="16" color='white' />
            <Picker.Item label="17" value="17" color='white' />
            <Picker.Item label="18" value="18" color='white' />
            <Picker.Item label="19" value="19" color='white' />
            <Picker.Item label="20" value="20" color='white' />
            <Picker.Item label="21" value="21" color='white' />
            <Picker.Item label="22" value="22" color='white' />
            <Picker.Item label="23" value="23" color='white' />
            <Picker.Item label="24" value="24" color='white' />
          </Picker>
          <Picker selectedValue={this.state.minutes} onValueChange={this.updateMin} style={{ width: 200, paddingRight:50}}>
            <Picker.Item label="00" value="00" color='white' />
            <Picker.Item label="15" value=".15" color='white' />
            <Picker.Item label="30" value=".30" color='white' />
            <Picker.Item label="45" value=".45" color='white' />
          </Picker>
        </View>
        <View style={{height:35, backgroundColor:'#1b1b1b', justifyContent:'space-between', flexDirection:'row', alignItems:'center', paddingRight:20, paddingLeft:20, marginBottom:300}}>
          <TouchableHighlight
              onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
              }}>
              <Text style={{color:'#fff'}} onPress={this.cancelDuration}>Cancel</Text>
            </TouchableHighlight>
          <Text style={{color:'#fff'}} onPress={this.saveDuration}>Save</Text>
            </View>
      </View>
      </Modal>
      <TouchableHighlight style={{alignItems:'center'}}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                  <Text><IconE name='time-slot'/>Duration</Text>
      </TouchableHighlight>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  text: {
    // fontSize: 30,
    // alignSelf: 'center',
    // color: 'red'
  }
})