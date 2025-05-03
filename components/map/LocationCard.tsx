import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { MapPin, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';

type LocationCardProps = {
  location: any;
  onClose: () => void;
};

export default function LocationCard({ location, onClose }: LocationCardProps) {
  const router = useRouter();

  const handleScanPress = () => {
    router.push('/scan');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <X color="#1F2937" size={20} />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusDot,
            location.isCollected ? styles.collectedDot : styles.uncollectedDot
          ]} />
          <Text style={styles.statusText}>
            {location.isCollected ? 'Collected' : 'Not Collected'}
          </Text>
        </View>
        <Text style={styles.title}>{location.title}</Text>
      </View>

      <View style={styles.addressContainer}>
        <MapPin color="#6B7280" size={16} />
        <Text style={styles.address}>{location.address}</Text>
      </View>

      <Text style={styles.description}>{location.description}</Text>

      {location.image && (
        <Image source={{ uri: location.image }} style={styles.image} />
      )}

      {!location.isCollected && (
        <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
          <Text style={styles.scanButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  header: {
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  collectedDot: {
    backgroundColor: '#10B981',
  },
  uncollectedDot: {
    backgroundColor: '#F59E0B',
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  title: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 20,
    color: '#1F2937',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  address: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    flex: 1,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 16,
  },
  scanButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  scanButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});