import { useEffect, useState, useRef } from "react";
import { ArrowRight, Github, Linkedin, Twitter, Code2, Shield, Terminal, Lock, Wifi, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { HeroParticles } from "./HeroParticles";

// ── Glitch text hook ──────────────────────────────────────────────
const GLITCH_CHARS = "!@#$%^&*<>/\\|[]{}01";
const useGlitch = (text, interval = 3200) => {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    let timeout;
    const glitch = () => {
      let iterations = 0;
      const max = 14;
      const step = () => {
        setDisplay(
          text
            .split("")
            .map((char, i) =>
              i < iterations
                ? char
                : Math.random() < 0.35
                ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
                : char
            )
            .join("")
        );
        iterations++;
        if (iterations <= max) setTimeout(step, 40);
        else { setDisplay(text); timeout = setTimeout(glitch, interval); }
      };
      step();
    };
    timeout = setTimeout(glitch, interval);
    return () => clearTimeout(timeout);
  }, [text, interval]);
  return display;
};

// ── Live threat ticker ────────────────────────────────────────────
const THREATS = [
  { icon: <AlertTriangle className="h-3 w-3" />, msg: "SQL Injection attempt blocked — 192.168.4.21", color: "text-red-400" },
  { icon: <Wifi className="h-3 w-3" />, msg: "Port scan detected on :443 — origin masked", color: "text-yellow-400" },
  { icon: <Lock className="h-3 w-3" />, msg: "Brute-force auth stopped — 47 attempts/s", color: "text-orange-400" },
  { icon: <Terminal className="h-3 w-3" />, msg: "XSS payload sanitised — React DOM secured", color: "text-green-400" },
  { icon: <Shield className="h-3 w-3" />, msg: "CVE-2024-3094 patch applied — system clean", color: "text-blue-400" },
  { icon: <AlertTriangle className="h-3 w-3" />, msg: "CSRF token mismatch — request denied", color: "text-red-400" },
];

const ThreatTicker = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % THREATS.length), 2800);
    return () => clearInterval(t);
  }, []);
  const threat = THREATS[idx];
  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-2 font-mono text-xs ${threat.color}`}
    >
      {threat.icon}
      <span>{threat.msg}</span>
    </motion.div>
  );
};

// ── Stat badges ───────────────────────────────────────────────────
const stats = [
  { label: "Vulnerabilities Fixed", value: "5+", icon: <Shield className="h-4 w-4 text-red-400" /> },
  { label: "Projects Shipped", value: "6+", icon: <Code2 className="h-4 w-4 text-red-400" /> },
  { label: "CTF Challenges", value: "10+", icon: <Terminal className="h-4 w-4 text-red-400" /> },
];

// ── Typing subtitle ───────────────────────────────────────────────
const TITLES = [
  "MERN Stack Developer",
  "Cybersecurity Specialist",
  "Penetration Tester",
  "Secure Code Advocate",
];
const useTyping = () => {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const full = TITLES[titleIdx];
    let timeout;
    if (!deleting && displayed.length < full.length) {
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIdx((i) => (i + 1) % TITLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIdx]);
  return displayed;
};

// ── Main Hero ─────────────────────────────────────────────────────
export const Hero = () => {
  const glitchedName = useGlitch("Glorison Ouma");
  const typedTitle = useTyping();

  return (
    <section
      id="home"
      className="min-h-screen gradient-hero flex items-center pt-1 relative overflow-hidden"
    >
      {/* Water simulation + particles */}
      <HeroParticles />

      {/* Subtle scan-line overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
        {/* ── Threat ticker bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex items-center gap-3 bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-lg px-4 py-2 w-fit"
        >
          <span className="flex items-center gap-1 font-mono text-xs text-red-500 shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE THREAT MONITOR
          </span>
          <span className="text-red-500/40 text-xs">|</span>
          <AnimatePresence mode="wait">
            <ThreatTicker />
          </AnimatePresence>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: text content ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            

            <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">
              Hi, I'm{" "}
              <span className="text-red-500 font-mono">{glitchedName}</span>
            </h1>

            {/* Typing subtitle */}
            <h2 className="text-2xl lg:text-3xl font-mono font-semibold text-muted-foreground mb-6 h-10 flex items-center">
              <span className="text-red-400 mr-2">&gt;</span>
              {typedTitle}
              <span className="inline-block w-0.5 h-7 bg-red-500 ml-1 animate-pulse" />
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Building secure, scalable web applications while defending systems against cyber threats.
              Combining development expertise with security-first thinking to deliver robust digital solutions.
            </p>

            {/* Stat badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 bg-black/30 border border-red-500/25 rounded-lg px-3 py-2"
                >
                  {s.icon}
                  <div>
                    <div className="text-sm font-bold text-white leading-none">{s.value}</div>
                    <div className="text-xs text-muted-foreground leading-tight">{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button variant="hero" asChild className="button-glow bg-red-500">
                <a href="#projects">
                  View Projects <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="button-glow">
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            <div className="flex gap-4">
              <a href="https://github.com/glorisonglotech" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://x.com/glorison01" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          {/* ── Right: code card ── */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl" />

              {/* Security scan ring animation */}
              <motion.div
                className="absolute -inset-3 rounded-3xl border border-red-500/30"
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-6 rounded-3xl border border-red-500/15"
                animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />

              <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border-2 border-red-500 shadow-lg shadow-red-500/70">
                {/* terminal dots */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">~/glorison — zsh</span>
                </div>

                <div className="space-y-3 font-mono text-sm lg:text-base mt-4">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 0.5 }} className="overflow-hidden">
                    <code className="text-muted-foreground">
                      <span className="text-purple-500">const</span>{" "}
                      <span className="text-blue-500">developer</span> ={" "}
                      <span className="text-yellow-500">{"{"}</span>
                    </code>
                  </motion.div>
                  {[
                    { key: "name", val: '"Glorison Ouma"', delay: 1.5 },
                    { key: "role", val: '"MERN Developer"', delay: 2 },
                    { key: "security", val: '"Cyber Specialist"', delay: 2.5 },
                    { key: "passion", val: '"Secure code"', delay: 3 },
                  ].map(({ key, val, delay }) => (
                    <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay }} className="pl-4">
                      <code className="text-muted-foreground">
                        {key}:{" "}
                        <span className="text-green-500">{val}</span>
                        {key !== "passion" ? "," : ""}
                      </code>
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3.5 }}>
                    <code className="text-yellow-500">{"}"}</code>
                  </motion.div>

                  {/* status line */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 4.2 }}
                    className="pt-2 border-t border-red-500/20">
                    <code className="text-xs text-green-400">
                      ✓ All systems secure · TLS 1.3 · OWASP compliant
                    </code>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-6 flex justify-center gap-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Code2 className="h-10 w-10 text-red-500" />
                  <Shield className="h-10 w-10 text-red-500" />
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};