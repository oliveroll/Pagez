import React from 'react';
import { View, StyleSheet } from 'react-native';

interface NavigationDotsProps {
  currentPage?: number;
  totalPages?: number;
}

export const NavigationDots: React.FC<NavigationDotsProps> = ({ 
  currentPage = 2, 
  totalPages = 3 
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentPage ? styles.activeDot : styles.inactiveDot
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    backgroundColor: '#EB4D2A',
  },
  inactiveDot: {
    backgroundColor: '#D9D9D9',
  },
});
