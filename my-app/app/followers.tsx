import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';

// Search icon SVG
const SearchIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_0_1801)">
<path d="M15.7138 6.8382C18.1647 9.28913 18.1647 13.2629 15.7138 15.7138C13.2629 18.1647 9.28913 18.1647 6.8382 15.7138C4.38727 13.2629 4.38727 9.28913 6.8382 6.8382C9.28913 4.38727 13.2629 4.38727 15.7138 6.8382Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 19L15.71 15.71" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_0_1801">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

// Mock data for followers
const FOLLOWERS = [
  {
    id: '1',
    name: 'Jamal Ali',
    username: 'jamal',
    books: 493,
    points: '3K',
    profileImage: require('../src/assets/images/homepage/profile.jpg'),
    isFollowing: false,
  },
  {
    id: '2',
    name: 'Jamal Ali',
    username: 'jamal',
    books: 493,
    points: '3K',
    profileImage: require('../src/assets/images/Book_details/Authors thoughts/profile.jpg'),
    isFollowing: true,
  },
  {
    id: '3',
    name: 'Jamal Ali',
    username: 'jamal',
    books: 493,
    points: '3K',
    profileImage: require('../src/assets/images/homepage/profile.jpg'),
    isFollowing: true,
  },
  {
    id: '4',
    name: 'Jamal Ali',
    username: 'jamal',
    books: 493,
    points: '3K',
    profileImage: require('../src/assets/images/Book_details/Authors thoughts/profile.jpg'),
    isFollowing: false,
  },
  {
    id: '5',
    name: 'Jamal Ali',
    username: 'jamal',
    books: 493,
    points: '3K',
    profileImage: require('../src/assets/images/homepage/profile.jpg'),
    isFollowing: false,
  },
  {
    id: '6',
    name: 'Jamal Ali',
    username: 'jamal',
    books: 493,
    points: '3K',
    profileImage: require('../src/assets/images/Book_details/Authors thoughts/profile.jpg'),
    isFollowing: true,
  },
  {
    id: '7',
    name: 'Jamal Ali',
    username: 'jamal',
    books: 493,
    points: '3K',
    profileImage: require('../src/assets/images/homepage/profile.jpg'),
    isFollowing: false,
  },
  {
    id: '8',
    name: 'Jamal Ali',
    username: 'jamal',
    books: 493,
    points: '3K',
    profileImage: require('../src/assets/images/Book_details/Authors thoughts/profile.jpg'),
    isFollowing: true,
  },
];

interface FollowerItemProps {
  follower: {
    id: string;
    name: string;
    username: string;
    books: number;
    points: string;
    profileImage: any;
    isFollowing: boolean;
  };
}

const FollowerItem: React.FC<FollowerItemProps> = ({ follower }) => {
  const [isFollowing, setIsFollowing] = React.useState(follower.isFollowing);

  return (
    <View style={styles.followerItemContainer}>
      <View style={styles.followerItem}>
        <View style={styles.followerInfo}>
          <Image source={follower.profileImage} style={styles.followerProfileImage} />
          <View style={styles.textContainer}>
            <Text style={styles.followerName}>{follower.name}</Text>
            <Text style={styles.followerStats}>{follower.books} Books · {follower.points} Points</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={[
            styles.followButton, 
            isFollowing ? styles.followingButton : styles.followButton
          ]}
          onPress={() => setIsFollowing(!isFollowing)}
        >
          <Text style={[
            styles.followButtonText,
            isFollowing ? styles.followingButtonText : styles.followButtonText
          ]}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function FollowersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="#EB4D2A" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Followers</Text>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.searchButton}>
              <SvgXml xml={SearchIcon} width={24} height={24} />
            </TouchableOpacity>
            <Image 
              source={require('../src/assets/images/homepage/profile.jpg')} 
              style={styles.profileImage}
            />
          </View>
        </View>
        <View style={styles.headerSeparator} />
      </View>
      
      <FlatList
        data={FOLLOWERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FollowerItem follower={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF3EC',
  },
  headerContainer: {
    backgroundColor: '#FCF3EC',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FCF3EC',
    height: 60,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerSeparator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(235, 77, 42, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Medium-trial',
    color: '#1E1E1E',
  },
  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  listContainer: {
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FCF3EC',
  },
  followerItemContainer: {
    marginBottom: 12,
  },
  followerItem: {
    width: 320,
    height: 71,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.18)',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 64.815,
    },
    shadowOpacity: 0.03,
    shadowRadius: 46.852,
    elevation: 3,
  },
  followerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followerProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 12,
  },
  followerName: {
    fontSize: 16,
    fontFamily: 'Bogart-Medium-trial',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  followerStats: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-trial',
    color: '#666666',
  },
  followButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(254, 119, 42, 0.26)',
  },
  followingButton: {
    backgroundColor: '#F5F5F5',
  },
  followButtonText: {
    fontSize: 14,
    fontFamily: 'Bogart-Medium-trial',
    color: '#EB4D2A',
  },
  followingButtonText: {
    color: '#1E1E1E',
  },
}); 