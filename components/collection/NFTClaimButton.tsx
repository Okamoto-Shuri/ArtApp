import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { Award } from 'lucide-react-native';
import { claimNFT } from '@/services/apiService';

type NFTClaimButtonProps = {
  projectId: string;
};

export default function NFTClaimButton({ projectId }: NFTClaimButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);

  const handleClaim = async () => {
    setIsLoading(true);
    
    try {
      const response = await claimNFT(projectId);
      
      if (response.success) {
        setIsClaimed(true);
        Alert.alert(
          'NFT Claimed!',
          'Congratulations! Your NFT has been sent to your wallet.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Claim Failed',
          response.message || 'Failed to claim NFT. Please try again later.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while claiming your NFT. Please try again later.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isClaimed) {
    return (
      <TouchableOpacity style={[styles.button, styles.claimedButton]} disabled>
        <Award color="#FFFFFF" size={24} />
        <Text style={styles.buttonText}>NFT Claimed!</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={handleClaim}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <>
          <Award color="#FFFFFF" size={24} />
          <Text style={styles.buttonText}>Claim NFT Reward</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 8,
  },
  claimedButton: {
    backgroundColor: '#10B981',
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});