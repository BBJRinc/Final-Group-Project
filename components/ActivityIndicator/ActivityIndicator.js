import React, { Component } from 'react';
import {
    ActivityIndicator,
    AppRegistery,
    StyleSheet,
    Text,
    View,
} from 'react-native'

export default class Indicator extends Component{
    render(){
        return(
            <View style={styles.root}>
                <ActivityIndicator size="large" color="#cc9d2a" />
            </View>
        )
    }
}
const styles= StyleSheet.create({
    root:{
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#4f6d7a'
    },
    horizontal:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})