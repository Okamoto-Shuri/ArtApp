import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Calendar, ExternalLink } from 'lucide-react-native';

type NFTCardProps = {
  nft: {
    id: string;
    title: string;
    image: string;
    collectionDate: string;
  };
};

export default function NFTCard({ nft }: NFTCardProps) {
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
      <Image source={{ uri: nft.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{nft.title} NFT</Text>
        <View style={styles.dateContainer}>
          <Calendar size={12} color="#6B7280" />
          <Text style={styles.date}>
            Collected on {formatDate(nft.collectionDate)}
          </Text>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View in Wallet</Text>
          <ExternalLink size={14} color="#7C3AED" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#7C3AED',
    borderRadius: 6,
  },
  viewButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#7C3AED',
    marginRight: 4,
  },
});