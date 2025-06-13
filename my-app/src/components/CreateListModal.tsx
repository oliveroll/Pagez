import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
} from 'react-native';

interface CreateListModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateList: (name: string) => void;
}

export const CreateListModal: React.FC<CreateListModalProps> = ({
  visible,
  onClose,
  onCreateList,
}) => {
  const [listName, setListName] = useState('');

  const handleCreate = () => {
    if (listName.trim()) {
      onCreateList(listName.trim());
      setListName('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Create new list</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter list name"
            value={listName}
            onChangeText={setListName}
            placeholderTextColor="#898A8D"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.createButton, !listName.trim() && styles.createButtonDisabled]}
              onPress={handleCreate}
              disabled={!listName.trim()}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Bogart-Medium-trial',
    color: '#1E1E1E',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#BBAEA8',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Bogart-Regular-trial',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Medium-trial',
    color: '#1E1E1E',
  },
  createButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EB4D2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#BBAEA8',
  },
  createButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Medium-trial',
    color: '#FFFFFF',
  },
}); 