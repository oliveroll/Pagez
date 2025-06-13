import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useReadingList } from '../context/ReadingListContext';
import { CreateListModal } from './CreateListModal';

interface ReadingListModalProps {
  visible: boolean;
  onClose: () => void;
  currentBook?: {
    id: string;
    title: string;
    author: string;
    coverImage: any;
  };
}

const addButtonSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
  <rect width="26" height="26" rx="13" fill="#EB4D2A"/>
  <path d="M12.8088 6.11768V19.5" stroke="white" stroke-linecap="round"/>
  <path d="M19.5 12.8088L6.11765 12.8088" stroke="white" stroke-linecap="round"/>
</svg>
`;

export const ReadingListModal: React.FC<ReadingListModalProps> = ({
  visible,
  onClose,
  currentBook,
}) => {
  const { readingLists, addList, addBookToList } = useReadingList();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const renderBookCovers = (books: any[]) => {
    if (!books || books.length === 0) return null;
    
    return books.slice(0, 8).map((book, index) => (
      <Image
        key={index}
        source={typeof book.coverImage === 'string' ? { uri: book.coverImage } : book.coverImage}
        style={[
          styles.bookCover,
          {
            marginLeft: index > 0 ? -15 : 0,
            zIndex: books.length - index,
          }
        ]}
      />
    ));
  };

  const handleAddToList = (listId: string) => {
    if (currentBook) {
      addBookToList(listId, currentBook);
    }
  };

  const formatBookCount = (count: number) => {
    return `${count} ${count === 1 ? 'book' : 'books'}`;
  };

  const AddButton = ({ listId }: { listId: string }) => (
    <TouchableOpacity 
      style={styles.addButtonContainer}
      onPress={() => handleAddToList(listId)}
    >
      <SvgXml xml={addButtonSvg} width={26} height={26} />
    </TouchableOpacity>
  );

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Reading lists</Text>

            <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
              {readingLists.map((list) => (
                <View key={list.id} style={styles.listItem}>
                  <View style={styles.listContent}>
                    <View style={styles.mainContent}>
                      <View style={styles.bookCoversContainer}>
                        {renderBookCovers(list.books)}
                      </View>
                      <View style={styles.listInfoContainer}>
                        <Text style={styles.listName}>{list.name}</Text>
                        <Text style={styles.bookCount}>
                          {formatBookCount(list.books.length)}
                        </Text>
                      </View>
                    </View>
                    <AddButton listId={list.id} />
                  </View>
                </View>
              ))}

              <TouchableOpacity 
                style={styles.addNewList} 
                onPress={() => setIsCreateModalVisible(true)}
              >
                <View style={styles.listContent}>
                  <View style={styles.mainContent}>
                    <Text style={styles.listName}>Add new list</Text>
                  </View>
                  <View style={styles.addButtonContainer}>
                    <SvgXml xml={addButtonSvg} width={26} height={26} />
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.doneButton} onPress={onClose}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CreateListModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onCreateList={(name) => {
          addList(name);
          setIsCreateModalVisible(false);
        }}
      />
    </>
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: '80%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Bogart-Medium-trial',
    color: '#1E1E1E',
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  },
  listItem: {
    marginBottom: 15,
  },
  listContent: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.18)',
    backgroundColor: '#FFF',
    padding: 15,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 64.815 },
        shadowOpacity: 0.03,
        shadowRadius: 46.852,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  mainContent: {
    flex: 1,
    paddingRight: 40,
  },
  bookCoversContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bookCover: {
    width: 40.58,
    height: 61.232,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10.5 },
        shadowOpacity: 0.24,
        shadowRadius: 9,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  listInfoContainer: {
    marginTop: 4,
  },
  listName: {
    fontSize: 16,
    fontFamily: 'Bogart-Medium-trial',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  bookCount: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-trial',
    color: '#898A8D',
  },
  addButtonContainer: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    width: 26,
    height: 26,
  },
  addNewList: {
    marginBottom: 15,
  },
  addNewListContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    position: 'relative',
  },
  addNewListText: {
    fontSize: 16,
    fontFamily: 'Bogart-Medium-trial',
    color: '#1E1E1E',
  },
  doneButton: {
    backgroundColor: '#EB4D2A',
    borderRadius: 45,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  doneText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Bogart-Medium-trial',
  },
}); 