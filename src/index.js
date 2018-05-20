import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native'
import {
  State,
  PinchGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo//vector-icons'
import Components from './Components'

export default class App extends React.Component {
  state = {
    enabled: true,
  }

  baseScale = new Animated.Value(1)
  pinchScale = new Animated.Value(1)
  scale = Animated.multiply(this.baseScale, this.pinchScale)
  lastScale = 1

  onPinchGestureEvent = Animated.event([
    { nativeEvent: { scale: this.pinchScale } },
  ])

  handlePinchHandlerStateChange = ev => {
    if (ev.nativeEvent.oldState === State.ACTIVE) {
      this.lastScale *= ev.nativeEvent.scale
      this.baseScale.setValue(this.lastScale)
      this.pinchScale.setValue(1)
    }
  }

  translateX = new Animated.Value(0)
  translateY = new Animated.Value(0)
  lastOffset = { x: 0, y: 0 }
  onTranslateGestureEvent = Animated.event([
    {
      nativeEvent: {
        translationX: this.translateX,
        translationY: this.translateY,
      },
    },
  ])

  handleTranslationStateChange = ev => {
    if (ev.nativeEvent.oldState === State.ACTIVE) {
      this.lastOffset.x += ev.nativeEvent.translationX
      this.lastOffset.y += ev.nativeEvent.translationY
      this.translateX.setOffset(this.lastOffset.x)
      this.translateX.setValue(0)
      this.translateY.setOffset(this.lastOffset.y)
      this.translateY.setValue(0)
    }
  }

  onCancel = undefined

  takeControl = onCancel => {
    this.setState({ enabled: false })
    this.onCancel = onCancel
  }

  cancelControl = () => {
    if (this.onCancel) {
      this.setState({ enabled: true })
      this.onCancel()
      this.onCancel = undefined
    }
  }

  render() {
    const { enabled } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: 'grey' }}>
        <PanGestureHandler
          onGestureEvent={this.onTranslateGestureEvent}
          onHandlerStateChange={this.handleTranslationStateChange}
          enabled={enabled}
        >
          <PinchGestureHandler
            onGestureEvent={this.onPinchGestureEvent}
            onHandlerStateChange={this.handlePinchHandlerStateChange}
            enabled={enabled}
          >
            <Animated.View
              style={[
                styles.container,
                {
                  transform: [
                    { scale: this.scale },
                    { translateX: this.translateX },
                    { translateY: this.translateY },
                  ],
                },
              ]}
            >
              <Components.square
                position={{
                  x: Dimensions.get('window').width / 2 - 25,
                  y: Dimensions.get('window').height / 2 - 25,
                }}
                takeControl={this.takeControl}
                canTakeControl={enabled}
              />
              <Components.round
                size={{ width: 100, height: 100 }}
                takeControl={this.takeControl}
                canTakeControl={enabled}
              />
            </Animated.View>
          </PinchGestureHandler>
        </PanGestureHandler>
        {!enabled && (
          <TouchableOpacity
            onPress={this.cancelControl}
            style={{ position: 'absolute', top: 30, right: 30 }}
          >
            <MaterialIcons size={40} name="cancel" />
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
})
