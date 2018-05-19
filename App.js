import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { State, PinchGestureHandler } from 'react-native-gesture-handler'

export default class App extends React.Component {
  baseScale = new Animated.Value(1)
  pinchScale = new Animated.Value(1)
  scale = Animated.multiply(this.baseScale, this.pinchScale)
  lastScale = 1

  onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: this.pinchScale } }],
    { useNativeDriver: true },
  )

  handlePinchHandlerStateChange = ev => {
    if (ev.nativeEvent.oldState === State.ACTIVE) {
      this.lastScale *= ev.nativeEvent.scale
      this.baseScale.setValue(this.lastScale)
      this.pinchScale.setValue(1)
    }
  }

  render() {
    return (
      <PinchGestureHandler
        onGestureEvent={this.onPinchGestureEvent}
        onHandlerStateChange={this.handlePinchHandlerStateChange}
      >
        <Animated.View
          style={[styles.container, { transform: [{ scale: this.scale }] }]}
        >
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
        </Animated.View>
      </PinchGestureHandler>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
