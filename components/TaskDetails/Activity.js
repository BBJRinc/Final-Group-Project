import React, { Component } from 'react'
import { TouchableHighlight } from 'react-native'
import { Content, View, Input, Item, Text} from 'native-base'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import IconF from 'react-native-vector-icons/Feather';


export default class Activity extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { activityContent, userInitialStyle, commentStyle, separate, padding, inputSize } = styles
        return (
            <View>
                {/* <Modal 
                > */}
                    <Content style={activityContent}>
                        <Item>
                            <View style={userInitialStyle}><Text><Text>{this.props.user.split(' ').map((item, i) => { if (i <= 1) return item[0] }).join('')}</Text></Text></View>
                            <Input placeholder='Add a comment...' style={commentStyle} onChangeText={(text) => this.addComment(text)} />
                        </Item>
                    </Content>
                {/* </Modal> */}
            </View>

        )
    }
}
const styles = ({
    padding: {
        paddingLeft: 10
    },
    separate: {
        marginTop: 10,
        paddingLeft: 10,
        backgroundColor: '#fff'
    },
    activityContent: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row'
    },
    commentStyle: {
        borderBottomColor: 'transparent',
        justifyContent: 'flex-start'
    },
    userInitialStyle: {
        marginRight: 70,
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    inputSize: {
        height: 40,
    },
})