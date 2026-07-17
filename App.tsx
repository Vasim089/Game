import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, ImageBackground, View } from 'react-native';
import { useAudioPlayer } from 'expo-audio';

import { MenuScreen, ScreenName } from './src/screens/MenuScreen';
import { AbcScreen } from './src/screens/AbcScreen';
import { NumberScreen } from './src/screens/NumberScreen';
import { DrawingScreen } from './src/screens/DrawingScreen';
import { FloatingBackground } from './src/components/FloatingBackground';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('menu');
  
  const popSound = useAudioPlayer(require('./assets/sounds/match.wav'));

  const playSound = () => {
    try {
      popSound.seekTo(0);
      popSound.play();
    } catch (e) {
      console.log(e);
    }
  };

  const handleNavigate = (screen: ScreenName) => {
    playSound();
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'abc':
        return <AbcScreen onBack={() => handleNavigate('menu')} playSound={playSound} />;
      case 'numbers':
        return <NumberScreen onBack={() => handleNavigate('menu')} playSound={playSound} />;
      case 'drawing':
        return <DrawingScreen onBack={() => handleNavigate('menu')} playSound={playSound} />;
      default:
        return <MenuScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('./assets/card_bg.png')} 
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <FloatingBackground />
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        {renderScreen()}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // Clean light fallback
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Light, bright, modern transparent overlay instead of dark blue
  },
});
