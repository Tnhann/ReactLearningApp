import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const AnimatedCard = ({
  title,
  description,
  onPress,
  isCompleted = false,
  isLocked = false,
  progress = 0,
  index = 0,
  badge = null,
}) => {
  // Animasyon değerleri
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  // Kart basıldığında animasyon
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };
  
  // İlerleme çubuğu animasyonu
  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress]);
  
  // İlerleme çubuğu genişliği
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });
  
  // Kart renkleri
  const getCardColors = () => {
    if (isLocked) {
      return ['#E0E0E0', '#BDBDBD'];
    } else if (isCompleted) {
      return ['#81C784', '#4CAF50'];
    } else {
      // Farklı indekslere göre farklı renkler
      const colorSets = [
        ['#4776E6', '#8E54E9'], // Mavi-Mor
        ['#00C9FF', '#92FE9D'], // Mavi-Yeşil
        ['#FF416C', '#FF4B2B'], // Kırmızı
        ['#F857A6', '#FF5858'], // Pembe
        ['#FFD200', '#F7971E'], // Sarı-Turuncu
      ];
      return colorSets[index % colorSets.length];
    }
  };
  
  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isLocked}
        style={styles.touchable}
      >
        <LinearGradient
          colors={getCardColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.card,
            isLocked && styles.lockedCard,
          ]}
        >
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Text style={[styles.title, isLocked && styles.lockedText]}>
                  {index + 1}. {title}
                </Text>
                {isLocked && <Ionicons name="lock-closed" size={16} color="#757575" style={styles.lockIcon} />}
              </View>
              
              {badge && (
                <View style={styles.badgeContainer}>
                  {badge}
                </View>
              )}
            </View>
            
            <Text style={[styles.description, isLocked && styles.lockedText]} numberOfLines={2}>
              {description}
            </Text>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    { width: progressWidth },
                    isCompleted && styles.completedProgress,
                    isLocked && styles.lockedProgress,
                  ]}
                />
              </View>
              <Text style={[styles.progressText, isLocked && styles.lockedText]}>
                {isLocked ? 'Kilitli' : isCompleted ? 'Tamamlandı' : `${Math.round(progress)}% Tamamlandı`}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  touchable: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  card: {
    padding: 16,
    borderRadius: 12,
  },
  lockedCard: {
    opacity: 0.8,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  lockIcon: {
    marginLeft: 4,
  },
  badgeContainer: {
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
  },
  lockedText: {
    color: '#757575',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  completedProgress: {
    backgroundColor: '#fff',
  },
  lockedProgress: {
    backgroundColor: '#9E9E9E',
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});

export default AnimatedCard;
