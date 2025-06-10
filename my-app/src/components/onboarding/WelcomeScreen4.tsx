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
import { SvgXml } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Import original assets
const coffeeBookImage = require('../../assets/images/onboarding/Rectangle_coffe_book.png');

// Original SVG strings
const yellowRectangleSvg = `<svg width="76" height="89" viewBox="0 0 76 89" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.573242 15.8955L55.0921 0.624189C70.1325 22.0922 75.25 48.2568 75.4404 73.268L20.9216 88.5393C19.6443 57.9926 14.0909 38.6626 0.573242 15.8955Z" fill="#FED12E"/>
</svg>`;

const blueRectangleSvg = `<svg width="55" height="66" viewBox="0 0 55 66" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M54.8763 11.8218L14.9538 0.639108C3.94014 16.3595 0.192751 35.519 0.053358 53.834L39.9759 65.0167C40.9112 42.6483 44.9778 28.4935 54.8763 11.8218Z" fill="#A3EFEB"/>
</svg>`;

const orangeRectangleSvg = `<svg width="90" height="106" viewBox="0 0 90 106" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M89.2939 18.9375L24.6776 0.837749C6.85142 26.2819 0.786095 57.2925 0.560485 86.9361L65.1769 105.036C66.6907 68.8315 73.2727 45.9213 89.2939 18.9375Z" fill="#EB5F2A"/>
</svg>`;

interface WelcomeScreen4Props {
  onComplete?: () => void;
  inOnboarding?: boolean;
}

export const WelcomeScreen4: React.FC<WelcomeScreen4Props> = ({ 
  onComplete, 
  inOnboarding 
}) => {
  return (
    <SafeAreaView style={[
      styles.container,
      inOnboarding && { width, height, paddingHorizontal: 0, paddingVertical: 0 }
    ]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCF3EC" />
      
      <View style={styles.content}>
        {/* Text Section at Top */}
        <View style={styles.textSection}>
          <Text style={styles.avidReadersText}>For avid{'\n'}readers</Text>
          <Text style={styles.storyTellersText}>& story{'\n'}tellers</Text>
          
          {/* Original Yellow Rectangle */}
          <SvgXml xml={yellowRectangleSvg} style={styles.yellowShape} />
          
          {/* Original Blue Rectangle */}
          <SvgXml xml={blueRectangleSvg} style={styles.blueShape} />
        </View>
        
        {/* Image Section */}
        <View style={styles.imageSection}>
          {/* Original Coffee Book Image - No adjustments */}
          <Image
            source={coffeeBookImage}
            style={styles.mainImage}
          />
          
          {/* Original Orange Rectangle */}
          <SvgXml xml={orangeRectangleSvg} style={styles.orangeShape} />
        </View>
        
        {/* Bottom Section with Navigation */}
        <View style={styles.bottomSection}>
          {/* Navigation and Home Indicator */}
          <View style={styles.bottomNavigation}>
            {/* Navigation Dots */}
            <View style={styles.dotsContainer}>
              <View style={[styles.dot, styles.inactiveDot]} />
              <View style={[styles.dot, styles.activeDot]} />
              <View style={[styles.dot, styles.inactiveDot]} />
            </View>
            
           
          </View>
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
  textSection: {
    height: height * 0.35,
    backgroundColor: '#FCF3EC',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    paddingTop: 60,
    position: 'relative',
  },
  avidReadersText: {
    color: '#EB4D2A',
    fontFamily: 'Bogart-Semibold-trial',
    fontSize: 60,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 48,
    letterSpacing: -1.1,
    textAlign: 'left',
    marginBottom: 5,
  },
  storyTellersText: {
    color: '#EB4D2A',
    fontFamily: 'Bogart-Medium-trial',
    fontSize: 60,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 48,
    letterSpacing: -1.1,
    textAlign: 'left',
  },
  yellowShape: {
    position: 'absolute',
    top: 60,
    right: -20,
    width: 76,
    height: 89,
    zIndex: 1,
  },
  blueShape: {
    position: 'absolute',
    bottom: -55,
    left: 30,
    width: 55,
    height: 66,
    zIndex: 1,
  },
  imageSection: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: 300,
    height: 366,
    transform: [{ rotate: '12deg' }],
    flexShrink: 0,
    resizeMode: 'cover',
    zIndex: 2,
    left: 80,
  },
  orangeShape: {
    position: 'absolute',
    bottom: -40,
    left: 70,
    width: 90,
    height: 106,
    zIndex: 2,
  },
  bottomSection: {
    height: 100,
    backgroundColor: '#FCF3EC',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  bottomNavigation: {
    alignItems: 'center',
    gap: 15,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    bottom: -40,
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

});

export default WelcomeScreen4; 