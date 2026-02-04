
// P2P Service для децентрализованных соединений
import { io, Socket } from 'socket.io-client';

class P2PService {
  private socket: Socket | null = null;
  private peers: Map<string, RTCPeerConnection> = new Map();
  private dataChannels: Map<string, RTCDataChannel> = new Map();
  private isConnected = false;

  // Подключение к сигнальному серверу
  connect(userId: string) {
    if (this.isConnected) return;

    this.socket = io('https://phoenix-signal-server.onrender.com', {
      query: { userId },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to signaling server');
      this.isConnected = true;
      this.setupListeners();
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from signaling server');
      this.isConnected = false;
    });
  }

  // Настройка обработчиков сообщений
  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('user-connected', (userId: string) => {
      console.log('User connected:', userId);
      this.createPeerConnection(userId, true);
    });

    this.socket.on('user-disconnected', (userId: string) => {
      console.log('User disconnected:', userId);
      this.removePeer(userId);
    });

    this.socket.on('offer', async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      await this.handleOffer(data.from, data.offer);
    });

    this.socket.on('answer', async (data: { from: string; answer: RTCSessionDescriptionInit }) => {
      await this.handleAnswer(data.from, data.answer);
    });

    this.socket.on('ice-candidate', (data: { from: string; candidate: RTCIceCandidate }) => {
      this.handleIceCandidate(data.from, data.candidate);
    });
  }

  // Создание P2P соединения
  private async createPeerConnection(userId: string, isInitiator: boolean) {
    const config = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    };

    const peerConnection = new RTCPeerConnection(config);
    this.peers.set(userId, peerConnection);

    // Создаем канал данных для обмена сообщениями
    if (isInitiator) {
      const dataChannel = peerConnection.createDataChannel('phoenix-chat');
      this.setupDataChannel(userId, dataChannel);
      this.dataChannels.set(userId, dataChannel);
    } else {
      peerConnection.ondatachannel = (event) => {
        this.setupDataChannel(userId, event.channel);
        this.dataChannels.set(userId, event.channel);
      };
    }

    // Обработчики ICE кандидатов
    peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.socket) {
        this.socket.emit('ice-candidate', {
          to: userId,
          candidate: event.candidate,
        });
      }
    };

    // Обработчик изменения состояния соединения
    peerConnection.onconnectionstatechange = () => {
      console.log(`Connection state with ${userId}:`, peerConnection.connectionState);
    };

    // Если инициатор - создаем offer
    if (isInitiator) {
      try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        
        if (this.socket) {
          this.socket.emit('offer', {
            to: userId,
            offer: peerConnection.localDescription,
          });
        }
      } catch (error) {
        console.error('Error creating offer:', error);
      }
    }

    return peerConnection;
  }

  // Обработка offer
  private async handleOffer(from: string, offer: RTCSessionDescriptionInit) {
    const peerConnection = await this.createPeerConnection(from, false);
    
    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      
      if (this.socket) {
        this.socket.emit('answer', {
          to: from,
          answer: peerConnection.localDescription,
        });
      }
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  }

  // Обработка answer
  private async handleAnswer(from: string, answer: RTCSessionDescriptionInit) {
    const peerConnection = this.peers.get(from);
    if (peerConnection) {
      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (error) {
        console.error('Error handling answer:', error);
      }
    }
  }

  // Обработка ICE кандидата
  private handleIceCandidate(from: string, candidate: RTCIceCandidate) {
    const peerConnection = this.peers.get(from);
    if (peerConnection) {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }

  // Настройка канала данных
  private setupDataChannel(userId: string, dataChannel: RTCDataChannel) {
    dataChannel.onopen = () => {
      console.log(`Data channel opened with ${userId}`);
      // Можно отправлять сообщения
      dataChannel.send(JSON.stringify({
        type: 'heart',
        message: '💚 Соединение установлено!',
      }));
    };

    dataChannel.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Message from', userId, ':', data);
        
        // Отправляем событие в приложение
        this.onMessageReceived?.(userId, data);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    dataChannel.onclose = () => {
      console.log(`Data channel closed with ${userId}`);
      this.dataChannels.delete(userId);
    };
  }

  // Отправка сообщения
  sendMessage(to: string, message: any) {
    const dataChannel = this.dataChannels.get(to);
    if (dataChannel && dataChannel.readyState === 'open') {
      dataChannel.send(JSON.stringify(message));
      return true;
    }
    return false;
  }

  // Отправка сердца
  sendHeart(to: string) {
    return this.sendMessage(to, {
      type: 'heart',
      message: '💖',
      timestamp: Date.now(),
    });
  }

  // Удаление пира
  private removePeer(userId: string) {
    const peerConnection = this.peers.get(userId);
    if (peerConnection) {
      peerConnection.close();
      this.peers.delete(userId);
    }
    this.dataChannels.delete(userId);
  }

  // Отключение от сети
  disconnect() {
    this.peers.forEach((peer, userId) => {
      peer.close();
    });
    this.peers.clear();
    this.dataChannels.clear();
    
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    
    this.isConnected = false;
  }

  // Коллбэк для получения сообщений
  onMessageReceived?: (from: string, message: any) => void;
}

export const p2pService = new P2PService();