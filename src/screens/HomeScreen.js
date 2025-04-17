import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Button,
  Alert,
} from 'react-native';
import { learningTopics } from '../data/learningContent';
import { useRouter } from 'expo-router';
import { useProgress } from '../context/ProgressContext';
import ProgressTracker from '../components/ProgressTracker';

const HomeScreen = () => {
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const { completedTopics, completedExercises, quizScores, resetProgress } = useProgress();

  const renderItem = ({ item, index }) => {
    const isCompleted = completedTopics.includes(item.id);
    const hasQuizScore = quizScores[item.id];
    const previousTopicCompleted = index === 0 || completedTopics.includes(learningTopics[index - 1].id);
    const isLocked = index > 0 && !previousTopicCompleted;

    return (
      <TouchableOpacity
        style={[
          styles.topicCard,
          isCompleted && styles.completedTopicCard,
          isLocked && styles.lockedTopicCard
        ]}
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
      >
        <View style={styles.topicContent}>
          <View style={styles.topicHeader}>
            <Text style={[styles.topicTitle, isLocked && styles.lockedText]}>
              {index + 1}. {item.title}
              {isLocked && ' 🔒'}
            </Text>
            {isCompleted && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>Tamamlandı</Text>
              </View>
            )}
          </View>
          <Text style={[styles.topicDescription, isLocked && styles.lockedText]}>{item.description}</Text>

          {hasQuizScore && (
            <View style={styles.quizScoreContainer}>
              <Text style={styles.quizScoreText}>
                Quiz: {hasQuizScore.score}/{hasQuizScore.total} ({hasQuizScore.percentage}%)
              </Text>
            </View>
          )}

          {isCompleted && (
            <View style={styles.progressIndicator}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '100%' }]} />
              </View>
              <Text style={styles.progressText}>100% Tamamlandı</Text>
            </View>
          )}

          {!isCompleted && !isLocked && (
            <View style={styles.progressIndicator}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: hasQuizScore ? '66%' : (completedExercises[item.id]?.length > 0 ? '33%' : '0%') }
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {hasQuizScore ? 'Quiz tamamlandı, konu tamamlanmadı' :
                  (completedExercises[item.id]?.length > 0 ? 'Alıştırmalar başlandı' : 'Başlanmadı')}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>React Native Öğrenme</Text>
        <Text style={styles.headerSubtitle}>
          React Native'i adım adım öğrenmek için başlayın
        </Text>
        <View style={styles.headerButtons}>
          <Button
            title={showProgress ? "Konuları Göster" : "İlerleme Durumu"}
            onPress={() => setShowProgress(!showProgress)}
          />
          <Button
            title="İlerlemeyi Sıfırla"
            onPress={resetProgress}
            color="#f44336"
          />
        </View>
      </View>

      {showProgress ? (
        <ProgressTracker
          topics={learningTopics}
          completedTopics={completedTopics}
          quizScores={quizScores}
          onTopicPress={(topicId) => router.push(`/topic/${topicId}`)}
        />
      ) : (
        <FlatList
          data={learningTopics}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
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
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  listContainer: {
    padding: 16,
  },
  topicCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedTopicCard: {
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  lockedTopicCard: {
    backgroundColor: '#f5f5f5',
    borderLeftWidth: 4,
    borderLeftColor: '#9e9e9e',
    opacity: 0.8,
  },
  topicContent: {
    padding: 16,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  topicDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  lockedText: {
    color: '#9e9e9e',
  },
  completedBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  completedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quizScoreContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 4,
    padding: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  quizScoreText: {
    fontSize: 12,
    color: '#1976d2',
  },
  progressIndicator: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
});

export default HomeScreen;
