"use client";

import { Book, Heart, Users, Globe, Star, TrendingUp, Lock, Share2 } from "lucide-react";
import { useState } from "react";

export default function KnowledgePage() {
  const [selectedCategory, setSelectedCategory] = useState("все");

  const categories = [
    { id: "все", label: "Все знания", icon: "🌌" },
    { id: "технологии", label: "Технологии", icon: "💻" },
    { id: "духовность", label: "Духовность", icon: "🕊️" },
    { id: "наука", label: "Наука", icon: "🔬" },
    { id: "искусство", label: "Искусство", icon: "🎨" },
    { id: "природа", label: "Природа", icon: "🌱" },
  ];

  const knowledgeItems = [
    {
      id: 1,
      title: "Мандала вселенной",
      description: "Древнее знание о структуре мироздания",
      category: "духовность",
      hearts: 1245,
      contributors: 89,
      isPublic: true,
      icon: "🌀"
    },
    {
      id: 2,
      title: "Алгоритмы гармонии",
      description: "Математические принципы природного равновесия",
      category: "наука",
      hearts: 892,
      contributors: 45,
      isPublic: true,
      icon: "⚖️"
    },
    {
      id: 3,
      title: "Квантовое сознание",
      description: "На стыке физики и метафизики",
      category: "наука",
      hearts: 1567,
      contributors: 120,
      isPublic: false,
      icon: "🔮"
    },
    {
      id: 4,
      title: "Эко-технологии будущего",
      description: "Инновации для устойчивого развития",
      category: "технологии",
      hearts: 987,
      contributors: 67,
      isPublic: true,
      icon: "♻️"
    },
    {
      id: 5,
      title: "Цифровое искусство души",
      description: "Выражение духовности через технологии",
      category: "искусство",
      hearts: 734,
      contributors: 34,
      isPublic: true,
      icon: "🎭"
    },
    {
      id: 6,
      title: "Сеть планеты",
      description: "Как природа создает совершенные сети",
      category: "природа",
      hearts: 1102,
      contributors: 56,
      isPublic: true,
      icon: "🕸️"
    },
  ];

  const filteredItems = selectedCategory === "все" 
    ? knowledgeItems 
    : knowledgeItems.filter(item => item.category === selectedCategory);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      {/* Шапка */}
      <div style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{
            padding: "1rem",
            background: "linear-gradient(135deg, #ef4444, #ec4899)",
            borderRadius: "16px"
          }}>
            <Book size={32} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>
              Хранилище <span style={{ color: "#ec4899" }}>знаний</span>
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "1.125rem" }}>
              Коллективная мудрость человечества в одном месте
            </p>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
        marginBottom: "4rem"
      }}>
        <div style={{
          background: "rgba(30, 41, 59, 0.5)",
          border: "1px solid rgba(100, 116, 139, 0.2)",
          borderRadius: "16px",
          padding: "1.5rem",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#ef4444", marginBottom: "0.5rem" }}>10K+</div>
          <div style={{ color: "#94a3b8" }}>Единиц знаний</div>
        </div>
        <div style={{
          background: "rgba(30, 41, 59, 0.5)",
          border: "1px solid rgba(100, 116, 139, 0.2)",
          borderRadius: "16px",
          padding: "1.5rem",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#10b981", marginBottom: "0.5rem" }}>5K+</div>
          <div style={{ color: "#94a3b8" }}>Авторов</div>
        </div>
        <div style={{
          background: "rgba(30, 41, 59, 0.5)",
          border: "1px solid rgba(100, 116, 139, 0.2)",
          borderRadius: "16px",
          padding: "1.5rem",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#a855f7", marginBottom: "0.5rem" }}>100%</div>
          <div style={{ color: "#94a3b8" }}>Децентрализация</div>
        </div>
        <div style={{
          background: "rgba(30, 41, 59, 0.5)",
          border: "1px solid rgba(100, 116, 139, 0.2)",
          borderRadius: "16px",
          padding: "1.5rem",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#f59e0b", marginBottom: "0.5rem" }}>🌍</div>
          <div style={{ color: "#94a3b8" }}>Глобальный доступ</div>
        </div>
      </div>

      {/* Категории */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem" }}>Категории знаний</h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: "1rem 1.5rem",
                background: selectedCategory === category.id 
                  ? "linear-gradient(90deg, #ef4444, #ec4899)" 
                  : "rgba(255, 255, 255, 0.05)",
                border: selectedCategory === category.id 
                  ? "none" 
                  : "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                color: "white",
                fontWeight: selectedCategory === category.id ? "600" : "400",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s"
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Знания */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Популярные знания</h2>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button style={{
              padding: "0.75rem 1.5rem",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <TrendingUp size={18} />
              По популярности
            </button>
            <button style={{
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <Book size={18} />
              Добавить знание
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(100, 116, 139, 0.2)",
                borderRadius: "20px",
                padding: "1.5rem",
                transition: "transform 0.3s, border-color 0.3s",
                position: "relative"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(100, 116, 139, 0.2)";
              }}
            >
              {/* Иконка приватности */}
              {!item.isPublic && (
                <div style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "rgba(245, 158, 11, 0.1)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "100px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  fontSize: "0.75rem",
                  color: "#f59e0b"
                }}>
                  <Lock size={12} />
                  Приватное
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.75rem"
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                    {item.title}
                  </h3>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    padding: "0.25rem 0.75rem",
                    background: "rgba(139, 92, 246, 0.1)",
                    borderRadius: "100px",
                    fontSize: "0.75rem",
                    color: "#a855f7"
                  }}>
                    {item.category}
                  </div>
                </div>
              </div>

              <p style={{ color: "#94a3b8", marginBottom: "1.5rem", lineHeight: "1.6" }}>
                {item.description}
              </p>

              {/* Статистика */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#ef4444" }}>
                    <Heart size={16} />
                    <span style={{ fontSize: "0.875rem" }}>{item.hearts}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#3b82f6" }}>
                    <Users size={16} />
                    <span style={{ fontSize: "0.875rem" }}>{item.contributors}</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button style={{
                    padding: "0.5rem 1rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.875rem"
                  }}>
                    <Star size={16} />
                    Изучить
                  </button>
                  <button style={{
                    padding: "0.5rem",
                    background: "rgba(139, 92, 246, 0.1)",
                    border: "1px solid rgba(139, 92, 246, 0.2)",
                    borderRadius: "8px",
                    color: "#a855f7",
                    cursor: "pointer"
                  }}>
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Призыв к действию */}
      <div style={{
        marginTop: "4rem",
        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
        borderRadius: "24px",
        padding: "3rem",
        textAlign: "center",
        border: "1px solid rgba(139, 92, 246, 0.2)"
      }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1rem" }}>
          Поделитесь своим <span style={{ color: "#ec4899" }}>знанием</span>
        </h2>
        <p style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto 2rem" }}>
          Каждый человек обладает уникальной мудростью. Поделитесь ею с миром и станьте частью 
          коллективного сознания человечества.
        </p>
        <button style={{
          padding: "1rem 2.5rem",
          background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
          border: "none",
          borderRadius: "12px",
          color: "white",
          fontWeight: "600",
          fontSize: "1.125rem",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.75rem"
        }}>
          <Book size={24} />
          Добавить знание в сеть
        </button>
      </div>
    </div>
  );
}
