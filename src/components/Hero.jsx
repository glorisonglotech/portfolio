import { ArrowRight, Github, Linkedin, Twitter, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <motion.section
      id="home"
      className="min-h-screen gradient-hero flex items-center pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Hi, I'm{" "}
              <span className="text-gradient text-red-500">Glorison Ouma</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-muted-foreground mb-6">
              MERN Stack Developer
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Building scalable web applications with modern technologies.
              Passionate about creating exceptional user experiences and clean, maintainable code.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button variant="hero" asChild className="bg-red-500 button-glow">
                <a href="#projects">
                  View Projects <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="button-glow">
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
            <div className="flex gap-4">
              <a
                href="https://github.com/glorisonglotech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/glorison01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

       
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
            
              <motion.div
                className="absolute inset-0 bg-red-500/20 rounded-3xl blur-3xl"
                animate={{
                  scale: [1, 1.1, 1], 
                  opacity: [0.4, 0.6, 0.4], 
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              ></motion.div>

              <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border-[1px] border-red-500 shadow-lg shadow-red-500/50">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-3 font-mono text-sm lg:text-base">
               
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="overflow-hidden"
                  >
                    <code className="text-muted-foreground">
                      <span className="text-purple-500">const</span>{" "}
                      <span className="text-blue-500">developer</span> ={" "}
                      <span className="text-yellow-500">{"{"}</span>
                    </code>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="pl-4"
                  >
                    <code className="text-muted-foreground">
                      name: <span className="text-green-500">"Glorison Ouma"</span>,
                    </code>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2 }}
                    className="pl-4"
                  >
                    <code className="text-muted-foreground">
                      role: <span className="text-green-500">"MERN Developer"</span>,
                    </code>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2.5 }}
                    className="pl-4"
                  >
                    <code className="text-muted-foreground">
                      passion: <span className="text-green-500">"Building the future"</span>
                    </code>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3 }}
                  >
                    <code className="text-yellow-500">{"}"}</code>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-6 flex justify-center"
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Code2 className="h-12 w-12 text-red-500" /> 
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
