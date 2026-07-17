import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import * as Speech from 'expo-speech';

interface NumberScreenProps {
  onBack: () => void;
  playSound: () => void;
}

const MAX_NUMBER = 100;

export const NumberScreen: React.FC<NumberScreenProps> = ({ onBack, playSound }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const speakCurrentNumber = (num: number) => {
    Speech.stop();
    Speech.speak(num.toString(), {
      rate: 0.8,
      pitch: 1.1,
    });
  };

  useEffect(() => {
    speakCurrentNumber(currentIndex);
  }, []);

  const triggerPageFlip = (isNext: boolean, newIndex: number) => {
    playSound();
    
    // Animate halfway (page lifting up)
    Animated.timing(flipAnim, {
      toValue: isNext ? -90 : 90,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Swap content while page is at 90 degrees (invisible)
      setCurrentIndex(newIndex);
      
      // Reset flip anim to other side
      flipAnim.setValue(isNext ? 90 : -90);
      
      // Animate rest of the way (page dropping down)
      Animated.timing(flipAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        speakCurrentNumber(newIndex);
      });
    });
  };

  const handleNext = () => {
    if (currentIndex < MAX_NUMBER) {
      triggerPageFlip(true, currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 1) {
      Speech.stop();
      onBack();
    } else {
      triggerPageFlip(false, currentIndex - 1);
    }
  };

  const spin = flipAnim.interpolate({
    inputRange: [-90, 0, 90],
    outputRange: ['-90deg', '0deg', '90deg']
  });

  // Calculate emoji size based on number to fit them in the box
  const getEmojiSize = (num: number) => {
    if (num <= 10) return 40;
    if (num <= 30) return 25;
    if (num <= 50) return 20;
    return 14;
  };

  const renderItems = (count: number) => {
    const items = [];
    const size = getEmojiSize(count);
    for (let i = 0; i < count; i++) {
      items.push(
        <Text key={i} style={{ fontSize: size, margin: 2 }}>🍎</Text>
      );
    }
    return items;
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={() => { Speech.stop(); onBack(); }}>
        <Text style={styles.closeButtonText}>✖</Text>
      </Pressable>
      
      <View style={styles.bookWrapper}>
        <View style={styles.bookContainer}>
          <View style={styles.spineShadow} />
          
          <Pressable onPress={() => speakCurrentNumber(currentIndex)} style={{ flex: 1 }}>
            <Animated.View style={[
              styles.pageContent, 
              { transform: [{ perspective: 1000 }, { rotateY: spin }] }
            ]}>
              <Text style={styles.numberHeader}>{currentIndex}</Text>
              
              <View style={styles.itemsContainer}>
                {renderItems(currentIndex)}
              </View>
              
              <Text style={styles.wordText}>{currentIndex} Apples</Text>
            </Animated.View>
          </Pressable>

          <View style={styles.navigationRow}>
            <Pressable style={({ pressed }) => [styles.arrowButton, pressed && styles.arrowPressed]} onPress={handlePrev}>
              <Text style={styles.arrowText}>{currentIndex === 1 ? '🔙' : '◀️'}</Text>
            </Pressable>
            <Text style={styles.pageNumber}>Number {currentIndex}</Text>
            <Pressable 
              style={({ pressed }) => [
                styles.arrowButton, 
                pressed && styles.arrowPressed,
                currentIndex === MAX_NUMBER && { opacity: 0.5 }
              ]} 
              onPress={handleNext}
              disabled={currentIndex === MAX_NUMBER}
            >
              <Text style={styles.arrowText}>▶️</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE1D3', // Desk/background color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bookWrapper: {
    width: '100%',
    height: '80%', 
    maxWidth: 500,
  },
  bookContainer: {
    flex: 1,
    backgroundColor: '#FFFCF5', // Warm paper color
    borderRadius: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 8,
    borderBottomWidth: 10,
    borderColor: '#D4C9B8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  spineShadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 25,
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.06)',
  },
  pageContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  numberHeader: {
    fontSize: 100,
    fontWeight: '900',
    color: '#3b82f6',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
    marginBottom: 10,
  },
  itemsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  wordText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ef4444',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  arrowButton: {
    backgroundColor: '#ffffff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  arrowPressed: {
    backgroundColor: '#f8fafc',
    transform: [{ scale: 0.9 }],
  },
  arrowText: {
    fontSize: 24,
  },
  pageNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#ef4444',
    fontWeight: '900',
  }
});
