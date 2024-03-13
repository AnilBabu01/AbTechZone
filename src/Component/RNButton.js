import React from 'react';
import {Button} from 'react-native-paper';
import {primary, Colors} from '../utils/Colors';

const RNButton = props => {
  const {children, ...rest} = props;
  return (
    <Button
      mode="contained"
      buttonColor={primary}
      labelStyle={{
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 20,
        textTransform: 'uppercase',
        color: Colors.white,
      }}
      contentStyle={{paddingVertical: 5}}
      onPress={() => console.log('Pressed')}
      {...rest}>
      {children}
    </Button>
  );
};

export default RNButton;
