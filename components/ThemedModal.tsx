import React from 'react';
import { Modal, View, StyleSheet, type ModalProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedModalProps = ModalProps & {
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
  contentContainerStyle?: any; // Style für den Inhalt der Modal
};

export function ThemedModal({
  style,
  lightBackgroundColor,
  darkBackgroundColor,
  contentContainerStyle, // Neuer Prop für den Inhalt
  ...rest
}: ThemedModalProps) {
  const backgroundColor = useThemeColor({ light: lightBackgroundColor || 'white', dark: darkBackgroundColor || 'black' }, 'background');

  return (
    <Modal
      style={[
        style, // Äußere Modal-Styles
      ]}
      {...rest} // Alle anderen Props (animationType, transparent, visible, onRequestClose, etc.)
    >
      <View style={[styles.modalContainer, { backgroundColor }]}> Container für den gesamten Modal-Inhalt
        <View style={[styles.modalContent, contentContainerStyle]}> Inhalt der Modal 
          {rest.children}
         </View>
      </View> 
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between', 
    paddingTop: 10,
  },
  modalContent: {
    backgroundColor: 'transparent', // Wichtig: Damit der Hintergrund des Containers durchscheint
  },
});