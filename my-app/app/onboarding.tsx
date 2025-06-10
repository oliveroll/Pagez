import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { OnboardingSlide } from "../src/components/OnboardingSlide";
import { PagezLogo } from "../src/components/Splash"; // Import your new SVG component
import { WelcomeScreen3 } from "../src/components/onboarding"; // Import the new welcome screen
import { COLORS, SIZES } from "../src/constants/theme";
import LoginScreen from "./(auth)/login"; // Adjust path as needed
const { width, height } = Dimensions.get("window");

// 🐛 DEBUG MODE - Set to true to enable manual controls
const DEBUG_MODE = true;

// Import the specific splash images
const splash3Image = require("../src/assets/images/3splash.png");

// Custom splash slide component using SVG
const SplashSlide = () => {
  return (
    <View style={styles.splashSlide}>
      <PagezLogo width={width * 0.6} />
    </View>
  );
};

// Welcome Screen component wrapper
const WelcomeSlide = () => {
  return (
    <View style={styles.welcomeSlide}>
      <WelcomeScreen3 />
    </View>
  );
};

const Splash3Slide = () => {
  return (
    <View style={styles.imageSlide}>
      <Image
        source={splash3Image}
        style={styles.splashImage}
        resizeMode="cover"
      />
    </View>
  );
};

const slides = [
  {
    id: "1",
    component: SplashSlide,
    title: "Splash",
    description: "Logo animation",
  },
  {
    id: "2",
    component: WelcomeSlide,
    title: "Welcome Screen 3",
    description: "Read books & explore stories",
  },
  {
    id: "3",
    component: Splash3Slide,
    title: "Third Screen",
    description: "Additional onboarding",
  },
  {
    id: "4",
    component: () => <LoginScreen inOnboarding />,
    title: "Login",
    description: "Authentication screen",
    isLogin: true,
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(DEBUG_MODE ? 1 : 0); // Start at WelcomeScreen3 in debug mode
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const timerRef = useRef<number | null>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    const index = viewableItems[0]?.index ?? 0;
    setCurrentIndex(index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const scrollToPrevious = () => {
    if (currentIndex > 0) {
      slidesRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const goToSlide = (index: number) => {
    slidesRef.current?.scrollToIndex({ index });
  };

  // Auto-advance logic (only when not in debug mode)
  useEffect(() => {
    if (DEBUG_MODE) return; // Skip auto-advance in debug mode

    // Auto-advance from splash slide after 2 seconds
    if (currentIndex === 0) {
      timerRef.current = setTimeout(() => {
        scrollToNext();
      }, 2000);
    }
    // Auto-advance from slides 2 and 3 after 3 seconds each
    else if (currentIndex === 1 || currentIndex === 2) {
      timerRef.current = setTimeout(() => {
        scrollToNext();
      }, 3000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex]);

  const renderSlide = ({ item, index }: any) => {
    // If the slide has a custom component (like our SVG splash), render that
    if (item.component) {
      const Component = item.component;
      return (
        <TouchableOpacity 
          style={styles.slide} 
          onPress={() => DEBUG_MODE && scrollToNext()}
          activeOpacity={DEBUG_MODE ? 0.8 : 1}
        >
          <Component />
          
          {/* Debug info overlay */}
          {DEBUG_MODE && (
            <View style={styles.debugInfo}>
              <Text style={styles.debugText}>{item.title}</Text>
              <Text style={styles.debugSubtext}>{item.description}</Text>
              <Text style={styles.debugIndex}>Slide {index + 1}/{slides.length}</Text>
        </View>
          )}
        </TouchableOpacity>
      );
    }
    
    // Otherwise, render the regular OnboardingSlide
    return <OnboardingSlide {...item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderSlide}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        scrollEnabled={DEBUG_MODE || currentIndex >= 3} // Enable manual scroll in debug mode or on login screen
      />
      
      {/* Debug Controls */}
      {DEBUG_MODE && (
        <View style={styles.debugControls}>
          <TouchableOpacity 
            style={[styles.debugButton, currentIndex === 0 && styles.debugButtonDisabled]} 
            onPress={scrollToPrevious}
            disabled={currentIndex === 0}
          >
            <Text style={styles.debugButtonText}>← Prev</Text>
          </TouchableOpacity>
          
          <View style={styles.slideButtons}>
            {slides.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.slideButton,
                  currentIndex === index && styles.slideButtonActive
                ]}
                onPress={() => goToSlide(index)}
              >
                <Text style={[
                  styles.slideButtonText,
                  currentIndex === index && styles.slideButtonTextActive
                ]}>
                  {index + 1}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity 
            style={[styles.debugButton, currentIndex === slides.length - 1 && styles.debugButtonDisabled]} 
            onPress={scrollToNext}
            disabled={currentIndex === slides.length - 1}
          >
            <Text style={styles.debugButtonText}>Next →</Text>
          </TouchableOpacity>
    </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slide: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  splashSlide: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f3f0",
  },
  welcomeSlide: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  imageSlide: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f3f0",
  },
  splashImage: {
    width: "100%",
    height: "100%",
  },
  loginSlide: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f3f0",
  },
  loginText: {
    fontSize: 28,
    color: "#EB4D2A",
    fontWeight: "bold",
  },
  // Debug styles
  debugInfo: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 8,
  },
  debugText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  debugSubtext: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
  },
  debugIndex: {
    color: '#EB4D2A',
    fontSize: 12,
    marginTop: 5,
  },
  debugControls: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingVertical: 15,
  },
  debugButton: {
    backgroundColor: '#EB4D2A',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  debugButtonDisabled: {
    backgroundColor: '#666',
    opacity: 0.5,
  },
  debugButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  slideButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  slideButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideButtonActive: {
    backgroundColor: '#EB4D2A',
  },
  slideButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  slideButtonTextActive: {
    color: 'white',
  },
});
