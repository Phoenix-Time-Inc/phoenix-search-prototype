"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, GraduationCap, User, Globe, Home, Heart } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Главная", path: "/", icon: <Home size={20} /> },
    { name: "Поиск", path: "/search", icon: <Search size={20} /> },
    { name: "Академия", path: "/academy", icon: <GraduationCap size={20} /> },
    { name: "Сеть", path: "/p2p", icon: <Globe size={20} /> },
    { name: "Знания", path: "/knowledge", icon: <Heart size={20} /> },
    { name: "Профиль", path: "/profile", icon: <User size={20} /> },
  ];

  return (
    <html lang="ru">
      <head>
        <title>Phoenix Hearts Network</title>
        <meta name="description" content="Децентрализованная сеть знаний и сердец" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{
        fontFamily: "'Inter', sans-serif",
        margin: 0,
        padding: 0,
        background: "linear-gradient(180deg, #0f172a 0%, #000 100%)",
        minHeight: "100vh",
        color: "white"
      }}>
        {/* Навигация */}
        <header style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <div style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            {/* Логотип */}
            <Link href="/" style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
              color: "white"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <span style={{ fontSize: "1.5rem" }}>🦅</span>
              </div>
              <div>
                <div style={{
                  fontSize: "1.25rem",
                  fontWeight: "800",
                  background: "linear-gradient(90deg, #60a5fa, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  Phoenix Hearts
                </div>
                <div style={{
                  fontSize: "0.75rem",
                  color: "#94a3b8"
                }}>
                  network
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav style={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center"
            }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: pathname === item.path ? "white" : "#94a3b8",
                    background: pathname === item.path 
                      ? "linear-gradient(90deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))" 
                      : "transparent",
                    border: pathname === item.path 
                      ? "1px solid rgba(139, 92, 246, 0.3)" 
                      : "1px solid transparent",
                    transition: "all 0.3s ease",
                    fontWeight: pathname === item.path ? "600" : "400"
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== item.path) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.color = "white";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== item.path) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#94a3b8";
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "0.5rem"
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>☰</span>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div style={{
              background: "rgba(15, 23, 42, 0.95)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "1rem"
            }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: pathname === item.path ? "white" : "#94a3b8",
                    background: pathname === item.path 
                      ? "rgba(139, 92, 246, 0.2)" 
                      : "transparent",
                    marginBottom: "0.5rem"
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Основной контент */}
        <main style={{
          marginTop: "80px",
          minHeight: "calc(100vh - 160px)"
        }}>
          {children}
        </main>

        {/* Футер */}
        <footer style={{
          background: "rgba(15, 23, 42, 0.8)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "3rem 2rem 2rem",
          marginTop: "auto"
        }}>
          <div style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "3rem"
          }}>
            {/* Колонка 1: О проекте */}
            <div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{ fontSize: "1.5rem" }}>🦅</span>
                </div>
                <div>
                  <div style={{
                    fontSize: "1.25rem",
                    fontWeight: "800",
                    background: "linear-gradient(90deg, #60a5fa, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                    Phoenix Hearts
                  </div>
                  <div style={{
                    fontSize: "0.75rem",
                    color: "#94a3b8"
                  }}>
                    network
                  </div>
                </div>
              </div>
              <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>
                Децентрализованная сеть знаний, сердец и мудрости. 
                Объединяем людей через технологии и духовность.
              </p>
            </div>

            {/* Колонка 2: Навигация */}
            <div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1.5rem" }}>Разделы</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    style={{
                      color: "#94a3b8",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "color 0.3s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#94a3b8"}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Колонка 3: Контакты */}
            <div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1.5rem" }}>Контакты</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(139, 92, 246, 0.1)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <span>📧</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Email</div>
                    <div>contact@phoenix-hearts.net</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(236, 72, 153, 0.1)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <span>🌐</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Сеть</div>
                    <div>P2P глобус сердец</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Нижняя часть футера */}
          <div style={{
            maxWidth: "1400px",
            margin: "3rem auto 0",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
            color: "#64748b",
            fontSize: "0.875rem"
          }}>
            <p>© 2024 Phoenix Hearts Network. Все права сердца защищены.</p>
            <p style={{ marginTop: "0.5rem" }}>
              Создано с ❤️ для устойчивого развития и равновесия.
            </p>
          </div>
        </footer>

        <style jsx global>{`
          * {
            box-sizing: border-box;
          }

          html {
            scroll-behavior: smooth;
          }

          body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          @media (max-width: 768px) {
            header nav {
              display: none !important;
            }
            header button {
              display: block !important;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
