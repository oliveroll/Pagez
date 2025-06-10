import React, { useState } from 'react';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { WelcomeScreen5 } from '../../src/components/login';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ inOnboarding }) {
  // Google AuthSession setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '407408718192.apps.googleusercontent.com',
    iosClientId: '',
    androidClientId: '',
    webClientId: '',
  });

  // Handle Google Auth response
  React.useEffect(() => {
    if (response?.type === 'success') {
      router.replace('/(auth)/create-profile');
    }
  }, [response]);

  const handleLogin = (username: string, password: string) => {
    // Handle login logic here
    if (username.trim() && password.trim()) {
      router.replace('/(auth)/create-profile');
    } else {
      router.replace('/(auth)/create-profile');
    }
  };

  const handleSocialLogin = (platform: string) => {
    if (platform === 'Google') {
      promptAsync();
    } else {
      router.replace('/(auth)/create-profile');
    }
  };

  const handleUsePhone = () => {
    router.push('/(auth)/phone');
  };

  const handleJoinNow = () => {
    router.replace('/(auth)/register');
  };

  return (
    <WelcomeScreen5
      onLogin={handleLogin}
      onSocialLogin={handleSocialLogin}
      onUsePhone={handleUsePhone}
      onJoinNow={handleJoinNow}
      inOnboarding={inOnboarding}
    />
  );
}