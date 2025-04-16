import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from 'react-native';
import { learningTopics } from '../data/learningContent';
import { exercises } from '../data/exercises';
import { quizzes } from '../data/quizzes';
import { useRouter } from 'expo-router';
import CodePlayground from '../components/CodePlayground';
import QuizComponent from '../components/QuizComponent';
import { useProgress } from '../context/ProgressContext';

const TopicDetailScreen = ({ topicId }) => {
  const router = useRouter();
  const [topic, setTopic] = useState(null);
  const [activeTab, setActiveTab] = useState('content'); // 'content', 'exercises', 'quiz'
  const [topicExercises, setTopicExercises] = useState([]);
  const [topicQuiz, setTopicQuiz] = useState(null);
  const {
    completedTopics,
    completedExercises,
    quizScores,
    markTopicAsCompleted,
    markExerciseAsCompleted,
    saveQuizScore
  } = useProgress();

  useEffect(() => {
    const selectedTopic = learningTopics.find((t) => t.id === topicId);
    setTopic(selectedTopic);

    // Konuya ait alıştırmaları yükle
    const topicExercises = exercises[topicId] || [];
    setTopicExercises(topicExercises);

    // Konuya ait quiz'i yükle
    const topicQuiz = quizzes[topicId] || null;
    setTopicQuiz(topicQuiz);
  }, [topicId]);

  if (!topic) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  // Markdown benzeri içeriği basit bir şekilde işleme
  const renderContent = () => {
    const lines = topic.content.split('\n');

    return lines.map((line, index) => {
      // Başlıklar
      if (line.startsWith('# ')) {
        return (
          <Text key={index} style={styles.heading1}>
            {line.substring(2)}
          </Text>
        );
      } else if (line.startsWith('## ')) {
        return (
          <Text key={index} style={styles.heading2}>
            {line.substring(3)}
          </Text>
        );
      } else if (line.startsWith('- ')) {
        // Liste öğeleri
        return (
          <View key={index} style={styles.listItemContainer}>
            <Text style={styles.listItemBullet}>•</Text>
            <Text style={styles.listItemText}>{line.substring(2)}</Text>
          </View>
        );
      } else if (line.startsWith('```')) {
        // Kod blokları için basit bir işleme
        return (
          <View key={index} style={styles.codeBlock}>
            <Text style={styles.codeText}>{line}</Text>
          </View>
        );
      } else {
        // Normal paragraflar
        return (
          <Text key={index} style={styles.paragraph}>
            {line}
          </Text>
        );
      }
    });
  };

  // Alıştırma tamamlandığında çağrılacak fonksiyon
  const handleExerciseComplete = (exerciseId) => {
    markExerciseAsCompleted(topicId, exerciseId);

    // Tüm alıştırmalar tamamlandıysa konuyu tamamlandı olarak işaretle
    const completedExercisesForTopic = completedExercises[topicId] || [];
    if (completedExercisesForTopic.length === topicExercises.length) {
      markTopicAsCompleted(topicId);
    }
  };

  // Quiz tamamlandığında çağrılacak fonksiyon
  const handleQuizComplete = (score, total) => {
    saveQuizScore(topicId, score, total);

    // Quiz başarılıysa konuyu tamamlandı olarak işaretle
    if (score / total >= 0.7) { // %70 başarı oranı
      markTopicAsCompleted(topicId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'content' && styles.activeTabButton]}
          onPress={() => setActiveTab('content')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'content' && styles.activeTabButtonText]}>İçerik</Text>
        </TouchableOpacity>

        {topicExercises.length > 0 && (
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'exercises' && styles.activeTabButton]}
            onPress={() => setActiveTab('exercises')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'exercises' && styles.activeTabButtonText]}>Alıştırmalar</Text>
          </TouchableOpacity>
        )}

        {topicQuiz && (
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'quiz' && styles.activeTabButton]}
            onPress={() => setActiveTab('quiz')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'quiz' && styles.activeTabButtonText]}>Quiz</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        {activeTab === 'content' && (
          <View style={styles.content}>{renderContent()}</View>
        )}

        {activeTab === 'exercises' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Alıştırmalar</Text>
            {topicExercises.map((exercise) => {
              const isCompleted = (completedExercises[topicId] || []).includes(exercise.id);

              return (
                <View key={exercise.id} style={styles.exerciseContainer}>
                  <View style={styles.exerciseHeader}>
                    <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                    {isCompleted && (
                      <View style={styles.completedBadge}>
                        <Text style={styles.completedText}>Tamamlandı</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.exerciseDescription}>{exercise.description}</Text>

                  <CodePlayground
                    initialCode={exercise.initialCode}
                    expectedOutput={exercise.expectedOutput}
                    hint={exercise.hint}
                    onSuccess={() => handleExerciseComplete(exercise.id)}
                  />
                </View>
              );
            })}
          </View>
        )}

        {activeTab === 'quiz' && topicQuiz && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>{topicQuiz.title}</Text>
            <QuizComponent
              questions={topicQuiz.questions}
              onComplete={handleQuizComplete}
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.navigationButtons}>
        {parseInt(topic.id) > 1 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() =>
              router.push(`/topic/${(parseInt(topic.id) - 1).toString()}`)
            }
          >
            <Text style={styles.navButtonText}>Önceki Konu</Text>
          </TouchableOpacity>
        )}

        {parseInt(topic.id) < learningTopics.length && (
          <TouchableOpacity
            style={[styles.navButton, styles.navButtonRight]}
            onPress={() =>
              router.push(`/topic/${(parseInt(topic.id) + 1).toString()}`)
            }
          >
            <Text style={styles.navButtonText}>Sonraki Konu</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 15,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 10,
  },
  listItemContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingLeft: 10,
  },
  listItemBullet: {
    fontSize: 16,
    marginRight: 8,
    color: '#555',
  },
  listItemText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    flex: 1,
  },
  codeBlock: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  exerciseContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exerciseDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  completedBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  completedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    padding: 16,
  },
  navButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  navButtonRight: {
    marginLeft: 10,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TopicDetailScreen;
