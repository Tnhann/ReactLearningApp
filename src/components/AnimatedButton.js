import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedButton = ({
  title,
  onPress,
  style,
  textStyle,
  isLoading = false,
  disabled = false,
  colors = ['#4776E6', '#8E54E9'],
  icon = null,
  type = 'primary', // primary, secondary, outline, danger
}) => {
  const scaleAnim = new Animated.Value(1);
  
  // Buton basıldığında küçülme ve geri dönme animasyonu
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
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

  // Buton tipine göre renkleri belirle
  const getColors = () => {
    switch (type) {
      case 'primary':
        return colors;
      case 'secondary':
        return ['#00C9FF', '#92FE9D'];
      case 'outline':
        return ['transparent', 'transparent'];
      case 'danger':
        return ['#FF416C', '#FF4B2B'];
      default:
        return colors;
    }
  };

  // Buton tipine göre stil belirle
  const getButtonStyle = () => {
    switch (type) {
      case 'outline':
        return styles.outlineButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'danger':
        return styles.dangerButton;
      default:
        return {};
    }
  };

  // Buton tipine göre metin stili belirle
  const getTextStyle = () => {
    switch (type) {
      case 'outline':
        return styles.outlineButtonText;
      default:
        return styles.buttonText;
    }
  };

  return (
    <Animated.View
      style={[
        styles.animatedContainer,
        { transform: [{ scale: scaleAnim }] },
        disabled && styles.disabledButton,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isLoading || disabled}
        style={[styles.buttonContainer, style]}
      >
        <LinearGradient
          colors={getColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, getButtonStyle()]}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <View style={styles.contentContainer}>
              {icon && <View style={styles.iconContainer}>{icon}</View>}
              <Text style={[getTextStyle(), textStyle]}>{title}</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    width: '100%',
    marginVertical: 8,
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#4776E6',
    backgroundColor: 'transparent',
  },
  outlineButtonText: {
    color: '#4776E6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#f5f5f5',
  },
  dangerButton: {
    backgroundColor: '#FF416C',
  },
  disabledButton: {
    opacity: 0.6,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default AnimatedButton;
