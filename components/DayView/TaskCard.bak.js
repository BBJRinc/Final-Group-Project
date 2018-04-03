import React from 'react';
import { StyleSheet, Animated, PanResponder } from 'react-native'
import { Text, Container, Content } from 'native-base';

import gStyle from './../gStyle.js';

let theme = 'blue';
let testTheme = global.theme

const GRABBER_BACKGROUND = 'rgba(0, 255, 0, .3)';
const GHOST_OPACITY = 0.4;

/*------------------------------------------------------------------------------
-----Takes props of:------------------------------------------------------------
-------title: Text on the card--------------------------------------------------
-------color: The base color of the card----------------------------------------
-------itemStart: Distance from te top of the page------------------------------
-------cardHeight: The height of the manipulatable div--------------------------
------------------------------------------------------------------------------*/

class TaskCard extends React.Component {
  constructor(props) {
    super(props);

    
    this.state = {
      pan: new Animated.ValueXY(),
      ghostStyle: {
        opacity: 0.7,
      },
    }
  }


  componentWillMount() {
    this.animatedValueX = this.props.cardLeft;
    this.animatedValueY = this.props.cardTop;
    this.grabOffset = 0;
    this.state.pan.x.addListener((value) => this.animatedValueX = value.value);
    this.state.pan.y.addListener((value) => this.animatedValueY = value.value);
    
/*------------------------------------------------------------------------------
-----Change bottom--------------------------------------------------------------
------------------------------------------------------------------------------*/
    this.panResponderBot = PanResponder.create({

      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValueX = this.props.cardLeft;
        this.animatedValueY = this.props.cardTop;
        this.showGhost();
        this.state.pan.setOffset({x: this.animatedValueX, y: this.animatedValueY});
      },
  
      onPanResponderMove: (e, gestureState) => {
        console.log('e.nativeEvent.locationY:', e.nativeEvent.locationY);
        console.log('this.props.cardTop:', this.props.cardTop);
        
        let newHeight = Math.max(30, Math.floor(e.nativeEvent.locationY - this.props.cardTop))
        console.log('newHeight:', newHeight);
        
        // this.props.changeDimensions(null, newHeight);
        this.setState({ghostStyle: {...this.state.ghostStyle, height: newHeight}})
      },
  
      onPanResponderRelease: (e, gestureState) => {
        this.hideGhost();
        this.state.pan.flattenOffset();
        let newHeight = Math.max(30, Math.floor(e.nativeEvent.locationY - this.props.cardTop))
        this.props.setNewTimes(this.props.id, null, newHeight);
      }
    });
/*------------------------------------------------------------------------------
-----Change top-----------------------------------------------------------------
------------------------------------------------------------------------------*/
    this.panResponderTop = PanResponder.create({

      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValueX = this.props.cardLeft;
        this.animatedValueY = this.props.cardTop;
        // this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value})
        // this.state.pan.setValue({x:0, y:0});
        // this.initialHeight = this.props.cardHeight;
        // this.props.cardTop = this.props.cardTop;
        this.showGhost();
        this.state.pan.setOffset({x: this.animatedValueX, y: this.animatedValueY});
      },
  
      onPanResponderMove: (e, gestureState) => {
        let newStart = Math.max(0, Math.floor(e.nativeEvent.locationY))
        let newHeight = Math.max(30, Math.floor(this.props.cardHeight + (this.props.cardTop - newStart)))
        // this.props.changeDimensions(this.props.id, newStart, newHeight);
        this.setState({ghostStyle: {height: newHeight, top: newStart}})
        console.log('this.state.ghostStyle:', this.state.ghostStyle);
        
      },
  
      onPanResponderRelease: (e, gestureState) => {
        this.hideGhost();
        // this.state.pan.flattenOffset();
        console.log('this.props.cardHeight:', this.props.cardHeight);
        
        let newStart = Math.max(0, Math.floor(e.nativeEvent.locationY))
        let newHeight = Math.max(30, Math.floor(this.props.cardHeight + (this.props.cardTop - newStart)))
        console.log('newHeight:', newHeight);
        
        this.props.setNewTimes(this.props.id, newStart, newHeight);
        // this.props.cardHeight = null;
      }
    });
/*------------------------------------------------------------------------------
-----Move ghost-----------------------------------------------------------------
------------------------------------------------------------------------------*/
    this.panResponderMid = PanResponder.create({

      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      // onStartShouldSetPanResponder: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        console.log('Gesture grabbed');
        console.log('e.nativeEvent:', e.nativeEvent);
        
        this.showGhost();
        console.log('e.nativeEvent.locationY:', e.nativeEvent.locationY);
        console.log('this.props.cardTop:', this.props.cardTop);
        
        
        this.grabOffset = e.nativeEvent.locationY;
        console.log('this.grabOffset:', this.grabOffset);
        
        this.animatedValueX = this.props.cardLeft;
        this.animatedValueY = this.props.cardTop;
        this.state.pan.setOffset({x: this.animatedValueX, y: this.animatedValueY});
        this.state.pan.setValue({x: 0, y: 0});
      },
  
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y,
      }]),
  
      onPanResponderRelease: (e, gestureState) => {
        this.hideGhost();
        this.state.pan.flattenOffset();
        // this.state.pan.flattenOffset();
        // this.ghostRef.measure((fx) => {
        //   console.log('fx:', fx);
          
        // })

        console.log('e.nativeEvent', e.nativeEvent);
        
        console.log('this.ghostRef:', this.ghostRef);
        
        let newStart = Math.max(0, Math.floor(e.nativeEvent.locationY - this.grabOffset))
        this.props.setNewTimes(this.props.id, newStart);
        this.animatedValueX = 0;
        this.animatedValueY = 0;

        // this.state.pan.setValue({x: 0, y: 0})
        // this.setState({ghostStyle: {...this.state.ghostStyle, top: 0, left: 0}})
        // console.log('this.state:', this.state);
        // Animated.spring(this.state.pan, {toValue: {x:0, y:0}}).start();
      }
    });
/*------------------------------------------------------------------------------
-----Long press logic-----------------------------------------------------------
------------------------------------------------------------------------------*/
  }

  showGhost() {
    this.setState({ghostStyle: {...this.state.ghostStyle, opacity: GHOST_OPACITY}})
  }

  hideGhost() {
    this.setState({ghostStyle: {...this.state.ghostStyle, opacity: 0.8}})
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();  
    this.state.pan.y.removeAllListeners();
  }

  componentWillReceiveProps() {
    this.animatedValueX = this.props.cardLeft;
    this.animatedValueY = this.props.cardTop;
    this.state.pan.setValue({x: this.animatedValueX, y: this.animatedValueY});
  }
  // ghostAnimate(ghostY, ghostHeight, ghostX) {

  // }

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
    console.log('Layout:', event.nativeEvent.layout);
    let ghostDimensions = {
      ...this.state.ghostStyle,
      width: event.nativeEvent.layout.width,
      // height: event.nativeEvent.layout.width,
    }

    this.setState({ghostStyle: {...ghostDimensions}})
  }

  render() {
    // console.log('this.props.itemStart:', this.props.itemStart);
    
    // console.log('this.props.cardHeight:', this.props.cardHeight);
    let propStyles = {
      backgroundColor: this.props.color,
      top: this.props.cardTop,
      height:  this.props.cardHeight,
      left: this.props.cardLeft,
      right: this.props.cardRight,
      // width: 200,
    };
    let color = {
      backgroundColor: this.props.color,
    }
    // console.log('propStyles:', propStyles);
    
    return(
      <Container style={styles.cardHolder}>
        <Container style={[styles.card, propStyles]} onLayout={(event) => {this.onLayout(event)}} >
          <Text>{this.props.title}</Text>
          <Container style={styles.cardGrab} {...this.panResponderMid.panHandlers} />
          <Container style={styles.topGrab} {...this.panResponderTop.panHandlers} />
          <Container style={styles.botGrab} {...this.panResponderBot.panHandlers} />
        </Container>

        {/* <Animated.View style={[styles.ghost, propStyles, this.state.ghostStyle]}
          pointerEvents='none'> */}
          <Animated.View style={[styles.card,
              propStyles,
              // styles.ghost,
              this.state.ghostStyle,
              // {transform: this.state.pan.getTranslateTransform()}
              this.state.pan.getLayout(),
            ]}
            pointerEvents='none'
            ref={(ref) => this.ghostRef = ref}>
            <Text>{this.props.title}</Text>
            <Text>{this.state.ghostStyle.width}</Text>
          </Animated.View>
        {/* </Animated.View> */}

      </Container>
    )
  }
}
// this.state.pan.getLayout(), 
export default TaskCard;

const BORDER_RADIUS = 5;
const PADDING_VERT = 3;
const PADDING_LEFT = 10;
const GRABBER_HEIGHT = 10;

let styles = StyleSheet.create({
  cardHolder: { 
    // flex: 1,
    ...StyleSheet.absoluteFillObject,
    // bottom: 10000,
    backgroundColor: 'purple',
    opacity: .8,
  },
  card: {
    position: 'absolute',
    display: 'flex',
    flex: 1,
    borderRadius: BORDER_RADIUS,
    // paddingLeft: PADDING_LEFT,
    // paddingTop: PADDING_VERT,
    // paddingBottom: PADDING_VERT,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: gStyle[theme].dark,
  },
  cardGrab: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  },
  textBox: {
    color: 'black',
  },
  ghost: {
    position: 'absolute',
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