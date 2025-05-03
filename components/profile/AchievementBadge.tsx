import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Trophy, Compass, Palette, Lock } from 'lucide-react-native';

type AchievementBadgeProps = {
  achievement: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string | null;
    progress?: number;
    total?: number;
  };
};

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const isUnlocked = !!achievement.unlockedAt;
  
  // Format date in a readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Choose icon based on the icon name
  const renderIcon = () => {
    switch (achievement.icon) {
      case 'trophy':
        return <Trophy color={isUnlocked ? '#F59E0B' : '#9CA3AF'} size={24} />;
      case 'compass':
        return <Compass color={isUnlocked ? '#3B82F6' : '#9CA3AF'} size={24} />;
      case 'palette':
        return <Palette color={isUnlocked ? '#EC4899' : '#9CA3AF'} size={24} />;
      default:
        return <Trophy color={isUnlocked ? '#F59E0B' : '#9CA3AF'} size={24} />;
    }
  };
  
  return (
    <View style={[styles.container, !isUnlocked && styles.lockedContainer]}>
      <View style={[styles.iconContainer, isUnlocked && styles.unlockedIconContainer]}>
        {renderIcon()}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{achievement.title}</Text>
          {!isUnlocked && <Lock color="#9CA3AF" size={14} />}
        </View>
        
        <Text style={styles.description}>{achievement.description}</Text>
        
        {isUnlocked ? (
          <Text style={styles.unlockedText}>
            Unlocked on {formatDate(achievement.unlockedAt!)}
          </Text>
        ) : achievement.progress !== undefined && achievement.total !== undefined ? (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${(achievement.progress / achievement.total) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {achievement.progress}/{achievement.total}
            </Text>
          </View>
        ) : (
          <Text style={styles.lockedText}>Not yet unlocked</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  lockedContainer: {
    opacity: 0.8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  unlockedIconContainer: {
    backgroundColor: '#FEF3C7',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  unlockedText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#059669',
  },
  lockedText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#9CA3AF',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#7C3AED',
    borderRadius: 3,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
});