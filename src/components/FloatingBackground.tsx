import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

const ELEMENTS = ['⭐', 'A', '☁️', 'B', '⭐', 'C', '⭐', '1', '2', '3'];

const FloatingElement = ({ item, index }: { item: string; index: number }) => {
  const translateYAnim = useRef(new Animated.Value(height + 100)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Randomize starting values
  const startX = Math.random() * width;
  const duration = 15000 + Math.random() * 10000; // 15-25 seconds
  const delay = Math.random() * 10000;
  const size = 24 + Math.random() * 24; // 24 to 48
  const colorIndex = index % 4;
  const colors = ['#FF6B6B', '#4DABF7', '#51CF66', '#FAB005'];

  useEffect(() => {
    // Upward floating animation
    Animated.loop(
      Animated.timing(translateYAnim, {
        toValue: -100,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      })
    ).start();

    // Gentle side-to-side sway
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateXAnim, {
          toValue: 20 + Math.random() * 30,
          duration: 3000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: -20 - Math.random() * 30,
          duration: 3000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Slow rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000 + Math.random() * 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Text
      style={[
        styles.element,
        {
          left: startX,
          fontSize: size,
          color: colors[colorIndex],
          transform: [
            { translateY: translateYAnim },
            { translateX: translateXAnim },
            { rotate: spin },
          ],
        },
      ]}
    >
      {item}
    </Animated.Text>
  );
};

export const FloatingBackground = () => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {ELEMENTS.map((item, index) => (
        <FloatingElement key={index} item={item} index={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  element: {
    position: 'absolute',
    fontWeight: '900',
    opacity: 0.6,
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
