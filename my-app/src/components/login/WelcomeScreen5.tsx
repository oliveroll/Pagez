"use client";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { LoginForm } from './LoginForm';
import { SocialLogin } from './SocialLogin';
import { NavigationDots } from './NavigationDots';
import { HomeIndicator } from './HomeIndicator';

const bookHeaderImage = require('../../assets/images/book-header.png');
const { width, height } = Dimensions.get('window');

interface WelcomeScreen5Props {
  onLogin?: (username: string, password: string) => void;
  onSocialLogin?: (platform: string) => void;
  onUsePhone?: () => void;
  onJoinNow?: () => void;
  inOnboarding?: boolean;
}

export const WelcomeScreen5: React.FC<WelcomeScreen5Props> = ({
  onLogin,
  onSocialLogin,
  onUsePhone,
  onJoinNow,
  inOnboarding
}) => {
  return (
    <SafeAreaView style={[
      styles.container,
      inOnboarding && { width, height, paddingHorizontal: 0, paddingVertical: 0 }
    ]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f3f0" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section with book header image */}
        <View style={styles.headerSection}>
          <View style={styles.bookHeaderContainer}>
            <Image source={bookHeaderImage} style={styles.bookHeaderImage} />
          </View>
          
          <Text style={styles.logo}>pagez</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Let's go...</Text>

          <LoginForm 
            onLogin={onLogin}
            onUsePhone={onUsePhone}
          />

          <SocialLogin 
            onSocialLogin={onSocialLogin}
            onJoinNow={onJoinNow}
          />

          <NavigationDots currentPage={2} totalPages={3} />
        </View>
      </ScrollView>
      
      <HomeIndicator />
    </SafeAreaView>
  );
};

export default WelcomeScreen5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3f0',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
    minHeight: height,
  },
  headerSection: {
    height: Math.min(280, height * 0.35),
    position: 'relative',
    overflow: 'visible',
    zIndex: 1,
  },
  bookHeaderContainer: {
    position: 'absolute',
    width: Math.min(350, width * 0.9),
    height: Math.min(220, height * 0.28),
    right: -80,
    top: -10,
    zIndex: 5,
  },
  bookHeaderImage: {
    width: '100%',
    height: '100%',
  },
  logo: {
    position: 'absolute',
    left: 25,
    top: 30,
    fontSize: Math.min(52, width * 0.13),
    fontFamily: 'Bogart-Bold-Trial',
    color: '#EB4D2A',
    fontWeight: 'bold',
    fontStyle: 'italic',
    zIndex: 10,
    textShadowColor: 'rgba(235, 77, 42, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    transform: [{ rotate: '-3deg' }],
    letterSpacing: 2,
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 0,
  },
  title: {
    fontSize: Math.min(48, width * 0.12),
    fontFamily: 'Bogart-Bold-Trial',
    color: '#EB4D2A',
    fontWeight: 'bold',
    fontStyle: 'italic',
    lineHeight: Math.min(54, width * 0.135),
    letterSpacing: 1,
    marginBottom: 12,
    textShadowColor: 'rgba(235, 77, 42, 0.15)',
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 3,
    transform: [{ rotate: '-1deg' }],
  },
});
