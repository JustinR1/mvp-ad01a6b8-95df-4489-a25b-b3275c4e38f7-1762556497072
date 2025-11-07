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

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
  isLiked: boolean;
  image?: boolean;
}

interface PostFeedProps {
  onNavigateToProfile: () => void;
}

export default function PostFeed({ onNavigateToProfile }: PostFeedProps) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: '👩\u200d💻',
      content: 'Just launched my new app! The journey has been incredible. Excited to share this with everyone 🚀✨',
      likes: 234,
      comments: 45,
      time: '2h ago',
      isLiked: false,
      image: true,
    },
    {
      id: 2,
      author: 'Mike Chen',
      avatar: '👨\u200d🎨',
      content: 'Beautiful sunset today at the beach 🌅 Sometimes you just need to pause and appreciate the moment',
      likes: 567,
      comments: 89,
      time: '5h ago',
      isLiked: true,
    },
    {
      id: 3,
      author: 'Emma Davis',
      avatar: '👩\u200d🔬',
      content: 'Excited to start my new research project! This is going to be groundbreaking 🔬💡',
      likes: 189,
      comments: 34,
      time: '1d ago',
      isLiked: false,
    },
  ]);

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Social</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="notifications-outline" size={24} color="#1C1C1E" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={onNavigateToProfile}>
            <Text style={styles.avatarSmall}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.feed}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContent}
      >
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.storyAdd}>
              <View style={styles.storyAddCircle}>
                <Ionicons name="add" size={24} color="#5856D6" />
              </View>
              <Text style={styles.storyLabel}>Your Story</Text>
            </TouchableOpacity>
            {['👩\u200d💼', '👨\u200d🚀', '👩\u200d🎨', '👨\u200d💻', '👩\u200d🔬'].map((emoji, index) => (
              <TouchableOpacity key={index} style={styles.story}>
                <LinearGradient
                  colors={['#5856D6', '#7B79E8']}
                  style={styles.storyGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.storyInner}>
                    <Text style={styles.storyAvatar}>{emoji}</Text>
                  </View>
                </LinearGradient>
                <Text style={styles.storyLabel}>User {index + 1}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.authorInfo}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatar}>{post.avatar}</Text>
                </View>
                <View>
                  <Text style={styles.authorName}>{post.author}</Text>
                  <Text style={styles.postTime}>{post.time}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-horizontal" size={20} color="#8E8E93" />
              </TouchableOpacity>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            {post.image && (
              <View style={styles.postImage}>
                <LinearGradient
                  colors={['#7B79E8', '#5856D6']}
                  style={styles.imageGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="image-outline" size={48} color="#FFFFFF" />
                </LinearGradient>
              </View>
            )}

            <View style={styles.postStats}>
              <Text style={styles.statsText}>{post.likes} likes</Text>
              <Text style={styles.statsText}>{post.comments} comments</Text>
            </View>

            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleLike(post.id)}
              >
                <Ionicons
                  name={post.isLiked ? 'heart' : 'heart-outline'}
                  size={24}
                  color={post.isLiked ? '#FF3B30' : '#1C1C1E'}
                />
                <Text
                  style={[
                    styles.actionText,
                    post.isLiked && styles.actionTextActive,
                  ]}
                >
                  Like
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={24} color="#1C1C1E" />
                <Text style={styles.actionText}>Comment</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="paper-plane-outline" size={24} color="#1C1C1E" />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    fontSize: 32,
    fontWeight: '700',
    color: '#1C1C1E',
    fontFamily: 'Inter-Bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  avatarSmall: {
    fontSize: 24,
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    paddingBottom: 20,
  },
  storiesContainer: {
    paddingVertical: 16,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  story: {
    alignItems: 'center',
    marginRight: 16,
  },
  storyAdd: {
    alignItems: 'center',
    marginRight: 16,
  },
  storyAddCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
  },
  storyGradient: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  storyInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyAvatar: {
    fontSize: 32,
  },
  storyLabel: {
    fontSize: 12,
    color: '#1C1C1E',
    marginTop: 6,
    fontFamily: 'Inter-Medium',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    fontSize: 24,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
    fontFamily: 'Inter-SemiBold',
  },
  postTime: {
    fontSize: 13,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    fontSize: 15,
    color: '#1C1C1E',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
  },
  postImage: {
    width: width,
    height: 240,
    marginBottom: 12,
  },
  imageGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  statsText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
  },
  postActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
  },
  actionTextActive: {
    color: '#FF3B30',
  },
});