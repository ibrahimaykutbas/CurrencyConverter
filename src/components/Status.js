import { View, StatusBar } from 'react-native';
import React from 'react';

import { colors } from '../theme/Index';

const Status = () => {
  return (
    <View style={{ backgroundColor: colors.LT_BLUE, flex: 0.07 }}>
      <StatusBar barStyle="dark-content" />
    </View>
  );
};

export default Status;
