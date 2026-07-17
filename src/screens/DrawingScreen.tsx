import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { ALL_TEMPLATES } from '../components/ColoringTemplates';

interface DrawingScreenProps {
  onBack: () => void;
  playSound: () => void;
}

const COLORS = [
  '#ef4444', // Red
  '#f97316', // Orange
  '#facc15', // Yellow
  '#4ade80', // Green
  '#3b82f6', // Blue
  '#a855f7', // Purple
  '#ec4899', // Pink
  '#ffffff', // White (Eraser)
];

export const DrawingScreen: React.FC<DrawingScreenProps> = ({ onBack, playSound }) => {
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [activeTemplate, setActiveTemplate] = useState(ALL_TEMPLATES[0]);
  const [fills, setFills] = useState<Record<string, Record<string, string>>>({});

  const handleFill = (regionId: string) => {
    playSound();
    setFills((prev) => ({
      ...prev,
      [activeTemplate.id]: {
        ...(prev[activeTemplate.id] || {}),
        [regionId]: activeColor,
      }
    }));
  };

  const handleClear = () => {
    playSound();
    setFills((prev) => ({
      ...prev,
      [activeTemplate.id]: {}
    }));
  };

  const changeTemplate = (t: typeof ALL_TEMPLATES[0]) => {
    playSound();
    setActiveTemplate(t);
  };

  const changeColor = (c: string) => {
    playSound();
    setActiveColor(c);
  };

  const ActiveComponent = activeTemplate.component;
  const currentFills = fills[activeTemplate.id] || {};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>⬅️</Text>
        </Pressable>
        <Text style={styles.titleText}>Color Time!</Text>
        <Pressable style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearText}>🗑️ Clear</Text>
        </Pressable>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentRow}>
        {/* Sidebar Templates (Scrollable & Compact) */}
        <View style={styles.sidebarWrapper}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sidebarContent}
          >
            {ALL_TEMPLATES.map((t) => (
              <Pressable 
                key={t.id} 
                style={[styles.templateButton, activeTemplate.id === t.id && styles.selectedTemplate]} 
                onPress={() => changeTemplate(t)}
              >
                <Text style={styles.templateIcon}>{t.icon}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Canvas */}
        <View style={styles.canvasWrapper}>
          <View style={styles.canvasContainer}>
            <ActiveComponent fills={currentFills} onFill={handleFill} />
          </View>
        </View>
      </View>

      {/* Colors Toolbar (Compact) */}
      <View style={styles.colorsToolbar}>
        {COLORS.map((c) => (
          <Pressable 
            key={c} 
            style={[
              styles.colorButton, 
              { backgroundColor: c }, 
              activeColor === c && styles.selectedColor
            ]} 
            onPress={() => changeColor(c)}
          >
            {c === '#ffffff' && <View style={styles.whiteColorInner} />}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2FE',
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: '#ffffff',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  backText: {
    fontSize: 22,
    marginLeft: -4,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0284c7',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(2, 132, 199, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ef4444',
    borderRadius: 20,
    shadowColor: '#b91c1c',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#fca5a5',
  },
  clearText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  sidebarWrapper: {
    width: 60,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#bae6fd',
    overflow: 'hidden',
  },
  sidebarContent: {
    paddingVertical: 10,
    alignItems: 'center',
    gap: 12,
  },
  templateButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedTemplate: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    transform: [{ scale: 1.1 }],
    shadowColor: '#3b82f6',
    shadowOpacity: 0.3,
  },
  templateIcon: {
    fontSize: 22,
  },
  canvasWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  canvasContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#f1f5f9',
    borderRadius: 16,
    borderStyle: 'dashed',
    padding: 10,
  },
  colorsToolbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#bae6fd',
  },
  colorButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#ffffff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedColor: {
    transform: [{ scale: 1.2 }],
    borderColor: '#cbd5e1',
  },
  whiteColorInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    backgroundColor: '#f1f5f9',
  }
});
