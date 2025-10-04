import { Code2, Database, Globe, GitBranch, Cloud, Zap, GraduationCap, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from "framer-motion";

const skills = [
    { name: "React", icon: Code2 },
    { name: "Node.js", icon: Zap },
    { name: "Express", icon: Globe },
    { name: "MongoDB", icon: Database },
    { name: "Git", icon: GitBranch },
    { name: "AWS", icon: Cloud },
];

const experience = [
    {
        title: "Mern Stack Developer",
        company: "Digital Innovations",
        period: "2025 - present",
        description: "Building and maintaining multiple client projects. Specializing in React frontend development and Node.js APIs.",
    }, {
        title: "Junior Frontend Developer",
        company: "Tech Solutions Inc.",
        period: "2025 - 2025",
        description: "Led development of enterprise web applications using MERN stack. Mentored other junior developers and implemented CI/CD pipelines.",
    },
];

const education = [
     
    {
        degree: "Cisco Ethical Hacker course",
        school: "cisco",
        period: "2025 - present",
        description:"Studying Cisco Ethical Hacker course to develop hands-on skills in penetration testing, vulnerability analysis, and offensive security—preparing for real-world cybersecurity challenges"
    },
    {
        degree: "Computer Science level 6",
        school: "TBNP",
        period: "2023 - 2025",
        description:"Studied Computer Science to build foundational skills in programming, algorithms, and software development, preparing for innovation in tech"
    },
    {
        degree: "High School Education",
        school: "Vihiga Friends High School",
        period: "2019 - 2022",
    },
];


export const About = () => {
    return (
        <section id="about" className="py-20 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        About <span className="text-gradient text-red-500">Me</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Passionate developer with 1+ years of experience building modern web applications
                    </p>
                </div>

                {/* Bio */}
                <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        I'm a Full Stack Developer specializing in the MERN stack (MongoDB, Express.js, React, Node.js).
                        With 1 years of professional experience, I've worked on projects ranging from small startups
                        to large enterprise applications.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        I'm passionate about writing clean, maintainable code and creating intuitive user experiences.
                        I believe in continuous learning and staying up-to-date with the latest web technologies.
                        When I'm not coding, you can find me contributing to open-source projects or writing technical blog posts.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="mb-16">
                    <h3 className="text-2xl text-red-500 font-bold mb-8 text-center">Technical Skills</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 animate-scale-in">
                        {skills.map((skill) => {
                            const Icon = skill.icon;
                            return (
                                <Card
                                    key={skill.name}
                                    className="group transition-smooth cursor-pointer border-border hover:shadow-[0_0_15px_rgba(239,68,68,0.6)]"
                                >
                                    <CardContent className="flex flex-col items-center justify-center p-6">
                                        <Icon className="h-12 w-12 mb-4 text-red-500 group-hover:scale-110 transition-smooth" />
                                        <h4 className="font-semibold text-center">{skill.name}</h4>
                                    </CardContent>
                                </Card>

                            );
                        })}
                    </div>
                </div>

                {/* Experience & Education Timeline */}
                <VerticalTimeline lineColor="#ff0000">
                    {/* Work Experience */}
                    {experience.map((job, index) => (
                        <VerticalTimelineElement
                            key={`work-${index}`}
                            className="vertical-timeline-element--work"
                            contentStyle={{
                                background: 'hsl(var(--card))',
                                color: 'hsl(var(--card-foreground))',
                                boxShadow: 'var(--shadow-red)',
                                border: '2px solid hsl(var(--primary) / 0.2)',
                            }}
                            contentArrowStyle={{ borderRight: '7px solid hsl(var(--primary))' }}
                            date={job.period}
                            dateClassName="text-primary font-semibold"
                            iconStyle={{ background: '#ff0000', color: '#fff' }}
                            icon={<Briefcase />}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                                <h4 className="text-primary font-semibold mb-3">{job.company}</h4>
                                <p className="text-muted-foreground">{job.description}</p>
                            </motion.div>
                        </VerticalTimelineElement>
                    ))}

                    {/* Education */}
                    {education.map((edu, index) => (
                        <VerticalTimelineElement
                            key={`edu-${index}`}
                            className="vertical-timeline-element--education"
                            contentStyle={{
                                background: 'hsl(var(--card))',
                                color: 'hsl(var(--card-foreground))',
                                boxShadow: 'var(--shadow-red)',
                                border: '2px solid hsl(var(--primary) / 0.2)',
                            }}
                            contentArrowStyle={{ borderRight: '7px solid hsl(var(--primary))' }}
                            date={edu.period}
                            dateClassName="text-primary font-semibold"
                            iconStyle={{ background: '#ff0000', color: '#fff' }}
                            icon={<GraduationCap />}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                                <h4 className="text-primary font-semibold">{edu.school}</h4>
                                <p className="text-muted-foreground">{edu.description}</p>
                            </motion.div>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>


            </div>
        </section>
    );
};
