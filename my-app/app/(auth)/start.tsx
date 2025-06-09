import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function StartScreen() {
  const handleStartPress = () => {
    // Navigate to main app
    router.push({ pathname: '/main/homepage' } as any);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E55A3B" />
      
      {/* Status Bar Indicator */}
      <View style={styles.statusBarIndicator} />
      
      {/* Floating Paper Elements */}
      <View style={styles.backgroundElements}>
        {/* Top left paper */}
        <View style={[styles.paper, styles.paper1]} />
        {/* Center paper */}
        <View style={[styles.paper, styles.paper2]} />
        {/* Top right paper */}
        <View style={[styles.paper, styles.paper3]} />
        {/* Bottom right paper */}
        <View style={[styles.paper, styles.paper4]} />
        {/* Bottom left paper */}
        <View style={[styles.paper, styles.paper5]} />
        {/* Large bottom paper */}
        <View style={[styles.paper, styles.paper6]} />
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.mainText}>
          Find out about books, authors and stories.
        </Text>
        <Text style={styles.mainText}>
          Read what people think or share yours.
        </Text>
      </View>
      
      {/* Bottom Button */}
      <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
        <Text style={styles.startButtonText}>Start using Pagez</Text>
      </TouchableOpacity>
      
      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E55A3B', // Orange background
    position: 'relative',
  },
  statusBarIndicator: {
    position: 'absolute',
    width: 107,
    height: 35,
    left: width / 2 - 53.5,
    top: 25,
    backgroundColor: '#000000',
    borderRadius: 50,
    zIndex: 10,
  },
  backgroundElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  paper: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  // Floating paper elements positioned to match the design
  paper1: {
    width: 80,
    height: 80,
    top: 80,
    left: -20,
    transform: [{ rotate: '15deg' }],
  },
  paper2: {
    width: 120,
    height: 120,
    top: 180,
    right: 40,
    transform: [{ rotate: '-20deg' }],
  },
  paper3: {
    width: 60,
    height: 60,
    top: 120,
    right: -10,
    transform: [{ rotate: '45deg' }],
  },
  paper4: {
    width: 100,
    height: 100,
    bottom: 200,
    right: 20,
    transform: [{ rotate: '25deg' }],
  },
  paper5: {
    width: 70,
    height: 70,
    bottom: 280,
    left: 20,
    transform: [{ rotate: '-15deg' }],
  },
  paper6: {
    width: 140,
    height: 160,
    bottom: 120,
    right: -20,
    transform: [{ rotate: '12deg' }],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    zIndex: 5,
  },
  mainText: {
    fontFamily: 'Bogart-Regular-Trial',
    fontSize: 52,
    lineHeight: 56,
    letterSpacing: -0.02 * 52,
    color: '#FFFFFF',
    textAlign: 'left',
    width: '100%',
    marginBottom: 8,
  },
  startButton: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    height: 55,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  startButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.04 * 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  homeIndicator: {
    position: 'absolute',
    width: 139,
    height: 5,
    left: width / 2 - 69.5,
    bottom: 8,
    backgroundColor: '#000000',
    borderRadius: 100,
    zIndex: 10,
  },
});