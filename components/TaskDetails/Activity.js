import React, { Component } from 'react'
import { TouchableHighlight } from 'react-native'
import { Content, View, Input, Item, Text, Button} from 'native-base'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import IconF from 'react-native-vector-icons/Feather';
import axios from 'axios';
import Comments from './Comments';

const PubIpAddress = '192.168.2.121';

export default class Activity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            comments: []
        }
    }

    componentDidMount(){
        // console.log("The comments received as props: " + this.props.comments)
        this.setState({comments: this.props.comments});
    }

    submitComment(){
        axios({
            method: 'post',
            url: `http://${PubIpAddress}:4040/api/comment/${this.props.taskid}`,
            headers: {
                "token": this.props.token
            },
            data: {
                content: this.state.comment
            }
        }).then(resp => {
            this.setState({comments: resp.data, comment: ''});
        });
    }

    render() {
        const { activityContent, userInitialStyle, commentStyle, separate, padding, inputSize } = styles
        const sortedComments = this.state.comments.sort().reverse()
        const comments = !this.state.comments.length ? null : sortedComments.map(comment => {
            return(
                <Comments key={comment.commentid} comment={comment} user={this.props.user} />
            )
        })
        return (
            <View style={styles.container}>
                <View style={styles.commentsContainer}>
                    {comments}                    
                </View>
                <View style={styles.activityContent} >
                    <Item>
                        <View style={styles.userInitialStyle}><Text>{this.props.user.split(' ').map((item, i) => { if (i <= 1) return item[0] }).join('')}</Text></View>
                        <Input value={this.state.comment} placeholder='Add a comment...' style={styles.commentStyle} onChangeText={(text) => this.setState({comment: text})} />
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
    container: {
        flex: 1
    },
    commentsContainer: {
        flex: 1,
        marginBottom: 60
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