import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AbouDev Network</Text>
      <Text style={styles.sub}>v1.0.0 - OK</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#00FF88', fontSize: 24, fontWeight: 'bold' },
  sub: { color: '#7B8090', fontSize: 14, marginTop: 8 }
});
