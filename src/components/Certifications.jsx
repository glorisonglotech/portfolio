import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import cybersecJ from "@/assets/cybersecJ.jpg";
import plp from "@/assets/plp.jpg";
import ajira from "@/assets/ajira.jpg";
import javascript from "@/assets/javascript.jpg"

const developerCertifications = [
 {
  title: "Power Learn Project Web Development",
  issuer: "Power Learn Project",
  date: "2025",
  credentialId: "PLP-WEBDEV-12345",
  credentialUrl: "#",
  skills: ["HTML", "CSS", "JavaScript", "React", "Node.js","Express.js","SQL","Mongo db"],
  icon: <Award className="w-6 h-6  text-red-500  group-hover:text-white " />,
  image: plp,
},
{
  title: "JavaScript Essentials",
  issuer: "JS Institute",
  date: "2025",
  credentialId: "JSI-JS-001",
  credentialUrl: "#",
  skills: ["JavaScript Fundamentals", "ES6+", "DOM Manipulation", "Functions", "Objects"],
  icon: <Shield className="w-6 h-6 text-red-500  group-hover:text-white" />,
  image: javascript,
},
{
  title: "Ajira Web Development Training",
  issuer: "Ajira Digital Program",
  date: "2024",
  credentialId: "AJIRA-WEBDEV-001",
  credentialUrl: "#",
  skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Databases"],
  icon: <Award className="w-6 h-6 text-red-500  group-hover:text-white" />,
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
  icon: <Shield className="w-6 h-6  text-red-500  group-hover:text-white" />,
  image: cybersecJ,
},

];

const CertificationCard = ({ cert, index }) => {
  const [showCert, setShowCert] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-elegant transition-all duration-300 hover:border-red-500 group overflow-hidden">
        {showCert ? (
          // Full certificate view
          <div
            className="w-full h-full flex items-center justify-center bg-secondary/40 cursor-pointer"
            onClick={() => setShowCert(false)}
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          // Normal card view
          <>
            <div
              className="relative h-48 bg-secondary/40 flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => setShowCert(true)}
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-contain"
              />
            </div>

            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-red-500 group-hover:text-primary-foreground transition-colors">
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
          </>
        )}
      </Card>
    </motion.div>
  );
};

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
          <h2 className="text-4xl font-bold mb-4 text-red-500">
            Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications in development and cybersecurity demonstrating expertise and commitment to continuous learning
          </p>
        </motion.div>

        {/* Developer Certifications */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl text-green-400 font-bold mb-8 text-center"
          >
            Development Certifications
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {developerCertifications.map((cert, index) => (
              <CertificationCard key={`dev-${index}`} cert={cert} index={index} />
            ))}
          </div>
        </div>

        {/* Cybersecurity Certifications */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl  text-green-400 font-bold mb-8 text-center"
          >
            Cybersecurity Certifications
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {cybersecurityCertifications.map((cert, index) => (
              <CertificationCard key={`cyber-${index}`} cert={cert} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
