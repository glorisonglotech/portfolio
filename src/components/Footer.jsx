import { Github, Linkedin, Twitter, Shield, Terminal, Lock, Mail, Phone, MapPin, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: "Home",           href: "#home"           },
  { label: "About",          href: "#about"          },
  { label: "Services",       href: "#services"       },
  { label: "Projects",       href: "#projects"       },
  { label: "Skills",         href: "#skills"         },
  { label: "Certifications", href: "#certifications" },
  { label: "Blog",           href: "#blog"           },
  { label: "Contact",        href: "#contact"        },
];

const contactInfo = [
  { icon: Mail,   value: "glorisonglotech@gmail.com", href: "mailto:glorisonglotech@gmail.com" },
  { icon: Phone,  value: "+254 717 055 797",           href: "tel:+254717055797"               },
  { icon: MapPin, value: "Uasin Gishu County, Kenya",  href: null                              },
];

const socials = [
  { icon: Github,   label: "GitHub",   href: "https://github.com/glorisonglotech" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/glorison"   },
  { icon: Twitter,  label: "Twitter",  href: "https://x.com/glorison01"           },
];

const statusItems = [
  { label: "System",    value: "Online",    dot: "bg-green-500" },
  { label: "Build",     value: "Passing",   dot: "bg-green-500" },
  { label: "Security",  value: "Hardened",  dot: "bg-red-500"   },
  { label: "Uptime",    value: "99.9%",     dot: "bg-blue-500"  },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden
      bg-white/50 dark:bg-black/60
      border-t border-red-200 dark:border-red-500/20
      backdrop-blur-sm">

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(rgba(239,68,68,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(239,68,68,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.02) 2px,rgba(0,0,0,0.02) 4px)" }} />

      {/* Animated top border */}
      <div className="relative h-px w-full overflow-hidden">
        <motion.div
          className="absolute top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-1/3"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-14">

        {/* ── Status bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-10
            pb-8 border-b border-red-100 dark:border-red-500/10"
        >
          {statusItems.map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${item.dot} animate-pulse`} />
              <span className="font-mono text-xs text-gray-500 dark:text-muted-foreground">
                {item.label}:{" "}
                <span className="text-gray-900 dark:text-white font-bold">{item.value}</span>
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center
                bg-red-500 border-2 border-red-500 shadow-lg shadow-red-500/30">
                <span className="font-mono font-black text-white text-sm">GO</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                  Glorison Ouma
                </div>
                <div className="font-mono text-xs text-red-500">MERN · CyberSec</div>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-muted-foreground mb-5 leading-relaxed max-w-xs">
              Building secure, scalable web applications while defending systems against cyber threats.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg
                    bg-red-50 dark:bg-red-500/10
                    border border-red-200 dark:border-red-500/25
                    text-gray-500 dark:text-muted-foreground
                    hover:bg-red-500 hover:border-red-500 hover:text-white
                    transition-all duration-200">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Security badge */}
            <div className="mt-5 inline-flex items-center gap-2
              bg-red-50 dark:bg-red-500/10
              border border-red-200 dark:border-red-500/25
              rounded-lg px-3 py-1.5">
              <Lock className="h-3 w-3 text-green-500" />
              <span className="font-mono text-xs text-green-600 dark:text-green-400">
                OWASP Compliant · TLS 1.3
              </span>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Terminal className="h-4 w-4 text-red-500" />
              <h3 className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                site.map
              </h3>
            </div>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}
                    className="group flex items-center gap-2 text-xs sm:text-sm
                      text-gray-500 dark:text-muted-foreground
                      hover:text-red-500 dark:hover:text-red-400
                      transition-colors duration-150 font-mono">
                    <span className="text-red-400/50 group-hover:text-red-500 transition-colors">&gt;</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Shield className="h-4 w-4 text-red-500" />
              <h3 className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                contact.info
              </h3>
            </div>
            <ul className="space-y-3">
              {contactInfo.map(({ icon: Icon, value, href }) => (
                <li key={value} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                    bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/25 mt-0.5">
                    <Icon className="h-3.5 w-3.5 text-red-500" />
                  </div>
                  {href ? (
                    <a href={href}
                      className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground
                        hover:text-red-500 transition-colors font-mono break-all">
                      {value}
                    </a>
                  ) : (
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground font-mono">
                      {value}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {/* Available badge */}
            <div className="mt-5 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-xs text-green-600 dark:text-green-400">
                available for hire · response &lt;24h
              </span>
            </div>
          </motion.div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 border-t border-red-100 dark:border-red-500/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-2 font-mono text-xs text-gray-400 dark:text-muted-foreground">
              <Code2 className="h-3.5 w-3.5 text-red-500" />
              <span>
                © {currentYear}{" "}
                <span className="text-red-500 font-bold">Glorison Ouma</span>
                {" "}— All rights reserved
              </span>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs text-gray-400 dark:text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
               Ethical Hacker
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-red-500" />
               Gamer
              </span>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};