import React from 'react'
import { View } from 'react-native'

import addInteractions from '../helper/addInteractions'

const Square = ({ enabled }) => (
  <View
    style={{
      flex: 1,
      borderRadius: 50,
      backgroundColor: enabled ? '#584' : '#5846',
    }}
  />
)

export default addInteractions(Square)
