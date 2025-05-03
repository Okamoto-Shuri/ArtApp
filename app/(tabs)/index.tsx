import { useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useProjects } from '@/hooks/useProjects';
import ProjectCard from '@/components/projects/ProjectCard';
import SearchBar from '@/components/ui/SearchBar';
import FilterChips from '@/components/ui/FilterChips';

export default function DiscoverScreen() {
  const { projects, isLoading, refresh } = useProjects();
  const [refreshing, setRefreshing] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const filterOptions = ['All', 'Popular', 'New', 'Nearby', 'Ending Soon'];

  const filteredProjects = projects
    .filter((project) => {
      if (searchQuery === '') return true;
      return project.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((project) => {
      if (selectedFilter === 'All') return true;
      if (selectedFilter === 'Popular') return project.likes > 50;
      if (selectedFilter === 'New') {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        return new Date(project.startDate) > twoWeeksAgo;
      }
      // Other filters would be implemented with actual data
      return true;
    });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Art</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setSearchVisible(!searchVisible)}
          >
            <Search color="#1F2937" size={24} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setFilterVisible(!filterVisible)}
          >
            <Filter color="#1F2937" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {searchVisible && (
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search projects..."
        />
      )}

      {filterVisible && (
        <FilterChips
          options={filterOptions}
          selectedOption={selectedFilter}
          onSelect={setSelectedFilter}
        />
      )}

      <FeaturedProject />

      <Text style={styles.sectionTitle}>All Projects</Text>

      <FlatList
        data={filteredProjects}
        renderItem={({ item }) => <ProjectCard project={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.projectsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No projects found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

function FeaturedProject() {
  return (
    <TouchableOpacity style={styles.featuredContainer}>
      <Image
        source={{ uri: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }}
        style={styles.featuredImage}
      />
      <View style={styles.featuredContent}>
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredBadgeText}>Featured</Text>
        </View>
        <Text style={styles.featuredTitle}>Urban Art Discovery</Text>
        <Text style={styles.featuredSubtitle}>Explore street art across the city</Text>
        <View style={styles.featuredMeta}>
          <Text style={styles.featuredMetaText}>16 locations • Until June 30</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerTitle: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 28,
    color: '#1F2937',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredContainer: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  featuredImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  featuredContent: {
    padding: 16,
  },
  featuredBadge: {
    position: 'absolute',
    top: -20,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#7C3AED',
    borderRadius: 16,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  featuredTitle: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  featuredMeta: {
    marginTop: 8,
  },
  featuredMetaText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  sectionTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  projectsList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
  },
});