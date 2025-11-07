import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import UserProfile from './screens/UserProfile';
import PostFeed from './screens/PostFeed';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'feed' | 'profile'>('feed');
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {currentScreen === 'feed' ? (
        <PostFeed onNavigateToProfile={() => setCurrentScreen('profile')} />
      ) : (
        <UserProfile onNavigateToFeed={() => setCurrentScreen('feed')} />
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentScreen('feed')}
        >
          <Ionicons
            name={currentScreen === 'feed' ? 'home' : 'home-outline'}
            size={26}
            color={currentScreen === 'feed' ? '#5856D6' : '#8E8E93'}
          />
          <Text
            style={[
              styles.navLabel,
              currentScreen === 'feed' && styles.navLabelActive,
            ]}
          >
            Feed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="search-outline" size={26} color="#8E8E93" />
          <Text style={styles.navLabel}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createButton}>
          <View style={styles.createButtonInner}>
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="notifications-outline" size={26} color="#8E8E93" />
          <Text style={styles.navLabel}>Alerts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentScreen('profile')}
        >
          <Ionicons
            name={currentScreen === 'profile' ? 'person' : 'person-outline'}
            size={26}
            color={currentScreen === 'profile' ? '#5856D6' : '#8E8E93'}
          />
          <Text
            style={[
              styles.navLabel,
              currentScreen === 'profile' && styles.navLabelActive,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    backgroundColor: '#FFFFFF',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navLabel: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 4,
    fontFamily: 'Inter-Medium',
  },
  navLabelActive: {
    color: '#5856D6',
  },
  createButton: {
    marginTop: -24,
  },
  createButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5856D6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5856D6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});