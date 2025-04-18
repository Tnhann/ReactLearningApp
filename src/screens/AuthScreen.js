import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
} from 'firebase/auth';
import { createOrUpdateUser } from '../services/firebaseService';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    if (isLoading) return;

    if (isSignUp && (!email || !password)) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifre girin');
      return;
    }

    setIsLoading(true);
    console.log('Authentication işlemi başlatılıyor...');

    try {
      let userCredential;

      if (isSignUp) {
        // Kayıt ol
        console.log('Kayıt olma işlemi başlatılıyor:', email);
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Kayıt olma başarılı:', userCredential.user.uid);
      } else if (email && password) {
        // Giriş yap
        console.log('Giriş yapma işlemi başlatılıyor:', email);
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Giriş yapma başarılı:', userCredential.user.uid);
      } else {
        // Anonim giriş
        console.log('Anonim giriş işlemi başlatılıyor');
        userCredential = await signInAnonymously(auth);
        console.log('Anonim giriş başarılı:', userCredential.user.uid);
      }

      // Kullanıcı bilgilerini Firestore'a kaydet
      if (userCredential.user) {
        console.log('Kullanıcı bilgileri Firestore\'a kaydediliyor:', userCredential.user.uid);
        const userData = {
          email: userCredential.user.email || 'anonymous',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };

        await createOrUpdateUser(userCredential.user.uid, userData);
        console.log('Kullanıcı bilgileri başarıyla kaydedildi');

        // Başarılı giriş mesajı
        Alert.alert(
          'Başarılı',
          isSignUp ? 'Hesabınız başarıyla oluşturuldu.' : 'Giriş başarılı.'
        );
      }
    } catch (error) {
      console.error('Authentication hatası:', error.code, error.message);
      let errorMessage = 'Bir hata oluştu';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Bu e-posta adresi zaten kullanılıyor';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Geçersiz e-posta adresi';
          break;
        case 'auth/weak-password':
          errorMessage = 'Şifre çok zayıf (en az 6 karakter olmalı)';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Şifre hatalı';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'İnternet bağlantısı hatası';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.';
          break;
        default:
          errorMessage = `Hata: ${error.message}`;
      }

      Alert.alert('Hata', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>React Native Öğrenme</Text>
        <Text style={styles.subtitle}>
          {isSignUp ? 'Hesap Oluştur' : 'Giriş Yap'}
        </Text>

        {isSignUp || (email && password) ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="E-posta"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Şifre"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleAuth}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isSignUp
                ? 'Kayıt Ol'
                : email && password
                ? 'Giriş Yap'
                : 'Misafir Olarak Devam Et'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsSignUp(!isSignUp)}
        >
          <Text style={styles.switchButtonText}>
            {isSignUp
              ? 'Zaten hesabınız var mı? Giriş yapın'
              : 'Hesabınız yok mu? Kayıt olun'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.testButton]}
          onPress={() => {
            // Test kullanıcısı ile giriş yap
            setEmail('test@example.com');
            setPassword('test123');
            setIsSignUp(false);
          }}
        >
          <Text style={styles.buttonText}>Test Kullanıcısı Bilgilerini Doldur</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
  testButton: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
  },
});

export default AuthScreen;
