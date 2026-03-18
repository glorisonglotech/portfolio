import { useState } from "react";
import { toast } from "sonner";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import {
  Mail, MapPin, Phone, Send,
  Github, Linkedin, Twitter,
  Shield, Terminal, Lock, CheckCircle, AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Scan line — consistent with portfolio
const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-px bg-red-400/30 dark:bg-red-500/20 pointer-events-none z-10"
    initial={{ top: "0%" }}
    animate={{ top: ["0%", "100%", "0%"] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
  />
);

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await emailjs.send(
        "service_crueolp",
        "template_ywc7jva",
        formData,
        "64zHV5ie8P-zTJIuz"
      );
      console.log(result.text);
      toast.success("Message sent!", {
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error(error.text);
      toast.error("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "glorisonglotech@gmail.com",
      href: "mailto:glorisonglotech@gmail.com",
      tag: "ENCRYPTED",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+254 717 055 797",
      href: "tel:+254717055797",
      tag: "SECURE LINE",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Uasin Gishu County, Kenya",
      href: null,
      tag: "EAST AFRICA",
    },
  ];

  const socials = [
    { icon: Github,   label: "GitHub",   href: "https://github.com/glorisonglotech",  color: "hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-300" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/glorison",    color: "hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400" },
    { icon: Twitter,  label: "Twitter",  href: "https://x.com/glorison01",            color: "hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400" },
  ];

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(239,68,68,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(239,68,68,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-black/40
            border border-red-300 dark:border-red-500/30 rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs text-red-600 dark:text-red-400 tracking-widest uppercase">
              connection.open — awaiting handshake
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Get In <span className="text-red-500 font-mono">[Touch]</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's connect!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">

          {/* ── Contact Form ── */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="relative rounded-xl border overflow-hidden
              bg-white/70 dark:bg-black/30
              border-red-200 dark:border-red-500/20
              backdrop-blur-sm">
              <ScanLine />

              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3
                bg-gray-50 dark:bg-black/60 border-b border-red-200 dark:border-red-500/20">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                  ~/contact — secure_message.sh
                </span>
                <div className="ml-auto flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-green-500" />
                  <span className="font-mono text-xs text-green-600 dark:text-green-400">TLS 1.3</span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Terminal className="h-4 w-4 text-red-500" />
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-foreground font-mono">
                    Send Me a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name field */}
                  <div>
                    <label htmlFor="name"
                      className="block font-mono text-xs text-red-600 dark:text-red-400 mb-1.5 tracking-wide">
                      &gt; name.input
                    </label>
                    <div className={`relative rounded-lg border transition-all duration-200 overflow-hidden
                      ${focusedField === "name"
                        ? "border-red-500 shadow-sm shadow-red-500/20"
                        : "border-red-200 dark:border-red-500/25"}
                    `}>
                      <input
                        id="name" name="name" type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 text-sm font-mono
                          bg-white/80 dark:bg-black/40
                          text-gray-900 dark:text-foreground
                          placeholder-gray-400 dark:placeholder-gray-600
                          outline-none"
                      />
                      {focusedField === "name" && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <span className="inline-block w-0.5 h-4 bg-red-500 animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email"
                      className="block font-mono text-xs text-red-600 dark:text-red-400 mb-1.5 tracking-wide">
                      &gt; email.input
                    </label>
                    <div className={`relative rounded-lg border transition-all duration-200 overflow-hidden
                      ${focusedField === "email"
                        ? "border-red-500 shadow-sm shadow-red-500/20"
                        : "border-red-200 dark:border-red-500/25"}
                    `}>
                      <input
                        id="email" name="email" type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 text-sm font-mono
                          bg-white/80 dark:bg-black/40
                          text-gray-900 dark:text-foreground
                          placeholder-gray-400 dark:placeholder-gray-600
                          outline-none"
                      />
                      {focusedField === "email" && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <span className="inline-block w-0.5 h-4 bg-red-500 animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message"
                      className="block font-mono text-xs text-red-600 dark:text-red-400 mb-1.5 tracking-wide">
                      &gt; message.input
                    </label>
                    <div className={`relative rounded-lg border transition-all duration-200 overflow-hidden
                      ${focusedField === "message"
                        ? "border-red-500 shadow-sm shadow-red-500/20"
                        : "border-red-200 dark:border-red-500/25"}
                    `}>
                      <textarea
                        id="message" name="message"
                        placeholder="Tell me about your project or security concern..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 text-sm font-mono resize-none
                          bg-white/80 dark:bg-black/40
                          text-gray-900 dark:text-foreground
                          placeholder-gray-400 dark:placeholder-gray-600
                          outline-none"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <Button type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-mono text-sm
                      shadow-lg shadow-red-500/20 transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        transmitting...
                      </span>
                    ) : submitted ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        message.sent
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        send_message.sh
                      </span>
                    )}
                  </Button>

                  {/* Security note */}
                  <div className="flex items-center gap-2 pt-1">
                    <Shield className="h-3 w-3 text-green-500 shrink-0" />
                    <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                      End-to-end encrypted · Powered by EmailJS
                    </span>
                  </div>
                </form>
              </div>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-red-500/40" />
            </div>
          </motion.div>

          {/* ── Right column ── */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5">

            {/* Contact info card */}
            <div className="relative rounded-xl border overflow-hidden
              bg-white/70 dark:bg-black/30
              border-red-200 dark:border-red-500/20
              backdrop-blur-sm">

              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3
                bg-gray-50 dark:bg-black/60 border-b border-red-200 dark:border-red-500/20">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="ml-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                  contact_info.json
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                {contactInfo.map(({ icon: Icon, label, value, href, tag }, i) => (
                  <motion.div key={label}
                    initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border shrink-0
                      bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30
                      group-hover:bg-red-500 group-hover:border-red-500 transition-all duration-300">
                      <Icon className="h-4.5 w-4.5 text-red-500 group-hover:text-white transition-colors duration-300"
                        style={{ height: "1.1rem", width: "1.1rem" }} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-foreground">{label}</span>
                        <span className="font-mono text-xs px-1.5 py-0.5 rounded
                          bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/25
                          text-red-600 dark:text-red-400">{tag}</span>
                      </div>
                      {href ? (
                        <a href={href}
                          className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground hover:text-red-500 transition-colors truncate block font-mono">
                          {value}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground font-mono">{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="border-t border-red-100 dark:border-red-500/10 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="font-mono text-xs text-green-600 dark:text-green-400">response_time: &lt;24h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links card */}
            <div className="relative rounded-xl border overflow-hidden
              bg-white/70 dark:bg-black/30
              border-red-200 dark:border-red-500/20
              backdrop-blur-sm p-5 sm:p-6">

              <div className="flex items-center gap-2 mb-4">
                <Terminal className="h-4 w-4 text-red-500" />
                <h3 className="font-bold text-sm text-gray-900 dark:text-foreground font-mono">Connect With Me</h3>
              </div>

              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label}
                    className={`flex items-center justify-center w-11 h-11 rounded-lg
                      border border-red-200 dark:border-red-500/25
                      bg-red-50 dark:bg-red-500/5
                      text-gray-500 dark:text-muted-foreground
                      transition-all duration-200 ${color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-red-100 dark:border-red-500/10">
                <span className="font-mono text-xs text-gray-400 dark:text-muted-foreground">
                  @glorisonglotech · open to collabs
                </span>
              </div>
            </div>

            {/* Availability card */}
            <div className="relative rounded-xl border overflow-hidden
              bg-white/70 dark:bg-black/30
              border-red-200 dark:border-red-500/20
              backdrop-blur-sm p-5 sm:p-6">

              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-4 w-4 text-red-500" />
                <h3 className="font-bold text-sm text-gray-900 dark:text-foreground font-mono">Availability Status</h3>
              </div>

              <div className="space-y-3">
                {[
                  { label: "MERN Development",   status: "AVAILABLE", dot: "bg-green-500" },
                  { label: "Security Consulting", status: "AVAILABLE", dot: "bg-green-500" },
                  { label: "Pen Testing (scoped)", status: "AVAILABLE", dot: "bg-green-500" },
                  { label: "Full-time / Remote",  status: "OPEN",      dot: "bg-yellow-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${item.dot} animate-pulse`} />
                      <span className={`font-mono text-xs font-bold
                        ${item.dot === "bg-green-500" ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

        {/* Footer status */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-t border-red-200 dark:border-red-500/10 pt-8">
          {[
            { label: "Encryption",   value: "TLS 1.3",    dot: "bg-green-500" },
            { label: "Response",     value: "< 24 hours", dot: "bg-blue-500"  },
            { label: "Status",       value: "Online",     dot: "bg-green-500" },
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