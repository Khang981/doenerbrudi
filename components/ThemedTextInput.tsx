import React from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text'); 

  return (
    <TextInput
      style={[
        { 
          color, 
          backgroundColor: useThemeColor({ light: lightColor ? 'white' : '#1e1e1e', dark: darkColor ? 'black' : '#333' }, 'background'), 
          borderColor: useThemeColor({ light: lightColor ? '#ccc' : '#555', dark: darkColor ? '#888' : '#444' }, 'border'), 
          padding: 10,
        },
        styles.default, 
        style, 
      ]}
      placeholderTextColor={useThemeColor({ light: lightColor ? '#aaa' : '#777', dark: darkColor ? '#666' : '#999' }, 'placeholder')}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24, 
  },
});