import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, MapPin } from 'lucide-react-native';
import { useProject } from '@/context/ProjectContext';

type ProjectCardProps = {
  project: any; // Replace with proper type
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const { setActiveProject } = useProject();

  const handlePress = () => {
    setActiveProject(project);
    router.push('/collection');
  };

  // Format date in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: project.imageUrl }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{project.title}</Text>

        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Calendar size={14} color="#6B7280" />
            <Text style={styles.metaText}>
              Until {formatDate(project.endDate)}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.metaText}>
              {project.locationsCount} Locations
            </Text>
          </View>
        </View>

        <View style={styles.progress}>
          <View style={[styles.progressBar, { width: `${project.progressPercentage}%` }]} />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.progressText}>
            {project.progressPercentage}% Complete
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {project.gridSize === 4 ? '2×2' : 
               project.gridSize === 9 ? '3×3' : 
               project.gridSize === 16 ? '4×4' : 
               project.gridSize === 25 ? '5×5' : '6×6'} Grid
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  progress: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#7C3AED',
    borderRadius: 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  badgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#4B5563',
  },
});