# React-Native-Keyboard-Sticky-View
React Native keyboard sticky view with animation

![Demo](https://user-images.githubusercontent.com/3721734/41261527-bc714c26-6de4-11e8-9b3b-3e55fa512596.gif)


```javascript
import React from 'react';
import { TouchableOpacity, StyleSheet, View, TextInput, Text } from 'react-native';
import KeyboardStickyView from 'react-native-keyboard-sticky-view';

export default class KeyboardStickyViewExample extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textinputWrapper}>
          <TextInput />
        </View>
        <KeyboardStickyView
          onKeyboardShow={f => f}
          onKeyboardHide={f => f}
        >
          { (state, props) => (
            <TouchableOpacity style={styles.btn}>
              <Text>Click</Text>
            </TouchableOpacity>
          )}
        </KeyboardStickyView>
      </View>
    )
  }
}
```
