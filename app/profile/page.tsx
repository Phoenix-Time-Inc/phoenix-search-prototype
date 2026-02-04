"use client";

import { User, Settings, Heart, BookOpen, Award, Globe, Edit, Activity, Users } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("общее");

  const user = {
    name: "Александр Фениксов",
    bio: "Исследователь децентрализованных сетей и духовных технологий",
    avatar: "🦅",
    joined: "2023",
    hearts: 124,
    courses: 8,
    connections: 45,
    level: "Мастер",
    achievements: [
      { id: 1, name: "Первое сердце", icon: "❤️" },
      { id: 2, name: "Сеть знаний", icon: "🌐" },
      { id: 3, name: "Учитель", icon: "🎓" },
      { id: 4, name: "Хранитель", icon: "🛡️" },
    ]
  };

  const tabs = [
    { id: "общее", label: "Общее", icon: <User size={18} /> },
    { id: "активность", label: "Активность", icon: <Activity size={18} /> },
    { id: "связи", label: "Связи", icon: <Users size={18} /> },
    { id: "настройки", label: "Настройки", icon: <Settings size={18} /> },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      {/* Шапка профиля */}
      <div style={{
        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
        borderRadius: "24px",
        padding: "3rem",
        marginBottom: "3rem",
        border: "1px solid rgba(139, 92, 246, 0.2)"
      }}>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "120px",
            height: "120px",
            background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem"
          }}>
            {user.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
              <div>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                  {user.name}
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1.125rem" }}>
                  {user.bio}
                </p>
              </div>
              <button style={{
                padding: "0.75rem 1.5rem",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <Edit size={18} />
                Редактировать
              </button>
            </div>

            {/* Статистика профиля */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(139, 92, 246, 0.1)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Heart size={24} color="#a855f7" />
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>{user.hearts}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Сердец</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(59, 130, 246, 0.1)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <BookOpen size={24} color="#3b82f6" />
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>{user.courses}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Курсов</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(16, 185, 129, 0.1)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Globe size={24} color="#10b981" />
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>{user.connections}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Связей</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(245, 158, 11, 0.1)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Award size={24} color="#f59e0b" />
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>{user.level}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Уровень</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Табы */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{
          display: "flex",
          gap: "0.5rem",
          paddingBottom: "0.5rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "0.75rem 1.5rem",
                background: activeTab === tab.id 
                  ? "linear-gradient(90deg, #8b5cf6, #ec4899)" 
                  : "transparent",
                border: "none",
                borderRadius: "12px",
                color: activeTab === tab.id ? "white" : "#94a3b8",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: activeTab === tab.id ? "600" : "400",
                transition: "all 0.3s"
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Контент табов */}
      <div>
        {activeTab === "общее" && (
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
            {/* Левая колонка */}
            <div>
              <div style={{
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(100, 116, 139, 0.2)",
                borderRadius: "20px",
                padding: "2rem",
                marginBottom: "2rem"
              }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem" }}>Обо мне</h2>
                <p style={{ color: "#94a3b8", lineHeight: "1.6", marginBottom: "2rem" }}>
                  Исследую пересечение технологий и духовности. Верю, что децентрализованные сети 
                  могут изменить мир к лучшему. Преподаю основы P2P технологий и медитации в 
                  цифровую эпоху.
                </p>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <span style={{
                    padding: "0.5rem 1rem",
                    background: "rgba(139, 92, 246, 0.1)",
                    borderRadius: "100px",
                    color: "#a855f7",
                    fontSize: "0.875rem"
                  }}>Технологии</span>
                  <span style={{
                    padding: "0.5rem 1rem",
                    background: "rgba(236, 72, 153, 0.1)",
                    borderRadius: "100px",
                    color: "#ec4899",
                    fontSize: "0.875rem"
                  }}>Духовность</span>
                  <span style={{
                    padding: "0.5rem 1rem",
                    background: "rgba(59, 130, 246, 0.1)",
                    borderRadius: "100px",
                    color: "#3b82f6",
                    fontSize: "0.875rem"
                  }}>Образование</span>
                </div>
              </div>

              <div style={{
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(100, 116, 139, 0.2)",
                borderRadius: "20px",
                padding: "2rem"
              }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem" }}>Последняя активность</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { text: "Завершил курс 'Децентрализованные сети'", time: "2 часа назад" },
                    { text: "Добавил новое сердце в глобус", time: "Вчера" },
                    { text: "Поделился статьей о духовных технологиях", time: "3 дня назад" },
                    { text: "Присоединился к P2P сети сердец", time: "1 неделя назад" }
                  ].map((activity, index) => (
                    <div key={index} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem",
                      background: "rgba(255, 255, 255, 0.03)",
                      borderRadius: "12px"
                    }}>
                      <span>{activity.text}</span>
                      <span style={{ color: "#94a3b8", fontSize: "0.875rem" }}>{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Правая колонка */}
            <div>
              <div style={{
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(100, 116, 139, 0.2)",
                borderRadius: "20px",
                padding: "2rem",
                marginBottom: "2rem"
              }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem" }}>Достижения</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                  {user.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      style={{
                        textAlign: "center",
                        padding: "1.5rem 1rem",
                        background: "rgba(255, 255, 255, 0.03)",
                        borderRadius: "16px",
                        transition: "transform 0.3s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                        {achievement.icon}
                      </div>
                      <div style={{ fontSize: "0.875rem" }}>{achievement.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(100, 116, 139, 0.2)",
                borderRadius: "20px",
                padding: "2rem"
              }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem" }}>Информация</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#94a3b8" }}>В сети с</span>
                    <span>{user.joined}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#94a3b8" }}>Статус</span>
                    <span style={{ color: "#10b981" }}>🟢 Онлайн</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#94a3b8" }}>Верификация</span>
                    <span style={{ color: "#3b82f6" }}>✅ Подтвержден</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "активность" && (
          <div style={{
            background: "rgba(30, 41, 59, 0.5)",
            border: "1px solid rgba(100, 116, 139, 0.2)",
            borderRadius: "20px",
            padding: "2rem"
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem" }}>Детальная активность</h2>
            <p style={{ color: "#94a3b8" }}>Здесь будет отображаться подробная история вашей активности в сети.</p>
          </div>
        )}

        {activeTab === "связи" && (
          <div style={{
            background: "rgba(30, 41, 59, 0.5)",
            border: "1px solid rgba(100, 116, 139, 0.2)",
            borderRadius: "20px",
            padding: "2rem"
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem" }}>Ваши связи</h2>
            <p style={{ color: "#94a3b8" }}>Здесь будут отображаться ваши связи с другими участниками сети.</p>
          </div>
        )}

        {activeTab === "настройки" && (
          <div style={{
            background: "rgba(30, 41, 59, 0.5)",
            border: "1px solid rgba(100, 116, 139, 0.2)",
            borderRadius: "20px",
            padding: "2rem"
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem" }}>Настройки профиля</h2>
            <p style={{ color: "#94a3b8" }}>Здесь вы сможете настроить параметры вашего профиля и приватности.</p>
          </div>
        )}
      </div>
    </div>
  );
}
