import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AcademyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎓 Академия Феникса</Text>
      <Text style={styles.subtext}>Место мудрости и духовного роста</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000814',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#00FF88',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtext: {
    color: '#94A3B8',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
