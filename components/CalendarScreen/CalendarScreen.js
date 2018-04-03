import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View, 
  Modal
} from 'react-native';
import { Container, Button } from 'native-base';
import {Calendar} from 'react-native-calendars';

export default class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.onDayPress = this.onDayPress.bind(this);
  }

  render() {
    // console.log(this.state)
    return (
      <Container>
        <Modal 
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => this.props.showMenuItem('showCalendar')} >
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.container}>
            <Calendar
              onDayPress={this.props.onDayPress}
              style={styles.calendar}
              hideExtraDays
              markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedColor: '#00aeef'}}}
            />
            <Button
              full
              danger
              
              onPress={() => {                
                this.props.showMenuItem('showCalendar')
                }}
              >
              <Text style={{color: 'white', fontSize: 20}}>Cancel</Text>
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </Container>
      
    );
  }

  // onDayPress(day) {    
  //   this.setState({
  //     selected: day.dateString
  //   });
  // }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .65)',
    justifyContent: 'center',
    margin: 0
  },
  bottomModal: {
    backgroundColor: 'rgba(0, 0, 0, .65)'
  },

  contentContainer: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, .65)'
  }
});