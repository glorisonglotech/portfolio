import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2, Database, Globe, Server,
  Shield, Search, Lock, Network, Users, Bug
} from "lucide-react";

const mernServices = [
  {
    title: "Frontend Development",
    description: "Building responsive, interactive user interfaces with React, TypeScript, and modern CSS frameworks.",
    icon: Code2,
    tag: "REACT · TS · CSS",
  },
  {
    title: "Backend Development",
    description: "Developing robust APIs and server-side logic with Node.js and Express.js.",
    icon: Server,
    tag: "NODE · EXPRESS",
  },
  {
    title: "Database Design",
    description: "Designing and optimizing MongoDB databases for scalability and performance.",
    icon: Database,
    tag: "MONGODB · REDIS",
  },
  {
    title: "Full-Stack Solutions",
    description: "End-to-end web application development from concept to deployment.",
    icon: Globe,
    tag: "END-TO-END",
  },
];

const cybersecurityServices = [
  {
    title: "Vulnerability Assessment & Penetration Testing",
    description: "Identifying security weaknesses through comprehensive testing and ethical hacking techniques.",
    icon: Bug,
    tag: "VAPT",
    severity: "CRITICAL",
  },
  {
    title: "Secure Web Application Development",
    description: "Building applications with security best practices, including OWASP Top 10 mitigation.",
    icon: Shield,
    tag: "OWASP · SAST",
    severity: "HIGH",
  },
  {
    title: "SOC Analysis & Threat Detection",
    description: "Monitoring, analyzing, and responding to security incidents and potential threats.",
    icon: Search,
    tag: "SOC · SIEM",
    severity: "HIGH",
  },
  {
    title: "Network Security & Firewall Configuration",
    description: "Implementing and managing network defenses to protect infrastructure from attacks.",
    icon: Network,
    tag: "IDS · IPS · FW",
    severity: "MEDIUM",
  },
  {
    title: "Security Awareness Training",
    description: "Educating teams on cybersecurity best practices and threat recognition.",
    icon: Users,
    tag: "TRAINING",
    severity: "MEDIUM",
  },
  {
    title: "Security Audits & Compliance",
    description: "Conducting thorough security assessments to ensure regulatory compliance.",
    icon: Lock,
    tag: "ISO · GDPR · PCI",
    severity: "HIGH",
  },
];

// severity styles — both light and dark handled via Tailwind dark: prefix
const severityConfig = {
  CRITICAL: {
    dot:    "bg-red-500",
    text:   "text-red-600 dark:text-red-400",
    border: "border-red-300 dark:border-red-500/40",
    badge:  "bg-red-50 dark:bg-red-500/10",
    pulse:  true,
  },
  HIGH: {
    dot:    "bg-orange-500",
    text:   "text-orange-600 dark:text-orange-400",
    border: "border-orange-300 dark:border-orange-500/30",
    badge:  "bg-orange-50 dark:bg-orange-500/10",
    pulse:  false,
  },
  MEDIUM: {
    dot:    "bg-yellow-500",
    text:   "text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-300 dark:border-yellow-500/30",
    badge:  "bg-yellow-50 dark:bg-yellow-500/10",
    pulse:  false,
  },
};

const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-px bg-red-400/40 dark:bg-red-500/30 pointer-events-none"
    initial={{ top: "0%" }}
    animate={{ top: ["0%", "100%", "0%"] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
  />
);

export const Services = () => {
  const [hoveredMern, setHoveredMern] = useState(null);
  const [hoveredCyber, setHoveredCyber] = useState(null);

  return (
    <section id="services" className="py-20 bg-secondary/20 relative overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,68,68,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(239,68,68,0.8) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Scan-line overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2
            bg-white/70 dark:bg-black/40
            border border-red-300 dark:border-red-500/30
            rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-xs text-red-600 dark:text-red-400 tracking-widest uppercase">
              services.exe — running
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            My <span className="text-red-500 font-mono">[Services]</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            Combining development expertise with security-first thinking to deliver comprehensive solutions
          </p>
        </motion.div>

        {/* MERN Stack */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="flex items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2
              bg-white/70 dark:bg-black/40
              border border-green-300 dark:border-green-500/30
              rounded-lg px-3 py-1.5 backdrop-blur-sm"
            >
              <Code2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="font-mono text-sm text-green-700 dark:text-green-400 font-semibold tracking-wide">
                MERN Stack Development
              </span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {mernServices.map((service, index) => {
              const Icon = service.icon;
              const isHovered = hoveredMern === index;
              return (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredMern(index)}
                  onMouseLeave={() => setHoveredMern(null)}
                  className="relative group cursor-default"
                >
                  <div className={`
                    relative h-full rounded-xl border p-5
                    backdrop-blur-sm overflow-hidden
                    transition-all duration-300
                    ${isHovered
                      ? "border-red-500 shadow-lg shadow-red-500/15 dark:shadow-red-500/20 bg-red-50/80 dark:bg-black/50"
                      : "border-red-200 dark:border-red-500/20 bg-white/70 dark:bg-black/30 hover:border-red-400 dark:hover:border-red-500/50"}
                  `}>
                    {isHovered && <ScanLine />}

                    <span className="absolute top-2 left-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors">[</span>
                    <span className="absolute top-2 right-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors">]</span>

                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center mb-4 mt-2
                      border transition-all duration-300
                      ${isHovered
                        ? "bg-red-500 border-red-500"
                        : "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30"}
                    `}>
                      <Icon className={`h-5 w-5 transition-colors duration-300 ${isHovered ? "text-white" : "text-red-500"}`} />
                    </div>

                    <div className="mb-2">
                      <span className="font-mono text-xs text-red-500/60 dark:text-red-400/70 tracking-widest">{service.tag}</span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base mb-2 text-gray-900 dark:text-foreground">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground leading-relaxed">{service.description}</p>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-px bg-red-500"
                      initial={{ scaleX: 0 }} animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Cybersecurity */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="flex items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2
              bg-white/70 dark:bg-black/40
              border border-red-300 dark:border-red-500/30
              rounded-lg px-3 py-1.5 backdrop-blur-sm"
            >
              <Shield className="h-5 w-5 text-red-500" />
              <span className="font-mono text-sm text-red-600 dark:text-red-400 font-semibold tracking-wide">
                Cybersecurity Services
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-red-400/50 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {cybersecurityServices.map((service, index) => {
              const Icon = service.icon;
              const isHovered = hoveredCyber === index;
              const sc = severityConfig[service.severity];
              return (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredCyber(index)}
                  onMouseLeave={() => setHoveredCyber(null)}
                  className="relative group cursor-default"
                >
                  <div className={`
                    relative h-full rounded-xl border p-5
                    backdrop-blur-sm overflow-hidden
                    transition-all duration-300
                    ${isHovered
                      ? `${sc.border} shadow-lg bg-red-50/80 dark:bg-black/50`
                      : "border-red-200 dark:border-red-500/20 bg-white/70 dark:bg-black/30 hover:border-red-400 dark:hover:border-red-500/40"}
                  `}>
                    {isHovered && <ScanLine />}

                    <span className="absolute top-2 left-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors">[</span>
                    <span className="absolute top-2 right-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors">]</span>

                    <div className="flex items-start justify-between mb-3 mt-2">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center
                        border transition-all duration-300
                        ${isHovered
                          ? "bg-red-500 border-red-500"
                          : "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30"}
                      `}>
                        <Icon className={`h-5 w-5 transition-colors duration-300 ${isHovered ? "text-white" : "text-red-500"}`} />
                      </div>

                      {/* Severity badge */}
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border ${sc.border} ${sc.badge}`}>
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${sc.dot} ${sc.pulse ? "animate-pulse" : ""}`} />
                        <span className={`font-mono text-xs font-bold ${sc.text}`}>{service.severity}</span>
                      </div>
                    </div>

                    <div className="mb-2">
                      <span className="font-mono text-xs text-red-500/60 dark:text-red-400/70 tracking-widest">{service.tag}</span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base mb-2 text-gray-900 dark:text-foreground leading-snug">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground leading-relaxed">{service.description}</p>

                    <div className="mt-4 pt-3 border-t border-red-100 dark:border-red-500/10 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="font-mono text-xs text-green-600 dark:text-green-400/70">service.active</span>
                    </div>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-px bg-red-500"
                      initial={{ scaleX: 0 }} animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer status bar */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-t border-red-200 dark:border-red-500/10 pt-8"
        >
          {[
            { label: "Services Active", value: "10",   dot: "bg-green-500" },
            { label: "Threats Mitigated", value: "200+", dot: "bg-red-500" },
            { label: "Uptime",           value: "99.9%", dot: "bg-blue-500" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${item.dot} animate-pulse`} />
              <span className="font-mono text-xs text-gray-500 dark:text-muted-foreground">
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