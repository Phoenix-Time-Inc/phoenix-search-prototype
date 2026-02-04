"use client";

import { useState, useEffect } from "react";
import { Globe, Heart, Users, Zap, Activity, Wifi, WifiOff, Search, Send, MessageSquare, Server } from "lucide-react";

export default function P2PNetworkPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [hearts, setHearts] = useState([1, 2, 3, 4, 5]);
  const [rotation, setRotation] = useState(0);
  const [messages, setMessages] = useState([
    { id: 1, text: "🌌 Добро пожаловать в сеть Phoenix Hearts!", sender: "system", time: "12:00" },
    { id: 2, text: "💫 P2P сеть работает в демо-режиме", sender: "system", time: "12:01" },
    { id: 3, text: "🔗 Готовы к подключению...", sender: "system", time: "12:02" },
  ]);
  const [messageInput, setMessageInput] = useState("");

  // Автовращение глобуса
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const addHeart = () => {
    setHearts(prev => [...prev, prev.length + 1]);
  };

  const toggleConnection = () => {
    setIsConnected(!isConnected);
    if (!isConnected) {
      // При подключении добавляем 3 сердца
      setTimeout(() => addHeart(), 300);
      setTimeout(() => addHeart(), 600);
      setTimeout(() => addHeart(), 900);
      
      // Добавляем сообщение о подключении
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "✅ Успешное подключение к сети сердец!",
        sender: "system",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: messageInput,
      sender: "Вы",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    setMessageInput("");
    
    // Ответ сети
    setTimeout(() => {
      const responses = [
        "💖 Сеть получила ваше сообщение!",
        "✨ Ваше сердце пульсирует ярче!",
        "🌐 Сообщение распространяется по сети...",
        "🦅 Феникс видит ваше сообщение!"
      ];
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "phoenix-network",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
      {/* Шапка */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{
            padding: "1rem",
            background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
            borderRadius: "16px"
          }}>
            <Globe size={32} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>
              Глобус <span style={{ color: "#06b6d4" }}>сердец</span>
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "1.125rem" }}>
              P2P сеть в реальном времени с визуализацией подключений
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        {/* Левая колонка: Глобус и управление */}
        <div>
          {/* Глобус */}
          <div style={{
            background: "rgba(30, 41, 59, 0.5)",
            border: "1px solid rgba(100, 116, 139, 0.2)",
            borderRadius: "24px",
            padding: "2rem",
            marginBottom: "2rem",
            position: "relative",
            height: "500px",
            overflow: "hidden"
          }}>
            {/* Фон глобуса */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.1), transparent 70%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {/* Земля */}
              <div style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                border: "2px solid rgba(6, 182, 212, 0.2)",
                background: "radial-gradient(circle at 30% 30%, rgba(30, 58, 138, 0.3), rgba(15, 23, 42, 0.8))",
                position: "relative",
                transform: `rotateY(${rotation}deg)`,
                transition: "transform 0.1s linear"
              }}>
                {/* Сердечки */}
                {hearts.map((heart, index) => {
                  const angle = (index * (360 / hearts.length) * Math.PI) / 180;
                  const x = Math.cos(angle) * 120;
                  const y = Math.sin(angle) * 80;
                  
                  return (
                    <div
                      key={heart}
                      style={{
                        position: "absolute",
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: "translate(-50%, -50%)",
                        fontSize: "24px",
                        animation: `pulse 2s infinite`,
                        animationDelay: `${index * 0.3}s`,
                        filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))"
                      }}
                    >
                      ❤️
                    </div>
                  );
                })}

                {/* Центральное сердце */}
                <div style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(90deg, #ef4444, #ec4899)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "pulse 1.5s infinite",
                  boxShadow: "0 0 40px rgba(239, 68, 68, 0.5)"
                }}>
                  <span style={{ fontSize: "28px" }}>💖</span>
                </div>
              </div>

              {/* Звезды */}
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                    background: "white",
                    borderRadius: "50%",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `pulse ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`,
                    opacity: Math.random() * 0.5 + 0.3
                  }}
                />
              ))}
            </div>

            {/* Подпись */}
            <div style={{
              position: "absolute",
              bottom: "20px",
              left: "0",
              right: "0",
              textAlign: "center"
            }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(10px)",
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid rgba(100, 116, 139, 0.3)"
              }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  background: isConnected ? "#10b981" : "#ef4444",
                  borderRadius: "50%",
                  animation: isConnected ? "pulse 1s infinite" : "none"
                }}></div>
                <span style={{ fontSize: "14px", color: "#cbd5e1" }}>
                  {isConnected ? `${hearts.length} сердец онлайн` : 'Не подключено'}
                </span>
              </div>
            </div>
          </div>

          {/* Управление */}
          <div style={{
            background: "rgba(30, 41, 59, 0.5)",
            border: "1px solid rgba(100, 116, 139, 0.2)",
            borderRadius: "20px",
            padding: "2rem",
            marginBottom: "2rem"
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem" }}>Управление сетью</h2>
            
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
              <button
                onClick={toggleConnection}
                style={{
                  flex: 1,
                  padding: "1rem",
                  background: isConnected 
                    ? "linear-gradient(90deg, #ef4444, #ec4899)" 
                    : "linear-gradient(90deg, #10b981, #059669)",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  transition: "transform 0.3s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                {isConnected ? <WifiOff size={20} /> : <Wifi size={20} />}
                {isConnected ? "Отключиться" : "Подключиться к сети"}
              </button>
              
              <button
                onClick={addHeart}
                disabled={!isConnected}
                style={{
                  flex: 1,
                  padding: "1rem",
                  background: !isConnected 
                    ? "rgba(100, 116, 139, 0.3)" 
                    : "linear-gradient(90deg, #3b82f6, #06b6d4)",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "1rem",
                  cursor: isConnected ? "pointer" : "not-allowed",
                  opacity: isConnected ? 1 : 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  transition: "transform 0.3s"
                }}
                onMouseEnter={(e) => isConnected && (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <Heart size={20} />
                Добавить сердце
              </button>
            </div>

            <button style={{
              width: "100%",
              padding: "1rem",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              color: "white",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            >
              <Search size={20} />
              Найти новые сердца
            </button>
          </div>

          {/* Статистика */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem"
          }}>
            <div style={{
              background: "rgba(30, 41, 59, 0.5)",
              border: "1px solid rgba(100, 116, 139, 0.2)",
              borderRadius: "16px",
              padding: "1.5rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "#60a5fa", marginBottom: "0.5rem" }}>
                {hearts.length}
              </div>
              <div style={{ color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <Heart size={16} />
                Сердец
              </div>
            </div>
            
            <div style={{
              background: "rgba(30, 41, 59, 0.5)",
              border: "1px solid rgba(100, 116, 139, 0.2)",
              borderRadius: "16px",
              padding: "1.5rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "#10b981", marginBottom: "0.5rem" }}>
                {isConnected ? "Да" : "Нет"}
              </div>
              <div style={{ color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <Activity size={16} />
                Статус
              </div>
            </div>
            
            <div style={{
              background: "rgba(30, 41, 59, 0.5)",
              border: "1px solid rgba(100, 116, 139, 0.2)",
              borderRadius: "16px",
              padding: "1.5rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "#a855f7", marginBottom: "0.5rem" }}>
                P2P
              </div>
              <div style={{ color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <Server size={16} />
                Сеть
              </div>
            </div>
            
            <div style={{
              background: "rgba(30, 41, 59, 0.5)",
              border: "1px solid rgba(100, 116, 139, 0.2)",
              borderRadius: "16px",
              padding: "1.5rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "#f59e0b", marginBottom: "0.5rem" }}>
                🌍
              </div>
              <div style={{ color: "#94a3b8" }}>Глобус</div>
            </div>
          </div>
        </div>

        {/* Правая колонка: Чат */}
        <div>
          <div style={{
            background: "rgba(30, 41, 59, 0.5)",
            border: "1px solid rgba(100, 116, 139, 0.2)",
            borderRadius: "20px",
            padding: "2rem",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{
                padding: "0.5rem",
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                borderRadius: "10px"
              }}>
                <MessageSquare size={20} color="white" />
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Сетевой чат</h2>
            </div>

            {/* Сообщения */}
            <div style={{ flex: 1, overflowY: "auto", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    style={{
                      background: message.sender === "system" 
                        ? "rgba(139, 92, 246, 0.1)" 
                        : message.sender === "Вы"
                        ? "rgba(59, 130, 246, 0.1)"
                        : "rgba(236, 72, 153, 0.1)",
                      border: message.sender === "system"
                        ? "1px solid rgba(139, 92, 246, 0.2)"
                        : message.sender === "Вы"
                        ? "1px solid rgba(59, 130, 246, 0.2)"
                        : "1px solid rgba(236, 72, 153, 0.2)",
                      borderRadius: "12px",
                      padding: "0.75rem 1rem"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                      <span style={{
                        fontWeight: "600",
                        color: message.sender === "system" 
                          ? "#a855f7" 
                          : message.sender === "Вы"
                          ? "#3b82f6"
                          : "#ec4899"
                      }}>
                        {message.sender}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                        {message.time}
                      </span>
                    </div>
                    <div>{message.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ввод сообщения */}
            <div>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={isConnected ? "Напишите сообщение..." : "Подключитесь к сети..."}
                  disabled={!isConnected}
                  style={{
                    flex: 1,
                    padding: "0.75rem 1rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "white",
                    outline: "none"
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!isConnected || !messageInput.trim()}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: isConnected && messageInput.trim()
                      ? "linear-gradient(90deg, #8b5cf6, #ec4899)"
                      : "rgba(100, 116, 139, 0.3)",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: "600",
                    cursor: isConnected && messageInput.trim() ? "pointer" : "not-allowed",
                    opacity: isConnected && messageInput.trim() ? 1 : 0.5,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                >
                  <Send size={18} />
                  Отправить
                </button>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", textAlign: "center" }}>
                Нажмите Enter для отправки
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
