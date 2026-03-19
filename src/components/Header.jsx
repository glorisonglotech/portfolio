import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Shield, Terminal } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home",           href: "#home"           },
  { label: "About",          href: "#about"          },
  { label: "Services",       href: "#services"       },
  { label: "Projects",       href: "#projects"       },
  { label: "Skills",         href: "#skills"         },
  { label: "Certifications", href: "#certifications" },
  { label: "Blog",           href: "#blog"           },
  { label: "Contact",        href: "#contact"        },
];

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for header shadow + active section
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = navItems.map(item => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled
        ? "bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-red-200 dark:border-red-500/20 shadow-sm shadow-red-500/5"
        : "bg-white/70 dark:bg-black/60 backdrop-blur-sm border-b border-red-100 dark:border-red-500/10"}
    `}>

      {/* Animated top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          className="absolute top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-1/3"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center
              bg-red-500 border border-red-600
              shadow-md shadow-red-500/30
              group-hover:shadow-lg group-hover:shadow-red-500/40
              transition-all duration-200">
              <span className="font-mono font-black text-white text-xs">GO</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-gray-900 dark:text-white text-base leading-none">Glorison</span>
              <span className="font-mono text-xs text-red-500 block leading-none mt-0.5">dev · hacker</span>
            </div>
          </a>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`
                    relative px-3 py-1.5 rounded-lg text-xs font-mono font-medium
                    transition-all duration-200
                    ${isActive
                      ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10"
                      : "text-gray-500 dark:text-muted-foreground hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/5"}
                  `}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-2">

            {/* Security status dot — desktop only */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg
              bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-xs text-green-600 dark:text-green-400">secure</span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex items-center justify-center w-9 h-9 rounded-lg
                bg-red-50 dark:bg-red-500/10
                border border-red-200 dark:border-red-500/25
                text-gray-600 dark:text-muted-foreground
                hover:bg-red-500 hover:border-red-500 hover:text-white
                transition-all duration-200"
            >
              {theme === "light"
                ? <Moon className="h-4 w-4" />
                : <Sun className="h-4 w-4" />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg
                bg-red-50 dark:bg-red-500/10
                border border-red-200 dark:border-red-500/25
                text-gray-600 dark:text-muted-foreground
                hover:bg-red-500 hover:border-red-500 hover:text-white
                transition-all duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 border-t border-red-100 dark:border-red-500/10">

                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-4 px-1">
                  <Terminal className="h-3.5 w-3.5 text-red-500" />
                  <span className="font-mono text-xs text-red-600 dark:text-red-400">navigation.menu</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-auto" />
                </div>

                <div className="flex flex-col gap-1">
                  {navItems.map((item, i) => {
                    const isActive = activeSection === item.href.slice(1);
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-lg
                          font-mono text-sm transition-all duration-150
                          ${isActive
                            ? "bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400"
                            : "text-gray-600 dark:text-muted-foreground hover:bg-red-50 dark:hover:bg-red-500/5 hover:text-red-500"}
                        `}
                      >
                        <span className={`text-xs ${isActive ? "text-red-500" : "text-gray-300 dark:text-gray-600"}`}>&gt;</span>
                        {item.label}
                        {isActive && (
                          <span className="ml-auto inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        )}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Mobile status bar */}
                <div className="mt-4 pt-3 border-t border-red-100 dark:border-red-500/10 flex items-center gap-3 px-1">
                  <Shield className="h-3.5 w-3.5 text-red-500" />
                  <span className="font-mono text-xs text-gray-400 dark:text-muted-foreground">
                    glorisonglotech · MERN · CyberSec
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};