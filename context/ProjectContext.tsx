import React, { createContext, useState, useContext } from 'react';

// Define types
type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  gridSize: number;
  gridImages: string[];
  locationsCount: number;
  owner: string;
  progressPercentage: number;
  likes: number;
  nftImage?: string;
  galleryImages?: string[];
};

type Location = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  isCollected: boolean;
  gridPosition: number;
  image?: string;
};

type Progress = {
  collectedCount: number;
  totalCount: number;
  completionPercentage: number;
  collectedPositions: number[];
};

type ProjectContextType = {
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  projectLocations: Location[];
  progress: Progress;
  updateProgress: (newProgress: Progress) => void;
};

// Create context
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Mock data
const mockLocations: Location[] = [
  {
    id: '1',
    projectId: '1',
    title: 'City Square',
    description: 'Central square with historical monuments.',
    address: '123 Main St, City Center',
    latitude: 35.6812,
    longitude: 139.7671,
    isCollected: true,
    gridPosition: 0,
    image: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    projectId: '1',
    title: 'Art Museum',
    description: 'Contemporary art museum with rotating exhibitions.',
    address: '456 Culture Ave, Arts District',
    latitude: 35.6820,
    longitude: 139.7680,
    isCollected: false,
    gridPosition: 1,
  },
  {
    id: '3',
    projectId: '1',
    title: 'Riverside Park',
    description: 'Peaceful park with river views and sculptures.',
    address: '789 River Rd, Waterfront',
    latitude: 35.6800,
    longitude: 139.7660,
    isCollected: true,
    gridPosition: 4,
  },
];

// Provider component
export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [projectLocations, setProjectLocations] = useState<Location[]>(mockLocations);
  const [progress, setProgress] = useState<Progress>({
    collectedCount: 2,
    totalCount: 9,
    completionPercentage: 22,
    collectedPositions: [0, 4],
  });

  const updateProgress = (newProgress: Progress) => {
    setProgress(newProgress);
    
    // Update locations collection status based on new progress
    const updatedLocations = projectLocations.map(location => {
      return {
        ...location,
        isCollected: newProgress.collectedPositions.includes(location.gridPosition),
      };
    });
    
    setProjectLocations(updatedLocations);
  };

  return (
    <ProjectContext.Provider 
      value={{ 
        activeProject, 
        setActiveProject, 
        projectLocations, 
        progress, 
        updateProgress 
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

// Hook for using project context
export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}