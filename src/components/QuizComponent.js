import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const QuizComponent = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const checkAnswer = () => {
    if (selectedAnswerIndex === null) return;
    
    setIsAnswerChecked(true);
    
    if (selectedAnswerIndex === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setIsAnswerChecked(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCompleted(true);
      if (onComplete) {
        onComplete(score, questions.length);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerChecked(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultTitle}>Quiz Tamamlandı!</Text>
        <Text style={styles.resultScore}>
          Skorunuz: {score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)
        </Text>
        
        {score === questions.length ? (
          <Text style={styles.perfectScore}>Mükemmel! Tüm soruları doğru cevapladınız!</Text>
        ) : score >= questions.length / 2 ? (
          <Text style={styles.goodScore}>İyi iş! Biraz daha pratik yaparak daha da gelişebilirsiniz.</Text>
        ) : (
          <Text style={styles.lowScore}>Konuları tekrar gözden geçirmeniz faydalı olabilir.</Text>
        )}
        
        <Button title="Testi Tekrarla" onPress={resetQuiz} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Soru {currentQuestionIndex + 1}/{questions.length}
      </Text>
      
      <Text style={styles.question}>{currentQuestion.question}</Text>
      
      <View style={styles.answersContainer}>
        {currentQuestion.answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswerIndex === index && styles.selectedAnswer,
              isAnswerChecked && index === currentQuestion.correctAnswerIndex && styles.correctAnswer,
              isAnswerChecked && selectedAnswerIndex === index && 
                index !== currentQuestion.correctAnswerIndex && styles.wrongAnswer,
            ]}
            onPress={() => !isAnswerChecked && setSelectedAnswerIndex(index)}
            disabled={isAnswerChecked}
          >
            <Text style={[
              styles.answerText,
              isAnswerChecked && index === currentQuestion.correctAnswerIndex && styles.correctAnswerText,
              isAnswerChecked && selectedAnswerIndex === index && 
                index !== currentQuestion.correctAnswerIndex && styles.wrongAnswerText,
            ]}>
              {answer}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {!isAnswerChecked ? (
        <Button 
          title="Cevabı Kontrol Et" 
          onPress={checkAnswer} 
          disabled={selectedAnswerIndex === null}
        />
      ) : (
        <View style={styles.feedbackContainer}>
          {selectedAnswerIndex === currentQuestion.correctAnswerIndex ? (
            <Text style={styles.correctFeedback}>Doğru cevap!</Text>
          ) : (
            <Text style={styles.wrongFeedback}>
              Yanlış cevap. Doğru cevap: {currentQuestion.answers[currentQuestion.correctAnswerIndex]}
            </Text>
          )}
          
          {currentQuestion.explanation && (
            <Text style={styles.explanation}>{currentQuestion.explanation}</Text>
          )}
          
          <Button title="Sonraki Soru" onPress={nextQuestion} />
        </View>
      )}
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
  progress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  answersContainer: {
    marginBottom: 16,
  },
  answerButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  selectedAnswer: {
    borderColor: '#2196F3',
    backgroundColor: '#e3f2fd',
  },
  correctAnswer: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  wrongAnswer: {
    borderColor: '#f44336',
    backgroundColor: '#ffebee',
  },
  answerText: {
    fontSize: 16,
  },
  correctAnswerText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  wrongAnswerText: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  feedbackContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  correctFeedback: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  wrongFeedback: {
    color: '#f44336',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  explanation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultScore: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  perfectScore: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  goodScore: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  lowScore: {
    color: '#f44336',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default QuizComponent;
