import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Share2, QrCode } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressGrid from '@/components/collection/ProgressGrid';
import CollectionInfo from '@/components/collection/CollectionInfo';
import NFTClaimButton from '@/components/collection/NFTClaimButton';
import { useProject } from '@/context/ProjectContext';

export default function CollectionScreen() {
  const [activeTab, setActiveTab] = useState('grid');
  const { activeProject, progress } = useProject();
  const router = useRouter();

  const handleScanPress = () => {
    router.push('/scan');
  };

  const handleShare = () => {
    // Share functionality would be implemented here
    // This is a placeholder for the actual implementation
  };

  if (!activeProject) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.noProjectContainer}>
          <Text style={styles.noProjectTitle}>No Active Project</Text>
          <Text style={styles.noProjectText}>
            Discover and select a project to start collecting art pieces.
          </Text>
          <TouchableOpacity
            style={styles.discoverButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.discoverButtonText}>Discover Projects</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isComplete = progress.completionPercentage === 100;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{activeProject.title}</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Share2 color="#1F2937" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#7C3AED', '#5B21B6']}
          style={styles.progressContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Your Collection</Text>
            <View style={styles.progressBadge}>
              <Text style={styles.progressBadgeText}>
                {progress.collectedCount}/{progress.totalCount}
              </Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar,
                { width: `${progress.completionPercentage}%` }
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {isComplete 
              ? 'Collection complete! Claim your NFT reward.' 
              : `${progress.completionPercentage}% complete - Keep exploring!`}
          </Text>
        </LinearGradient>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'grid' && styles.activeTab]}
            onPress={() => setActiveTab('grid')}
          >
            <Text style={[styles.tabText, activeTab === 'grid' && styles.activeTabText]}>
              Grid View
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'info' && styles.activeTab]}
            onPress={() => setActiveTab('info')}
          >
            <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>
              Project Info
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'grid' ? (
          <ProgressGrid
            gridSize={activeProject.gridSize}
            collectedPositions={progress.collectedPositions}
            imageUrls={activeProject.gridImages}
          />
        ) : (
          <CollectionInfo project={activeProject} />
        )}

        {isComplete && (
          <NFTClaimButton projectId={activeProject.id} />
        )}
      </ScrollView>

      {!isComplete && (
        <TouchableOpacity
          style={styles.scanButton}
          onPress={handleScanPress}
        >
          <QrCode color="#FFFFFF" size={24} />
          <Text style={styles.scanButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
      )}
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
  shareButton: {
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
    paddingBottom: 80,
  },
  progressContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  progressBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
  },
  progressBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
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
  scanButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scanButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  noProjectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  noProjectTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 22,
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  noProjectText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  discoverButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#7C3AED',
    borderRadius: 8,
  },
  discoverButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});