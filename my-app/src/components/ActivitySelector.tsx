import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

// SVG icons for each activity
const readingIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const finishedIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12L11 14L15 10M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const thoughtIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22V20M12 13C12 13 16 12.5 16 9.5C16 6.5 13 6 12 6C11 6 8 6.5 8 9.5C8 12.5 12 13 12 13ZM12 13V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5 2.75L9.5 3.75M15.5 2.75L14.5 3.75M12 2V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

interface ActivitySelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (activity: string) => void;
  selectedActivity: string;
}

const ActivitySelector: React.FC<ActivitySelectorProps> = ({
  visible,
  onClose,
  onSelect,
  selectedActivity,
}) => {
  const activities = [
    { id: 'reading', label: 'Reading', icon: readingIconSvg },
    { id: 'finished', label: 'Finished', icon: finishedIconSvg },
    { id: 'thought', label: 'Just a thought', icon: thoughtIconSvg },
  ];

  const handleSelect = (activity: string) => {
    onSelect(activity);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <SafeAreaView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Activity</Text>
          
          <View style={styles.activitiesContainer}>
            {activities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={[
                  styles.activityButton,
                  selectedActivity === activity.label && styles.selectedActivity,
                ]}
                onPress={() => handleSelect(activity.label)}
              >
                <View style={[
                  styles.iconContainer,
                  selectedActivity === activity.label && styles.selectedIconContainer,
                ]}>
                  <SvgXml
                    xml={activity.icon}
                    width={24}
                    height={24}
                    color={selectedActivity === activity.label ? '#FFFFFF' : '#1E1E1E'}
                  />
                </View>
                <Text style={[
                  styles.activityLabel,
                  selectedActivity === activity.label && styles.selectedLabel,
                ]}>{activity.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    width: screenWidth,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 24,
    textAlign: 'center',
  },
  activitiesContainer: {
    gap: 12,
    marginBottom: 24,
  },
  activityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(30, 30, 30, 0.1)',
  },
  selectedActivity: {
    backgroundColor: '#EB4D2A',
    borderColor: '#EB4D2A',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(30, 30, 30, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activityLabel: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    flex: 1,
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
  doneButton: {
    backgroundColor: '#EB4D2A',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default ActivitySelector; 