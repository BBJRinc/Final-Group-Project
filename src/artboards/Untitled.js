import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
export default class Untitled extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Image
          source={require("../assets/yeshi-kangrang-342857-unsplash.jpg")}
          style={styles.image1}
        />
        <Text style={styles.text1}>Calendesk</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  image1: { width: 361.61, height: 642.94 },
  text1: {
    backgroundColor: "transparent",
    top: 112,
    left: 92,
    position: "absolute",
    lineHeight: 31,
    letterSpacing: 7,
    fontSize: 25,
    opacity: 1,
    fontFamily: "Silom",
    color: "rgba(74,144,226,1)"
  }
});
