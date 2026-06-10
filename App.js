import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StatusBar, StyleSheet, ActivityIndicator
} from 'react-native';

export default function App() {
  const [devices, setDevices] = useState([
    { id: '1', ip: '192.168.1.1', name: 'Routeur', mac: 'AA:BB:CC:DD:EE:01', type: '📡', online: true },
    { id: '2', ip: '192.168.1.100', name: 'Mon téléphone', mac: 'AA:BB:CC:DD:EE:02', type: '📱', online: true },
  ]);
  const [scanning, setScanning] = useState(false);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 3000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0F" />

      <View style={styles.header}>
        <Text style={styles.title}>AbouDev Network</Text>
        <Text style={styles.status}>● EN LIGNE</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{devices.length}</Text>
          <Text style={styles.statLabel}>Appareils</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#FF3C3C' }]}>0</Text>
          <Text style={styles.statLabel}>Alertes</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.scanBtn} onPress={startScan}>
        {scanning
          ? <ActivityIndicator color="#0A0A0F" />
          : <Text style={styles.scanBtnText}>⟳ SCANNER LE RÉSEAU</Text>
        }
      </TouchableOpacity>

      <Text style={styles.sectionLabel}>APPAREILS DÉTECTÉS</Text>

      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceCard}>
            <Text style={styles.deviceIcon}>{item.type}</Text>
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>{item.name}</Text>
              <Text style={styles.deviceIp}>{item.ip}</Text>
              <Text style={styles.deviceMac}>{item.mac}</Text>
            </View>
            <Text style={[styles.dot, { color: item.online ? '#00FF88' : '#7B8090' }]}>●</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 48 },
  title: { color: '#00FF88', fontSize: 20, fontWeight: 'bold' },
  status: { color: '#00FF88', fontSize: 12 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16, gap: 12 },
  statCard: { flex: 1, backgroundColor: '#1A1A2E', borderRadius: 12, padding: 16 },
  statNumber: { color: '#00FF88', fontSize: 32, fontWeight: 'bold' },
  statLabel: { color: '#7B8090', fontSize: 12 },
  scanBtn: { backgroundColor: '#00FF88', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 8, alignItems: 'center' },
  scanBtnText: { color: '#0A0A0F', fontWeight: 'bold', fontSize: 14 },
  sectionLabel: { color: '#7B8090', fontSize: 11, marginLeft: 16, marginBottom: 8, letterSpacing: 1 },
  deviceCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A2E', marginHorizontal: 16, marginBottom: 8, borderRadius: 12, padding: 16 },
  deviceIcon: { fontSize: 24, marginRight: 12 },
  deviceInfo: { flex: 1 },
  deviceName: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  deviceIp: { color: '#00FF88', fontSize: 12 },
  deviceMac: { color: '#7B8090', fontSize: 11 },
  dot: { fontSize: 16 },
});
