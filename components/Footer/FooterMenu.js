import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button } from 'native-base';
import IconF from 'react-native-vector-icons/Feather';


export default class FooterMenu extends Component{
    render(){
        const { unschedCount } = this.props;  
        return(
                <Footer >
                    <FooterTab light style={{backgroundColor: 'rgba(0, 0, 0, .85)'}}>
                        <Button vertical onPress={() => this.props.logout()}>
                            <IconF name="plus" size={35} color={'#fff'}/>
                        </Button>
                        <Button  vertical > 
                            <IconF name="calendar" size={35} color={'#fff'} onPress={() => this.props.showMenuItem('showCalendar')} />
                        </Button>
                        
                        <Button  vertical onPress={() => this.props.showMenuItem('showTasks')}>
                            <IconF name="check-square" size={35} color={'#fff'} />
                            {!unschedCount ? 
                            null 
                            :
                            <View style={styles.badge}>
                                <Text style={{color: '#fff'}}>{unschedCount}</Text>
                            </View>
                             }
                            
                        </Button>
                        <Button vertical onPress={() => this.props.showMenuItem('showOngoing')} >
                            <IconF name="folder" size={35} color={'#fff'} />
                        </Button>
                        <Button vertical>
                            <IconF name="menu" size={35} color={'#fff'}/>
                        </Button>
                    </FooterTab>
                </Footer>
        )
    }
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: 1,
        right:4,
        width: 25,
        height: 25,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff0000'
    }
})

