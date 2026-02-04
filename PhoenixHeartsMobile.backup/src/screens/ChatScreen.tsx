
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 P2P Чат</Text>
      <Text style={styles.subtitle}>Децентрализованные соединения сердец</Text>
      
      <View style={styles.chatList}>
        <TouchableOpacity style={styles.chatItem}>
          <View style={[styles.avatar, { backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.avatarText}>А</Text>
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Алексей</Text>
            <Text style={styles.chatLastMessage}>💚 Привет! Как твое сердце?</Text>
          </View>
          <Text style={styles.chatTime}>12:30</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.chatItem}>
          <View style={[styles.avatar, { backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.avatarText}>М</Text>
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Мария</Text>
            <Text style={styles.chatLastMessage}>✨ Отправила тебе искру!</Text>
          </View>
          <Text style={styles.chatTime}>11:45</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.chatItem}>
          <View style={[styles.avatar, { backgroundColor: '#FFD166' }]}>
            <Text style={styles.avatarText}>Д</Text>
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Дмитрий</Text>
            <Text style={styles.chatLastMessage}>🌌 Давай медитировать вместе</Text>
          </View>
          <Text style={styles.chatTime}>Вчера</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.newChatButton}>
        <Text style={styles.newChatButtonText}>+ Новое соединение</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000814',
    padding: 20,
  },
  title: {
    color: '#00FF88',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.1)',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  chatLastMessage: {
    color: '#94A3B8',
    fontSize: 14,
  },
  chatTime: {
    color: '#64748b',
    fontSize: 12,
  },
  newChatButton: {
    backgroundColor: '#00FF88',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  newChatButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
