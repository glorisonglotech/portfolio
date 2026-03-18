import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2, Server, Shield, Wrench, GitBranch, Users
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    color: "green",
    skills: [
      { name: "React / Next.js",              level: 90 },
      { name: "JavaScript / TypeScript",       level: 95 },
      { name: "HTML / CSS / Tailwind",         level: 90 },
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    color: "blue",
    skills: [
      { name: "Node.js / Express",   level: 85 },
      { name: "MongoDB / Mongoose",  level: 80 },
      { name: "RESTful APIs",        level: 90 },
    ],
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    color: "red",
    skills: [
      { name: "Penetration Testing",  level: 80 },
      { name: "Network Security",     level: 75 },
      { name: "SIEM / SOC Analysis",  level: 78 },
    ],
  },
  {
    title: "Security Tools",
    icon: Wrench,
    color: "orange",
    skills: [
      { name: "Wireshark / Nmap",          level: 82 },
      { name: "Burp Suite / OWASP ZAP",    level: 78 },
      { name: "Metasploit / Kali Linux",   level: 75 },
    ],
  },
  {
    title: "Tools & Technologies",
    icon: GitBranch,
    color: "purple",
    skills: [
      { name: "Git / GitHub",       level: 85 },
      { name: "Docker / AWS",       level: 75 },
      { name: "CI/CD / Testing",    level: 80 },
    ],
  },
  {
    title: "Soft Skills",
    icon: Users,
    color: "teal",
    skills: [
      { name: "Problem Solving",     level: 95 },
      { name: "Team Collaboration",  level: 90 },
      { name: "Project Management",  level: 85 },
    ],
  },
];

// color map — each category gets its own accent, both light + dark
const colorMap = {
  red:    { bar: "bg-red-500",    track: "bg-red-100 dark:bg-red-500/10",    text: "text-red-600 dark:text-red-400",    border: "border-red-300 dark:border-red-500/30",    icon: "text-red-500",    iconBg: "bg-red-50 dark:bg-red-500/10"    },
  green:  { bar: "bg-green-500",  track: "bg-green-100 dark:bg-green-500/10",  text: "text-green-700 dark:text-green-400",  border: "border-green-300 dark:border-green-500/30",  icon: "text-green-600 dark:text-green-400", iconBg: "bg-green-50 dark:bg-green-500/10" },
  blue:   { bar: "bg-blue-500",   track: "bg-blue-100 dark:bg-blue-500/10",   text: "text-blue-700 dark:text-blue-400",   border: "border-blue-300 dark:border-blue-500/30",   icon: "text-blue-600 dark:text-blue-400",  iconBg: "bg-blue-50 dark:bg-blue-500/10"  },
  orange: { bar: "bg-orange-500", track: "bg-orange-100 dark:bg-orange-500/10", text: "text-orange-700 dark:text-orange-400", border: "border-orange-300 dark:border-orange-500/30", icon: "text-orange-500", iconBg: "bg-orange-50 dark:bg-orange-500/10" },
  purple: { bar: "bg-purple-500", track: "bg-purple-100 dark:bg-purple-500/10", text: "text-purple-700 dark:text-purple-400", border: "border-purple-300 dark:border-purple-500/30", icon: "text-purple-600 dark:text-purple-400", iconBg: "bg-purple-50 dark:bg-purple-500/10" },
  teal:   { bar: "bg-teal-500",   track: "bg-teal-100 dark:bg-teal-500/10",   text: "text-teal-700 dark:text-teal-400",   border: "border-teal-300 dark:border-teal-500/30",   icon: "text-teal-600 dark:text-teal-400",  iconBg: "bg-teal-50 dark:bg-teal-500/10"  },
};

// Animated bar — fills from 0 when scrolled into view
const AnimatedBar = ({ level, color }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const c = colorMap[color];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(level); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className={`relative h-2 rounded-full overflow-hidden ${c.track}`}>
      <motion.div
        className={`absolute left-0 top-0 h-full rounded-full ${c.bar}`}
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
      />
      {/* Shimmer on fill */}
      <motion.div
        className="absolute top-0 h-full w-8 bg-white/30 skew-x-12"
        initial={{ left: "-10%" }}
        animate={{ left: width > 0 ? "110%" : "-10%" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
      />
    </div>
  );
};

// Skill card
const SkillCard = ({ category, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = category.icon;
  const c = colorMap[category.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-default"
    >
      <div className={`
        relative rounded-xl border p-5 sm:p-6 h-full
        backdrop-blur-sm overflow-hidden transition-all duration-300
        ${isHovered
          ? `${c.border} shadow-lg bg-white/90 dark:bg-black/50`
          : "border-red-200 dark:border-red-500/20 bg-white/70 dark:bg-black/30"
        }
      `}>

        {/* Scan line on hover */}
        {isHovered && (
          <motion.div
            className="absolute left-0 right-0 h-px bg-red-400/30 dark:bg-red-500/20 pointer-events-none"
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Corner brackets */}
        <span className="absolute top-2 left-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors">[</span>
        <span className="absolute top-2 right-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors">]</span>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 mt-1">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 ${c.border} ${c.iconBg} ${isHovered ? "scale-110" : ""}`}>
            <Icon className={`h-4.5 w-4.5 ${c.icon}`} style={{ height: "1.1rem", width: "1.1rem" }} />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-foreground leading-tight">
              {category.title}
            </h3>
            <span className={`font-mono text-xs ${c.text}`}>
              {category.skills.length} skills
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          {category.skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-foreground font-mono">
                  {skill.name}
                </span>
                <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${c.iconBg} border ${c.border}`}>
                  <span className={`font-mono text-xs font-bold ${c.text}`}>{skill.level}%</span>
                </div>
              </div>
              <AnimatedBar level={skill.level} color={category.color} />
            </div>
          ))}
        </div>

        {/* Bottom status */}
        <div className="mt-5 pt-4 border-t border-red-100 dark:border-red-500/10 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-mono text-xs text-green-600 dark:text-green-400/70">
            module.loaded — {Math.round(category.skills.reduce((a, s) => a + s.level, 0) / category.skills.length)}% avg
          </span>
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
  );
};

export const Skills = () => {
  const totalAvg = Math.round(
    skillCategories.flatMap(c => c.skills).reduce((a, s) => a + s.level, 0) /
    skillCategories.flatMap(c => c.skills).length
  );

  return (
    <section id="skills" className="py-20 bg-background relative overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(239,68,68,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(239,68,68,0.8) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2
            bg-white/70 dark:bg-black/40
            border border-red-300 dark:border-red-500/30
            rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-xs text-red-600 dark:text-red-400 tracking-widest uppercase">
              skills.scan — {skillCategories.length} modules loaded
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Skills &{" "}
            <span className="text-red-500 font-mono">[Expertise]</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical and professional competencies
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>

        {/* Footer status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-t border-red-200 dark:border-red-500/10 pt-8"
        >
          {[
            { label: "Modules",       value: `${skillCategories.length} active`,                                   dot: "bg-green-500" },
            { label: "Total Skills",  value: `${skillCategories.flatMap(c => c.skills).length}`,                   dot: "bg-blue-500"  },
            { label: "Overall Avg",   value: `${totalAvg}%`,                                                       dot: "bg-red-500"   },
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