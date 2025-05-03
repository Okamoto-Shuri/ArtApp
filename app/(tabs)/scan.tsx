import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { ScanLine, Camera as FlipCamera, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import ScanSuccess from '@/components/scanner/ScanSuccess';
import { scanQrCode } from '@/services/apiService';
import { useProject } from '@/context/ProjectContext';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [isScanning, setIsScanning] = useState(true);
  const [scanResult, setScanResult] = useState<null | { success: boolean; message: string }>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const { updateProgress } = useProject();

  // Reset scan state when screen comes into focus
  useEffect(() => {
    setIsScanning(true);
    setScanResult(null);
    setShowSuccess(false);
  }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Camera permission required</Text>
          <Text style={styles.permissionText}>
            We need access to your camera to scan QR codes for art collection.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (!isScanning) return;
    
    setIsScanning(false);
    
    // Trigger haptic feedback on supported platforms
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    try {
      // Call API to process the QR code
      const response = await scanQrCode(data);
      
      if (response.success) {
        setScanResult({
          success: true,
          message: response.message || 'QR code scanned successfully!',
        });
        
        // Update the project progress
        if (response.progress) {
          updateProgress(response.progress);
        }
        
        setShowSuccess(true);
        
        // Navigate to collection screen after a delay if completed
        if (response.is_completed) {
          setTimeout(() => {
            router.push('/collection');
          }, 3000);
        }
      } else {
        setScanResult({
          success: false,
          message: response.message || 'Invalid QR code',
        });
        
        // Reset after a delay
        setTimeout(() => {
          setIsScanning(true);
          setScanResult(null);
        }, 3000);
      }
    } catch (error) {
      setScanResult({
        success: false,
        message: 'Error scanning QR code',
      });
      
      // Reset after a delay
      setTimeout(() => {
        setIsScanning(true);
        setScanResult(null);
      }, 3000);
    }
  };

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <X color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scan QR Code</Text>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
          >
            <FlipCamera color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </View>

        {!showSuccess && (
          <View style={styles.scanArea}>
            <View style={styles.scanOverlay}>
              <View style={styles.scanFrame}>
                <ScanLine 
                  style={styles.scanAnimation}
                  color="#7C3AED"
                  size={200}
                />
              </View>
            </View>
            <Text style={styles.scanText}>
              Align QR code within the frame
            </Text>
          </View>
        )}

        {scanResult && !scanResult.success && (
          <View style={styles.scanResultContainer}>
            <Text style={styles.scanResultText}>{scanResult.message}</Text>
          </View>
        )}

        {showSuccess && (
          <ScanSuccess message={scanResult?.message || 'Piece collected!'} />
        )}
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  flipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanOverlay: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#7C3AED',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanAnimation: {
    position: 'absolute',
  },
  scanText: {
    marginTop: 24,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scanResultContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
  },
  scanResultText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 22,
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#7C3AED',
    borderRadius: 8,
  },
  permissionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});