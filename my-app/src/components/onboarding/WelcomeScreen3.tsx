import React from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  Text, 
  Dimensions, 
  SafeAreaView,
  StatusBar 
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Import local assets
const readingPersonImage = require('../../assets/images/onboarding/Rectangle_reading_person.png');

// Pink Rectangle SVG Component
const PinkRectangle = ({ style }: { style?: any }) => (
  <Svg width="206" height="266" viewBox="0 0 206 266" style={style}>
    <Path d="M-72.1369 40.475L96.9422 -41.3174C162.125 41.7684 186.735 90.9298 205.927 183.973L36.8477 265.765C14.7887 166.768 -10.9525 118.449 -72.1369 40.475Z" fill="#FEB3D2"/>
  </Svg>
);

// Yellow Rectangle SVG Component
const YellowRectangle = ({ style }: { style?: any }) => (
  <Svg width="109" height="214" viewBox="0 0 109 214" style={style}>
    <Path d="M34.682 0L175.205 26.0287C177.737 106.341 170.677 147.573 140.523 213.269L3.03773e-06 187.24C31.0783 116.601 37.0653 75.3769 34.682 0Z" fill="#F5C106"/>
  </Svg>
);

interface WelcomeScreen3Props {
  onComplete?: () => void;
  inOnboarding?: boolean;
}

export const WelcomeScreen3: React.FC<WelcomeScreen3Props> = ({ 
  onComplete, 
  inOnboarding 
}) => {
  return (
    <SafeAreaView style={[
      styles.container,
      inOnboarding && { width, height, paddingHorizontal: 0, paddingVertical: 0 }
    ]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f3f0" />
      
      <View style={styles.content}>
        {/* Top Section - Image with decorative shapes */}
        <View style={styles.imageSection}>
          {/* Main reading person image */}
          <Image
            source={readingPersonImage}
            style={styles.mainImage}
          />
          
          {/* Pink rectangle decoration */}
          <PinkRectangle style={styles.pinkShape} />
          
          {/* Yellow rectangle decoration */}
          <YellowRectangle style={styles.yellowShape} />
        </View>
        
        {/* Bottom Section - Text with different background color */}
        <View style={styles.textSection}>
          <View style={styles.textContainer}>
            <Text style={styles.readBooksText}>read books</Text>
            <Text style={styles.exploreText}>& explore{'\n'}stories</Text>
          </View>
          
          {/* Navigation Dots */}
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={[styles.dot, styles.inactiveDot]} />
            <View style={[styles.dot, styles.inactiveDot]} />
          </View>
          
          {/* Home Indicator */}
          <View style={styles.homeIndicator} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF3EC',
  },
  content: {
    flex: 1,
  },
  imageSection: {
    width: width,
    height: height * 0.65,
    backgroundColor: '#FCF3EC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mainImage: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
    zIndex: 2,
  },
  pinkShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.45,
    height: height * 0.35,
    zIndex: 1,
  },
  yellowShape: {
    position: 'absolute',
    bottom: '-15%',
    right: 0,
    width: width * 0.3,
    height: height * 0.20,
    zIndex: 2,
  },
  textSection: {
    flex: 1,
    backgroundColor: '#FCF3EC',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 30,
  },
  textContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  readBooksText: {
    color: '#EB4D2A',
    fontFamily: 'Bogart-Bold-trial',
    fontSize: 72.676,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 60.294,
    letterSpacing: -1.454,
    textAlign: 'left',
  },
  exploreText: {
    color: '#EB4D2A',
    fontFamily: 'Bogart-Medium-trial',
    fontSize: 72.676,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 60.294,
    letterSpacing: -1.454,
    textAlign: 'left',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    backgroundColor: '#EB4D2A',
  },
  inactiveDot: {
    backgroundColor: '#D9D9D9',
  },
  homeIndicator: {
    width: 139,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
    opacity: 0.3,
  },
});

export default WelcomeScreen3;
