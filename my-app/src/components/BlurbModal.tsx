import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
  SafeAreaView,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface BlurbModalProps {
  visible: boolean;
  onClose: () => void;
  bookTitle: string;
  bookAuthor: string;
  blurbText: string;
}

export const BlurbModal: React.FC<BlurbModalProps> = ({
  visible,
  onClose,
  bookTitle,
  bookAuthor,
  blurbText,
}) => {
  const handleDoneReading = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalSection}>
          <Pressable style={styles.modalOverlay} onPress={onClose}>
            <View style={styles.modalContainer}>
              <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
                <Text style={styles.blurbLabel}>BLURP</Text>
                <Text style={styles.bookTitle}>{bookTitle}</Text>
                <Text style={styles.bookAuthor}>by {bookAuthor}</Text>
                <Text style={styles.blurbText}>{blurbText}</Text>
                <Text style={styles.quoteText}>"Victory City is a triumph—not because it exists, but because it is utterly enchanting."</Text>
                <Text style={styles.quoteAuthor}>—The Atlantic</Text>
              </Pressable>
            </View>
          </Pressable>
        </View>

        <SafeAreaView style={styles.bottomSection}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.doneReadingButton}
              onPress={handleDoneReading}
            >
              <Text style={styles.doneReadingText}>Done reading</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    flexShrink: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.90)',
  },
  modalSection: {
    flex: 1,
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxWidth: 400,
  },
  modalContent: {
    display: 'flex',
    padding: 28,
    paddingRight: 22,
    paddingBottom: 26,
    paddingLeft: 23,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    borderRadius: 20,
    backgroundColor: '#F4EFEA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.25,
    shadowRadius: 44,
    elevation: 10,
  },
  blurbLabel: {
    color: '#EB5F2A',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  bookTitle: {
    color: '#1E1E1E',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28,
    marginBottom: 2,
  },
  bookAuthor: {
    color: '#EB5F2A',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  blurbText: {
    color: '#000',
    fontFamily: 'New York',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 16,
  },
  quoteText: {
    color: '#000',
    fontFamily: 'New York',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 4,
  },
  quoteAuthor: {
    color: '#000',
    fontFamily: 'New York',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bottomSection: {
    width: '100%',
    paddingBottom: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    width: 353,
    alignItems: 'center',
  },
  doneReadingButton: {
    display: 'flex',
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  doneReadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
}); 