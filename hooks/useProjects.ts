import { useState, useCallback } from 'react';
import { fetchProjects } from '@/services/apiService';

export function useProjects() {
  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'Urban Art Discovery',
      description: 'Explore the vibrant street art scene across the city. Each QR code will reveal a piece of the urban art landscape, highlighting the work of local artists and the cultural significance of each location.',
      imageUrl: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      startDate: '2025-01-01',
      endDate: '2025-06-30',
      gridSize: 9,
      gridImages: [
        'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ],
      locationsCount: 9,
      owner: 'City Arts Council',
      progressPercentage: 22,
      likes: 124,
      galleryImages: [
        'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1755243/pexels-photo-1755243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1634278/pexels-photo-1634278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      ]
    },
    {
      id: '2',
      title: 'City Landmarks',
      description: 'Discover the iconic landmarks that define our city skyline.',
      imageUrl: 'https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      startDate: '2025-02-15',
      endDate: '2025-08-15',
      gridSize: 16,
      gridImages: [],
      locationsCount: 16,
      owner: 'Tourism Board',
      progressPercentage: 0,
      likes: 78,
    },
    {
      id: '3',
      title: 'Historical Trail',
      description: 'Follow the footsteps of history through significant locations.',
      imageUrl: 'https://images.pexels.com/photos/5825576/pexels-photo-5825576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      startDate: '2025-03-01',
      endDate: '2025-09-01',
      gridSize: 4,
      gridImages: [],
      locationsCount: 4,
      owner: 'Historical Society',
      progressPercentage: 0,
      likes: 45,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would fetch from an API
      // const data = await fetchProjects();
      // setProjects(data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    projects,
    isLoading,
    error,
    refresh,
  };
}