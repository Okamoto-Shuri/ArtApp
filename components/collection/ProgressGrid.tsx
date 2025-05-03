import React, { useMemo } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

type ProgressGridProps = {
  gridSize: number;
  collectedPositions: number[];
  imageUrls: string[];
};

export default function ProgressGrid({ gridSize, collectedPositions, imageUrls }: ProgressGridProps) {
  // Calculate grid dimensions
  const gridDimension = Math.sqrt(gridSize);
  
  // Create grid cells
  const grid = useMemo(() => {
    const cells = [];
    
    for (let i = 0; i < gridSize; i++) {
      const isCollected = collectedPositions.includes(i);
      const imageUrl = isCollected && imageUrls[i] ? imageUrls[i] : null;
      
      cells.push({
        index: i,
        isCollected,
        imageUrl,
      });
    }
    
    return cells;
  }, [gridSize, collectedPositions, imageUrls]);

  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.grid,
          {
            flexDirection: 'row',
            flexWrap: 'wrap',
          }
        ]}
      >
        {grid.map((cell) => (
          <View
            key={cell.index}
            style={[
              styles.cell,
              {
                width: `${100 / gridDimension}%`,
                height: undefined,
                aspectRatio: 1,
              },
            ]}
          >
            {cell.isCollected && cell.imageUrl ? (
              <Image
                source={{ uri: cell.imageUrl }}
                style={styles.cellImage}
              />
            ) : (
              <View 
                style={[
                  styles.cellPlaceholder,
                  cell.isCollected ? styles.cellCollected : {}
                ]}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  grid: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cell: {
    padding: 2,
  },
  cellImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  cellPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  cellCollected: {
    backgroundColor: '#E5E7EB',
  },
});