import React from 'react';
import { StyleSheet, Animated, PanResponder } from 'react-native'
import { Text, Container } from 'native-base';

import gStyle from './../gStyle.js';

let theme = 'blue';
let testTheme = global.theme

const GRABBER_BACKGROUND = 'rgba(0, 255, 0, .3)';

/*------------------------------------------------------------------------------
-----Takes props of:------------------------------------------------------------
-------title: Text on the card--------------------------------------------------
-------color: The base color of the card----------------------------------------
-------itemStart: Distance from te top of the page------------------------------
-------itemHeight: The height of the manipulatable div--------------------------
------------------------------------------------------------------------------*/

class TaskCard extends React.Component {
  constructor(props) {
    super(props);

    
    this.state = {
      pan: new Animated.ValueXY(),
      ghostStyle: {
        width: 0,
        height: 0,
      },
    }
  }


  componentWillMount() {
    this.animatedValueX = 0;
    this.animatedValueY = 0;
    this.state.pan.x.addListener((value) => this.animatedValueX = value.value);
    this.state.pan.y.addListener((value) => this.animatedValueY = value.value);
    
/*------------------------------------------------------------------------------
-----Change bottom--------------------------------------------------------------
------------------------------------------------------------------------------*/
    this.panResponderBot = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        
      },
  
      onPanResponderMove: (e, gestureState) => {
        let newHeight = Math.max(30, Math.floor(e.nativeEvent.pageY - this.props.itemStart))
        // this.props.changeDimensions(null, newHeight);
      },
  
      onPanResponderRelease: (e, gestureState) => {
        // this.state.pan.flattenOffset();
        let newHeight = Math.max(30, Math.floor(e.nativeEvent.pageY - this.props.itemStart))
        this.props.setNewTimes(this.props.id, null, newHeight);
      }
    });
/*------------------------------------------------------------------------------
-----Change top-----------------------------------------------------------------
------------------------------------------------------------------------------*/
    this.panResponderTop = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        // this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value})
        // this.state.pan.setValue({x:0, y:0});
        this.initialHeight = this.props.itemHeight;
        this.initialStart = this.props.itemStart;
      },
  
      onPanResponderMove: (e, gestureState) => {
        let newStart = Math.max(0, Math.floor(e.nativeEvent.pageY))
        let newHeight = Math.max(30, Math.floor(this.initialHeight + (this.initialStart - newStart)))
        // this.props.changeDimensions(this.props.id, newStart, newHeight);
      },
  
      onPanResponderRelease: (e, gestureState) => {
        // this.state.pan.flattenOffset();
        let newStart = Math.max(0, Math.floor(e.nativeEvent.pageY))
        let newHeight = Math.max(30, Math.floor(this.initialHeight + (this.initialStart - newStart)))
        this.props.setNewTimes(this.props.id, newStart, newHeight);
        this.initialHeight = null;
      }
    });
/*------------------------------------------------------------------------------
-----Move entire component------------------------------------------------------
------------------------------------------------------------------------------*/
    this.panResponderMid = PanResponder.create({

      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      // onStartShouldSetPanResponder: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.animatedValueX, y: this.animatedValueY});
        this.state.pan.setValue({x: 0, y: 0});
      },
  
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y,
      }]),
  
      onPanResponderRelease: (e, gestureState) => {
        this.state.pan.flattenOffset();
        let newStart = Math.max(0, Math.floor(e.nativeEvent.pageY))
        this.props.setNewTimes(this.props.id, newStart);
        // this.animatedValueX = 0;
        // this.animatedValueY = 0;

        this.state.pan.setValue({x: 0, y: 0})
        // this.setState({ghostStyle: {...this.state.ghostStyle, top: 0, left: 0}})
        // console.log('this.state:', this.state);
        // Animated.spring(this.state.pan, {toValue: {x:0, y:0}}).start();
      }
    });
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();  
    this.state.pan.y.removeAllListeners();
  }

  ghostAnimate(ghostY, ghostHeight, ghostX) {

  }

  // hexToRGBA(hex) {
    
  //   let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  //   if(!result) {
  //     console.log('Invalid hex value:', hex);
  //     return `rgba(255,255,255,${GHOST_TRANSPARENCY})`;
  //   }
    
  //   let r = parseInt(result[1], 16),
  //       g = parseInt(result[2], 16),
  //       b = parseInt(result[3], 16);

  //   return `rgba(${r},${g},${b},${GHOST_TRANSPARENCY})`
  // }

  onLayout(event) {
    console.log(event.nativeEvent.layout);
    let ghostDimensions = {
      ...this.state.ghostStyle,
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.width,
    }

    this.setState({ghostStyle: {...ghostDimensions}})
  }

  render() {
    // console.log('this.props.itemStart:', this.props.itemStart);
    
    // console.log('this.props.itemHeight:', this.props.itemHeight);
    let color = {backgroundColor: this.props.color};
    
    return(
      <Container onLayout={(event) => {this.onLayout(event)}}>
        <Container style={[styles.card, color]}  {...this.panResponderMid.panHandlers} >
          <Text>{this.props.title}</Text>
        </Container>
        <Container style={styles.topGrab} {...this.panResponderTop.panHandlers} />
        <Container style={styles.botGrab} {...this.panResponderBot.panHandlers} />
        <Animated.View style={[this.state.ghostStyle, this.state.pan.getLayout(), styles.ghost]}
          pointerEvents='none'
          >
          <Container style={[styles.card, color]}>
            <Text>{this.props.title}</Text>
          </Container>
        </Animated.View>
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
  ghost: {
    position: 'absolute',
    opacity: 0.4,
    // backgroundColor: 'black',
  },
  topGrab: {
    backgroundColor: GRABBER_BACKGROUND,
    // backgroundColor: 'yellow',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: GRABBER_HEIGHT,
  },
  botGrab: {
    backgroundColor: GRABBER_BACKGROUND,
    // backgroundColor: 'lime',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: GRABBER_HEIGHT,
  }
})