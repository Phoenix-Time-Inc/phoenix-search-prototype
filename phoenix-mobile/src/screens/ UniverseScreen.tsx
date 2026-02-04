import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  Platform
} from 'react-native';

const { width, height } = Dimensions.get('window');

type StarUser = {
  id: string;
  name: string;
  country: string;
  city: string;
  color: string;
};

export default function UniverseScreen() {
  const [stars, setStars] = useState<StarUser[]>([]);
  const [selectedStar, setSelectedStar] = useState<StarUser | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Создаем звезды
    const newStars = Array.from({ length: 30 }, (_, i) => ({
      id: `star-${i}`,
      name: ['Алексей', 'Мария', 'Дмитрий', 'Анна', 'Сергей'][i % 5],
      country: ['Россия', 'Германия', 'Япония', 'США', 'Бразилия'][i % 5],
      city: ['Москва', 'Берлин', 'Токио', 'Нью-Йорк', 'Рио'][i % 5],
      color: ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2'][i % 5],
    }));
    setStars(newStars);
  }, []);

  return (
    <View style={styles.container}>
      {/* Фон вселенной */}
      <View style={styles.universeBackground}>
        {Array.from({ length: 100 }).map((_, i) => (
          <View
            key={`bg-star-${i}`}
            style={[
              styles.backgroundStar,
              {
                left: Math.random() * width,
                top: Math.random() * height,
                opacity: Math.random() * 0.5 + 0.2,
              }
            ]}
          />
        ))}
      </View>

      {/* Зеленый дух в центре */}
      <View style={styles.greenSpirit}>
        <View style={styles.spiritCore}>
          <Text style={styles.spiritText}>💚</Text>
        </View>
        <View style={styles.spiritAura} />
      </View>

      {/* Звезды вокруг */}
      {stars.map((star, index) => {
        const angle = (index * (360 / stars.length)) * Math.PI / 180;
        const distance = 150;
        const x = width / 2 + Math.cos(angle) * distance - 15;
        const y = height / 2 + Math.sin(angle) * distance - 15;

        return (
          <TouchableOpacity
            key={star.id}
            style={[
              styles.star,
              {
                left: x,
                top: y,
                backgroundColor: star.color,
              }
            ]}
            onPress={() => {
              setSelectedStar(star);
              setModalVisible(true);
            }}
          >
            <Text style={styles.starText}>⭐</Text>
          </TouchableOpacity>
        );
      })}

      {/* Модальное окно */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedStar && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[styles.avatar, { backgroundColor: selectedStar.color }]}>
                    <Text style={styles.avatarText}>{selectedStar.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.modalText}>
                    <Text style={styles.name}>{selectedStar.name}</Text>
                    <Text style={styles.location}>{selectedStar.country}, {selectedStar.city}</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeText}>×</Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.knockButton}>
                  <Text style={styles.knockText}>👋 Постучаться</Text>
                </TouchableOpacity>
                
                <Text style={styles.quote}>
                  "Каждая звезда — это вселенная в себе"
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Инструкция */}
      <View style={styles.instruction}>
        <Text style={styles.instructionText}>👆 Нажмите на звезду, чтобы увидеть душу</Text>
        <Text style={styles.instructionText}>💚 Вы — зеленый дух в центре вселенной</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000814',
    justifyContent: 'center',
    alignItems: 'center',
  },
  universeBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundStar: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  greenSpirit: {
    position: 'absolute',
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
  spiritAura: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#00FF88',
    opacity: 0.3,
  },
  star: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  starText: {
    fontSize: 18,
  },
  instruction: {
    position: 'absolute',
    bottom: 60,
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
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00FF88',
    width: '90%',
    maxWidth: 400,
    padding: 25,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    width: '100%',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalText: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    color: '#00FF88',
    fontSize: 16,
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    color: '#00FF88',
    fontSize: 30,
    fontWeight: 'bold',
  },
  knockButton: {
    backgroundColor: '#00FF88',
    borderRadius: 15,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  knockText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quote: {
    color: '#00FF88',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});