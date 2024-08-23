// FloatingActionButton.js
import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const FloatingActionButton = ({ actions }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animations = useRef(actions.map(() => new Animated.Value(0))).current;

  const toggleMenu = () => {
    if (isExpanded) {
      // Fermer les boutons avec une animation inverse
      Animated.stagger(100, 
        animations.map(anim => Animated.timing(anim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }))
      ).start();
    } else {
      // Ouvrir les boutons avec une animation en expansion circulaire
      Animated.stagger(100, 
        animations.map(anim => Animated.timing(anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }))
      ).start();
    }
    setIsExpanded(!isExpanded);
  };

  const getPosition = (animation, index) => {
    const angle = 210 - (index * 60); // Angle pour chaque bouton enfant (ajuster selon le nombre de boutons)
    const radius = 65; // Rayon de l'expansion circulaire

    const translateX = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, radius * Math.cos((angle * Math.PI) / 180)],
    });

    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -radius * Math.sin((angle * Math.PI) / 180)],
    });

    return {
      transform: [{ translateX }, { translateY }],
      opacity: animation,
    };
  };

  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <Animated.View key={index} style={[styles.floatingButton, getPosition(animations[index], index)]}>
          <TouchableOpacity onPress={action.onPress}>
            {action.icon}
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* Bouton principal */}
      <TouchableOpacity style={styles.mainButton} onPress={toggleMenu}>
        <AntDesign name={isExpanded ? 'close' : 'plus'} size={30} color={isExpanded? 'black':'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  mainButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default FloatingActionButton;
