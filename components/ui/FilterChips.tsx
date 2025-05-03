import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

type FilterChipsProps = {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
};

export default function FilterChips({ 
  options, 
  selectedOption, 
  onSelect 
}: FilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.chip,
            selectedOption === option && styles.selectedChip
          ]}
          onPress={() => onSelect(option)}
        >
          <Text
            style={[
              styles.chipText,
              selectedOption === option && styles.selectedChipText
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: '#7C3AED',
  },
  chipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B5563',
  },
  selectedChipText: {
    color: '#FFFFFF',
  },
});