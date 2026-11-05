import { useState, useEffect } from "react";
import { ExternalLink, Github, Terminal, Shield, Code2, Layers, Bug, Lock, Network, AlertTriangle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import rentwise from "@/assets/rentwise.png";
import fundifind from "@/assets/fundifind.png";
import ominbiz from "@/assets/ominbiz.png";
import glomovie from "@/assets/glomovie.png";
import glovcf from "@/assets/glovcf.png";

// Touch devices never fire hover, so effects gated on hover must have a
// visible-by-default fallback on phones.
const useCanHover = () => {
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return canHover;
};

// ── Dev projects ──────────────────────────────────────────────────
const devProjects = [
  {
    id: 1,
    title: "OmniBiz Hub — Business Management Platform",
    description: "Operations platform for small businesses: inventory, e-commerce orders, appointments and finances in one dashboard. I built the React interface and the Express/MongoDB API behind it, and integrated M-Pesa (Daraja) payments so orders can be paid and reconciled in the same system.",
    image: ominbiz,
    tags: ["React", "Node.js", "Express", "MongoDB", "M-Pesa Daraja"],
    category: "Full-Stack",
    liveUrl: "https://omnibizhub.netlify.app/",
    githubUrl: "https://github.com/glorisonglotech",
  },
  {
    id: 2,
    title: "Movie Discovery App",
    description: "React search interface over a public movie API: results update as you type, genres are browsable, and loading, empty and error states are all handled explicitly so the UI never lies about what it is showing.",
    image: glomovie,
    tags: ["React", "Tailwind CSS", "REST API", "Async State"],
    category: "Frontend",
    liveUrl: "https://glomovie.netlify.app/",
    githubUrl: "https://github.com/glorisonglotech",
  },
  {
    id: 3,
    title: "RentWise — Rental Management System",
    description: "Property operations platform covering leases, rent tracking, maintenance requests and tenant messaging. React front end on an Express/MongoDB API, with authentication gating every dashboard route so users only reach their own records.",
    image: rentwise,
    tags: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT Auth"],
    category: "Full-Stack",
    liveUrl: "https://rentwisek.netlify.app/",
    githubUrl: "https://github.com/glorisonglotech",
  },
  {
    id: 4,
    title: "GloVCF — Contact File Generator",
    description: "Turns contact details into importable .vcf files, removing the manual formatting work of moving contacts between devices. Input is validated before the file is generated and returned for download.",
    image: glovcf,
    tags: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    category: "Full-Stack",
    liveUrl: "https://glovcf.netlify.app/",
    githubUrl: "https://github.com/glorisonglotech",
  },
  {
    id: 5,
    title: "FundiFind — Service Marketplace",
    description: "Marketplace connecting customers with fundis (artisans) across Kenya: search by trade and location, review provider profiles and request work. React front end backed by an Express/MongoDB API.",
    image: fundifind,
    tags: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    category: "Full-Stack",
    liveUrl: "https://fundifind.netlify.app/",
    githubUrl: "https://github.com/glorisonglotech",
  },
];

// ── Cyber projects ────────────────────────────────────────────────
const cyberProjects = [
  {
    id: 101,
    title: "Web Application Penetration Test",
    description: "Black-box assessment of an intentionally vulnerable e-commerce target, run through a documented methodology: recon, enumeration, exploitation, then evidence capture. Findings included SQL injection, stored XSS, IDOR and broken authentication, each written up with CVSS severity, reproduction steps and remediation.",
    tags: ["Burp Suite", "SQLmap", "OWASP Top 10", "CVSS"],
    severity: "CRITICAL",
    type: "VAPT",
    icon: Bug,
    findings: ["SQL injection — CVSS 9.8 (critical)", "Stored XSS — 3 endpoints", "IDOR — other users' data exposed", "Broken auth — session fixation"],
    status: "Report Delivered",
    githubUrl: "https://github.com/glorisonglotech",
  },
  {
    id: 102,
    title: "Network Traffic Analysis",
    description: "Captured live traffic in a lab network with tcpdump, then analyzed it in Wireshark and custom Scapy scripts to surface anomalies: cleartext credentials, ARP spoofing, port scanning and DNS tunneling. Documented each anomaly with the packet-level evidence behind it.",
    tags: ["Wireshark", "Python", "Scapy", "PCAP Analysis"],
    severity: "HIGH",
    type: "NETWORK",
    icon: Network,
    findings: ["ARP spoofing detected", "Cleartext credentials in HTTP", "Port scan from 192.168.1.44", "Suspicious DNS tunnelling"],
    status: "Analysis Complete",
    githubUrl: "https://github.com/glorisonglotech",
  },
  {
    id: 103,
    title: "CTF Challenge Write-ups",
    description: "Write-ups of Capture The Flag challenges across web exploitation, reverse engineering, cryptography and forensics. Each entry records the initial enumeration, the reasoning path, the exploit, and the lesson worth reusing.",
    tags: ["TryHackMe", "HackTheBox", "PicoCTF", "Crypto", "Forensics"],
    severity: "MEDIUM",
    type: "CTF",
    icon: Terminal,
    findings: ["80+ challenges solved", "Web, crypto & forensics", "Reverse engineering basics", "Write-ups documented"],
    status: "Ongoing",
    githubUrl: "https://github.com/glorisonglotech",
  },
  {
    id: 104,
    title: "Secure Authentication System",
    description: "Designed and implemented a hardened authentication module featuring JWT with refresh tokens, bcrypt hashing, rate limiting, brute-force protection, and OWASP-compliant session management.",
    tags: ["Node.js", "JWT", "bcrypt", "Rate Limiting", "OWASP"],
    severity: "HIGH",
    type: "SECURE DEV",
    icon: Lock,
    findings: ["JWT + refresh token rotation", "bcrypt hashing, 12 rounds", "Rate limit: 5 req/min on login", "OWASP A07 controls implemented"],
    status: "Implemented & Tested",
    githubUrl: "https://github.com/glorisonglotech",
  },
  {
    id: 105,
    title: "SOC Incident Response Lab",
    description: "Home SOC lab built on Security Onion, used to simulate phishing, ransomware behavior and privilege escalation, then confirm detection end to end. Wrote custom Suricata rules and Elastic Security detection rules, and reviewed the resulting alerts as a triage exercise.",
    tags: ["Security Onion", "Suricata", "ELK Stack", "SIEM"],
    severity: "HIGH",
    type: "SOC",
    icon: Shield,
    findings: ["Phishing campaign detected", "Ransomware IOCs flagged", "Priv-esc alert triggered", "Custom Suricata rules"],
    status: "Lab Active",
    githubUrl: "https://github.com/glorisonglotech",
  },
  {
    id: 106,
    title: "Vulnerability Scanner Script",
    description: "Python-based scanner that enumerates open ports, fingerprints service versions, correlates them against the NVD (CVE) API and writes a structured JSON report for triage. Built to automate the repetitive first pass of an assessment.",
    tags: ["Python", "Nmap", "NVD API", "JSON Reports"],
    severity: "MEDIUM",
    type: "TOOL",
    icon: AlertTriangle,
    findings: ["Port & service enumeration", "Version fingerprinting", "NVD CVE correlation", "JSON report output"],
    status: "Open Source",
    githubUrl: "https://github.com/glorisonglotech",
  },
];

const severityConfig = {
  CRITICAL: { dot: "bg-red-500",    text: "text-red-600 dark:text-red-400",    border: "border-red-300 dark:border-red-500/40",    badge: "bg-red-50 dark:bg-red-500/10",    pulse: true  },
  HIGH:     { dot: "bg-orange-500", text: "text-orange-600 dark:text-orange-400", border: "border-orange-300 dark:border-orange-500/30", badge: "bg-orange-50 dark:bg-orange-500/10", pulse: false },
  MEDIUM:   { dot: "bg-yellow-500", text: "text-yellow-600 dark:text-yellow-400", border: "border-yellow-300 dark:border-yellow-500/30", badge: "bg-yellow-50 dark:bg-yellow-500/10", pulse: false },
};

const devCategories = [
  { label: "All",        icon: Layers   },
  { label: "Full-Stack", icon: Shield   },
  { label: "Frontend",   icon: Code2    },
];

// ── Scan line ─────────────────────────────────────────────────────
const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-px bg-red-400/40 dark:bg-red-500/30 pointer-events-none z-10"
    initial={{ top: "0%" }}
    animate={{ top: ["0%", "100%", "0%"] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
  />
);

// ── Animated terminal output for cyber cards ──────────────────────
const CyberTerminal = ({ findings, isHovered, canHover }) => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    // No hover available: show every line instead of an empty panel.
    if (!canHover) { setVisibleLines(findings.length); return; }
    if (!isHovered) { setVisibleLines(0); return; }
    setVisibleLines(0);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= findings.length) clearInterval(timer);
    }, 280);
    return () => clearInterval(timer);
  }, [isHovered, findings, canHover]);

  return (
    <div className="relative w-full bg-gray-950 dark:bg-black flex flex-col">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 dark:bg-black border-b border-red-500/20 shrink-0">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="ml-1 font-mono text-xs text-gray-500">scan_output.log</span>
        <span className="ml-auto flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-xs text-red-400">LIVE</span>
        </span>
      </div>

      {/* Terminal body */}
      <div className="flex-1 p-3.5 sm:p-4 font-mono text-[11px] sm:text-xs">
        <div className="text-green-400 mb-2 truncate">$ ./scanner --target webapp --verbose</div>
        <AnimatePresence>
          {findings.map((line, i) =>
            i < visibleLines ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2 mb-1"
              >
                <CheckCircle className="h-3 w-3 text-red-400 mt-0.5 shrink-0" />
                <span className="text-gray-300 leading-snug break-words">{line}</span>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
        {/* blinking cursor */}
        <span className="inline-block w-2 h-3.5 bg-green-400 animate-pulse ml-1" />
      </div>

      {/* Dark gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-950 dark:from-black to-transparent" />
    </div>
  );
};

// ── Dev project card ──────────────────────────────────────────────
const DevCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-default"
    >
      <div className={`
        relative rounded-xl border overflow-hidden
        backdrop-blur-sm transition-all duration-300 flex flex-col h-full
        ${isHovered
          ? "border-red-500 shadow-xl shadow-red-500/15 dark:shadow-red-500/25 bg-white/90 dark:bg-black/50"
          : "border-red-200 dark:border-red-500/20 bg-white/70 dark:bg-black/30"}
      `}>
        {isHovered && <ScanLine />}
        <span className="absolute top-2 left-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors z-10">[</span>
        <span className="absolute top-2 right-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors z-10">]</span>

        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-red-500/40">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-xs text-red-400 font-bold">{project.category}</span>
            </div>
          </div>
          <motion.div
            className="absolute top-0 left-0 right-0 px-3 py-2 flex items-center gap-2 bg-black/70 backdrop-blur-sm border-b border-red-500/30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="font-mono text-xs text-gray-400 ml-1 truncate">
              ~/projects/{project.title.toLowerCase().replace(/\s+/g, "-")}
            </span>
          </motion.div>
        </div>

        <div className="p-4 sm:p-6 flex flex-col flex-1">
          <h3 className="text-base sm:text-xl font-bold mb-2 leading-snug text-gray-900 dark:text-foreground">{project.title}</h3>
          <p className="text-[13px] sm:text-sm text-gray-500 dark:text-muted-foreground leading-relaxed mb-3.5 sm:mb-4 flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
            {project.tags.map(tag => (
              <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/25 text-red-600 dark:text-red-400">{tag}</span>
            ))}
          </div>
          <div className="border-t border-red-100 dark:border-red-500/10 pt-3.5 sm:pt-4 flex gap-2 sm:gap-3">
            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white flex-1 h-9 px-2 text-[11px] sm:text-sm" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live Demo
              </a>
            </Button>
            <Button variant="outline" size="sm" className="border-red-300 dark:border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 flex-1 h-9 px-2 text-[11px] sm:text-sm" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1.5 h-3.5 w-3.5" /> GitHub
              </a>
            </Button>
          </div>
        </div>

        <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-red-500"
          initial={{ scaleX: 0 }} animate={{ scaleX: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }} />
      </div>
    </motion.div>
  );
};

// ── Cyber project card ────────────────────────────────────────────
const CyberCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canHover = useCanHover();
  const sc = severityConfig[project.severity];
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-default"
    >
      <div className={`
        relative rounded-xl border overflow-hidden
        backdrop-blur-sm transition-all duration-300 flex flex-col h-full
        ${isHovered
          ? "border-red-500 shadow-xl shadow-red-500/15 dark:shadow-red-500/25 bg-white/90 dark:bg-black/50"
          : "border-red-200 dark:border-red-500/20 bg-white/70 dark:bg-black/30"}
      `}>
        {isHovered && <ScanLine />}
        <span className="absolute top-2 left-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors z-10">[</span>
        <span className="absolute top-2 right-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors z-10">]</span>

        {/* Terminal visual replaces image */}
        <CyberTerminal findings={project.findings} isHovered={isHovered} canHover={canHover} />

        <div className="p-4 sm:p-6 flex flex-col flex-1">
          {/* Top row: icon + type + severity */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 shrink-0
                ${isHovered ? "bg-red-500 border-red-500" : "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30"}`}>
                <Icon className={`h-4 w-4 transition-colors duration-300 ${isHovered ? "text-white" : "text-red-500"}`} />
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-red-600 dark:text-red-400 font-bold tracking-widest">{project.type}</span>
            </div>
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border shrink-0 ${sc.border} ${sc.badge}`}
              title="Highest severity identified in this engagement">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${sc.dot} ${sc.pulse ? "animate-pulse" : ""}`} />
              <span className={`font-mono text-xs font-bold ${sc.text}`}>{project.severity}</span>
            </div>
          </div>

          <h3 className="text-base sm:text-xl font-bold mb-2 leading-snug text-gray-900 dark:text-foreground">{project.title}</h3>
          <p className="text-[13px] sm:text-sm text-gray-500 dark:text-muted-foreground leading-relaxed mb-3.5 sm:mb-4 flex-1">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/25 text-red-600 dark:text-red-400">{tag}</span>
            ))}
          </div>

          <div className="border-t border-red-100 dark:border-red-500/10 pt-3.5 sm:pt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              <span className="font-mono text-[11px] sm:text-xs text-green-600 dark:text-green-400 truncate">{project.status}</span>
            </div>
            <Button variant="outline" size="sm"
              className="border-red-300 dark:border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 h-9 px-2 text-[11px] sm:text-xs"
              asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1.5 h-3.5 w-3.5" /> GitHub
              </a>
            </Button>
          </div>
        </div>

        <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-red-500"
          initial={{ scaleX: 0 }} animate={{ scaleX: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }} />
      </div>
    </motion.div>
  );
};

// ── Main section ──────────────────────────────────────────────────
export const Projects = () => {
  const [activeTab, setActiveTab] = useState("dev");
  const [devCategory, setDevCategory] = useState("All");

  const filteredDev = devCategory === "All" ? devProjects : devProjects.filter(p => p.category === devCategory);
  const totalShown = activeTab === "dev" ? filteredDev.length : cyberProjects.length;

  return (
    <section id="projects" className="py-16 sm:py-20 bg-secondary/30 relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(239,68,68,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(239,68,68,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-black/40 border border-red-300 dark:border-red-500/30 rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs text-red-600 dark:text-red-400 tracking-widest uppercase">
              projects.log — {totalShown} entries
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured <span className="text-red-500 font-mono">[Projects]</span>
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto px-1">
            Selected build work and security engagements — the problem, the approach, the tools, and what came out of it
          </p>
        </motion.div>

        {/* ── Main tab toggle: Dev vs Cyber ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8">
          <div className="flex sm:inline-flex w-full sm:w-auto rounded-xl border border-red-200 dark:border-red-500/25 bg-white/60 dark:bg-black/30 p-1 gap-1 backdrop-blur-sm">
            {[
              { key: "dev",   label: "Dev Projects",   icon: Code2   },
              { key: "cyber", label: "Cyber Projects",  icon: Shield  },
            ].map(({ key, label, icon: Icon }) => {
              const active = activeTab === key;
              return (
                <button key={key} onClick={() => setActiveTab(key)}
                  className={`flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 py-2.5 rounded-lg font-mono text-[11px] sm:text-sm font-semibold whitespace-nowrap transition-all duration-200
                    ${active
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                      : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-black/50"}`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  {label}
                  {active && <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Dev sub-filter (only shown on dev tab) ── */}
        <AnimatePresence>
          {activeTab === "dev" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-wrap justify-center gap-1.5 sm:gap-3 mb-8 sm:mb-10 overflow-hidden"
            >
              {devCategories.map(({ label, icon: Icon }) => {
                const active = devCategory === label;
                return (
                  <button key={label} onClick={() => setDevCategory(label)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-mono text-[11px] sm:text-sm font-semibold border whitespace-nowrap transition-all duration-200
                      ${active
                        ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/25"
                        : "bg-white/70 dark:bg-black/30 border-red-200 dark:border-red-500/25 text-red-600 dark:text-red-400 hover:border-red-500 hover:bg-red-50 dark:hover:bg-black/50"}`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {label}
                    {active && <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + devCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
          >
            {activeTab === "dev"
              ? filteredDev.map((p, i) => <DevCard key={p.id} project={p} index={i} />)
              : cyberProjects.map((p, i) => <CyberCard key={p.id} project={p} index={i} />)
            }
          </motion.div>
        </AnimatePresence>

        {/* Footer status */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-8 border-t border-red-200 dark:border-red-500/10 pt-7 sm:pt-8"
        >
          {[
            { label: "Showing", value: `${totalShown} projects`, dot: "bg-green-500" },
            { label: "Mode",    value: activeTab === "dev" ? "MERN Dev" : "CyberSec", dot: activeTab === "dev" ? "bg-blue-500" : "bg-red-500" },
            { label: "Status",  value: "Open to work", dot: "bg-orange-500" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${item.dot} animate-pulse`} />
              <span className="font-mono text-[11px] sm:text-xs text-gray-500 dark:text-muted-foreground">
                {item.label}:{" "}
                <span className="text-gray-900 dark:text-foreground font-bold">{item.value}</span>
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};