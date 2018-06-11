import React, { PureComponent } from 'react';
import { Animated, Keyboard, Easing } from 'react-native';

export default class KeyboardListener extends PureComponent {
  state = {
    animatedValue: new Animated.Value(0),
    keyboardHeight: 226
  };

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    );
    this.keyboarWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboarWillHideListener.remove();
  }

  handleKeyboardAnimation(val = 1, duration) {
    Animated.timing(this.state.animatedValue, {
      toValue: val,
      duration: duration,
      easing: Easing.keyboard,
      useNativeDriver: true
    }).start();
  }

  keyboardWillShow = args => {
    const { duration, endCoordinates: { height: keyboardHeight } } = args;
    const { onKeyboardShow } = this.props;
    this.setState(
      {
        keyboardHeight
      },
      () => this.handleKeyboardAnimation(1, duration)
    );
    onKeyboardShow && onKeyboardShow(args);
  };

  keyboardWillHide = args => {
    const { onKeyboardHide } = this.props;
    this.handleKeyboardAnimation(0, args.duration);
    onKeyboardHide && onKeyboardHide(args);
  };

  render() {
    const { keyboardHeight, animatedValue } = this.state;
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -keyboardHeight]
    });
    return (
      <Animated.View
        style={{
          transform: [{ translateY }]
        }}
      >
        {this.props.children(this.state, this.props)}
      </Animated.View>
    );
  }
}
