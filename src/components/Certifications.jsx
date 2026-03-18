import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Calendar, Shield, Code2, X, ZoomIn } from "lucide-react";
import cybersecJ from "@/assets/cybersecJ.jpg";
import plp from "@/assets/plp.jpg";
import ajira from "@/assets/ajira.jpg";
import javascript from "@/assets/javascript.jpg";

const developerCertifications = [
  {
    title: "Power Learn Project Web Development",
    issuer: "Power Learn Project",
    date: "2025",
    credentialId: "PLP-WEBDEV-12345",
    credentialUrl: "#",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "SQL", "MongoDB"],
    icon: Award,
    image: plp,
  },
  {
    title: "JavaScript Essentials",
    issuer: "JS Institute",
    date: "2025",
    credentialId: "JSI-JS-001",
    credentialUrl: "#",
    skills: ["JavaScript Fundamentals", "ES6+", "DOM Manipulation", "Functions", "Objects"],
    icon: Shield,
    image: javascript,
  },
  {
    title: "Ajira Web Development Training",
    issuer: "Ajira Digital Program",
    date: "2024",
    credentialId: "AJIRA-WEBDEV-001",
    credentialUrl: "#",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Databases"],
    icon: Award,
    image: ajira,
  },
];

const cybersecurityCertifications = [
  {
    title: "Junior Cybersecurity Analyst",
    issuer: "ICT Authority of Kenya",
    date: "2025",
    credentialId: "ICTA-JCA-001",
    credentialUrl: "#",
    skills: ["Network Defense", "Penetration Testing Basics", "Vulnerability Analysis", "Security Operations"],
    icon: Shield,
    image: cybersecJ,
  },
];

// Scan line — consistent with rest of portfolio
const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-px bg-red-400/30 dark:bg-red-500/20 pointer-events-none z-10"
    initial={{ top: "0%" }}
    animate={{ top: ["0%", "100%", "0%"] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
  />
);

// Section label — matches Services/About/Skills
const SectionLabel = ({ icon: Icon, label, color }) => {
  const styles = {
    green: { icon: "text-green-600 dark:text-green-400", border: "border-green-300 dark:border-green-500/30", bg: "bg-white/70 dark:bg-black/40", text: "text-green-700 dark:text-green-400", line: "from-green-400/50" },
    red:   { icon: "text-red-500",                       border: "border-red-300 dark:border-red-500/30",   bg: "bg-white/70 dark:bg-black/40", text: "text-red-600 dark:text-red-400",   line: "from-red-400/50"   },
  };
  const c = styles[color];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-8"
    >
      <div className={`flex items-center gap-2 ${c.bg} border ${c.border} rounded-lg px-3 py-1.5 backdrop-blur-sm`}>
        <Icon className={`h-5 w-5 ${c.icon}`} />
        <span className={`font-mono text-sm ${c.text} font-semibold tracking-wide`}>{label}</span>
        {color === "red" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
      </div>
      <div className={`flex-1 h-px bg-gradient-to-r ${c.line} to-transparent`} />
    </motion.div>
  );
};

// Full-screen cert lightbox
const CertLightbox = ({ cert, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative max-w-3xl w-full rounded-2xl overflow-hidden border-2 border-red-500 shadow-2xl shadow-red-500/30"
      onClick={e => e.stopPropagation()}
    >
      {/* Lightbox header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-950 border-b border-red-500/30">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="ml-2 font-mono text-xs text-gray-400 truncate flex-1">
          ~/certs/{cert.title.toLowerCase().replace(/\s+/g, "-")}.jpg
        </span>
        <button onClick={onClose} className="text-gray-400 hover:text-red-400 transition-colors ml-2">
          <X className="h-4 w-4" />
        </button>
      </div>
      <img src={cert.image} alt={cert.title} className="w-full object-contain bg-black max-h-[80vh]" />
    </motion.div>
  </motion.div>
);

// Cert card
const CertificationCard = ({ cert, index }) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = cert.icon;

  return (
    <>
      <AnimatePresence>
        {showLightbox && <CertLightbox cert={cert} onClose={() => setShowLightbox(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative cursor-default"
      >
        <div className={`
          relative rounded-xl border overflow-hidden flex flex-col h-full
          backdrop-blur-sm transition-all duration-300
          ${isHovered
            ? "border-red-500 shadow-lg shadow-red-500/15 dark:shadow-red-500/25 bg-white/90 dark:bg-black/50"
            : "border-red-200 dark:border-red-500/20 bg-white/70 dark:bg-black/30"
          }
        `}>
          {isHovered && <ScanLine />}

          {/* Corner brackets */}
          <span className="absolute top-2 left-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors z-20">[</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors z-20">]</span>

          {/* ── Certificate image preview ── */}
          <div
            className="relative h-44 sm:h-48 overflow-hidden cursor-pointer group/img"
            onClick={() => setShowLightbox(true)}
          >
            <img
              src={cert.image}
              alt={cert.title}
              className={`w-full h-full object-contain bg-gray-50 dark:bg-gray-900 transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"}`}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Hover zoom hint */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 bg-black/60 border border-red-500/50 rounded-lg px-3 py-2">
                <ZoomIn className="h-4 w-4 text-red-400" />
                <span className="font-mono text-xs text-red-400">view certificate</span>
              </div>
            </motion.div>

            {/* Terminal bar on image hover */}
            <motion.div
              className="absolute top-0 left-0 right-0 px-3 py-1.5 flex items-center gap-2 bg-black/70 backdrop-blur-sm border-b border-red-500/30"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-mono text-xs text-gray-400 ml-1 truncate">
                ~/certs/{cert.title.toLowerCase().replace(/\s+/g, "-")}.jpg
              </span>
            </motion.div>
          </div>

          {/* ── Content ── */}
          <div className="p-5 sm:p-6 flex flex-col flex-1">

            {/* Icon + title row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className={`
                  w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 shrink-0
                  ${isHovered ? "bg-red-500 border-red-500" : "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30"}
                `}>
                  <Icon className={`h-4 w-4 transition-colors duration-300 ${isHovered ? "text-white" : "text-red-500"}`} />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-foreground leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-red-600 dark:text-red-400 font-mono font-semibold mt-0.5">
                    {cert.issuer}
                  </p>
                </div>
              </div>
              {cert.credentialUrl && cert.credentialUrl !== "#" && (
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-500 transition-colors shrink-0 mt-1">
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-500 dark:text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>Issued: <span className="font-semibold">{cert.date}</span></span>
              </div>
              {cert.credentialId && (
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="text-red-500/60">ID:</span>
                  <span className="text-gray-600 dark:text-gray-400">{cert.credentialId}</span>
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 flex-1">
              {cert.skills.map((skill, idx) => (
                <span key={idx}
                  className="font-mono text-xs px-2 py-0.5 rounded
                    bg-red-50 dark:bg-red-500/10
                    border border-red-200 dark:border-red-500/25
                    text-red-600 dark:text-red-400"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Status footer */}
            <div className="mt-4 pt-3 border-t border-red-100 dark:border-red-500/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="font-mono text-xs text-green-600 dark:text-green-400">cert.verified</span>
              </div>
              <button
                onClick={() => setShowLightbox(true)}
                className="flex items-center gap-1.5 font-mono text-xs text-red-600 dark:text-red-400 hover:text-red-500 transition-colors"
              >
                <ZoomIn className="h-3.5 w-3.5" />
                View cert
              </button>
            </div>
          </div>

          {/* Bottom glow */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-red-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </>
  );
};

// ── Main section ──────────────────────────────────────────────────
export const Certifications = () => {
  const totalCerts = developerCertifications.length + cybersecurityCertifications.length;

  return (
    <section id="certifications" className="py-20 bg-secondary/20 relative overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(239,68,68,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(239,68,68,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2
            bg-white/70 dark:bg-black/40
            border border-red-300 dark:border-red-500/30
            rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-xs text-red-600 dark:text-red-400 tracking-widest uppercase">
              certs.db — {totalCerts} records found
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="text-red-500 font-mono">[Certifications]</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            Professional certifications in development and cybersecurity demonstrating expertise and commitment to continuous learning
          </p>
        </motion.div>

        {/* Dev certs */}
        <div className="mb-14 max-w-6xl mx-auto">
          <SectionLabel icon={Code2} label="Development Certifications" color="green" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {developerCertifications.map((cert, i) => (
              <CertificationCard key={`dev-${i}`} cert={cert} index={i} />
            ))}
          </div>
        </div>

        {/* Cyber certs */}
        <div className="max-w-6xl mx-auto">
          <SectionLabel icon={Shield} label="Cybersecurity Certifications" color="red" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {cybersecurityCertifications.map((cert, i) => (
              <CertificationCard key={`cyber-${i}`} cert={cert} index={i} />
            ))}
          </div>
        </div>

        {/* Footer status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-t border-red-200 dark:border-red-500/10 pt-8"
        >
          {[
            { label: "Dev Certs",   value: `${developerCertifications.length}`,     dot: "bg-green-500" },
            { label: "Cyber Certs", value: `${cybersecurityCertifications.length}`, dot: "bg-red-500"   },
            { label: "Status",      value: "All Verified",                           dot: "bg-blue-500"  },
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