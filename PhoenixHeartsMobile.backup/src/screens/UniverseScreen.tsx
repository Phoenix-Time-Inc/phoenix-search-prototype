
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Modal,
  useWindowDimensions,
} from 'react-native';

type StarType = {
  id: string;
  name: string;
  color: string;
  angle: number;
  distance: number;
  size: number;
};

export default function UniverseScreen() {
  const { width, height } = useWindowDimensions();
  const CENTER_X = width / 2;
  const CENTER_Y = height / 2;
  
  const [stars, setStars] = useState<StarType[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStar, setSelectedStar] = useState<StarType | null>(null);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const initialStars: StarType[] = Array.from({ length: 12 }, (_, i) => ({
      id: `star-${i}`,
      name: ['Алексей', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Елена'][i % 6],
      color: ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', '#A855F7'][i % 6],
      angle: (i * (360 / 12)) * Math.PI / 180,
      distance: 150 + Math.random() * 50,
      size: 20 + Math.random() * 20,
    }));
    setStars(initialStars);

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 60000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handleStarPress = (star: StarType) => {
    setSelectedStar(star);
    setModalVisible(true);
  };

  const connectToNetwork = () => {
    setIsConnected(!isConnected);
    if (!isConnected) {
      const newStars = Array.from({ length: 3 }, (_, i) => ({
        id: `new-star-${stars.length + i}`,
        name: 'Новый друг',
        color: '#00FF88',
        angle: Math.random() * Math.PI * 2,
        distance: 200 + Math.random() * 50,
        size: 25,
      }));
      setStars(prev => [...prev, ...newStars]);
    }
  };

  const renderStars = () => {
    const rotateInterpolate = rotationAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return stars.map((star) => {
      const starStyle = {
        transform: [
          { rotate: rotateInterpolate },
          { 
            translateX: Math.cos(star.angle) * star.distance - star.size / 2 
          },
          { 
            translateY: Math.sin(star.angle) * star.distance - star.size / 2 
          },
        ],
      };

      return (
        <Animated.View
          key={star.id}
          style={[
            styles.starContainer,
            starStyle,
            {
              left: CENTER_X,
              top: CENTER_Y,
            }
          ]}
        >
          <TouchableOpacity
            onPress={() => handleStarPress(star)}
            style={[
              styles.star,
              {
                backgroundColor: star.color,
                width: star.size,
                height: star.size,
                borderRadius: star.size / 2,
              }
            ]}
          >
            <Text style={styles.starText}>⭐</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.universeBackground}>
        {Array.from({ length: 50 }).map((_, i) => (
          <View
            key={`bg-star-${i}`}
            style={[
              styles.backgroundStar,
              {
                left: Math.random() * width,
                top: Math.random() * height,
              }
            ]}
          />
        ))}
      </View>

      <Animated.View
        style={[
          styles.greenSpirit,
          {
            transform: [{ scale: pulseAnim }],
          }
        ]}
      >
        <View style={styles.spiritCore}>
          <Text style={styles.spiritText}>💚</Text>
        </View>
      </Animated.View>

      <View style={[styles.orbit, styles.orbit1]} />
      <View style={[styles.orbit, styles.orbit2]} />
      <View style={[styles.orbit, styles.orbit3]} />

      {renderStars()}

      <View style={styles.statusBar}>
        <View style={styles.statusItem}>
          <Text style={styles.emoji}>❤️</Text>
          <Text style={styles.statusText}>{stars.length} сердец</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={[styles.emoji, { color: isConnected ? '#00FF88' : '#94A3B8' }]}>
            {isConnected ? '📶' : '❌'}
          </Text>
          <Text style={[styles.statusText, { color: isConnected ? '#00FF88' : '#94A3B8' }]}>
            {isConnected ? 'Сеть' : 'Нет сети'}
          </Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.emoji}>👥</Text>
          <Text style={styles.statusText}>12 онлайн</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.connectButton,
          { backgroundColor: isConnected ? '#FF6B6B' : '#00FF88' }
        ]}
        onPress={connectToNetwork}
      >
        <Text style={styles.buttonEmoji}>⚡</Text>
        <Text style={styles.connectButtonText}>
          {isConnected ? 'Отключиться' : 'Подключиться'}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedStar && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[styles.modalAvatar, { backgroundColor: selectedStar.color }]}>
                    <Text style={styles.modalAvatarText}>
                      {selectedStar.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.modalHeaderText}>
                    <Text style={styles.modalName}>{selectedStar.name}</Text>
                    <Text style={styles.modalStatus}>🟢 В сети</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeText}>×</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalInfo}>
                  <Text style={styles.infoTitle}>Готов к соединению</Text>
                  <Text style={styles.infoDescription}>
                    Этот человек хочет установить сердечную связь с вами
                  </Text>
                </View>

                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>💬 Начать общение</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>💝 Отправить сердце</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000814',
  },
  universeBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundStar: {
    position: 'absolute',
    width: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 0.5,
  },
  greenSpirit: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -60,
    marginLeft: -60,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spiritCore: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00FF88',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 20,
  },
  spiritText: {
    fontSize: 40,
  },
  orbit: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.2)',
    borderRadius: 1000,
  },
  orbit1: {
    top: '50%',
    left: '50%',
    marginTop: -150,
    marginLeft: -150,
    width: 300,
    height: 300,
  },
  orbit2: {
    top: '50%',
    left: '50%',
    marginTop: -200,
    marginLeft: -200,
    width: 400,
    height: 400,
  },
  orbit3: {
    top: '50%',
    left: '50%',
    marginTop: -250,
    marginLeft: -250,
    width: 500,
    height: 500,
  },
  starContainer: {
    position: 'absolute',
  },
  star: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
  },
  starText: {
    fontSize: 16,
  },
  statusBar: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 8, 20, 0.8)',
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  statusItem: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  statusText: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 5,
  },
  connectButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  buttonEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  connectButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#0A1929',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#00FF88',
    width: '100%',
    maxWidth: 400,
    padding: 25,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modalAvatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalHeaderText: {
    flex: 1,
  },
  modalName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalStatus: {
    color: '#00FF88',
    fontSize: 14,
    marginTop: 5,
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    color: '#00FF88',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalInfo: {
    marginBottom: 25,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoDescription: {
    color: '#94A3B8',
    fontSize: 16,
    lineHeight: 24,
  },
  actionButton: {
    backgroundColor: '#00FF88',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  actionButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00FF88',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#00FF88',
    fontSize: 18,
    fontWeight: 'bold',
  },
});