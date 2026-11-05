import { useEffect, useState } from "react";
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
          text.split("").map((char, i) =>
            i < iterations
              ? char
              : Math.random() < 0.35
              ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
              : char
          ).join("")
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

// ── Threat ticker ─────────────────────────────────────────────────
// A rotating "security baseline" feed: practices actually applied, not simulated telemetry.
const SECURITY_FEED = [
  { icon: <Shield className="h-3 w-3 shrink-0" />,        msg: "OWASP Top 10 review — auth flows hardened",  color: "text-green-600 dark:text-green-400" },
  { icon: <Lock className="h-3 w-3 shrink-0" />,          msg: "JWT access + refresh rotation; bcrypt 12 rounds", color: "text-green-600 dark:text-green-400" },
  { icon: <Terminal className="h-3 w-3 shrink-0" />,      msg: "Burp Suite — input validation and access control tested", color: "text-blue-600 dark:text-blue-400" },
  { icon: <Wifi className="h-3 w-3 shrink-0" />,          msg: "Nmap + Wireshark — service enumeration and traffic analysis", color: "text-blue-600 dark:text-blue-400" },
  { icon: <AlertTriangle className="h-3 w-3 shrink-0" />, msg: "Dependency audit clean before every deploy",  color: "text-yellow-600 dark:text-yellow-400" },
  { icon: <Shield className="h-3 w-3 shrink-0" />,        msg: "CSP, HSTS and security headers verified per release", color: "text-green-600 dark:text-green-400" },
];

const SecurityTicker = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SECURITY_FEED.length), 2800);
    return () => clearInterval(t);
  }, []);
  const item = SECURITY_FEED[idx];
  return (
    <AnimatePresence mode="wait">
      <motion.div key={idx}
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}
        className={`flex items-center gap-2 font-mono text-xs ${item.color} min-w-0`}
      >
        {item.icon}
        <span className="truncate">{item.msg}</span>
      </motion.div>
    </AnimatePresence>
  );
};

// ── Stats ─────────────────────────────────────────────────────────
const stats = [
  { label: "Certifications",   value: "5",   icon: <Shield   className="h-4 w-4 text-red-500" /> },
  { label: "CTF Challenges",   value: "80+", icon: <Terminal className="h-4 w-4 text-red-500" /> },
  { label: "Projects Shipped", value: "6",   icon: <Code2    className="h-4 w-4 text-red-500" /> },
];

// ── Typing subtitle ───────────────────────────────────────────────
const TITLES = ["Cybersecurity Analyst", "Penetration Tester", "SOC Analyst", "Secure Full-Stack Developer"];
const useTyping = () => {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const full = TITLES[titleIdx];
    let timeout;
    if (!deleting && displayed.length < full.length)
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 70);
    else if (!deleting)
      timeout = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    else { setDeleting(false); setTitleIdx(i => (i + 1) % TITLES.length); }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIdx]);
  return displayed;
};

// ── Hero ──────────────────────────────────────────────────────────
export const Hero = () => {
  const glitchedName = useGlitch("Glorison Ouma");
  const typedTitle   = useTyping();

  return (
    <section
      id="home"
      className="min-h-screen gradient-hero flex items-center pt-10 relative overflow-hidden"
    >
      <HeroParticles />

      {/* Scan-line overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-10">

        {/* Security baseline ticker — desktop (decorative, hidden from assistive tech) */}
        <motion.div aria-hidden="true" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 hidden sm:flex items-center gap-3
            bg-white/60 dark:bg-black/40 backdrop-blur-sm
            border border-red-300 dark:border-red-500/30
            rounded-lg px-4 py-2 w-fit max-w-full overflow-hidden"
        >
          <span className="flex items-center gap-1 font-mono text-xs text-red-600 dark:text-red-500 shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            SECURITY BASELINE
          </span>
          <span className="text-red-400/50 text-xs shrink-0">|</span>
          <div className="min-w-0 flex-1"><SecurityTicker /></div>
        </motion.div>

        {/* Security baseline ticker — mobile */}
        <motion.div aria-hidden="true" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 flex sm:hidden items-center gap-2
            bg-white/60 dark:bg-black/40 backdrop-blur-sm
            border border-red-300 dark:border-red-500/30
            rounded-lg px-3 py-2 w-full overflow-hidden"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
          <span className="font-mono text-xs text-red-600 dark:text-red-500 shrink-0">BASELINE</span>
          <span className="text-red-400/40 shrink-0">|</span>
          <div className="min-w-0 flex-1"><SecurityTicker /></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* LEFT — text */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
              Hi, I&apos;m{" "}
              <span className="text-red-500 font-mono break-words">{glitchedName}</span>
            </h1>

            <h2 className="text-lg sm:text-2xl lg:text-3xl font-mono font-semibold
              text-gray-600 dark:text-muted-foreground
              mb-6 flex items-center min-h-[2rem] sm:min-h-[2.5rem]">
              <span className="text-red-500 mr-2 shrink-0">&gt;</span>
              <span className="break-words">{typedTitle}</span>
              <span className="inline-block w-0.5 h-5 sm:h-7 bg-red-500 ml-1 shrink-0 animate-pulse" />
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-muted-foreground mb-6 max-w-xl">
              I test web applications the way an attacker would, then help teams fix what I find. My work sits at
              the intersection of application security, penetration testing and SOC analysis &mdash; grounded in
              full-stack engineering, so every remediation comes with working code.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
              {stats.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2
                    bg-red-50 dark:bg-black/30
                    border border-red-200 dark:border-red-500/25
                    rounded-lg px-3 py-2"
                >
                  {s.icon}
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-none">{s.value}</div>
                    <div className="text-xs text-gray-500 dark:text-muted-foreground leading-tight">{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button variant="hero" asChild className="button-glow bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base">
                <a href="#projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild
                className="button-glow border-red-300 dark:border-red-500/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 text-sm sm:text-base">
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              <a href="https://github.com/glorisonglotech" target="_blank" rel="noopener noreferrer"
                className="text-gray-500 dark:text-muted-foreground hover:text-red-500 transition-smooth" aria-label="GitHub">
                <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="https://linkedin.com/in/glorison" target="_blank" rel="noopener noreferrer"
                className="text-gray-500 dark:text-muted-foreground hover:text-red-500 transition-smooth" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="https://x.com/glorison01" target="_blank" rel="noopener noreferrer"
                className="text-gray-500 dark:text-muted-foreground hover:text-red-500 transition-smooth" aria-label="Twitter">
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT — code card (visible on ALL screen sizes now) */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <div className="absolute inset-0 bg-red-500/10 dark:bg-primary/20 rounded-2xl sm:rounded-3xl blur-3xl" />

              {/* Scan rings */}
              <motion.div className="absolute -inset-2 sm:-inset-3 rounded-2xl sm:rounded-3xl border border-red-400/30 dark:border-red-500/30"
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }} />
              <motion.div className="absolute -inset-4 sm:-inset-6 rounded-2xl sm:rounded-3xl border border-red-400/15 dark:border-red-500/15"
                animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />

              <div className="relative
                bg-white/80 dark:bg-card/50
                backdrop-blur-sm rounded-2xl sm:rounded-3xl
                p-5 sm:p-8 lg:p-10
                border-2 border-red-500
                shadow-lg shadow-red-500/30 dark:shadow-red-500/70"
              >
                {/* Terminal dots */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                  <span className="ml-1 sm:ml-2 font-mono text-xs text-gray-500 dark:text-muted-foreground truncate">
                    ~/glorison — zsh
                  </span>
                </div>

                <div className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm lg:text-base">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 0.5 }} className="overflow-hidden">
                    <code className="text-gray-500 dark:text-muted-foreground">
                      <span className="text-purple-600 dark:text-purple-400">const</span>{" "}
                      <span className="text-blue-600 dark:text-blue-400">developer</span>{" "}
                      = <span className="text-yellow-600 dark:text-yellow-400">{"{"}</span>
                    </code>
                  </motion.div>

                  {[
                    { key: "name",  val: '"Glorison Ouma"',           delay: 1.5 },
                    { key: "role",  val: '"Cybersecurity Analyst"',   delay: 2   },
                    { key: "focus", val: '["AppSec", "VAPT", "SOC"]', delay: 2.5 },
                    { key: "stack", val: '"MERN + security tooling"', delay: 3   },
                  ].map(({ key, val, delay }) => (
                    <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay }} className="pl-3 sm:pl-4">
                      <code className="text-gray-500 dark:text-muted-foreground">
                        {key}:{" "}
                        <span className="text-green-600 dark:text-green-400">{val}</span>
                        {key !== "stack" ? "," : ""}
                      </code>
                    </motion.div>
                  ))}

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3.5 }}>
                    <code className="text-yellow-600 dark:text-yellow-400">{"}"}</code>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 4.2 }}
                    className="pt-2 border-t border-red-300 dark:border-red-500/20">
                    <code className="text-xs text-green-600 dark:text-green-400">
                      ✓ OWASP Top 10 · Burp Suite · Nmap · Wireshark
                    </code>
                  </motion.div>
                </div>

                <motion.div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-4"
                  animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Code2 className="h-7 w-7 sm:h-10 sm:w-10 text-red-500" />
                  <Shield className="h-7 w-7 sm:h-10 sm:w-10 text-red-500" />
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};