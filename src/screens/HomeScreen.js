import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { learningTopics } from '../data/learningContent';
import { useRouter } from 'expo-router';
import { useProgress } from '../context/ProgressContext';
import ProgressTracker from '../components/ProgressTracker';
import AnimatedCard from '../components/AnimatedCard';
import AnimatedButton from '../components/AnimatedButton';
import CustomHeader from '../components/CustomHeader';

const HomeScreen = () => {
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const { completedTopics, completedExercises, quizScores, resetProgress } = useProgress();

  // Animasyon değerleri
  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 120],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <CustomHeader
        title="React Native Öğrenme"
        subtitle="Adım adım öğrenmeye başlayın"
        rightIcon="settings-outline"
        onRightPress={() => Alert.alert('Ayarlar', 'Ayarlar menüsü burada olacak')}
      />

      <View style={styles.actionButtons}>
        <AnimatedButton
          title={showProgress ? "Konuları Göster" : "İlerleme Durumu"}
          onPress={() => setShowProgress(!showProgress)}
          icon={<Ionicons name={showProgress ? "list" : "stats-chart"} size={18} color="#fff" />}
          type="primary"
          style={{ flex: 1, marginRight: 8 }}
        />

        <AnimatedButton
          title="İlerlemeyi Sıfırla"
          onPress={() => {
            Alert.alert(
              'İlerlemeyi Sıfırla',
              'Tüm ilerlemeniz sıfırlanacak. Emin misiniz?',
              [
                { text: 'İptal', style: 'cancel' },
                { text: 'Sıfırla', onPress: resetProgress, style: 'destructive' },
              ]
            );
          }}
          icon={<Ionicons name="refresh" size={18} color="#fff" />}
          type="danger"
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>

      {showProgress ? (
        <ProgressTracker
          topics={learningTopics}
          completedTopics={completedTopics}
          quizScores={quizScores}
          onTopicPress={(topicId) => router.push(`/topic/${topicId}`)}
        />
      ) : (
        <Animated.FlatList
          data={learningTopics}
          renderItem={({ item, index }) => {
            const isCompleted = completedTopics.includes(item.id);
            const hasQuizScore = quizScores[item.id];
            const previousTopicCompleted = index === 0 || completedTopics.includes(learningTopics[index - 1].id);
            const isLocked = index > 0 && !previousTopicCompleted;

            // İlerleme yüzdesini hesapla
            let progress = 0;
            if (isCompleted) {
              progress = 100;
            } else if (hasQuizScore) {
              progress = 66;
            } else if (completedExercises[item.id]?.length > 0) {
              progress = 33;
            }

            // Tamamlandı rozeti
            const completedBadge = isCompleted ? (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>Tamamlandı</Text>
              </View>
            ) : null;

            return (
              <AnimatedCard
                title={item.title}
                description={item.description}
                onPress={() => {
                  if (isLocked) {
                    Alert.alert(
                      'Konu Kilitli',
                      'Önceki konuyu tamamlamadan bu konuya geçemezsiniz.'
                    );
                  } else {
                    router.push(`/topic/${item.id}`);
                  }
                }}
                isCompleted={isCompleted}
                isLocked={isLocked}
                progress={progress}
                index={index}
                badge={completedBadge}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  completedBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  completedText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
