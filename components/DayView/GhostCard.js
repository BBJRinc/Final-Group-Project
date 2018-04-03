import React from 'react';
import { StyleSheet, Animated, PanResponder } from 'react-native';
import { Text, Container } from 'native-base';

import gStyle from './../gStyle.js';

let theme = 'blue';

class GhostCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
    }

  }

  componentWillMount() {
    this.animatedValueX = 0;
    this.animatedValueY = 0;
    this.state.pan.x.addListener((value) => this.animatedValueX = value.value);
    this.state.pan.y.addListener((value) => this.animatedValueY = value.value);

    this.panResponder = PanResponder.create({

      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      // onStartShouldSetPanResponder: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        // this.state.pan.setOffset({x: this.animatedValueX, y: this.animatedValueY});
        // this.state.pan.setValue({x: 0, y: 0});
        // console.log('Space Ghost Coast to Coast');
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

}