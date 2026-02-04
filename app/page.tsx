"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, GraduationCap, Globe, Heart, Users, Zap, Shield, Sparkles, ArrowRight, Star, Target } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const features = [
    {
      icon: <Search size={32} />,
      title: "Умный поиск",
      description: "Находи знания по всему миру через децентрализованную сеть",
      color: "from-blue-500 to-cyan-500",
      link: "/search"
    },
    {
      icon: <GraduationCap size={32} />,
      title: "Академия",
      description: "Образовательные курсы по духовности, технологиям и развитию",
      color: "from-purple-500 to-pink-500",
      link: "/academy"
    },
    {
      icon: <Globe size={32} />,
      title: "Глобус сердец",
      description: "P2P сеть в реальном времени с визуализацией связей",
      color: "from-green-500 to-emerald-500",
      link: "/p2p"
    },
    {
      icon: <Heart size={32} />,
      title: "Хранилище знаний",
      description: "Коллективная мудрость человечества в одном месте",
      color: "from-rose-500 to-red-500",
      link: "/knowledge"
    }
  ];

  const stats = [
    { value: "10K+", label: "Активных сердец", icon: "❤️" },
    { value: "50K+", label: "Единиц знаний", icon: "📚" },
    { value: "24/7", label: "Работа сети", icon: "🌐" },
    { value: "100%", label: "Децентрализация", icon: "🛡️" }
  ];

  return (
    <div style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "2rem"
    }}>
      {/* Герой-секция */}
      <section style={{
        textAlign: "center",
        padding: "4rem 1rem",
        marginBottom: "4rem",
        background: "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.1), transparent 50%)",
        borderRadius: "32px"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.75rem 1.5rem",
          background: "rgba(139, 92, 246, 0.1)",
          borderRadius: "100px",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          marginBottom: "2rem"
        }}>
          <Sparkles size={20} />
          <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
            Добро пожаловать в новую эру интернета
          </span>
        </div>

        <h1 style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: "800",
          lineHeight: "1.2",
          marginBottom: "1.5rem",
          background: "linear-gradient(90deg, #60a5fa, #a855f7, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Где технологии встречаются
          <br />
          с <span style={{ position: "relative" }}>
            духовностью
            <span style={{
              position: "absolute",
              bottom: "-8px",
              left: "0",
              right: "0",
              height: "4px",
              background: "linear-gradient(90deg, #ec4899, transparent)",
              borderRadius: "2px"
            }}></span>
          </span>
        </h1>

        <p style={{
          fontSize: "1.25rem",
          color: "#94a3b8",
          maxWidth: "700px",
          margin: "0 auto 3rem",
          lineHeight: "1.6"
        }}>
          Phoenix Hearts Network — децентрализованная платформа, объединяющая знания, 
          технологии и человеческие сердца в единую экосистему устойчивого развития.
        </p>

        {/* Поиск на главной */}
        <div style={{
          maxWidth: "600px",
          margin: "0 auto 2rem",
          position: "relative"
        }}>
          <div style={{
            display: "flex",
            gap: "1rem",
            background: "rgba(30, 41, 59, 0.5)",
            borderRadius: "16px",
            border: "1px solid rgba(100, 116, 139, 0.2)",
            padding: "0.75rem",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              padding: "0 1rem",
              color: "#94a3b8"
            }}>
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ищите знания, людей, курсы..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "1rem",
                outline: "none"
              }}
            />
            <button style={{
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.3s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              Найти
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/search" style={{
            padding: "0.875rem 2rem",
            background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
            borderRadius: "12px",
            color: "white",
            textDecoration: "none",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "transform 0.3s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Начать поиск
            <ArrowRight size={20} />
          </Link>
          <Link href="/p2p" style={{
            padding: "0.875rem 2rem",
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            color: "white",
            textDecoration: "none",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          >
            Войти в сеть
            <Globe size={20} />
          </Link>
        </div>
      </section>

      {/* Статистика */}
      <section style={{
        marginBottom: "6rem"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem"
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(100, 116, 139, 0.2)",
                borderRadius: "20px",
                padding: "2rem",
                textAlign: "center",
                backdropFilter: "blur(10px)",
                transition: "transform 0.3s, border-color 0.3s",
                animation: `fadeIn 0.5s ease ${index * 0.1}s both`
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
              <div style={{
                fontSize: "3rem",
                marginBottom: "0.5rem"
              }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                background: "linear-gradient(90deg, #60a5fa, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "0.5rem"
              }}>
                {stat.value}
              </div>
              <div style={{
                color: "#94a3b8",
                fontSize: "1rem"
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Основные функции */}
      <section style={{ marginBottom: "6rem" }}>
        <div style={{
          textAlign: "center",
          marginBottom: "4rem"
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "1rem"
          }}>
            Все функции <span style={{ color: "#ec4899" }}>Phoenix</span>
          </h2>
          <p style={{
            fontSize: "1.125rem",
            color: "#94a3b8",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Откройте для себя полную экосистему знаний и связей
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem"
        }}>
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              style={{
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(100, 116, 139, 0.2)",
                borderRadius: "24px",
                padding: "2.5rem 2rem",
                textDecoration: "none",
                color: "white",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                animation: `fadeIn 0.5s ease ${index * 0.1 + 0.5}s both`,
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
                e.currentTarget.style.background = "rgba(30, 41, 59, 0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(100, 116, 139, 0.2)";
                e.currentTarget.style.background = "rgba(30, 41, 59, 0.5)";
              }}
            >
              {/* Градиентный фон */}
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "100px",
                height: "100px",
                background: `linear-gradient(135deg, ${feature.color.split(" ")[0].replace("from-", "#")}, transparent)`,
                opacity: 0.1,
                borderRadius: "0 24px 0 0"
              }}></div>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem"
              }}>
                <div style={{
                  padding: "0.75rem",
                  background: `linear-gradient(135deg, ${feature.color})`,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  margin: 0
                }}>
                  {feature.title}
                </h3>
              </div>

              <p style={{
                color: "#94a3b8",
                lineHeight: "1.6",
                marginBottom: "2rem"
              }}>
                {feature.description}
              </p>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#a855f7",
                fontWeight: "600"
              }}>
                <span>Исследовать</span>
                <ArrowRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Философия */}
      <section style={{
        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
        borderRadius: "32px",
        padding: "4rem",
        marginBottom: "6rem",
        border: "1px solid rgba(139, 92, 246, 0.2)"
      }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <Target size={64} style={{
            margin: "0 auto 2rem",
            color: "#a855f7"
          }} />
          
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "1.5rem"
          }}>
            Наша <span style={{ color: "#ec4899" }}>философия</span>
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            marginTop: "3rem"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "2rem",
                marginBottom: "1rem"
              }}>🌱</div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Устойчивость</h3>
              <p style={{ color: "#94a3b8" }}>Технологии должны служить природе и будущим поколениям</p>
            </div>
            
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "2rem",
                marginBottom: "1rem"
              }}>⚖️</div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Равновесие</h3>
              <p style={{ color: "#94a3b8" }}>Баланс между технологиями и духовностью, знанием и сердцем</p>
            </div>
            
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "2rem",
                marginBottom: "1rem"
              }}>🕊️</div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Доверие</h3>
              <p style={{ color: "#94a3b8" }}>Децентрализация для настоящей свободы и приватности</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        textAlign: "center",
        padding: "4rem 2rem",
        background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), transparent 70%)",
        borderRadius: "32px",
        border: "1px solid rgba(139, 92, 246, 0.2)"
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "1rem"
        }}>
          Готовы присоединиться к <span style={{ color: "#ec4899" }}>сети</span>?
        </h2>
        
        <p style={{
          fontSize: "1.125rem",
          color: "#94a3b8",
          maxWidth: "600px",
          margin: "0 auto 3rem"
        }}>
          Миллионы сердец уже подключены. Ваше сердце займет свое место на глобусе.
        </p>
        
        <div style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <Link href="/p2p" style={{
            padding: "1rem 2.5rem",
            background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
            borderRadius: "14px",
            color: "white",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1.125rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            transition: "transform 0.3s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <Globe size={24} />
            Войти в сеть сердец
          </Link>
          
          <Link href="/academy" style={{
            padding: "1rem 2.5rem",
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "14px",
            color: "white",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1.125rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          >
            <GraduationCap size={24} />
            Начать обучение
          </Link>
        </div>
      </section>
    </div>
  );
}
