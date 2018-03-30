import React from 'react';
import { StyleSheet, PanResponder } from 'react-native'
import { Text, Container } from 'native-base';

import gStyle from './../gStyle.js';

let theme = 'blue';
let testTheme = global.theme

/*------------------------------------------------------------------------------
-----Takes props of:------------------------------------------------------------
-------title: Text on the card--------------------------------------------------
-------color: The base color of the card----------------------------------------
-------itemStart: Distance from te top of the page------------------------------
-------itemHeight: The height of the manipulatable div--------------------------
------------------------------------------------------------------------------*/

class TaskCard extends React.Component {

  componentWillMount() {
/*------------------------------------------------------------------------------
-----Change bottom--------------------------------------------------------------
------------------------------------------------------------------------------*/
    this._panResponderBot = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        // this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value})
        // this.state.pan.setValue({x:0, y:0});
      },
  
      onPanResponderMove: (e, gestureState) => {
        let newHeight = Math.max(30, Math.floor(gestureState.moveY - this.props.itemStart))
        this.props.changeDimensions(this.props.id, null, newHeight);
      },
  
      onPanResponderRelease: (e, gestureState) => {
        // this.state.pan.flattenOffset();
        let newHeight = Math.max(30, Math.floor(gestureState.moveY - this.props.itemStart))
        this.props.changeDimensions(this.props.id, null, newHeight);
      }
    });
/*------------------------------------------------------------------------------
-----Change top-----------------------------------------------------------------
------------------------------------------------------------------------------*/
    this._panResponderTop = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        // this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value})
        // this.state.pan.setValue({x:0, y:0});
        this.initialHeight = this.props.itemHeight;
        this.initialStart = this.props.itemStart;
      },
  
      onPanResponderMove: (e, gestureState) => {
        let newStart = Math.max(0, Math.floor(gestureState.moveY))
        let newHeight = Math.max(30, Math.floor(this.initialHeight + (this.initialStart - newStart)))
        this.props.changeDimensions(this.props.id, newStart, newHeight);
      },
  
      onPanResponderRelease: (e, gestureState) => {
        // this.state.pan.flattenOffset();
        let newStart = Math.max(0, Math.floor(gestureState.moveY))
        let newHeight = Math.max(30, Math.floor(this.initialHeight + (this.initialStart - newStart)))
        this.props.changeDimensions(this.props.id, newStart, newHeight);
        this.initialHeight = null;
      }
    });
/*------------------------------------------------------------------------------
-----Move entire component------------------------------------------------------
------------------------------------------------------------------------------*/
    this._panResponderMid = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        // this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value})
        // this.state.pan.setValue({x:0, y:0});
      },
  
      onPanResponderMove: (e, gestureState) => {
        let newStart = Math.max(0, Math.floor(gestureState.moveY-this.props.itemHeight/2))
        this.props.changeDimensions(this.props.id, newStart)
      },
  
      onPanResponderRelease: (e, gestureState) => {
        // this.state.pan.flattenOffset();
        let newStart = Math.max(0, Math.floor(gestureState.moveY-this.props.itemHeight/2))
        this.props.changeDimensions(this.props.id, newStart)
      }
    });
  }


  render() {
    console.log('this.props.itemStart:', this.props.itemStart);
    
    console.log('this.props.itemHeight:', this.props.itemHeight);
    let color = {backgroundColor: this.props.color};
    
    return(
      <Container>
        <Container style={[styles.card, color]} {...this._panResponderMid.panHandlers} >
          <Text>{this.props.title}</Text>
        </Container>
        <Container style={styles.topGrab} {...this._panResponderTop.panHandlers} />
        <Container style={styles.botGrab} {...this._panResponderBot.panHandlers} />
      </Container>
    )
  }
}

export default TaskCard;

const BORDER_RADIUS = 5;
const PADDING_VERT = 3;
const PADDING_LEFT = 10;
const GRABBER_HEIGHT = 10;

let styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS,
    paddingLeft: PADDING_LEFT,
    paddingTop: PADDING_VERT,
    paddingBottom: PADDING_VERT,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: gStyle[theme].dark,
  },
  textBox: {
    color: 'black',
  },
  topGrab: {
    backgroundColor: 'yellow',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: GRABBER_HEIGHT,
  },
  botGrab: {
    backgroundColor: 'lime',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: GRABBER_HEIGHT,
  }
})