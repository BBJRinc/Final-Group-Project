import React, { Component } from 'react'
import { TouchableHighlight } from 'react-native'
import { Content, View, Input, Item, Text, Button} from 'native-base'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import IconF from 'react-native-vector-icons/Feather';
import axios from 'axios';
import Comments from './Comments';

const PubIpAdress = '192.168.3.132';

export default class Activity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            comments: []
        }
    }

    componentDidMount(){
        this.setState({comments: this.props.comments});
    }

    submitComment(){
        axios({
            method: 'post',
            url: `http://${PubIpAdress}:4040/api/comment/${this.props.taskid}`,
            headers: {
                "token": this.props.token
            },
            data: {
                content: this.state.comment
            }
        }).then(resp => {
            this.setState({comments: resp.data});
        });
    }

    render() {
        const { activityContent, userInitialStyle, commentStyle, separate, padding, inputSize } = styles
        const comments = this.state.comments.map(comment => {
            return(
                <Comments key={comment.commentid} comment={comment} user={this.props.user} />
            )
        })
        return (
            <View>
                <View style={{marginBottom: 80}}>
                    {comments}                    
                </View>
                <View style={styles.activityContent} >
                    <Item>
                        <View style={styles.userInitialStyle}><Text>{this.props.user.split(' ').map((item, i) => { if (i <= 1) return item[0] }).join('')}</Text></View>
                        <Input placeholder='Add a comment...' style={styles.commentStyle} onChangeText={(text) => this.setState({comment: text})} />
                        <Button
                        transparent
                        style={{marginRight: 5, marginLeft: 5}}
                        onPress={() => this.submitComment()}
                        ><Text>Save</Text></Button>
                    </Item>
                </View>
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
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        borderColor: 'grey',
        borderWidth: 1, 
        backgroundColor: '#f2f2f2'
    },
    commentStyle: {
        // borderBottomColor: 'transparent',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        height: 40,
        borderColor: 'grey', 
        borderWidth: 1
    },
    userInitialStyle: {
        marginRight: 10,
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    // inputSize: {
    //     height: 40,
    //     width: 100
    // },
})