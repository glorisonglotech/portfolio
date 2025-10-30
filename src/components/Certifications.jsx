import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

import javascript from "@/assets/javascript.jpg";


const certifications = [
  
  {
    title: "JavaScript Essentials",
    issuer: "Cisco Networking Academy",
    date: "2023",
    credentialId: "",
    credentialUrl: "#",
    skills: ["Javascript"],
    icon: <Award className="w-6 h-6" />,
    image: javascript,
  },
  // {
  //   title: "React Professional Certification",
  //   issuer: "Meta",
  //   date: "2023",
  //   credentialId: "META-REACT-11223",
  //   credentialUrl: "#",
  //   skills: ["React", "Frontend", "JavaScript"],
  //   icon: <Shield className="w-6 h-6" />,
  //   image: certReact,
  // },
  // {
  //   title: "Node.js Application Developer",
  //   issuer: "OpenJS Foundation",
  //   date: "2022",
  //   credentialId: "NODEJS-APP-44556",
  //   credentialUrl: "#",
  //   skills: ["Node.js", "Backend", "API Development"],
  //   icon: <Award className="w-6 h-6" />,
  //   image: certNodejs,
  // },
];

export const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications demonstrating expertise and commitment to continuous learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-elegant transition-all duration-300 hover:border-primary/50 group overflow-hidden">
                <div className="relative h-48 overflow-hidden bg-secondary/50">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {cert.icon}
                        </div>
                        <CardTitle className="text-xl">{cert.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base font-medium text-foreground/80">
                        {cert.issuer}
                      </CardDescription>
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Issued: {cert.date}</span>
                    </div>
                    {cert.credentialId && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Credential ID:</span> {cert.credentialId}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
