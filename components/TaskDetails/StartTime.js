import React, { Component } from 'react'
import {
    DatePickerIOS, Platform,
    View,
    StyleSheet,
    Text,
    Picker, StatusBar, Modal, TouchableHighlight, Item
} from 'react-native'
import IconI from 'react-native-vector-icons/Ionicons';
import moment from 'moment'

export default class StartTime extends Component {
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };

        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
        this.props.setTaskStartTime(newDate)
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    onRequestClose={() => this.props.setStartTimePicker()}
                    visible={this.props.showStartTimePicker}
                >
                    <DatePickerIOS
                        date={this.state.chosenDate}
                        onDateChange={this.setDate}
                        placeHolder='Select start time'
                        mode='time'
                        minuteInterval={15}
                    />
                    <TouchableHighlight style={{ alignItems: 'center' }}
                        onPress={() => {
                            this.props.setStartTimePicker();
                            }}>
                            <Text style={{height:30}}>hello</Text>
                    </TouchableHighlight>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
          ios: {
            // backgroundColor: 'Black',
          },
          android: {
            // backgroundColor: 'Black',
            color:'black'
          }
        })
    }
})
