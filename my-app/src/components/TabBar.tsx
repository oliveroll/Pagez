import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Svg, Path, Rect, G, ClipPath, Defs, LinearGradient, Stop } from 'react-native-svg';
import { router, usePathname } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface TabBarProps {
  // Optional props for future customization
}

// Home Icon Component
const HomeIcon: React.FC<{ isSelected: boolean }> = ({ isSelected }) => {
  const fillColor = isSelected ? '#EB4D2A' : '#1E1D19';
  const fillOpacity = isSelected ? 0.26 : 0;
  
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path 
        d="M3.734 7.764L10.1021 2.5543C11.2073 1.6502 12.7966 1.6503 13.9017 2.5547L20.267 7.764C20.731 8.143 21 8.712 21 9.311V17C21 18.105 20.105 19 19 19H5C3.895 19 3 18.105 3 17V9.312C3 8.712 3.269 8.143 3.734 7.764Z" 
        fill={isSelected ? '#FE772A' : 'transparent'}
        fillOpacity={fillOpacity}
        stroke={fillColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
};

// Community Icon Component
const CommunityIcon: React.FC<{ isSelected: boolean }> = ({ isSelected }) => {
  const strokeColor = isSelected ? '#EB4D2A' : '#1E1D19';
  
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path 
        d="M8.92 15.5007C9.701 16.2818 9.701 17.5481 8.92 18.3291C8.139 19.1102 6.873 19.1102 6.092 18.3291C5.311 17.5481 5.311 16.2818 6.092 15.5007C6.873 14.7197 8.139 14.7197 8.92 15.5007Z" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M17.908 15.5007C18.689 16.2818 18.689 17.5481 17.908 18.3291C17.127 19.1102 15.861 19.1102 15.08 18.3291C14.299 17.5481 14.299 16.2818 15.08 15.5007C15.861 14.7197 17.127 14.7197 17.908 15.5007Z" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M6.143 6.9537C6.924 7.7348 6.924 9.0011 6.143 9.7821C5.362 10.5632 4.096 10.5632 3.315 9.7821C2.534 9.0011 2.534 7.7348 3.315 6.9537C4.096 6.1727 5.362 6.1727 6.143 6.9537Z" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M13.414 1.6707C14.195 2.4518 14.195 3.7181 13.414 4.4992C12.633 5.2802 11.367 5.2802 10.586 4.4992C9.805 3.7181 9.805 2.4518 10.586 1.6707C11.367 0.8897 12.633 0.8897 13.414 1.6707Z" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M20.685 6.9537C21.466 7.7348 21.466 9.0011 20.685 9.7821C19.904 10.5632 18.638 10.5632 17.857 9.7821C17.076 9.0011 17.076 7.7348 17.857 6.9537C18.638 6.1727 19.904 6.1727 20.685 6.9537Z" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M13.414 9.0298C14.195 9.8108 14.195 11.0771 13.414 11.8582C12.633 12.6392 11.367 12.6392 10.586 11.8582C9.805 11.0771 9.805 9.8108 10.586 9.0298C11.367 8.2487 12.633 8.2487 13.414 9.0298Z" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M13.14 12.08L15.35 15.28" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M10.86 12.08L8.65 15.27" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M10.09 9.8999L6.64 8.9099" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M12 8.44V5.09" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M13.91 9.8999L17.36 8.9099" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
};

// Library Icon Component
const LibraryIcon: React.FC<{ isSelected: boolean }> = ({ isSelected }) => {
  const strokeColor = isSelected ? '#EB4D2A' : '#1E1D19';
  
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path 
        d="M14.475 9.0251C15.842 10.392 15.842 12.608 14.475 13.9749C13.108 15.3417 10.892 15.3417 9.525 13.9749C8.158 12.608 8.158 10.392 9.525 9.0251C10.892 7.6583 13.108 7.6583 14.475 9.0251Z" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M18.733 4H5.267C4.11 4 3.194 4.979 3.271 6.133L4.004 17.133C4.074 18.184 4.947 19 6 19H18C19.053 19 19.926 18.184 19.996 17.133L20.729 6.133C20.806 4.979 19.89 4 18.733 4Z" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M6 1H18" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
};

// Tab Item Component
interface TabItemProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  icon: React.ReactNode;
}

const TabItem: React.FC<TabItemProps> = ({ label, isSelected, onPress, icon }) => {
  return (
    <TouchableOpacity 
      style={[styles.tabItem, isSelected && styles.selectedTabItem]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isSelected && <View style={styles.selectionIndicator} />}
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={[styles.tabLabel, isSelected && styles.selectedTabLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export const TabBar: React.FC<TabBarProps> = () => {
  const pathname = usePathname();
  
  const getCurrentTab = () => {
    if (pathname === '/home' || pathname === '/') return 'home';
    if (pathname === '/community') return 'community';
    if (pathname === '/library') return 'library';
    return 'home';
  };

  const currentTab = getCurrentTab();

  const handleTabPress = (tabName: string) => {
    switch (tabName) {
      case 'home':
        router.push('/home');
        break;
      case 'community':
        router.push('/community');
        break;
      case 'library':
        router.push('/library');
        break;
    }
  };

  return (
    <View style={styles.tabBarContainer}>
      {/* Gradient overlay for fade effect */}
      <ExpoLinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.96)', 'rgba(255, 255, 255, 1)']}
        locations={[0, 0.4, 1]}
        style={styles.gradientOverlay}
      />
      
      {/* Blur background */}
      <BlurView intensity={15} tint="light" style={styles.blurContainer}>
        <View style={styles.tabContent}>
          <TabItem
            label="Home"
            isSelected={currentTab === 'home'}
            onPress={() => handleTabPress('home')}
            icon={<HomeIcon isSelected={currentTab === 'home'} />}
          />
          <TabItem
            label="Community"
            isSelected={currentTab === 'community'}
            onPress={() => handleTabPress('community')}
            icon={<CommunityIcon isSelected={currentTab === 'community'} />}
          />
          <TabItem
            label="Library"
            isSelected={currentTab === 'library'}
            onPress={() => handleTabPress('library')}
            icon={<LibraryIcon isSelected={currentTab === 'library'} />}
          />
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 144,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  tabContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 20,
    height: '100%',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 80,
    position: 'relative',
  },
  selectedTabItem: {
    backgroundColor: 'transparent',
  },
  selectionIndicator: {
    position: 'absolute',
    top: -6,
    alignSelf: 'center',
    width: 64,
    height: 2,
    backgroundColor: '#EB4D2A',
    borderRadius: 1,
  },
  iconContainer: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Bogart-Medium-trial',
    color: '#1E1D19',
    textAlign: 'center',
  },
  selectedTabLabel: {
    color: '#EB4D2A',
  },
});