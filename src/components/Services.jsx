import { motion } from "framer-motion";
import {
    Code2,
    Database,
    Globe,
    Server,
    Shield,
    Search,
    Lock,
    Network,
    Users,
    Bug
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const mernServices = [
    {
        title: "Frontend Development",
        description: "Building responsive, interactive user interfaces with React, TypeScript, and modern CSS frameworks.",
        icon: Code2,
    },
    {
        title: "Backend Development",
        description: "Developing robust APIs and server-side logic with Node.js and Express.js.",
        icon: Server,
    },
    {
        title: "Database Design",
        description: "Designing and optimizing MongoDB databases for scalability and performance.",
        icon: Database,
    },
    {
        title: "Full-Stack Solutions",
        description: "End-to-end web application development from concept to deployment.",
        icon: Globe,
    },
];

const cybersecurityServices = [
    {
        title: "Vulnerability Assessment & Penetration Testing",
        description: "Identifying security weaknesses through comprehensive testing and ethical hacking techniques.",
        icon: Bug,
    },
    {
        title: "Secure Web Application Development",
        description: "Building applications with security best practices, including OWASP Top 10 mitigation.",
        icon: Shield,
    },
    {
        title: "SOC Analysis & Threat Detection",
        description: "Monitoring, analyzing, and responding to security incidents and potential threats.",
        icon: Search,
    },
    {
        title: "Network Security & Firewall Configuration",
        description: "Implementing and managing network defenses to protect infrastructure from attacks.",
        icon: Network,
    },
    {
        title: "Security Awareness Training",
        description: "Educating teams on cybersecurity best practices and threat recognition.",
        icon: Users,
    },
    {
        title: "Security Audits & Compliance",
        description: "Conducting thorough security assessments to ensure regulatory compliance.",
        icon: Lock,
    },
];

export const Services = () => {
    return (
        <section id="services" className="py-20 bg-secondary/20">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        My <span className="text-red-500">Services</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Combining development expertise with security-first thinking to deliver comprehensive solutions
                    </p>
                </motion.div>

                {/* MERN Stack Services */}
                <div className="mb-16">
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold mb-8 flex items-center gap-3"
                    >
                        <Code2 className="h-7 w-7 text-green-500" />
                        MERN Stack Development
                    </motion.h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mernServices.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-elegant transition-all duration-300 hover:border-red-500 group">
                                        <CardHeader>
                                            <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit group-hover:bg-red-500 group-hover:text-white transition-colors mb-3">
                                                <Icon className="h-6 w-6 text-red-500 group-hover:text-white" />
                                            </div>

                                            <CardTitle className="text-lg">{service.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-sm">
                                                {service.description}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>

                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Cybersecurity Services */}
                <div>
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold mb-8 flex items-center gap-3"
                    >
                        <Shield className="h-7 w-7 text-green-500" />
                        Cybersecurity Services
                    </motion.h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cybersecurityServices.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-elegant transition-all duration-300 hover:border-red-500 group">
                                        <CardHeader>
                                            <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit group-hover:bg-red-500 group-hover:text-white transition-colors mb-3">
                                                <Icon className="h-6 w-6 text-red-500 group-hover:text-white" />
                                            </div>
                                            <CardTitle className="text-lg">{service.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-sm">
                                                {service.description}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>

                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
