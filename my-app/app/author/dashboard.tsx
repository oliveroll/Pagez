import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock data - Replace with real API calls
const mockUserData = {
  name: 'Author Name',
  profileImage: 'https://via.placeholder.com/60x60/FF6B6B/FFFFFF?text=A',
  engagementScore: 8.2,
  stats: {
    readers: 472,
    likes: 4800, // 4.8k
    comments: 3100, // 3.1k
    books: 12,
    notes: 392,
    posts: 1900, // 1.9k
  },
  trends: {
    readers: 'up' as const,
    likes: 'up' as const,
    comments: 'down' as const,
  }
};

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'neutral' }) => {
  const color = trend === 'up' ? '#4CAF50' : trend === 'down' ? '#FF6B6B' : '#9E9E9E';
  const iconName = trend === 'up' ? 'arrow-up' : trend === 'down' ? 'arrow-down' : 'remove';
  
  return <Ionicons name={iconName} size={16} color={color} />;
};

const StatCard = ({ 
  value, 
  label, 
  trend, 
  color = '#4CAF50' 
}: { 
  value: string | number; 
  label: string; 
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}) => (
  <View style={styles.statItem}>
    <View style={styles.statValueContainer}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      {trend && <TrendIcon trend={trend} />}
    </View>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const TipCard = ({ 
  category, 
  title, 
  description 
}: { 
  category: string; 
  title: string; 
  description: string; 
}) => (
  <TouchableOpacity 
    style={styles.tipCard}
    onPress={() => router.push('/tips' as any)} // TODO: Navigate to specific tip
  >
    <Text style={styles.tipCategory}>{category}</Text>
    <Text style={styles.tipTitle}>{title}</Text>
    <Text style={styles.tipDescription}>{description}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  // TODO: Replace with real API call
  const userData = mockUserData;

  const handleNavigation = (destination: string) => {
    router.push(`/${destination}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F7BF7" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Author's Space</Text>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => handleNavigation('settings')}
          >
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handleNavigation('profile')}>
            <Image 
              source={{ uri: userData.profileImage }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => handleNavigation('books')}
        >
          <Text style={styles.tabText}>Books</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => handleNavigation('notes')}
        >
          <Text style={styles.tabText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => handleNavigation('community')}
        >
          <Text style={styles.tabText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => handleNavigation('you')}
        >
          <Text style={styles.tabText}>You</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Engagement Score */}
        <View style={styles.engagementSection}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreNumber}>{userData.engagementScore}</Text>
          </View>
          <Text style={styles.scoreLabel}>Engagement Score</Text>
        </View>

        {/* Engagement Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Engagement Stats</Text>
          <View style={styles.statsRow}>
            <StatCard 
              value={userData.stats.readers}
              label="Readers"
              trend={userData.trends.readers}
              color="#4CAF50"
            />
            <StatCard 
              value={formatNumber(userData.stats.likes)}
              label="Likes"
              trend={userData.trends.likes}
              color="#4CAF50"
            />
            <StatCard 
              value={formatNumber(userData.stats.comments)}
              label="Comments"
              trend={userData.trends.comments}
              color="#FF6B6B"
            />
          </View>
        </View>

        {/* Contribution Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Contribution Stats</Text>
          <View style={styles.statsRow}>
            <StatCard 
              value={userData.stats.books}
              label="Books"
              color="#333"
            />
            <StatCard 
              value={userData.stats.notes}
              label="Notes"
              color="#333"
            />
            <StatCard 
              value={formatNumber(userData.stats.posts)}
              label="Posts"
              color="#333"
            />
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Tips based on your stats</Text>
          <View style={styles.tipsContainer}>
            <TipCard 
              category="Impression"
              title="Talk & engage with your audience to get them to know who you really are."
              description=""
            />
            <TipCard 
              category="Content Creation"
              title="Talk & engage with your audience to get them to know who you really are."
              description=""
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#4F7BF7',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsButton: {
    padding: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
  },
  tabContainer: {
    backgroundColor: '#4F7BF7',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabText: {
    color: 'white',
    fontFamily: 'Bogart-Bold-Trial',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  engagementSection: {
    backgroundColor: '#4F7BF7',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreNumber: {
    fontSize: 48,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
  },
  scoreLabel: {
    fontSize: 18,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'white',
  },
  statsCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#9E9E9E',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 32,
    fontFamily: 'Bogart-Bold-Trial',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  tipsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  tipsContainer: {
    gap: 16,
  },
  tipCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipCategory: {
    fontSize: 14,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
    lineHeight: 24,
  },
  tipDescription: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
});