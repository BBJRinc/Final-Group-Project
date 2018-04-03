import React from 'react';
import { StyleSheet, Animated, PanResponder } from 'react-native'
import { Text, Container, Content, List } from 'native-base';
import NativeMethodsMixin from 'NativeMethodsMixin';

import gStyle from './../gStyle.js';

let theme = 'blue';
let testTheme = global.theme

const GRABBER_BACKGROUND = 'rgba(0, 255, 0, .3)';
const GHOST_OPACITY = 0.4;

const LONG_PRESS_TIME = 10;

const DBG = true;

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
      unlocked: false,
      gestureShield: false,
      pan: new Animated.ValueXY(),
      ghostStyle: {
        opacity: 0,
      },
    }
  }


  componentWillMount() {
    // this.animatedValueX = this.props.cardLeft;
    // this.animatedValueY = this.props.cardTop;
    this.animatedValueX = 0;
    this.animatedValueY = 0;
    this.state.pan.x.addListener((value) => this.animatedValueX = value.value);
    this.state.pan.y.addListener((value) => this.animatedValueY = value.value);
    this.pressTimer = null;
    this.tap = true;

/*------------------------------------------------------------------------------
-----Change bottom--------------------------------------------------------------
------------------------------------------------------------------------------*/
    this.panResponderBot = PanResponder.create({

      onStartShouldSetPanResponderCapture: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        this.startResizeGesture();
      },
  
      onPanResponderMove: (e, gestureState) => {
        // if(DBG) console.log('this.ghostBottom:', this.ghostBottom);
        // if(DBG) console.log('e.nativeEvent:', e.nativeEvent);
        
        let newHeight = Math.max(this.props.segmentHeight, e.nativeEvent.locationY - this.ghostTop)
        this.setState({ghostStyle: {...this.state.ghostStyle, height: newHeight}})
      },
  
      onPanResponderTerminate: (e, gestureState) => {
        this.endResizeGesture();
      },

      onPanResponderRelease: (e, gestureState) => {
        this.endResizeGesture();
        this.state.pan.flattenOffset();
        let newHeight = Math.max(this.props.segmentHeight, e.nativeEvent.locationY - this.ghostTop)
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
      },
  
      onPanResponderMove: (e, gestureState) => {
      },
  
      onPanResponderRelease: (e, gestureState) => {
      }
    });
/*------------------------------------------------------------------------------
-----Move ghost-----------------------------------------------------------------
------------------------------------------------------------------------------*/
    this.panResponderMid = PanResponder.create({

      onStartShouldSetPanResponder: () => true,
      onShouldBlockNativeResponder: () => false,
  
      onPanResponderGrant: (e, gestureState) => {
        this.tap = true;
        this.pressTimer = setTimeout(() => {
          this.tap = false;
          this.showGhost();
          this.setState({unlocked: true})
          this.props.scrollable(false);
          this.state.pan.setValue({x: this.props.cardLeft, y: this.props.cardTop})
          this.state.pan.setOffset({x: this.animatedValueX, y: this.animatedValueY})
          if(DBG) console.log('moveAction set to true');
          
        }, LONG_PRESS_TIME)
      },

      onPanResponderMove: (e, gestureState) => {
        if(this.state.unlocked) {
          // this.blockNative();
          this.setState({debug: e.nativeEvent.locationY})
          Animated.event([null,
            {
              dx: this.state.pan.x,
              dy: this.state.pan.y,
            }]
          )(e, gestureState)
        } else {
          this.tap = false;
          clearTimeout(this.pressTimer);
          
          return false;
        }
      },

      onPanResponderTerminate: (e, gestureState) => {
        this.endMoveGesture();
      },
  
      onPanResponderRelease: (e, gestureState) => {
        this.endMoveGesture();

        if(this.tap) {
          this.tapAction();
        } else {
          this.state.pan.setValue({x: 0, y: 0})
          this.state.pan.flattenOffset();
          this.props.setNewTimes(this.props.id, this.ghostTop);
        }
      }
    });
  }

  endMoveGesture() {
    this.hideGhost();
    this.props.scrollable(true);
    this.setState({unlocked: false});
    clearTimeout(this.pressTimer);
  }

  endResizeGesture() {
    this.hideGhost();
    this.setState({gestureShield: false});
    // if(DBG) console.log('this.state:', this.state);
      
    // this.setState({ghostStyle: {opacity: 1}});
  }

  startResizeGesture() {
    this.showGhost();
    this.setState({gestureShield: true});
    // this.state.pan.setValue({y: this.props.cardTop})
    // this.state.pan.setOffset({y: 0});
  }

  showGhost() {
    if(DBG) console.log('!!!!!!!!!!!showGhost called');
    
    this.setState({ghostStyle: {...this.state.ghostStyle, opacity: GHOST_OPACITY}});
  }

  hideGhost() {
    if(DBG) console.log('hideGhost Called');
    
    this.setState({stuff: 'hello?'})
    if(DBG) console.log('this.state:', this.state);
    
  }

  tapAction() {
    if(DBG) console.log('There was a tap!');
    
  }

  // blockNative() {
  //   this.setState({blockNative: true});
  // }

  // unblockNative() {
  //   this.setState({blockNative: false});
  // }

  // disableGhostPointer() {
  //   this.setState({disableGhostPointer: 'none'})
  // }

  // disableGhostPointer() {
  //   this.setState({disableGhostPointer: 'auto'})
  // }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();  
    this.state.pan.y.removeAllListeners();
  }

  componentWillReceiveProps(newProps) {
    // if(DBG) console.log('newProps:', newProps);
    
    if(newProps.cardTop != this.state.ghostStyle.top) {
      this.state.pan.setValue({
        y: newProps.cardTop,
      })
    }
    if(newProps.cardHeight != this.state.ghostStyle.height){
      this.setState({ghostStyle: {...this.state.ghostStyle, height: newProps.cardHeight}})
    }
  }


  onLayout(event) {
    console.log('Layout:', event.nativeEvent.layout);
    let ghostDimensions = {
      ...this.state.ghostStyle,
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
      // opacity: 0,
    }
    this.setState({ghostStyle: {...this.state.ghostStyle, ...ghostDimensions}})
  }

  ghostLayout(e) {
    this.ghostTop = e.nativeEvent.layout.y
    // if(DBG) console.log('this.ghostTop:', this.ghostTop);
    this.ghostBottom = this.ghostTop + e.nativeEvent.layout.height
    // if(DBG) console.log('e.nativeEvent.layout.height:', e.nativeEvent.layout.height);
    
    // if(DBG) console.log('this.ghostBottom:', this.ghostBottom);
    
    // if(DBG) console.log('e.nativeEvent:', e.nativeEvent);
    
  }

  render() {
    let propStyles = {
      backgroundColor: this.props.color,
      top: this.props.cardTop,
      height:  this.props.cardHeight,
      left: this.props.cardLeft,
      right: this.props.cardRight,
      // width: 200,
    };
    // propStyles.top = 20;
    let color = {
      backgroundColor: this.props.color,
    }
    // console.log('propStyles:', propStyles);
    // if(DBG) console.log('this.state.unlocked:', this.state.unlocked);
    // if(DBG) console.log('this.props:', this.props);
    
    
    return(
      <List style={styles.cardHolder}>
        <Text style={{position: 'absolute', top: 5, right: 20}}>{this.state.gestureShield ? 'Shields up' : 'Shields down'}</Text>

        <Container pointerEvents='none' style={[styles.card, propStyles]} onLayout={(event) => {this.onLayout(event)}} >
          <Text>{this.props.title}</Text>
        </Container>


        <List style={styles.cardHolder}>
          {/* // pointerEvents='none'> */}
          <Animated.View style={[styles.card,
              propStyles,
              // styles.ghost,
              this.state.ghostStyle,
              this.state.pan.getLayout(),
            ]}
            onLayout={(e) => this.ghostLayout(e)}
            // pointerEvents={this.state.disableGhostPointer}
            // ref={(ref) => this.ghostRef = ref}
            ref="ghostRef"
            >

            <Text>{this.props.title}</Text>
            <Text>{this.state.unlocked ? 'Move me!' : 'Stuck'}</Text>

            
            <Container style={styles.cardGrab} {...this.panResponderMid.panHandlers} />
            <Container style={styles.topGrab} {...this.panResponderTop.panHandlers} />
            <Container style={styles.botGrab} {...this.panResponderBot.panHandlers} />
          </Animated.View>
        </List>
          {this.state.gestureShield? <List style={[styles.cardHolder]} /> : null}

      </List>
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
    // height: 500,
    // bottom: 10000,
    backgroundColor: 'transparent',
    // opacity: .5,
  },
  card: {
    position: 'absolute',
    // display: 'flex',
    // flex: 1,
    borderRadius: BORDER_RADIUS,
    // paddingLeft: PADDING_LEFT,
    // paddingTop: PADDING_VERT,
    // paddingBottom: PADDING_VERT,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: gStyle[theme].dark,
  },
  cardGrab: {
    ...StyleSheet.absoluteFillObject,
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