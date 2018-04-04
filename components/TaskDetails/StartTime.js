import React, { Component } from 'react'
import {
    DatePickerIOS,
    View,
    StyleSheet,
    Text,
    Picker, StatusBar, Modal, TouchableHighlight, Item
} from 'react-native'
import IconI from 'react-native-vector-icons/Ionicons';

export default class StartTime extends Component {
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };

        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate })
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
                        placeHolder={this.state.chosenDate}
                    />
                    <TouchableHighlight style={{ alignItems: 'center' }}
                        onPress={() => {
                            this.props.setStartTimePicker();
                        }}>
                        {/* <IconI name='ios-close' size={35} color={'#fff'} /> */}
                        <View style={{height:20}}>
                                <Text>StartTime asdfasdfasdfasdfasdfasdf</Text>
                        </View>
                    </TouchableHighlight>
                </Modal>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
})