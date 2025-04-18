import { db } from '../config/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs
} from 'firebase/firestore';

// Kullanıcı oluştur veya güncelle
export const createOrUpdateUser = async (userId, userData) => {
  try {
    console.log('createOrUpdateUser çağrıldı:', userId);
    console.log('Firestore db nesnesi:', db ? 'Mevcut' : 'Eksik');

    // Firestore'un hazır olup olmadığını kontrol et
    if (!db) {
      console.error('Firestore bağlantısı hazır değil');
      return false;
    }

    const userRef = doc(db, 'users', userId);
    console.log('Kullanıcı referansı oluşturuldu');

    await setDoc(userRef, userData, { merge: true });
    console.log('Kullanıcı verileri başarıyla kaydedildi');

    return true;
  } catch (error) {
    console.error('Kullanıcı oluşturma/güncelleme hatası:', error);
    return false;
  }
};

// Kullanıcı ilerlemesini getir
export const getUserProgress = async (userId) => {
  try {
    const progressRef = doc(db, 'progress', userId);
    const progressSnap = await getDoc(progressRef);

    if (progressSnap.exists()) {
      return progressSnap.data();
    } else {
      // Yeni kullanıcı için boş ilerleme oluştur
      const initialProgress = {
        completedTopics: [],
        completedExercises: {},
        quizScores: {}
      };

      await setDoc(progressRef, initialProgress);
      return initialProgress;
    }
  } catch (error) {
    console.error('İlerleme getirme hatası:', error);
    return null;
  }
};

// Konuyu tamamlandı olarak işaretle
export const markTopicAsCompleted = async (userId, topicId) => {
  try {
    const progressRef = doc(db, 'progress', userId);
    await updateDoc(progressRef, {
      completedTopics: arrayUnion(topicId)
    });
    return true;
  } catch (error) {
    console.error('Konu tamamlama hatası:', error);
    return false;
  }
};

// Alıştırmayı tamamlandı olarak işaretle
export const markExerciseAsCompleted = async (userId, topicId, exerciseId) => {
  try {
    const progressRef = doc(db, 'progress', userId);
    const progressSnap = await getDoc(progressRef);

    if (progressSnap.exists()) {
      const data = progressSnap.data();
      const completedExercises = data.completedExercises || {};
      const topicExercises = completedExercises[topicId] || [];

      if (!topicExercises.includes(exerciseId)) {
        topicExercises.push(exerciseId);

        await updateDoc(progressRef, {
          [`completedExercises.${topicId}`]: topicExercises
        });
      }

      return true;
    }

    return false;
  } catch (error) {
    console.error('Alıştırma tamamlama hatası:', error);
    return false;
  }
};

// Quiz skorunu kaydet
export const saveQuizScore = async (userId, topicId, score, total) => {
  try {
    const progressRef = doc(db, 'progress', userId);
    const percentage = Math.round((score / total) * 100);

    await updateDoc(progressRef, {
      [`quizScores.${topicId}`]: { score, total, percentage }
    });
    return true;
  } catch (error) {
    console.error('Quiz skoru kaydetme hatası:', error);
    return false;
  }
};

// İlerlemeyi sıfırla
export const resetProgress = async (userId) => {
  try {
    const progressRef = doc(db, 'progress', userId);
    await setDoc(progressRef, {
      completedTopics: [],
      completedExercises: {},
      quizScores: {}
    });
    return true;
  } catch (error) {
    console.error('İlerleme sıfırlama hatası:', error);
    return false;
  }
};
