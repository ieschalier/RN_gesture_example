import React, { Component, createRef } from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types'
import {
  PanGestureHandler,
  PinchGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler'

const addInteractions = WrappedComponent => {
  return class ComponentWithInteractions extends Component {
    static propTypes = {
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }),
      size: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      }),
    }

    static defaultProps = {
      position: {
        x: 30,
        y: 30,
      },
      size: {
        width: 50,
        height: 50,
      },
    }

    state = {
      enabled: false,
      position: this.props.position,
      size: this.props.size,
    }

    baseScale = new Animated.Value(1)
    pinchScale = new Animated.Value(1)
    scale = Animated.multiply(this.baseScale, this.pinchScale, this.props.scale)
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
    onTranslateGestureEvent = ev => {
      this.translateX.setValue(ev.nativeEvent.translationX * this.lastScale)
      this.translateY.setValue(ev.nativeEvent.translationY * this.lastScale)
    }

    handleTranslationStateChange = ev => {
      if (ev.nativeEvent.oldState === State.ACTIVE) {
        this.lastOffset.x += ev.nativeEvent.translationX * this.lastScale
        this.lastOffset.y += ev.nativeEvent.translationY * this.lastScale
        this.translateX.setOffset(this.lastOffset.x)
        this.translateX.setValue(0)
        this.translateY.setOffset(this.lastOffset.y)
        this.translateY.setValue(0)
      }
    }

    enableGesture = () => {
      const { canTakeControl, takeControl } = this.props
      if (canTakeControl) {
        takeControl(() => this.setState({ enabled: false }))
        this.setState({ enabled: true })
      }
    }

    render() {
      const { enabled, position, size } = this.state
      return (
        <TapGestureHandler
          onHandlerStateChange={this.enableGesture}
          enabled={!enabled}
        >
          <PanGestureHandler
            ref={this.panRef}
            onGestureEvent={this.onTranslateGestureEvent}
            onHandlerStateChange={this.handleTranslationStateChange}
            enabled={enabled}
          >
            <PinchGestureHandler
              ref={this.pinchRef}
              onGestureEvent={this.onPinchGestureEvent}
              onHandlerStateChange={this.handlePinchHandlerStateChange}
              enabled={enabled}
            >
              <Animated.View
                style={{
                  position: 'absolute',
                  top: position.y,
                  left: position.x,
                  width: size.width,
                  height: size.height,
                  transform: [
                    { translateX: this.translateX },
                    { translateY: this.translateY },
                    { scale: this.scale },
                  ],
                }}
              >
                <WrappedComponent enabled={enabled} />
              </Animated.View>
            </PinchGestureHandler>
          </PanGestureHandler>
        </TapGestureHandler>
      )
    }
  }
}

export default addInteractions
