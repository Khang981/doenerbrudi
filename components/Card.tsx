import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, content }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{content}</Text>
          <Text>test</Text>
        </View>
      </View>
 
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ff8380',
    borderRadius: 8,
    elevation: 5, // Für Android-Schatten
    margin: 16,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 16,
  },
});

export default Card;