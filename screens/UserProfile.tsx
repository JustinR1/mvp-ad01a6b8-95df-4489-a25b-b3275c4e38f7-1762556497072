import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface UserProfileProps {
  onNavigateToFeed: () => void;
}

export default function UserProfile({ onNavigateToFeed }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'photos' | 'videos'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const stats = [
    { label: 'Posts', value: '124' },
    { label: 'Followers', value: '2.5K' },
    { label: 'Following', value: '892' },
  ];

  const posts = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateToFeed}>
          <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#1C1C1E" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.profileSection}>
          <LinearGradient
            colors={['#7B79E8', '#5856D6']}
            style={styles.avatarGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.avatarInner}>
              <Text style={styles.avatarLarge}>👤</Text>
            </View>
          </LinearGradient>

          <Text style={styles.userName}>Alex Thompson</Text>
          <Text style={styles.userBio}>
            Designer & Developer ✨ Building beautiful experiences 🚀
          </Text>
          <Text style={styles.userLocation}>📍 San Francisco, CA</Text>

          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <LinearGradient
                colors={isFollowing ? ['#F2F2F7', '#F2F2F7'] : ['#5856D6', '#7B79E8']}
                style={styles.followGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons
                  name={isFollowing ? 'checkmark' : 'person-add'}
                  size={18}
                  color={isFollowing ? '#1C1C1E' : '#FFFFFF'}
                />
                <Text
                  style={[
                    styles.followButtonText,
                    isFollowing && styles.followingButtonText,
                  ]}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.messageButton}>
              <Ionicons name="chatbubble-outline" size={18} color="#5856D6" />
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'posts' && styles.tabActive,
            ]}
            onPress={() => setActiveTab('posts')}
          >
            <Ionicons
              name="grid-outline"
              size={22}
              color={activeTab === 'posts' ? '#5856D6' : '#8E8E93'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'posts' && styles.tabTextActive,
              ]}
            >
              Posts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'photos' && styles.tabActive,
            ]}
            onPress={() => setActiveTab('photos')}
          >
            <Ionicons
              name="image-outline"
              size={22}
              color={activeTab === 'photos' ? '#5856D6' : '#8E8E93'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'photos' && styles.tabTextActive,
              ]}
            >
              Photos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'videos' && styles.tabActive,
            ]}
            onPress={() => setActiveTab('videos')}
          >
            <Ionicons
              name="play-outline"
              size={22}
              color={activeTab === 'videos' ? '#5856D6' : '#8E8E93'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'videos' && styles.tabTextActive,
              ]}
            >
              Videos
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {posts.map((post) => (
            <TouchableOpacity key={post} style={styles.gridItem}>
              <LinearGradient
                colors={['#7B79E8', '#5856D6']}
                style={styles.gridGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="image-outline" size={32} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  avatarGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    marginBottom: 16,
  },
  avatarInner: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLarge: {
    fontSize: 56,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  userBio: {
    fontSize: 15,
    color: '#1C1C1E',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  userLocation: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 13,
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  followButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  followingButton: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  followGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  followButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  followingButtonText: {
    color: '#1C1C1E',
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    gap: 8,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5856D6',
    fontFamily: 'Inter-SemiBold',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#5856D6',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
  },
  tabTextActive: {
    color: '#5856D6',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  gridItem: {
    width: (width - 6) / 3,
    height: (width - 6) / 3,
    padding: 2,
  },
  gridGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});