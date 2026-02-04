"use client";

import { useState } from "react";
import { Search, Filter, Book, Users, Globe } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([
    { id: 1, title: "Основы децентрализованных сетей", type: "курс", author: "Академия Phoenix", rating: 4.9 },
    { id: 2, title: "Духовность в цифровую эпоху", type: "статья", author: "Мастер Ли", rating: 4.8 },
    { id: 3, title: "P2P технологии для начинающих", type: "видео", author: "Tech Guru", rating: 4.7 },
    { id: 4, title: "Экология и технологии", type: "книга", author: "Green Future", rating: 4.9 },
    { id: 5, title: "Медитация и программирование", type: "курс", author: "Zen Coder", rating: 4.6 },
    { id: 6, title: "Блокчейн для человечности", type: "статья", author: "Crypto Heart", rating: 4.5 },
  ]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>
          Умный поиск <span style={{ color: "#a855f7" }}>знаний</span>
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1.125rem" }}>
          Найдите информацию по всей децентрализованной сети Phoenix
        </p>
      </div>

      {/* Поисковая строка */}
      <div style={{
        background: "rgba(30, 41, 59, 0.5)",
        border: "1px solid rgba(100, 116, 139, 0.2)",
        borderRadius: "20px",
        padding: "1.5rem",
        marginBottom: "3rem",
        backdropFilter: "blur(10px)"
      }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8"
            }}>
              <Search size={20} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Что вы ищете?"
              style={{
                width: "100%",
                padding: "1rem 1rem 1rem 3rem",
                background: "rgba(15, 23, 42, 0.5)",
                border: "1px solid rgba(100, 116, 139, 0.2)",
                borderRadius: "12px",
                color: "white",
                fontSize: "1rem",
                outline: "none"
              }}
            />
          </div>
          <button style={{
            padding: "1rem 2rem",
            background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <Search size={20} />
            Найти
          </button>
        </div>

        {/* Фильтры */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {["Все", "Курсы", "Статьи", "Видео", "Книги", "Люди"].map((filter) => (
            <button
              key={filter}
              style={{
                padding: "0.5rem 1rem",
                background: filter === "Все" ? "rgba(139, 92, 246, 0.2)" : "rgba(255, 255, 255, 0.05)",
                border: filter === "Все" ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "100px",
                color: "white",
                fontSize: "0.875rem",
                cursor: "pointer"
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Результаты */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Найденные материалы</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8" }}>
            <Filter size={18} />
            <span>Сортировать по релевантности</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
          {results.map((result) => (
            <div
              key={result.id}
              style={{
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(100, 116, 139, 0.2)",
                borderRadius: "20px",
                padding: "1.5rem",
                transition: "transform 0.3s, border-color 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
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
                    gap: "0.25rem",
                    padding: "0.25rem 0.75rem",
                    background: "rgba(139, 92, 246, 0.1)",
                    borderRadius: "100px",
                    fontSize: "0.75rem",
                    color: "#a855f7",
                    marginBottom: "0.75rem"
                  }}>
                    {result.type === "курс" && <Book size={12} />}
                    {result.type === "статья" && <Search size={12} />}
                    {result.type === "видео" && <Globe size={12} />}
                    {result.type === "книга" && <Book size={12} />}
                    {result.type}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                    {result.title}
                  </h3>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  color: "#fbbf24",
                  fontSize: "0.875rem"
                }}>
                  ★ {result.rating}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8" }}>
                  <Users size={16} />
                  <span>{result.author}</span>
                </div>
                <button style={{
                  padding: "0.5rem 1rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "0.875rem",
                  cursor: "pointer"
                }}>
                  Открыть
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
