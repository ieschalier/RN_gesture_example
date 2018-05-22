import React, { Fragment } from 'react'
import { View } from 'react-native'

const Cursors = ({ children, enabled }) => (
  <View style={{ flex: 1, borderWidth: enabled ? 1 : 0, borderColor: 'grey' }}>
    {enabled && (
      <Fragment>
        <View
          style={{
            position: 'absolute',
            top: -5,
            left: -5,
            width: 10,
            height: 10,
            backgroundColor: 'green',
            borderRadius: 5,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -5,
            alignSelf: 'center',
            width: 10,
            height: 10,
            backgroundColor: 'green',
            borderRadius: 5,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: -5,
            right: -5,
            width: 10,
            height: 10,
            backgroundColor: 'green',
            borderRadius: 5,
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: -5,
            top: '50%',
            marginTop: -5,
            width: 10,
            height: 10,
            backgroundColor: 'green',
            borderRadius: 5,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: -5,
            right: -5,
            width: 10,
            height: 10,
            backgroundColor: 'green',
            borderRadius: 5,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: -5,
            alignSelf: 'center',
            width: 10,
            height: 10,
            backgroundColor: 'green',
            borderRadius: 5,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: -5,
            left: -5,
            width: 10,
            height: 10,
            backgroundColor: 'green',
            borderRadius: 5,
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: -5,
            top: '50%',
            marginTop: -5,
            width: 10,
            height: 10,
            backgroundColor: 'green',
            borderRadius: 5,
          }}
        />
      </Fragment>
    )}
    {children}
  </View>
)

export default Cursors
