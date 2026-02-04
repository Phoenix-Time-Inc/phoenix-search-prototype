"use client";

import { GraduationCap, PlayCircle, BookOpen, Users, Clock, Star, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function AcademyPage() {
  const [selectedCategory, setSelectedCategory] = useState("Все");

  const categories = ["Все", "Технологии", "Духовность", "Здоровье", "Творчество", "Наука"];
  
  const courses = [
    {
      id: 1,
      title: "Децентрализованные сети для начинающих",
      description: "Основы P2P технологий и их применение в современном мире",
      category: "Технологии",
      duration: "12 часов",
      students: 1250,
      rating: 4.9,
      level: "Начальный",
      icon: "🌐"
    },
    {
      id: 2,
      title: "Медитация и осознанность в цифровую эпоху",
      description: "Техники медитации для программистов и IT-специалистов",
      category: "Духовность",
      duration: "8 часов",
      students: 890,
      rating: 4.8,
      level: "Все уровни",
      icon: "🧘"
    },
    {
      id: 3,
      title: "Экологичный образ жизни",
      description: "Как технологии помогают жить в гармонии с природой",
      category: "Здоровье",
      duration: "10 часов",
      students: 1045,
      rating: 4.7,
      level: "Начальный",
      icon: "🌱"
    },
    {
      id: 4,
      title: "Креативное программирование",
      description: "Сочетание искусства и кода для создания инноваций",
      category: "Творчество",
      duration: "15 часов",
      students: 750,
      rating: 4.9,
      level: "Продвинутый",
      icon: "🎨"
    },
    {
      id: 5,
      title: "Квантовая физика сознания",
      description: "На стыке науки и духовности",
      category: "Наука",
      duration: "20 часов",
      students: 560,
      rating: 4.6,
      level: "Продвинутый",
      icon: "🔬"
    },
    {
      id: 6,
      title: "Цифровой детокс",
      description: "Как оставаться человеком в мире технологий",
      category: "Здоровье",
      duration: "6 часов",
      students: 1340,
      rating: 4.8,
      level: "Все уровни",
      icon: "📱"
    }
  ];

  const filteredCourses = selectedCategory === "Все" 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      {/* Шапка */}
      <div style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{
            padding: "1rem",
            background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
            borderRadius: "16px"
          }}>
            <GraduationCap size={32} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>
              Академия <span style={{ color: "#ec4899" }}>Phoenix</span>
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "1.125rem" }}>
              Образование для устойчивого развития и духовного роста
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
          <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#60a5fa", marginBottom: "0.5rem" }}>50+</div>
          <div style={{ color: "#94a3b8" }}>Курсов</div>
        </div>
        <div style={{
          background: "rgba(30, 41, 59, 0.5)",
          border: "1px solid rgba(100, 116, 139, 0.2)",
          borderRadius: "16px",
          padding: "1.5rem",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#10b981", marginBottom: "0.5rem" }}>10K+</div>
          <div style={{ color: "#94a3b8" }}>Студентов</div>
        </div>
        <div style={{
          background: "rgba(30, 41, 59, 0.5)",
          border: "1px solid rgba(100, 116, 139, 0.2)",
          borderRadius: "16px",
          padding: "1.5rem",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#f59e0b", marginBottom: "0.5rem" }}>4.8</div>
          <div style={{ color: "#94a3b8" }}>Средний рейтинг</div>
        </div>
        <div style={{
          background: "rgba(30, 41, 59, 0.5)",
          border: "1px solid rgba(100, 116, 139, 0.2)",
          borderRadius: "16px",
          padding: "1.5rem",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#ec4899", marginBottom: "0.5rem" }}>24/7</div>
          <div style={{ color: "#94a3b8" }}>Доступ</div>
        </div>
      </div>

      {/* Категории */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem" }}>Категории курсов</h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: "0.75rem 1.5rem",
                background: selectedCategory === category 
                  ? "linear-gradient(90deg, #8b5cf6, #ec4899)" 
                  : "rgba(255, 255, 255, 0.05)",
                border: selectedCategory === category 
                  ? "none" 
                  : "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "100px",
                color: "white",
                fontWeight: selectedCategory === category ? "600" : "400",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Курсы */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Популярные курсы</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8" }}>
            <span>Сортировать по популярности</span>
            <ArrowRight size={18} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              style={{
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(100, 116, 139, 0.2)",
                borderRadius: "20px",
                padding: "1.5rem",
                transition: "transform 0.3s, border-color 0.3s"
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                <div>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.25rem 0.75rem",
                    background: "rgba(139, 92, 246, 0.1)",
                    borderRadius: "100px",
                    fontSize: "0.75rem",
                    color: "#a855f7",
                    marginBottom: "1rem"
                  }}>
                    <span style={{ fontSize: "1rem" }}>{course.icon}</span>
                    {course.category}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                    {course.title}
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Метаданные курса */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8" }}>
                  <Clock size={16} />
                  <span style={{ fontSize: "0.875rem" }}>{course.duration}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8" }}>
                  <Users size={16} />
                  <span style={{ fontSize: "0.875rem" }}>{course.students.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8" }}>
                  <Star size={16} />
                  <span style={{ fontSize: "0.875rem" }}>{course.rating}</span>
                </div>
                <div style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
                  Уровень: {course.level}
                </div>
              </div>

              <button style={{
                width: "100%",
                padding: "0.75rem",
                background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontWeight: "600",
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
                <PlayCircle size={20} />
                Начать курс
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
