import React, { Component } from 'react'
import { } from 'react-native'

export default class Memebers extends Component {
    constructor(props) {
        super(props)
        state = {}
    }
    render() {
        return (
            <View>
                <Item style={margin}>
                    <IconI active name='ios-person-outline' size={25} />
                    <Input placeholder='Members...' style={[padding, inputSize]} />
                </Item>
            </View>
        )
    }
}