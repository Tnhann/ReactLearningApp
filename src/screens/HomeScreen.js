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
} from 'react-native';
import { learningTopics } from '../data/learningContent';
import { useRouter } from 'expo-router';
import { useProgress } from '../context/ProgressContext';
import ProgressTracker from '../components/ProgressTracker';

const HomeScreen = () => {
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const { completedTopics, completedExercises, quizScores, resetProgress } = useProgress();

  const renderItem = ({ item }) => {
    const isCompleted = completedTopics.includes(item.id);
    const hasQuizScore = quizScores[item.id];

    return (
      <TouchableOpacity
        style={[styles.topicCard, isCompleted && styles.completedTopicCard]}
        onPress={() => router.push(`/topic/${item.id}`)}
      >
        <View style={styles.topicContent}>
          <View style={styles.topicHeader}>
            <Text style={styles.topicTitle}>{item.title}</Text>
            {isCompleted && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>Tamamlandı</Text>
              </View>
            )}
          </View>
          <Text style={styles.topicDescription}>{item.description}</Text>

          {hasQuizScore && (
            <View style={styles.quizScoreContainer}>
              <Text style={styles.quizScoreText}>
                Quiz: {hasQuizScore.score}/{hasQuizScore.total} ({hasQuizScore.percentage}%)
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
  },
  quizScoreText: {
    fontSize: 12,
    color: '#1976d2',
  },
});

export default HomeScreen;
