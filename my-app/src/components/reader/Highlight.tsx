import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Highlight as HighlightType } from '../types';

interface HighlightProps {
  highlight: HighlightType;
  onDelete: (highlightId: string) => void;
  onShare: (highlight: HighlightType) => void;
  onCopy: (highlight: HighlightType) => void;
}

export const Highlight: React.FC<HighlightProps> = ({
  highlight,
  onDelete,
  onShare,
  onCopy,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: getHighlightColor(highlight.color) }]}
      onLongPress={() => onDelete(highlight.id)}
      onPress={() => {}}
    >
      <View style={styles.highlightOverlay} />
    </TouchableOpacity>
  );
};

const getHighlightColor = (color: HighlightType['color']) => {
  const colors = {
    yellow: 'rgba(255, 235, 59, 0.3)',
    green: 'rgba(76, 175, 80, 0.3)',
    blue: 'rgba(33, 150, 243, 0.3)',
    pink: 'rgba(233, 30, 99, 0.3)',
  };
  return colors[color];
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 2,
  },
  highlightOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
}); 