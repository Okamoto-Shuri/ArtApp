import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, LogOut, Award } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import NFTCard from '@/components/profile/NFTCard';
import AchievementBadge from '@/components/profile/AchievementBadge';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('nfts');

  // Mock data for NFTs and achievements
  const nfts = [
    {
      id: '1',
      title: 'Urban Art Discovery',
      image: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      collectionDate: '2025-05-15',
    },
    {
      id: '2',
      title: 'City Landmarks',
      image: 'https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      collectionDate: '2025-04-02',
    },
  ];

  const achievements = [
    {
      id: '1',
      title: 'First Collection',
      description: 'Complete your first art collection',
      icon: 'trophy',
      unlockedAt: '2025-04-02',
    },
    {
      id: '2',
      title: 'Explorer',
      description: 'Visit 10 different art locations',
      icon: 'compass',
      unlockedAt: '2025-04-15',
    },
    {
      id: '3',
      title: 'Art Enthusiast',
      description: 'Complete 3 different art collections',
      icon: 'palette',
      unlockedAt: null,
      progress: 2,
      total: 3,
    },
  ];

  if (!user) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>Sign in to your account</Text>
          <Text style={styles.loginText}>
            Sign in to track your collections and earn NFT rewards.
          </Text>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login with LINE</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings color="#1F2937" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: user.profileImage || 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
              style={styles.profileImage} 
            />
            <View style={styles.profileMeta}>
              <Text style={styles.profileName}>{user.displayName}</Text>
              <Text style={styles.profileStats}>
                {nfts.length} NFTs • {achievements.filter(a => a.unlockedAt).length} Achievements
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <LogOut color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{nfts.length}</Text>
            <Text style={styles.statLabel}>Collections</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Locations</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Cities</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'nfts' && styles.activeTab]}
            onPress={() => setActiveTab('nfts')}
          >
            <Text style={[styles.tabText, activeTab === 'nfts' && styles.activeTabText]}>
              My NFTs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'achievements' && styles.activeTab]}
            onPress={() => setActiveTab('achievements')}
          >
            <Text style={[styles.tabText, activeTab === 'achievements' && styles.activeTabText]}>
              Achievements
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'nfts' ? (
          nfts.length > 0 ? (
            <View style={styles.nftGrid}>
              {nfts.map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Award color="#6B7280" size={48} />
              <Text style={styles.emptyTitle}>No NFTs Yet</Text>
              <Text style={styles.emptyText}>
                Complete art collections to earn unique NFT rewards.
              </Text>
            </View>
          )
        ) : (
          <View style={styles.achievementsList}>
            {achievements.map((achievement) => (
              <AchievementBadge 
                key={achievement.id}
                achievement={achievement}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerTitle: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 28,
    color: '#1F2937',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  profileCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileMeta: {
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  profileStats: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 24,
    color: '#1F2937',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#1F2937',
  },
  nftGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  achievementsList: {
    paddingHorizontal: 16,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loginTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 22,
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  loginText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  loginButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#00B900', // LINE green color
    borderRadius: 8,
  },
  loginButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});