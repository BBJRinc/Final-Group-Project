import React, { Component } from 'react';
import { Modal, TouchableHighlight } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, Input, Item, Content, Form, View } from 'native-base';
import IconI from 'react-native-vector-icons/Ionicons'
import IconE from 'react-native-vector-icons/Entypo'
import IconF from 'react-native-vector-icons/Feather'


export default class Labels extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentWillReceiveProps() {
        this.setState({modalVisible:this.props.isVisable})
    }

    render() {
        console.log(this.state)
        const { LabelPadding, headerText, colorMargin, buttonStyle, labelStyle } = styles
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    >
                    <Header style={{ backgroundColor: this.props.color }}>
                        <Left>
                            <Button transparent >
                                <TouchableHighlight 
                                    onPress={() => {
                                        this.setModalVisible(false);
                                    }}>
                                    <IconI name='ios-close' size={30} color={'#fff'} />
                                </TouchableHighlight>
                            </Button>
                        </Left>
                        <Text style={headerText}>Label</Text>
                        <Right>
                            <Button transparent>
                                <IconE name='dots-three-horizontal' size={20} color={'#fff'} />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Content>
                            <Button block style={[buttonStyle, { backgroundColor: '#EB5A46' }]} onPress={(e) => this.props.labelColor({ color: '#EB5A46', modalVisible:'false'})}>{this.props.color === '#EB5A46' ? <IconF name='check' size={25} style={{ color: '#fff' }} /> : null}</Button>
                            <Button block style={[buttonStyle, { backgroundColor: '#FFAB4A' }]} onPress={(e) => this.props.labelColor({ color: '#FFAB4A', modalVisible:'false' })}>{this.props.color === '#FFAB4A' ? <IconF name='check' size={25} style={{ color: '#fff' }} /> : null}</Button>
                            <Button block style={[buttonStyle, { backgroundColor: '#51E898' }]} onPress={(e) => this.props.labelColor({ color: '#51E898', modalVisible:'false' })}>{this.props.color === '#51E898' ? <IconF name='check' size={25} style={{ color: '#fff' }} /> : null}</Button>
                            <Button block style={[buttonStyle, { backgroundColor: '#F5DD29' }]} onPress={(e) => this.props.labelColor({ color: '#F5DD29', modalVisible:'false' })}>{this.props.color === '#F5DD29' ? <IconF name='check' size={25} style={{ color: '#fff' }} /> : null}</Button>
                            <Button block style={[buttonStyle, { backgroundColor: '#00C2E0' }]} onPress={(e) => this.props.labelColor({ color: '#00C2E0', modalVisible:'false' })}>{this.props.color === '#00C2E0' ? <IconF name='check' size={25} style={{ color: '#fff' }} /> : null}</Button>
                            <Button block style={[buttonStyle, { backgroundColor: '#838C91' }]} onPress={(e) => this.props.labelColor({ color: '#838C91', modalVisible:'false' })}>{this.props.color === '#838C91' ? <IconF name='check' size={25} style={{ color: '#fff' }} /> : null}</Button>
                        </Content>
                    </Content>
                </Modal>
                <TouchableHighlight style={{alignItems:'center'}}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style={LabelPadding}>{this.props.color==='' ? 'Label...' : <View style={[labelStyle,{backgroundColor:this.props.color}]}><Text style={{color:'#fff', paddingLeft:10, justifyContent:'center' }}>Tap to change task color</Text></View>}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
const styles = ({
    LabelPadding: {
        height: 40,
        marginLeft: 10,
        color: '#C7C7CD',
        alignItems: 'center',
        justifyContent:'center',
        alignContent:'center',
    },
    headerText: {
        color: '#fff',
        paddingTop: 13
    },
    colorMargin: {
        marginTop: 5
    },
    buttonStyle: {
        height: 50,
        width: 300,
        margin: 5,
        justifyContent: 'flex-end',
        paddingRight: 15
    }, 
    labelStyle:{
        height:25, 
        width: 225, 
        borderRadius:3, 
        marginLeft:10, 
        alignItems:'center'
    }
})