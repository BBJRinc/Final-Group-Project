import React from 'react';
import { StyleSheet, Animated, PanResponder } from 'react-native'
import { Text, Container, Content, List } from 'native-base';
import NativeMethodsMixin from 'NativeMethodsMixin';

import gStyle from './../gStyle.js';

let theme = 'brown';
let testTheme = global.theme

// 
const GHOST_OPACITY = 0.4;
const BORDER_RADIUS = 5;
const PADDING_VERT = 5;
const PADDING_LEFT = 10;
const GRABBER_HEIGHT = 10;

const LONG_PRESS_TIME = 100;

const DBG = false;
// const DBG = false;
const DBG_GHOST = false;
// const GRABBER_BACKGROUND = 'rgba(0, 255, 0, .3)';
const GRABBER_BACKGROUND = 'rgba(0, 0, 0, 0)';

const LONG_PRESS_STYLE = 'rgba(255, 255, 255, 0.5)';

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
      zIndexVal: {zIndex: 0},
      unlocked: false,
      gestureShield: false,
      pan: new Animated.ValueXY(),
      ghostStyle: {
        opacity: GHOST_OPACITY,
      },
      longPressStyle: {
        backgroundColor: 'rgba(0 ,0, 0, 0)'
      }
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
  
      onPanResponderGrant: (e, gestureState) => {
        this.startResizeGesture();
        this.state.pan.setValue({y: this.props.cardTop})
        this.state.pan.setOffset({y: 0})
        if(DBG) console.log('this.ghostTop:', this.ghostTop);
      },
      
      onPanResponderMove: (e, gestureState) => {
        // if(DBG) console.log('e.nativeEvent.locationY:', e.nativeEvent.locationY);
        
        let newTop = Math.max(0, e.nativeEvent.locationY)
        let newHeight = Math.max(this.props.segmentHeight, (this.props.cardTop - e.nativeEvent.locationY) + this.props.cardHeight)
        if(DBG) console.log('newTop:', newTop);
        
        // if(DBG) console.log('newHeight:', newHeight);
        
        this.setState({ghostStyle: {...this.state.ghostStyle, height: newHeight}})

        this.state.pan.setValue({y: newTop})
        
      },
  
      onPanResponderTerminate: (e, gestureState) => {
        this.endResizeGesture();
      },
  
      onPanResponderRelease: (e, gestureState) => {
        this.endResizeGesture();
        this.state.pan.flattenOffset();
        let newTop = Math.max(0, e.nativeEvent.locationY)
        let newHeight = Math.max(this.props.segmentHeight, (this.props.cardTop - e.nativeEvent.locationY) + this.props.cardHeight)
        this.props.setNewTimes(this.props.id, newTop, newHeight);
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
        if(DBG) console.time('long press');
        this.pressTimer = setTimeout(() => {
          if(DBG) console.timeEnd('long press');
          this.tap = false;
          // this.showGhost();
          this.setState({
            unlocked: true,
            longPressStyle: { backgroundColor: LONG_PRESS_STYLE }
          })
          this.setZIndex()
          this.props.scrollable(false);
          this.state.pan.setValue({x: this.props.cardLeft, y: this.props.cardTop})
          this.state.pan.setOffset({x: this.animatedValueX, y: this.animatedValueY})
          if(DBG) console.log('moveAction set to true');
          
        }, LONG_PRESS_TIME)
      },

      onPanResponderMove: (e, gestureState) => {
        if(this.state.unlocked) {
          // this.blockNative();
          Animated.event([null,
            {
              dx: this.state.pan.x,
              dy: this.state.pan.y,
            }]
          )(e, gestureState)
        } else {
          this.tap = false;
          clearTimeout(this.pressTimer);
          // return false;
        }
      },

      onPanResponderTerminate: (e, gestureState) => {
        this.endMoveGesture();
        clearTimeout(this.pressTimer);
      },
  
      onPanResponderRelease: (e, gestureState) => {
        clearTimeout(this.pressTimer);
        if(this.tap) {
          this.tapAction();
        } else {
          this.endMoveGesture();
          this.state.pan.setValue({x: 0, y: 0})
          this.state.pan.flattenOffset();
          this.props.setNewTimes(this.props.id, this.ghostTop);
        }
      }
    });
  }

  endMoveGesture() {
    // if(!DBG_GHOST) this.hideGhost();
    this.props.scrollable(true);
    this.setState({
      unlocked: false,
      longPressStyle: { backgroundColor: 'rgba(0, 0, 0, 0)'}
    });
    if(DBG) console.timeEnd('long press');
    // if(DBG) console.log('this.pressTimer:', this.pressTimer);
    this.clearZIndex()
  }

  endResizeGesture() {
    // if(!DBG_GHOST) this.hideGhost();
    this.setState({gestureShield: false});
    this.clearZIndex()
    // if(DBG) console.log('this.state:', this.state);
      
    // this.setState({ghostStyle: {opacity: 1}});
  }

  startResizeGesture() {
    // this.showGhost();
    this.setState({gestureShield: true});
    this.setZIndex()
    // this.state.pan.setValue({y: this.props.cardTop})
    // this.state.pan.setOffset({y: 0});
  }

  setZIndex() {
    // this.setState({zIndexVal: {zIndex: 100}})
  }

  clearZIndex() {
    // this.setState({zIndexVal: {zIndex: 0}})
  }

  showGhost() {
    if(DBG) console.log('!!!!!!!!!!!showGhost called');
    
    this.setState({ghostStyle: {...this.state.ghostStyle, opacity: GHOST_OPACITY}});
  }

  hideGhost() {
    if(DBG) console.log('hideGhost Called');
    
    this.setState({ghostStyle: {...this.state.ghost, opacity: 0}})
    if(DBG) console.log('this.state:', this.state);
    
  }

  tapAction() {
    if(DBG) console.log('There was a tap!');
    if(DBG) console.timeEnd('long press');
    this.props.onTaskPress(this.props.fullTask);
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
    if(DBG) 
    
    
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
    if (DBG) console.log('Layout:', event.nativeEvent.layout);
    let ghostDimensions = {
      ...this.state.ghostStyle,
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    }
    this.setState({ghostStyle: {...this.state.ghostStyle, ...ghostDimensions}})
  }

  ghostLayout(e) {
    if(DBG) console.log('e.nativeEvent:', e.nativeEvent);
    
    this.ghostTop = e.nativeEvent.layout.y
    // if(DBG) console.log('this.ghostTop:', this.ghostTop);
    this.ghostBottom = this.ghostTop + e.nativeEvent.layout.height
    // if(DBG) console.log('this.ghostTop:', this.ghostTop);
    if(DBG) console.log('this.ghostTop:', this.ghostTop);
    
    if(DBG) console.log('this.ghostTop+e.nativeEvent.layout.height:', this.ghostTop+e.nativeEvent.layout.height);
    
    
    
  }

  render() {
    let propStyles = {
      backgroundColor: this.props.color,
      top: this.props.cardTop,
      height:  this.props.cardHeight,
      left: this.props.cardLeft,
      right: this.props.cardRight,
    };
    let color = {
      backgroundColor: this.props.color,
    }
    
    
    return(
      <List style={[styles.cardHolder,
           {/* this.state.zIndexVal */}
        ]}
        onPress={() => console.log(this.props.title)}>

        {/*-----------------------------------------------------------------------------
        ------Debugging infobox---------------------------------------------------------
        ------------------------------------------------------------------------------*/}
        {false? 
          <Container style={{position: 'absolute',
              top: 5,
              right: 20,
              display: 'flex',
              flex: 0}}>
            <Text style={styles.debugText}>{this.props.title}</Text>
            <Text style={styles.debugText}>{this.state.gestureShield ?
              'Shields up' : 'Shields down'}</Text>
            <Text style={styles.debugText}>{this.props.scrollable ?
              'Scrollable' : 'Scroll Locked'}</Text>
            <Text style={styles.debugText}>{this.state.zIndexVal.zIndex}</Text>
          </Container>
          : null
        }

        {/*------------------------------------------------------------------------------
        -----Original display task card--------------------------------------------------
        ------------------------------------------------------------------------------*/}
        <Container pointerEvents='none'
            style={[styles.card, propStyles]}
            onLayout={(event) => {this.onLayout(event)}} >
          <Container style={this.state.longPressStyle}>
            <Text>{this.props.title}</Text>
          </Container>
        </Container>

        {/*------------------------------------------------------------------------------
        -----Ghost display---------------------------------------------------------------
        ------------------------------------------------------------------------------*/}
        {/* <List style={styles.cardHolder}
        onPress={() => console.log(this.props.title)}> */}
          {/* // pointerEvents='none'> */}
          <Animated.View
              style={[styles.card,
                propStyles,
                // styles.ghost,
                this.state.ghostStyle,
                this.state.pan.getLayout(),
              ]}
              onPress={() => console.log(this.props.title)}
              onLayout={(e) => this.ghostLayout(e)}
              // pointerEvents={this.state.disableGhostPointer}
              // ref={(ref) => this.ghostRef = ref}
              ref="ghostRef"
              >

            <Text>{this.props.title}</Text>
            {DBG_GHOST? <Text>{this.state.unlocked ? 'Move me!' : 'Stuck'}</Text> : null}

            
            <Container style={styles.cardGrab} {...this.panResponderMid.panHandlers} />
            <Container style={styles.topGrab} {...this.panResponderTop.panHandlers} />
            <Container style={styles.botGrab} {...this.panResponderBot.panHandlers} />
          </Animated.View>
        {/* </List> */}
        {this.state.gestureShield? <List style={[styles.gestureShield]} /> : null}

      </List>
    )
  }
}

export default TaskCard;




let styles = StyleSheet.create({
  cardHolder: { 
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'transparent',
  },
  gestureShield: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  card: {
    position: 'absolute',
    // borderRadius: BORDER_RADIUS,
    // borderStyle: 'solid',
    // borderWidth: 2,
    // borderColor: gStyle[theme].dark,
    paddingTop: PADDING_VERT,
    paddingBottom: PADDING_VERT,
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
  },
  topGrab: {
    backgroundColor: GRABBER_BACKGROUND,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: GRABBER_HEIGHT,
  },
  botGrab: {
    backgroundColor: GRABBER_BACKGROUND,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: GRABBER_HEIGHT,
  },
  debugText: {
    backgroundColor: 'black',
    color: 'grey'
  }
})