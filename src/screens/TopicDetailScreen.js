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
  const [activeStep, setActiveStep] = useState('content'); // 'content', 'exercises', 'quiz'
  const [contentCompleted, setContentCompleted] = useState(false);
  const [exercisesCompleted, setExercisesCompleted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
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

    // Tamamlanma durumlarını kontrol et
    const topicExercisesCompleted = completedExercises[topicId] || [];
    setExercisesCompleted(topicExercisesCompleted.length >= topicExercises.length);

    const topicQuizScore = quizScores[topicId];
    setQuizCompleted(topicQuizScore && topicQuizScore.percentage >= 70); // %70 başarı kriteri

    // Konu tamamlanmışsa içerik de tamamlanmış say
    setContentCompleted(completedTopics.includes(topicId));
  }, [topicId, completedTopics, completedExercises, quizScores]);

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

  // İçerik tamamlandığında çağrılacak fonksiyon
  const handleContentComplete = () => {
    setContentCompleted(true);
    // İçerik tamamlandığında otomatik olarak alıştırmalara geç
    setActiveStep('exercises');
  };

  // Alıştırma tamamlandığında çağrılacak fonksiyon
  const handleExerciseComplete = (exerciseId) => {
    markExerciseAsCompleted(topicId, exerciseId);

    // Tüm alıştırmalar tamamlandıysa alıştırmaları tamamlanmış olarak işaretle
    const completedExercisesForTopic = [...(completedExercises[topicId] || []), exerciseId];
    if (completedExercisesForTopic.length >= topicExercises.length) {
      setExercisesCompleted(true);
      // Tüm alıştırmalar tamamlandığında otomatik olarak quiz'e geç
      setActiveStep('quiz');
    }
  };

  // Quiz tamamlandığında çağrılacak fonksiyon
  const handleQuizComplete = (score, total) => {
    saveQuizScore(topicId, score, total);

    // Quiz başarılıysa konuyu tamamlandı olarak işaretle
    if (score / total >= 0.7) { // %70 başarı oranı
      setQuizCompleted(true);
      markTopicAsCompleted(topicId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressStep}>
          <View style={[styles.stepCircle, activeStep === 'content' && styles.activeStepCircle, contentCompleted && styles.completedStepCircle]}>
            <Text style={[styles.stepNumber, (activeStep === 'content' || contentCompleted) && styles.activeStepNumber]}>1</Text>
          </View>
          <Text style={[styles.stepText, activeStep === 'content' && styles.activeStepText]}>Konu Anlatımı</Text>
        </View>

        <View style={styles.progressLine} />

        <View style={styles.progressStep}>
          <View style={[styles.stepCircle,
            activeStep === 'exercises' && styles.activeStepCircle,
            exercisesCompleted && styles.completedStepCircle,
            !contentCompleted && styles.disabledStepCircle]}>
            <Text style={[styles.stepNumber,
              (activeStep === 'exercises' || exercisesCompleted) && styles.activeStepNumber,
              !contentCompleted && styles.disabledStepNumber]}>2</Text>
          </View>
          <Text style={[styles.stepText,
            activeStep === 'exercises' && styles.activeStepText,
            !contentCompleted && styles.disabledStepText]}>Alıştırmalar</Text>
        </View>

        <View style={styles.progressLine} />

        <View style={styles.progressStep}>
          <View style={[styles.stepCircle,
            activeStep === 'quiz' && styles.activeStepCircle,
            quizCompleted && styles.completedStepCircle,
            !exercisesCompleted && styles.disabledStepCircle]}>
            <Text style={[styles.stepNumber,
              (activeStep === 'quiz' || quizCompleted) && styles.activeStepNumber,
              !exercisesCompleted && styles.disabledStepNumber]}>3</Text>
          </View>
          <Text style={[styles.stepText,
            activeStep === 'quiz' && styles.activeStepText,
            !exercisesCompleted && styles.disabledStepText]}>Quiz</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {activeStep === 'content' && (
          <View style={styles.content}>
            {renderContent()}

            <TouchableOpacity
              style={[styles.nextButton, contentCompleted && styles.completedButton]}
              onPress={handleContentComplete}
            >
              <Text style={styles.nextButtonText}>
                {contentCompleted ? 'Tamamlandı - Alıştırmalara Geç' : 'Konuyu Tamamla ve Devam Et'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {activeStep === 'exercises' && (
          <View style={styles.content}>
            {!contentCompleted ? (
              <View style={styles.lockedContent}>
                <Text style={styles.lockedText}>Bu bölüme erişmek için önce konu anlatımını tamamlayın.</Text>
                <TouchableOpacity onPress={() => setActiveStep('content')}>
                  <Text style={styles.goBackText}>Konu Anlatımına Dön</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={styles.sectionTitle}>Alıştırmalar</Text>
                <Text style={styles.sectionDescription}>
                  Öğrendiklerinizi pekiştirmek için aşağıdaki alıştırmaları tamamlayın.
                  Tüm alıştırmaları tamamladığınızda quiz bölümüne geçebilirsiniz.
                </Text>

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

                {exercisesCompleted && (
                  <TouchableOpacity
                    style={[styles.nextButton, styles.completedButton]}
                    onPress={() => setActiveStep('quiz')}
                  >
                    <Text style={styles.nextButtonText}>Alıştırmalar Tamamlandı - Quiz'e Geç</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        )}

        {activeStep === 'quiz' && topicQuiz && (
          <View style={styles.content}>
            {!exercisesCompleted ? (
              <View style={styles.lockedContent}>
                <Text style={styles.lockedText}>Bu bölüme erişmek için önce tüm alıştırmaları tamamlayın.</Text>
                <TouchableOpacity onPress={() => setActiveStep('exercises')}>
                  <Text style={styles.goBackText}>Alıştırmalara Dön</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={styles.sectionTitle}>{topicQuiz.title}</Text>
                <Text style={styles.sectionDescription}>
                  Öğrendiklerinizi test edin. Başarılı olmak için en az %70 puan almanız gerekiyor.
                </Text>

                <QuizComponent
                  questions={topicQuiz.questions}
                  onComplete={handleQuizComplete}
                />

                {quizCompleted && (
                  <View style={styles.congratsContainer}>
                    <Text style={styles.congratsText}>Tebrikler! Bu konuyu başarıyla tamamladınız.</Text>
                    {parseInt(topicId) < learningTopics.length && (
                      <TouchableOpacity
                        style={styles.nextTopicButton}
                        onPress={() => router.push(`/topic/${(parseInt(topicId) + 1).toString()}`)}
                      >
                        <Text style={styles.nextTopicButtonText}>Sonraki Konuya Geç</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </>
            )}
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
  // İlerleme adımları
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  progressLine: {
    height: 2,
    backgroundColor: '#e0e0e0',
    flex: 1,
    marginHorizontal: 5,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeStepCircle: {
    backgroundColor: '#007bff',
  },
  completedStepCircle: {
    backgroundColor: '#4CAF50',
  },
  disabledStepCircle: {
    backgroundColor: '#e0e0e0',
    opacity: 0.5,
  },
  stepNumber: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeStepNumber: {
    color: '#fff',
  },
  disabledStepNumber: {
    color: '#999',
  },
  stepText: {
    fontSize: 12,
    color: '#666',
  },
  activeStepText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  disabledStepText: {
    color: '#999',
  },
  // Bölüm başlıkları
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  // Alıştırmalar
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
  // Kilitli içerik
  lockedContent: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  lockedText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  goBackText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Devam butonları
  nextButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Tebrikler mesajı
  congratsContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  congratsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  nextTopicButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  nextTopicButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Navigasyon butonları
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
