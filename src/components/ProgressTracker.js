import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProgressTracker = ({ topics, completedTopics, quizScores, onTopicPress }) => {
  const calculateOverallProgress = () => {
    if (topics.length === 0) return 0;
    return Math.round((completedTopics.length / topics.length) * 100);
  };

  const calculateQuizAverage = () => {
    if (Object.keys(quizScores).length === 0) return 0;
    
    const totalScore = Object.values(quizScores).reduce((sum, score) => sum + score.percentage, 0);
    return Math.round(totalScore / Object.keys(quizScores).length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>İlerleme Durumu</Text>
      
      <View style={styles.overallProgressContainer}>
        <Text style={styles.progressLabel}>Genel İlerleme:</Text>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${calculateOverallProgress()}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressPercentage}>{calculateOverallProgress()}%</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{completedTopics.length}</Text>
          <Text style={styles.statLabel}>Tamamlanan Konular</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{topics.length - completedTopics.length}</Text>
          <Text style={styles.statLabel}>Kalan Konular</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{calculateQuizAverage()}%</Text>
          <Text style={styles.statLabel}>Quiz Ortalaması</Text>
        </View>
      </View>
      
      <Text style={styles.topicsTitle}>Konu Durumu</Text>
      
      <View style={styles.topicsContainer}>
        {topics.map((topic) => {
          const isCompleted = completedTopics.includes(topic.id);
          const quizScore = quizScores[topic.id];
          
          return (
            <TouchableOpacity 
              key={topic.id}
              style={[
                styles.topicItem,
                isCompleted ? styles.completedTopic : {}
              ]}
              onPress={() => onTopicPress(topic.id)}
            >
              <View style={styles.topicHeader}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                {isCompleted && (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>Tamamlandı</Text>
                  </View>
                )}
              </View>
              
              {quizScore && (
                <Text style={styles.quizScore}>
                  Quiz: {quizScore.score}/{quizScore.total} ({quizScore.percentage}%)
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  overallProgressContainer: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  topicsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  topicsContainer: {
    
  },
  topicItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  completedTopic: {
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
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
  quizScore: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProgressTracker;
