// Mock API service for development
// In production, this would make actual API calls

export async function fetchProjects() {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: '1',
      title: 'Urban Art Discovery',
      imageUrl: 'https://example.com/image1.jpg',
      // other project properties
    },
    // more projects
  ];
}

export async function scanQrCode(qrData: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock success response
  return {
    success: true,
    message: 'New piece collected!',
    progress: {
      collectedCount: 3,
      totalCount: 9,
      completionPercentage: 33,
      collectedPositions: [0, 4, 8],
    },
    is_completed: false,
  };
}

export async function claimNFT(projectId: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock success response
  return {
    success: true,
    message: 'NFT claimed successfully',
    nft_data: {
      id: 'nft123',
      tokenId: 456,
      contractAddress: '0x123...',
      transactionHash: '0xabc...',
    },
  };
}

export async function fetchUserProgress(userId: string, projectId: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock response
  return {
    collectedCount: 2,
    totalCount: 9,
    completionPercentage: 22,
    collectedPositions: [0, 4],
  };
}

export async function fetchProjectLocations(projectId: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock locations
  return [
    {
      id: '1',
      title: 'City Square',
      address: '123 Main St',
      latitude: 35.6812,
      longitude: 139.7671,
      isCollected: true,
    },
    // more locations
  ];
}