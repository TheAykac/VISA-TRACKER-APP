import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import Text from 'components/Text';
import c from 'themesScope/colors';

export function Button({testID, disabled, text, height, width, style, onPress, textSize, fontFamily, bold, textColor, loader}) {
  return (
    <TouchableOpacity testID={testID} disabled={disabled} style={{...s.btn, width: width, height: height, ...style}} onPress={onPress}>
      {!loader ? (
        <Text size={textSize} fontFamily={fontFamily} bold={bold} color={textColor}>
          {text}
        </Text>
      ):(
        <ActivityIndicator size={"small"} color={c.white}/>
      )}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  text: PropTypes.string,
  onPress: PropTypes.func,
  height: PropTypes.number,
  disabled: PropTypes.bool,
  testID: PropTypes.string,
  style: PropTypes.object,
  loader: PropTypes.bool,
};

Button.defaultProps = {
  size: false,
  fontFamily: '',
  bold: false,
  textColor: false,
  loader: false
};

const s = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;


