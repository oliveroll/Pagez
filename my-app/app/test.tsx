import React from 'react';
import { SafeAreaView } from 'react-native';
import { TestFoundation } from '../src/components/TestFoundation';

export default function TestScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TestFoundation />
    </SafeAreaView>
  );
} 