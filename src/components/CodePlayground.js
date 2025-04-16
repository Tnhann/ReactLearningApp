import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const CodePlayground = ({ initialCode, expectedOutput, hint, onSuccess }) => {
  const [code, setCode] = useState(initialCode || '');
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const runCode = () => {
    try {
      // Basit kod çalıştırma - gerçek bir uygulama için daha güvenli bir yöntem kullanılmalı
      // Bu sadece basit JavaScript ifadelerini değerlendirebilir
      let result;
      
      // Kod içinde return ifadesi yoksa ekleyelim
      let codeToEvaluate = code;
      if (!code.includes('return')) {
        codeToEvaluate = `(function() { ${code}; return undefined; })()`;
      } else {
        codeToEvaluate = `(function() { ${code} })()`;
      }
      
      // Kodu çalıştır
      result = eval(codeToEvaluate);
      
      // Sonucu göster
      setOutput(JSON.stringify(result));
      
      // Beklenen çıktı ile karşılaştır
      const isMatch = JSON.stringify(result) === JSON.stringify(expectedOutput);
      setIsCorrect(isMatch);
      
      // Başarılı ise callback'i çağır
      if (isMatch && onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setOutput(`Hata: ${error.message}`);
      setIsCorrect(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode || '');
    setOutput('');
    setIsCorrect(false);
    setShowHint(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kod Alanı</Text>
      
      <ScrollView style={styles.codeContainer}>
        <TextInput
          style={styles.codeInput}
          multiline
          value={code}
          onChangeText={setCode}
          placeholder="Kodunuzu buraya yazın..."
        />
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <Button title="Çalıştır" onPress={runCode} color="#4CAF50" />
        <Button title="Sıfırla" onPress={resetCode} color="#f44336" />
        <Button 
          title={showHint ? "İpucunu Gizle" : "İpucu Göster"} 
          onPress={() => setShowHint(!showHint)} 
          color="#2196F3" 
        />
      </View>
      
      {showHint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>{hint}</Text>
        </View>
      )}
      
      <View style={styles.outputContainer}>
        <Text style={styles.outputTitle}>Çıktı:</Text>
        <Text style={[
          styles.outputText, 
          isCorrect ? styles.correctOutput : (output.includes('Hata') ? styles.errorOutput : {})
        ]}>
          {output || 'Henüz bir çıktı yok'}
        </Text>
        
        {isCorrect && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>Tebrikler! Doğru cevap!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  codeContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 4,
    padding: 8,
    maxHeight: 200,
  },
  codeInput: {
    color: '#ffffff',
    fontFamily: 'monospace',
    fontSize: 14,
    minHeight: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  hintContainer: {
    backgroundColor: '#fff3cd',
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
  },
  hintText: {
    color: '#856404',
  },
  outputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
  outputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  outputText: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
  correctOutput: {
    color: '#4CAF50',
  },
  errorOutput: {
    color: '#f44336',
  },
  successContainer: {
    backgroundColor: '#d4edda',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
  successText: {
    color: '#155724',
    fontWeight: 'bold',
  },
});

export default CodePlayground;
