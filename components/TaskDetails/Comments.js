import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Comments extends Component{
    render(){
        return(
            <View style={styles.commentContainer}>
                <View style={styles.userInitialStyle}><Text>{this.props.user.split(' ').map((item, i) => { if (i <= 1) return item[0] }).join('')}</Text></View>
                <View style={styles.comment}>
                    <Text>
                        {this.props.comment.content}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userInitialStyle: {
        marginRight: 10,
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10, 
        marginTop: 7
    },
    comment: {
        marginBottom: 7,
        marginTop: 7,
        width: 300,
        backgroundColor: '#fff',
        padding: 10
    },
    commentContainer: {
        marginTop: 5,
        flexDirection: 'row'
    }
})