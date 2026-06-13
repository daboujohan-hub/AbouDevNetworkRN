import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert
} from 'react-native';

const API = 'https://aboudevserver.onrender.com';

export default function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !password) return Alert.alert('Erreur', 'Remplis tous les champs');
    setLoading(true);
    try {
      const body = mode === 'register'
        ? { username, email, password }
        : { email, password };
      const res = await fetch(`${API}/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.error) return Alert.alert('Erreur', data.error);
      onLogin(data.token, data.user);
    } catch (e) {
      Alert.alert('Erreur', 'Connexion impossible au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AbouDev Network</Text>
      <Text style={styles.subtitle}>
        {mode === 'login' ? 'Connexion' : 'Créer un compte'}
      </Text>

      {mode === 'register' && (
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          placeholderTextColor="#7B8090"
          value={username}
          onChangeText={setUsername}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#7B8090"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#7B8090"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.btn} onPress={submit} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#0A0A0F" />
          : <Text style={styles.btnText}>
              {mode === 'login' ? 'SE CONNECTER' : "S'INSCRIRE"}
            </Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
        <Text style={styles.switchText}>
          {mode === 'login'
            ? "Pas de compte ? S'inscrire"
            : 'Déjà un compte ? Se connecter'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F', justifyContent: 'center', padding: 24 },
  logo: { color: '#00FF88', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: '#7B8090', fontSize: 16, textAlign: 'center', marginBottom: 32 },
  input: {
    backgroundColor: '#1A1A2E', color: '#FFFFFF', borderRadius: 10,
    padding: 14, marginBottom: 12, fontSize: 15,
    borderWidth: 1, borderColor: '#2A2A3E'
  },
  btn: {
    backgroundColor: '#00FF88', borderRadius: 10,
    padding: 16, alignItems: 'center', marginTop: 8, marginBottom: 16
  },
  btnText: { color: '#0A0A0F', fontWeight: 'bold', fontSize: 15 },
  switchText: { color: '#00FF88', textAlign: 'center', fontSize: 14 }
});
