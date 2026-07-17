import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Image } from 'react-native';
import * as Speech from 'expo-speech';

interface AbcScreenProps {
  onBack: () => void;
  playSound: () => void;
}

const ALPHABET_DATA = [
  { isCover: true, title: 'Sara Start Learn ABCs', image: require('../../assets/sara.jpeg'), color: '#E8590C' },
  { letter: 'A', word: 'Apple', emoji: '🍎', color: '#ef4444' },
  { letter: 'B', word: 'Ball', emoji: '🏀', color: '#f97316' },
  { letter: 'C', word: 'Cat', emoji: '🐱', color: '#f59e0b' },
  { letter: 'D', word: 'Dog', emoji: '🐶', color: '#84cc16' },
  { letter: 'E', word: 'Elephant', emoji: '🐘', color: '#10b981' },
  { letter: 'F', word: 'Fish', emoji: '🐟', color: '#06b6d4' },
  { letter: 'G', word: 'Giraffe', emoji: '🦒', color: '#3b82f6' },
  { letter: 'H', word: 'Hat', emoji: '🎩', color: '#6366f1' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦', color: '#8b5cf6' },
  { letter: 'J', word: 'Juice', emoji: '🧃', color: '#d946ef' },
  { letter: 'K', word: 'Kite', emoji: '🪁', color: '#f43f5e' },
  { letter: 'L', word: 'Lion', emoji: '🦁', color: '#fb923c' },
  { letter: 'M', word: 'Monkey', emoji: '🐒', color: '#fbbf24' },
  { letter: 'N', word: 'Nest', emoji: '🪹', color: '#a3e635' },
  { letter: 'O', word: 'Owl', emoji: '🦉', color: '#34d399' },
  { letter: 'P', word: 'Penguin', emoji: '🐧', color: '#2dd4bf' },
  { letter: 'Q', word: 'Queen', emoji: '👑', color: '#38bdf8' },
  { letter: 'R', word: 'Rabbit', emoji: '🐰', color: '#818cf8' },
  { letter: 'S', word: 'Sun', emoji: '☀️', color: '#a78bfa' },
  { letter: 'T', word: 'Tree', emoji: '🌳', color: '#e879f9' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️', color: '#fb7185' },
  { letter: 'V', word: 'Van', emoji: '🚐', color: '#fdba74' },
  { letter: 'W', word: 'Watermelon', emoji: '🍉', color: '#fcd34d' },
  { letter: 'X', word: 'Xylophone', emoji: '🎹', color: '#bef264' },
  { letter: 'Y', word: 'Yak', emoji: '🐃', color: '#6ee7b7' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', color: '#5eead4' },
];

export const AbcScreen: React.FC<AbcScreenProps> = ({ onBack, playSound }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const currentItem = ALPHABET_DATA[currentIndex];

  const speakCurrentItem = (index: number) => {
    const item = ALPHABET_DATA[index];
    Speech.stop();
    if (item.isCover) {
      Speech.speak(item.title, {
        rate: 0.8,
        pitch: 1.1,
      });
    } else {
      Speech.speak(`${item.letter} for ${item.word}`, {
        rate: 0.8,
        pitch: 1.1,
      });
    }
  };

  useEffect(() => {
    speakCurrentItem(0);
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
        speakCurrentItem(newIndex);
      });
    });
  };

  const handleNext = () => {
    if (currentIndex < ALPHABET_DATA.length - 1) {
      triggerPageFlip(true, currentIndex + 1);
    } else {
      triggerPageFlip(true, 0); // wrap to start
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      // If on first page, exit the book
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

  return (
    <View style={styles.container}>
      <View style={styles.bookWrapper}>
        <View style={styles.bookContainer}>
          <View style={styles.spineShadow} />
          
          <Pressable onPress={() => speakCurrentItem(currentIndex)} style={{ flex: 1 }}>
            <Animated.View style={[
              styles.pageContent, 
              { transform: [{ perspective: 1000 }, { rotateY: spin }] }
            ]}>
              {currentItem.isCover ? (
                <View style={styles.coverInnerContainer}>
                  <Text style={styles.coverTitle}>
                    <Text style={{ color: '#FF6B6B' }}>SARA </Text>
                    <Text style={{ color: '#4DABF7' }}>START{'\n'}</Text>
                    <Text style={{ color: '#51CF66' }}>LEARN </Text>
                    <Text style={{ color: '#FCC419' }}>ABCS</Text>
                  </Text>
                  <View style={styles.coverImageWrapper}>
                    <View style={styles.coverImageOuterFrame}>
                      <Image source={currentItem.image} style={styles.coverImage} />
                    </View>
                    <Animated.Text style={styles.decoStar1}>✨</Animated.Text>
                    <Animated.Text style={styles.decoStar2}>⭐</Animated.Text>
                    <Animated.Text style={styles.decoStar3}>🌟</Animated.Text>
                  </View>
                  <Text style={styles.coverSubtitle}>Let's begin!</Text>
                </View>
              ) : (
                <>
                  <Text style={[styles.letterText, { color: currentItem.color }]}>{currentItem.letter}</Text>
                  <View style={styles.emojiCircle}>
                    <Text style={styles.emojiText}>{currentItem.emoji}</Text>
                  </View>
                  <Text style={[styles.wordText, { color: currentItem.color }]}>{currentItem.word}</Text>
                </>
              )}
            </Animated.View>
          </Pressable>

          <View style={styles.navigationRow}>
            <Pressable style={({ pressed }) => [styles.arrowButton, pressed && styles.arrowPressed]} onPress={handlePrev}>
              {/* If on first page, show a back arrow instead of previous page */}
              <Text style={styles.arrowText}>{currentIndex === 0 ? '🔙' : '◀️'}</Text>
            </Pressable>
            <Text style={styles.pageNumber}>Page {currentIndex + 1}</Text>
            <Pressable style={({ pressed }) => [styles.arrowButton, pressed && styles.arrowPressed]} onPress={handleNext}>
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
    height: '75%', // Reduced height to feel more like a book page
    maxWidth: 500,
  },
  bookContainer: {
    flex: 1,
    backgroundColor: '#FFFCF5', // Warm paper color
    borderRadius: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 8, // Gives a thick page bundle look on the right
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
    paddingVertical: 20,
  },
  letterText: {
    fontSize: 120,
    fontWeight: '900',
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
    marginBottom: 20,
  },
  emojiCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#f1f5f9',
  },
  emojiText: {
    fontSize: 60,
  },
  wordText: {
    fontSize: 36,
    fontWeight: '900',
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
    fontSize: 16,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1,
  },

  coverInnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
  },
  coverTitle: {
    fontSize: 42,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 40,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    lineHeight: 50,
  },
  coverImageWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  coverImageOuterFrame: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 6,
    borderColor: '#FFD8A8',
  },
  coverImage: {
    width: 184,
    height: 184,
    borderRadius: 92,
  },
  decoStar1: {
    position: 'absolute',
    top: -20,
    left: -20,
    fontSize: 32,
    transform: [{ rotate: '-15deg' }],
  },
  decoStar2: {
    position: 'absolute',
    bottom: -15,
    right: -25,
    fontSize: 40,
    transform: [{ rotate: '20deg' }],
  },
  decoStar3: {
    position: 'absolute',
    top: 40,
    right: -30,
    fontSize: 28,
  },
  coverSubtitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1.5,
  }
});
