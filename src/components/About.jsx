import { Code2, Database, Globe, GitBranch, Cloud, Zap, GraduationCap, Briefcase, Shield, Bug, Network, Lock, Search, Wifi } from "lucide-react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";

const devSkills = [
  { name: "React", icon: Code2 },
  { name: "Node.js", icon: Zap },
  { name: "Express", icon: Globe },
  { name: "MongoDB", icon: Database },
  { name: "Git", icon: GitBranch },
  { name: "AWS", icon: Cloud },
];

const securitySkills = [
  { name: "Penetration Testing", icon: Bug },
  { name: "OWASP Top 10", icon: Shield },
  { name: "Burp Suite", icon: Search },
  { name: "Nmap", icon: Network },
  { name: "Wireshark", icon: Wifi },
  { name: "SIEM / SOC", icon: Lock },
];

const experience = [
  {
    title: "MERN Stack Developer",
    company: "Digital Innovations",
    period: "2025 — Present",
    description: "Build and maintain client web applications end to end: React interfaces, Node.js/Express APIs and MongoDB data models. Security work includes input validation, JWT session handling, secure header configuration and dependency patching before each release.",
  },
  {
    title: "Junior Frontend Developer",
    company: "Tech Solutions Inc.",
    period: "2025",
    description: "Built React interfaces for internal business tools and wired them to REST APIs. Contributed to a shared component library, code reviews and automated build checks.",
  },
];

const education = [
  {
    degree: "Google Cybersecurity Professional Certificate",
    school: "Google (Coursera)",
    period: "2026 — Present",
    description: "Coursework in SIEM tooling, intrusion detection, Linux and SQL, plus Python automation for security tasks — centred on detection, triage and incident response workflows.",
  },
  {
    degree: "Security Analyst Specialization",
    school: "Cyber Shujaa",
    period: "2026 — Present",
    description: "SOC-focused training in threat detection, incident response and security monitoring, delivered through the Cyber Shujaa programme run by USIU-Africa, Serianu and the Kenya Bankers Association.",
  },
  {
    degree: "Ethical Hacker Course",
    school: "Cisco Networking Academy",
    period: "2025",
    description: "Hands-on labs in reconnaissance, vulnerability analysis and exploitation methodology, with an explicit focus on legal scope, authorization and ethical constraints.",
  },
  {
    degree: "Junior Cybersecurity Career Path",
    school: "Cisco Networking Academy & ICT Authority of Kenya",
    period: "2025",
    description: "Practical foundation in network defense, penetration testing fundamentals, vulnerability analysis and security operations.",
  },
  {
    degree: "Computer Science (Level 6)",
    school: "TBNP",
    period: "2023 — 2025",
    description: "Foundations in programming, algorithms, data structures and software development.",
  },
  {
    degree: "Kenya Certificate of Secondary Education",
    school: "Vihiga Friends High School",
    period: "2019 — 2022",
    description: null,
  },
];

// ── Skill card ────────────────────────────────────────────────────
const SkillCard = ({ skill, index }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative cursor-default"
    >
      <div className="
        relative h-full rounded-xl border p-5
        flex flex-col items-center justify-center gap-3
        overflow-hidden transition-all duration-300
        bg-white/70 dark:bg-black/30
        border-red-200 dark:border-red-500/20
        hover:border-red-500 hover:bg-red-50/80 dark:hover:bg-black/50
        hover:shadow-lg hover:shadow-red-500/10 dark:hover:shadow-red-500/20
      ">
        {/* Corner brackets */}
        <span className="absolute top-1.5 left-1.5 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors">[</span>
        <span className="absolute top-1.5 right-1.5 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors">]</span>

        <div className="
          w-12 h-12 rounded-lg flex items-center justify-center
          border transition-all duration-300
          bg-red-50 dark:bg-red-500/10
          border-red-200 dark:border-red-500/30
          group-hover:bg-red-500 group-hover:border-red-500
        ">
          <Icon className="h-6 w-6 text-red-500 group-hover:text-white transition-colors duration-300" />
        </div>

        <span className="font-mono text-xs sm:text-sm font-semibold text-gray-700 dark:text-foreground text-center">
          {skill.name}
        </span>

        {/* Bottom glow on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-red-500"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.25 }}
        />
      </div>
    </motion.div>
  );
};

// ── Section divider (matches Services style) ──────────────────────
const SectionLabel = ({ icon: Icon, label, color = "red" }) => {
  const colors = {
    red: { icon: "text-red-500", border: "border-red-300 dark:border-red-500/30", bg: "bg-white/70 dark:bg-black/40", text: "text-red-600 dark:text-red-400", line: "from-red-400/50" },
    green: { icon: "text-green-600 dark:text-green-400", border: "border-green-300 dark:border-green-500/30", bg: "bg-white/70 dark:bg-black/40", text: "text-green-700 dark:text-green-400", line: "from-green-400/50" },
  };
  const c = colors[color];
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
      </div>
      <div className={`flex-1 h-px bg-gradient-to-r ${c.line} to-transparent`} />
    </motion.div>
  );
};

// ── Main About ────────────────────────────────────────────────────
export const About = () => {
  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">

      {/* Background grid — matches Services */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,68,68,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(239,68,68,0.8) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
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
              whoami — reading profile
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            About <span className="text-red-500 font-mono">[Me]</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            Security-focused engineer with hands-on experience in web application testing, SOC analysis and full-stack development
          </p>
        </motion.div>

        {/* ── Bio ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="
            relative rounded-xl border p-6 sm:p-8
            bg-white/70 dark:bg-black/30
            border-red-200 dark:border-red-500/20
            backdrop-blur-sm overflow-hidden
          ">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-red-100 dark:border-red-500/10">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="ml-2 font-mono text-xs text-gray-500 dark:text-muted-foreground">~/about/glorison.md</span>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-muted-foreground leading-relaxed mb-5">
              I&apos;m a <strong>cybersecurity analyst</strong> and full-stack engineer working where code meets risk. I test web applications for the flaws that actually get exploited &mdash; broken access control, injection, weak authentication &mdash; then write the fix in React, Node.js and MongoDB.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-muted-foreground leading-relaxed mb-5">
              My training runs in two directions. Defensively, I&apos;m completing the <strong>Google Cybersecurity Professional Certificate</strong> and the <strong>Cyber Shujaa Security Analyst</strong> programme, covering SIEM operations, network defense and incident response. Offensively, I&apos;ve completed Cisco&apos;s <strong>Ethical Hacker</strong> course and the Cisco/ICT Authority <strong>Junior Cybersecurity Career Path</strong>, with lab work in reconnaissance, vulnerability analysis and exploitation.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-muted-foreground leading-relaxed">
              Day to day that means <strong>Burp Suite, Nmap, Wireshark and Kali</strong> against deliberately vulnerable targets, and OWASP-driven hardening in the applications I build. I document findings so a developer can reproduce and fix them &mdash; severity, evidence, remediation &mdash; because a report nobody can action is just noise.
            </p>

            {/* Status line */}
            <div className="mt-5 pt-4 border-t border-red-100 dark:border-red-500/10 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="font-mono text-xs text-green-600 dark:text-green-400">
                profile.loaded — focus: application security · soc · full-stack
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Skills ── */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-red-500 font-mono">[Technical Skills]</h3>
          </motion.div>

          {/* Dev skills */}
          <SectionLabel icon={Code2} label="Development" color="green" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-10">
            {devSkills.map((skill, i) => <SkillCard key={skill.name} skill={skill} index={i} />)}
          </div>

          {/* Security skills */}
          <SectionLabel icon={Shield} label="Cybersecurity" color="red" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {securitySkills.map((skill, i) => <SkillCard key={skill.name} skill={skill} index={i} />)}
          </div>
        </div>

        {/* ── Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-red-500 font-mono">[Experience & Education]</h3>
        </motion.div>

        <VerticalTimeline lineColor="rgba(239,68,68,0.4)">

          {experience.map((job, index) => (
            <VerticalTimelineElement
              key={`work-${index}`}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "transparent",
                boxShadow: "none",
                padding: 0,
                border: "none",
              }}
              contentArrowStyle={{ borderRight: "7px solid #ef4444" }}
              date={job.period}
              dateClassName="font-mono text-xs sm:text-sm text-red-600 dark:text-red-400 font-semibold"
              iconStyle={{ background: "#ef4444", color: "#fff", boxShadow: "0 0 0 3px rgba(239,68,68,0.3)" }}
              icon={<Briefcase />}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="
                  relative rounded-xl border p-5 sm:p-6
                  bg-white/70 dark:bg-black/30
                  border-red-200 dark:border-red-500/20
                  backdrop-blur-sm overflow-hidden
                  hover:border-red-500 hover:shadow-lg hover:shadow-red-500/10 dark:hover:shadow-red-500/20
                  transition-all duration-300
                "
              >
                {/* Work badge */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md
                    bg-red-50 dark:bg-red-500/10
                    border border-red-200 dark:border-red-500/30"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-mono text-xs text-red-600 dark:text-red-400 font-bold">WORK</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1 text-gray-900 dark:text-foreground">
                  {job.title}
                </h3>
                <h4 className="text-red-600 dark:text-red-400 font-mono text-sm font-semibold mb-3">
                  {job.company}
                </h4>
                <p className="text-sm text-gray-500 dark:text-muted-foreground leading-relaxed">
                  {job.description}
                </p>

                <div className="mt-4 pt-3 border-t border-red-100 dark:border-red-500/10 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="font-mono text-xs text-green-600 dark:text-green-400/70">status.Contract Completed</span>
                </div>
              </motion.div>
            </VerticalTimelineElement>
          ))}

          {education.map((edu, index) => (
            <VerticalTimelineElement
              key={`edu-${index}`}
              className="vertical-timeline-element--education"
              contentStyle={{
                background: "transparent",
                boxShadow: "none",
                padding: 0,
                border: "none",
              }}
              contentArrowStyle={{ borderRight: "7px solid #ef4444" }}
              date={edu.period}
              dateClassName="font-mono text-xs sm:text-sm text-red-600 dark:text-red-400 font-semibold"
              iconStyle={{ background: "#1f2937", color: "#ef4444", boxShadow: "0 0 0 3px rgba(239,68,68,0.3)", border: "2px solid #ef4444" }}
              icon={<GraduationCap />}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="
                  relative rounded-xl border p-5 sm:p-6
                  bg-white/70 dark:bg-black/30
                  border-red-200 dark:border-red-500/20
                  backdrop-blur-sm overflow-hidden
                  hover:border-red-500 hover:shadow-lg hover:shadow-red-500/10 dark:hover:shadow-red-500/20
                  transition-all duration-300
                "
              >
                {/* Edu badge */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md
                    bg-blue-50 dark:bg-blue-500/10
                    border border-blue-200 dark:border-blue-500/30"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">EDUCATION</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1 text-gray-900 dark:text-foreground">
                  {edu.degree}
                </h3>
                <h4 className="text-red-600 dark:text-red-400 font-mono text-sm font-semibold mb-3">
                  {edu.school}
                </h4>
                {edu.description && (
                  <p className="text-sm text-gray-500 dark:text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                )}

                <div className="mt-4 pt-3 border-t border-red-100 dark:border-red-500/10 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="font-mono text-xs text-blue-600 dark:text-blue-400/70">cert.verified</span>
                </div>
              </motion.div>
            </VerticalTimelineElement>
          ))}

        </VerticalTimeline>

      </div>
    </section>
  );
};