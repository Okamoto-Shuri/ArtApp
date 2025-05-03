import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Calendar, MapPin, User, Clock } from 'lucide-react-native';

type CollectionInfoProps = {
  project: any;
};

export default function CollectionInfo({ project }: CollectionInfoProps) {
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
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>About the Project</Text>
      <Text style={styles.description}>{project.description}</Text>

      <View style={styles.metaContainer}>
        <View style={styles.metaItem}>
          <Calendar size={16} color="#6B7280" />
          <View style={styles.metaTextContainer}>
            <Text style={styles.metaLabel}>Start Date</Text>
            <Text style={styles.metaValue}>{formatDate(project.startDate)}</Text>
          </View>
        </View>

        <View style={styles.metaItem}>
          <Clock size={16} color="#6B7280" />
          <View style={styles.metaTextContainer}>
            <Text style={styles.metaLabel}>End Date</Text>
            <Text style={styles.metaValue}>{formatDate(project.endDate)}</Text>
          </View>
        </View>

        <View style={styles.metaItem}>
          <MapPin size={16} color="#6B7280" />
          <View style={styles.metaTextContainer}>
            <Text style={styles.metaLabel}>Locations</Text>
            <Text style={styles.metaValue}>{project.locationsCount} locations</Text>
          </View>
        </View>

        <View style={styles.metaItem}>
          <User size={16} color="#6B7280" />
          <View style={styles.metaTextContainer}>
            <Text style={styles.metaLabel}>Created By</Text>
            <Text style={styles.metaValue}>{project.owner}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Project Gallery</Text>
      <View style={styles.galleryContainer}>
        {project.galleryImages?.map((image: string, index: number) => (
          <Image 
            key={index}
            source={{ uri: image }}
            style={styles.galleryImage}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>NFT Reward</Text>
      <View style={styles.nftInfoContainer}>
        <Image
          source={{ uri: project.nftImage || 'https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          style={styles.nftImage}
        />
        <View style={styles.nftInfo}>
          <Text style={styles.nftTitle}>{project.title} NFT</Text>
          <Text style={styles.nftDescription}>
            Complete the collection to earn this exclusive NFT.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 16,
    lineHeight: 22,
  },
  metaContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaTextContainer: {
    marginLeft: 12,
  },
  metaLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  metaValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    marginLeft: -4,
    marginRight: -4,
  },
  galleryImage: {
    width: '33.3333%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
    margin: 4,
  },
  nftInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  nftImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  nftInfo: {
    flex: 1,
    marginLeft: 16,
  },
  nftTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  nftDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
});