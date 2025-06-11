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

const bookHeaderImage = require('../../assets/images/login/book-header.png');
const { width, height } = Dimensions.get('window');

interface WelcomeScreen5Props {
  onLogin?: (username: string, password: string) => void;
  onSocialLogin?: (platform: string) => void;
  onUsePhone?: () => void;
  onJoinNow?: () => void;
  onForgotPassword?: () => void;
  inOnboarding?: boolean;
}

export const WelcomeScreen5: React.FC<WelcomeScreen5Props> = ({
  onLogin,
  onSocialLogin,
  onUsePhone,
  onJoinNow,
  onForgotPassword,
  inOnboarding
}) => {
  return (
    <SafeAreaView style={[
      styles.container,
      inOnboarding && { width, height, paddingHorizontal: 0, paddingVertical: 0 }
    ]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCF3EC" />
      
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
            onForgotPassword={onForgotPassword}
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
    backgroundColor: '#FCF3EC',
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
    //width: Math.min(350, width * 0.9),
    //height: Math.min(220, height * 0.28),
    width: 197.958,
    height: 263.793,
    right: -5,
    top: -10,
    zIndex: 15,
  },
  bookHeaderImage: {
    width: '100%',
    height: '100%',
  },
  logo: {
    position: 'absolute',
    left: 25,
    top: 30,
    fontSize: 52,
    fontFamily: 'Bogart-Bold-trial',
    color: '#EB4D2A',
    fontWeight: 'normal',
    zIndex: 5,
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 0,
  },
  title: {
    fontSize: 48,
    fontFamily: 'Bogart-Bold-trial',
    color: '#EB4D2A',
    fontWeight: 'normal',
    marginBottom: 12,
  },
});
