import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Animated, Dimensions } from 'react-native';

export type ScreenName = 'menu' | 'abc' | 'numbers' | 'drawing';

interface MenuScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

const { width } = Dimensions.get('window');

const BouncyButton = ({ onPress, color, shadowColor, icon, text, delay }: any) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 40,
      friction: 5,
      delay: delay,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }, { scale: pressAnim }], width: '100%' }}>
      <Pressable 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={[styles.buttonWrapper, { backgroundColor: shadowColor }]}
      >
        <View style={[styles.buttonInner, { backgroundColor: color }]}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{icon}</Text>
          </View>
          <Text style={styles.text}>{text}</Text>
          <View style={styles.buttonHighlight} />
        </View>
      </Pressable>
    </Animated.View>
  );
};

export const MenuScreen: React.FC<MenuScreenProps> = ({ onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const headerSlideAnim = useRef(new Animated.Value(-100)).current;
  const avatarPulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Header slide down
    Animated.spring(headerSlideAnim, {
      toValue: 0,
      tension: 50,
      friction: 6,
      useNativeDriver: true,
    }).start();

    // Avatar continuous pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(avatarPulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(avatarPulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ])
    ).start();

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerSlideAnim }] }]}>
        <View style={styles.modernDateTimeBadge}>
          <Text style={styles.modernDateTimeText}>
            {formattedDate} • {formattedTime}
          </Text>
        </View>
        <View style={styles.avatarRow}>
          <Animated.View style={[styles.avatarWrapper, { transform: [{ scale: avatarPulseAnim }] }]}>
            <Image 
              source={require('../../assets/sara.jpeg')} 
              style={styles.avatar} 
            />
          </Animated.View>
          <View style={styles.headerTextCol}>
            <Text style={styles.headerTitle}>Sara Learning Time!</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.buttonsContainer}>
        <BouncyButton 
          icon="🔤" 
          text="Learn ABCs" 
          color="#FF6B6B" 
          shadowColor="#C92A2A"
          delay={200}
          onPress={() => onNavigate('abc')} 
        />
        <BouncyButton 
          icon="🔢" 
          text="Count 1-100" 
          color="#4DABF7" 
          shadowColor="#1864AB"
          delay={350}
          onPress={() => onNavigate('numbers')} 
        />
        <BouncyButton 
          icon="🎨" 
          text="Draw Canvas" 
          color="#51CF66" 
          shadowColor="#2B8A3E"
          delay={500}
          onPress={() => onNavigate('drawing')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 35,
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#FFD8A8',
    shadowColor: '#F76707',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  avatarRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    marginBottom: 8,
    borderRadius: 50,
    padding: 3,
    backgroundColor: 'rgba(255,255,255,0.7)',
    shadowColor: '#E8590C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 80, // Even smaller avatar
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: '#FFD8A8',
  },
  headerTextCol: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#E8590C',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: 0,
  },
  modernDateTimeBadge: {
    position: 'absolute',
    top: -15, // Hangs slightly off the top
    right: -10, // Hangs slightly off the right side
    backgroundColor: '#3b82f6', // A nice blue tag to pop against the card
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 10,
  },
  modernDateTimeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  buttonsContainer: {
    gap: 16,
    alignItems: 'center',
    width: '100%',
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 24,
    paddingBottom: 6, // Reduced 3D depth effect
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14, // Reduced padding
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 3, // Slightly thinner border
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
  },
  buttonHighlight: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: '40%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: 44, // Reduced icon container size
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    fontSize: 22, // Reduced icon size
  },
  text: {
    color: '#ffffff',
    fontSize: 22, // Slightly smaller text
    fontWeight: '900',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  }
});

