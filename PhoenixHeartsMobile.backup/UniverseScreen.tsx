import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withSpring,
  cancelAnimation,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { X, MessageCircle, Heart, Users } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');
const CENTER_X = width / 2;
const CENTER_Y = height / 2;

// Тип для пользователя-звезды
type StarUser = {
  id: string;
  name: string;
  country: string;
  city: string;
  color: string;
  size: number;
  orbit: number;
  angle: number;
};

export default function UniverseScreen() {
  const [selectedStar, setSelectedStar] = useState<StarUser | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Анимация пульсации зеленого духа
  const spiritScale = useSharedValue(1);
  const spiritOpacity = useSharedValue(0.7);
  
  // Сила "втягивания"
  const attractionForce = useSharedValue(0);

  // Пользователи-звезды
  const [stars, setStars] = useState<StarUser[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: `user-${i}`,
      name: ['Алексей', 'Мария', 'Дмитрий', 'Анна', 'Сергей'][i % 5],
      country: ['Россия', 'Германия', 'Япония', 'США', 'Бразилия'][i % 5],
      city: ['Москва', 'Берлин', 'Токио', 'Нью-Йорк', 'Рио'][i % 5],
      color: ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2'][i % 5],
      size: Math.random() * 20 + 10,
      orbit: Math.random() * 0.8 + 0.2,
      angle: Math.random() * Math.PI * 2,
    }))
  );

  // Анимация дыхания зеленого духа
  useEffect(() => {
    spiritScale.value = withRepeat(
      withTiming(1.2, { 
        duration: 2000, 
        easing: Easing.inOut(Easing.sin) 
      }),
      -1,
      true
    );
    
    spiritOpacity.value = withRepeat(
      withTiming(0.9, { duration: 1500 }),
      -1,
      true
    );
  }, []);

  // Жест для втягивания
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      cancelAnimation(spiritScale);
      spiritScale.value = 1;
    })
    .onUpdate((event) => {
      // Чем сильнее жест "сжатия", тем сильнее втягивание
      attractionForce.value = event.scale > 1 ? 0 : 1 - event.scale;
    })
    .onEnd(() => {
      // Возвращаем дыхание
      spiritScale.value = withRepeat(
        withTiming(1.2, { duration: 2000 }),
        -1,
        true
      );
      attractionForce.value = withTiming(0, { duration: 1000 });
    });

  const spiritStyle = useAnimatedStyle(() => ({
    transform: [{ scale: spiritScale.value }],
    opacity: spiritOpacity.value,
  }));

  const handleStarPress = (star: StarUser) => {
    setSelectedStar(star);
    setModalVisible(true);
  };

  const StarComponent = ({ star, force }: { star: StarUser; force: Animated.SharedValue<number> }) => {
    const starStyle = useAnimatedStyle(() => {
      const currentOrbit = star.orbit * (1 - force.value * 0.5);
      const x = CENTER_X + Math.cos(star.angle) * (currentOrbit * width * 0.4);
      const y = CENTER_Y + Math.sin(star.angle) * (currentOrbit * height * 0.4);
      
      return {
        transform: [
          { translateX: x - star.size / 2 },
          { translateY: y - star.size / 2 },
          { scale: 1 + force.value * 0.5 },
        ],
      };
    });

    return (
      <TouchableOpacity onPress={() => handleStarPress(star)}>
        <Animated.View style={[styles.star, starStyle]}>
          <View 
            style={[
              styles.starInner,
              { 
                backgroundColor: star.color,
                width: star.size,
                height: star.size,
                borderRadius: star.size / 2,
              }
            ]}
          />
          <View style={styles.starGlow} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Фон вселенной */}
      <View style={styles.universeBackground}>
        {Array.from({ length: 200 }).map((_, i) => (
          <View
            key={`star-${i}`}
            style={[
              styles.backgroundStar,
              {
                left: Math.random() * width,
                top: Math.random() * height,
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3,
              }
            ]}
          />
        ))}
      </View>

      <GestureDetector gesture={pinchGesture}>
        <View style={styles.gestureArea}>
          {/* Зеленый дух в центре */}
          <Animated.View style={[styles.greenSpirit, spiritStyle]}>
            <View style={styles.spiritCore} />
            <View style={styles.spiritAura} />
            <View style={styles.wave} />
            <View style={[styles.wave, styles.wave2]} />
            <View style={[styles.wave, styles.wave3]} />
          </Animated.View>

          {/* Пользователи-звезды */}
          {stars.map((star) => (
            <StarComponent 
              key={star.id} 
              star={star} 
              force={attractionForce} 
            />
          ))}

          {/* Инструкция */}
          <View style={styles.instruction}>
            <Text style={styles.instructionText}>
              👆 Дотроньтесь к звезде, чтобы увидеть душу
            </Text>
            <Text style={styles.instructionText}>
              🤏 Сожмите пальцы, чтобы втянуть вселенную
            </Text>
          </View>
        </View>
      </GestureDetector>

      {/* Модальное окно информации о звезде */}
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
                    <Text style={styles.modalLocation}>
                      {selectedStar.country}, {selectedStar.city}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <X color="#00FF88" size={24} />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalInfo}>
                  <View style={styles.infoRow}>
                    <Users color="#00FF88" size={20} />
                    <Text style={styles.infoText}>В сети: 147 дней</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Heart color="#00FF88" size={20} />
                    <Text style={styles.infoText}>Сердец отправлено: 1,247</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.knockButton}>
                  <MessageCircle color="#fff" size={24} />
                  <Text style={styles.knockButtonText}>Постучаться</Text>
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
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  gestureArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenSpirit: {
    position: 'absolute',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spiritCore: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00FF88',
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 20,
  },
  spiritAura: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00FF88',
    opacity: 0.3,
  },
  wave: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: '#00FF88',
    opacity: 0.2,
  },
  wave2: {
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.15,
  },
  wave3: {
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.1,
  },
  star: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starInner: {
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5,
  },
  starGlow: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    opacity: 0.1,
  },
  instruction: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(0, 8, 20, 0.7)',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00FF88',
    alignItems: 'center',
  },
  instructionText: {
    color: '#00FF88',
    fontSize: 14,
    marginVertical: 2,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#0A1929',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#00FF88',
    width: '90%',
    padding: 25,
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 20,
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalLocation: {
    color: '#00FF88',
    fontSize: 16,
  },
  closeButton: {
    padding: 5,
  },
  modalInfo: {
    backgroundColor: 'rgba(0, 255, 136, 0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  knockButton: {
    flexDirection: 'row',
    backgroundColor: '#00FF88',
    borderRadius: 20,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  knockButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});