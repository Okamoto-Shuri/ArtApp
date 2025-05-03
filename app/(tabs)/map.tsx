import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { MapPin, Navigation, User, Info } from 'lucide-react-native';
import LocationCard from '@/components/map/LocationCard';
import { useProject } from '@/context/ProjectContext';

const initialRegion = {
  latitude: 35.6812,
  longitude: 139.7671,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen() {
  const [region, setRegion] = useState<Region>(initialRegion);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const { activeProject, projectLocations } = useProject();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
      
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
        
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    })();
  }, []);

  const goToUserLocation = async () => {
    if (userLocation) {
      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const handleMarkerPress = (location: any) => {
    setSelectedLocation(location);
  };

  const closeLocationCard = () => {
    setSelectedLocation(null);
  };

  // Filter out locations that don't belong to the active project
  const filteredLocations = projectLocations.filter(
    location => !activeProject || location.projectId === activeProject.id
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {activeProject ? activeProject.title : 'All Locations'}
        </Text>
        {activeProject && (
          <TouchableOpacity style={styles.infoButton}>
            <Info color="#1F2937" size={24} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <View style={styles.webMapPlaceholder}>
            <Text style={styles.webMapText}>
              Map view is available in the mobile app
            </Text>
          </View>
        ) : (
          <>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              region={region}
              onRegionChangeComplete={setRegion}
              showsUserLocation
              showsCompass
              showsScale
            >
              {filteredLocations.map((location) => (
                <Marker
                  key={location.id}
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  onPress={() => handleMarkerPress(location)}
                >
                  <View style={[
                    styles.markerContainer,
                    location.isCollected ? styles.markerCollected : {}
                  ]}>
                    <MapPin
                      color={location.isCollected ? '#10B981' : '#7C3AED'}
                      size={24}
                      style={styles.markerIcon}
                    />
                  </View>
                </Marker>
              ))}
            </MapView>

            <TouchableOpacity 
              style={styles.locationButton}
              onPress={goToUserLocation}
            >
              <Navigation color="#1F2937" size={24} />
            </TouchableOpacity>

            {selectedLocation && (
              <LocationCard
                location={selectedLocation}
                onClose={closeLocationCard}
              />
            )}

            {!locationPermission && (
              <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>
                  Location permission is required to show nearby art installations
                </Text>
                <TouchableOpacity
                  style={styles.permissionButton}
                  onPress={async () => {
                    const { status } = await Location.requestForegroundPermissionsAsync();
                    setLocationPermission(status === 'granted');
                  }}
                >
                  <Text style={styles.permissionButtonText}>Enable Location</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
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
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  markerContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#7C3AED',
  },
  markerCollected: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: '#10B981',
  },
  markerIcon: {
    marginBottom: 4,
  },
  permissionContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  permissionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    alignSelf: 'center',
  },
  permissionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  webMapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  webMapText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    padding: 24,
  },
});