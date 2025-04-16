import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  getUserProgress,
  markTopicAsCompleted as markTopicCompletedFirebase,
  markExerciseAsCompleted as markExerciseCompletedFirebase,
  saveQuizScore as saveQuizScoreFirebase,
  resetProgress as resetProgressFirebase
} from '../services/firebaseService';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [completedExercises, setCompletedExercises] = useState({});
  const [quizScores, setQuizScores] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Kullanıcı oturumunu dinle
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadUserProgress(currentUser.uid);
      } else {
        // Kullanıcı oturum açmamışsa yerel depolamadan yükle
        loadLocalProgress();
      }
    });

    return unsubscribe;
  }, []);

  // Firebase'den kullanıcı ilerlemesini yükle
  const loadUserProgress = async (userId) => {
    setIsLoading(true);
    try {
      const progress = await getUserProgress(userId);
      if (progress) {
        setCompletedTopics(progress.completedTopics || []);
        setCompletedExercises(progress.completedExercises || {});
        setQuizScores(progress.quizScores || {});
      }
    } catch (error) {
      console.error('Firebase ilerleme yükleme hatası:', error);
      // Hata durumunda yerel depolamadan yükle
      loadLocalProgress();
    } finally {
      setIsLoading(false);
    }
  };

  // AsyncStorage'dan verileri yükle
  const loadLocalProgress = async () => {
    try {
      const storedCompletedTopics = await AsyncStorage.getItem('completedTopics');
      const storedCompletedExercises = await AsyncStorage.getItem('completedExercises');
      const storedQuizScores = await AsyncStorage.getItem('quizScores');

      if (storedCompletedTopics) {
        setCompletedTopics(JSON.parse(storedCompletedTopics));
      }

      if (storedCompletedExercises) {
        setCompletedExercises(JSON.parse(storedCompletedExercises));
      }

      if (storedQuizScores) {
        setQuizScores(JSON.parse(storedQuizScores));
      }
    } catch (error) {
      console.error('Yerel ilerleme yüklenirken hata oluştu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Verileri AsyncStorage'a kaydet
  const saveLocalProgress = async () => {
    try {
      await AsyncStorage.setItem('completedTopics', JSON.stringify(completedTopics));
      await AsyncStorage.setItem('completedExercises', JSON.stringify(completedExercises));
      await AsyncStorage.setItem('quizScores', JSON.stringify(quizScores));
    } catch (error) {
      console.error('Yerel ilerleme kaydedilirken hata oluştu:', error);
    }
  };

  // Değişiklikler olduğunda kaydet
  useEffect(() => {
    if (!isLoading) {
      // Her zaman yerel depolamaya kaydet
      saveLocalProgress();

      // Kullanıcı oturum açmışsa Firebase'e de kaydet
      if (user) {
        // Firebase'e kaydetme işlemleri markTopicAsCompleted, markExerciseAsCompleted ve saveQuizScore fonksiyonlarında yapılıyor
      }
    }
  }, [completedTopics, completedExercises, quizScores, isLoading, user]);

  // Bir konuyu tamamlandı olarak işaretle
  const markTopicAsCompleted = async (topicId) => {
    if (!completedTopics.includes(topicId)) {
      setCompletedTopics([...completedTopics, topicId]);

      // Kullanıcı oturum açmışsa Firebase'e kaydet
      if (user) {
        try {
          await markTopicCompletedFirebase(user.uid, topicId);
        } catch (error) {
          console.error('Firebase konu tamamlama hatası:', error);
        }
      }
    }
  };

  // Bir alıştırmayı tamamlandı olarak işaretle
  const markExerciseAsCompleted = async (topicId, exerciseId) => {
    setCompletedExercises(prev => {
      const topicExercises = prev[topicId] || [];
      if (!topicExercises.includes(exerciseId)) {
        const newCompletedExercises = {
          ...prev,
          [topicId]: [...topicExercises, exerciseId]
        };

        // Kullanıcı oturum açmışsa Firebase'e kaydet
        if (user) {
          markExerciseCompletedFirebase(user.uid, topicId, exerciseId).catch(error => {
            console.error('Firebase alıştırma tamamlama hatası:', error);
          });
        }

        return newCompletedExercises;
      }
      return prev;
    });
  };

  // Quiz skorunu kaydet
  const saveQuizScore = async (topicId, score, total) => {
    const percentage = Math.round((score / total) * 100);
    setQuizScores(prev => ({
      ...prev,
      [topicId]: { score, total, percentage }
    }));

    // Kullanıcı oturum açmışsa Firebase'e kaydet
    if (user) {
      try {
        await saveQuizScoreFirebase(user.uid, topicId, score, total);
      } catch (error) {
        console.error('Firebase quiz skoru kaydetme hatası:', error);
      }
    }
  };

  // İlerlemeyi sıfırla
  const resetProgress = async () => {
    try {
      // Yerel depolamadan sil
      await AsyncStorage.removeItem('completedTopics');
      await AsyncStorage.removeItem('completedExercises');
      await AsyncStorage.removeItem('quizScores');

      setCompletedTopics([]);
      setCompletedExercises({});
      setQuizScores({});

      // Kullanıcı oturum açmışsa Firebase'den de sil
      if (user) {
        try {
          await resetProgressFirebase(user.uid);
        } catch (error) {
          console.error('Firebase ilerleme sıfırlama hatası:', error);
        }
      }
    } catch (error) {
      console.error('Yerel ilerleme sıfırlanırken hata oluştu:', error);
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        user,
        completedTopics,
        completedExercises,
        quizScores,
        isLoading,
        markTopicAsCompleted,
        markExerciseAsCompleted,
        saveQuizScore,
        resetProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;
