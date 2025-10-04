import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import rentwise from '@/assets/rentwise.png';
// import ecommerce from '@/assets/ecommerce.png';
import fundifind from '@/assets/fundifind.png';
import ominbiz from '@/assets/ominbiz.png';
import glomovie from '@/assets/glomovie.png';
import glovcf from '@/assets/glovcf.png';
// import hotel from '@/assets/hotel.png';
// import learnnest from '@/assets/learnnest.png';


const projects = [
    {
        id: 1,
        title: "Businness management solution",
        description:
            "Complete Business Management Solution for small and medium-sized businesses. Streamline your entire business with our all-in-one platform. Manage inventory, run your e-commerce store, schedule appointments, and track finances — all from one beautiful dashboard.",
        image: ominbiz,
        tags: ["React", "Node.js", "MongoDB", "mpesa daraja api"],
        category: "Full-Stack",
        liveUrl: "https://omnibizhub.netlify.app/",
        githubUrl: "https://github.com",
    },
    {
        id: 2,
        title: "Movie search tool",
        description:
            "Discover movies, explore captivating stories, and find your next cinematic adventure with our intuitive search tool. Effortlessly browse through a wide range of films and genres to uncover hidden gems or popular blockbusters. Your next movie night starts here!",
        image: glomovie,
        tags: ["React + tailwind", "api integration"],
        category: "Frontend",
        liveUrl: "https://glomovie.netlify.app/",
        githubUrl: "https://github.com",
    },
    {
        id: 3,
        title: "Rental management system",
        description:
            "A comprehensive rental management system designed to streamline property operations. Easily manage leases, track payments, handle tenant communication, and simplify maintenance requests—all from a single, user-friendly platform",
        image: rentwise,
        tags: ["React + tailwind", "node.js + express", "mongodb"],
        category: "Full-Stack",
        liveUrl: "https://rentwisek.netlify.app/",
        githubUrl: "https://github.com",
    },
    {
        id: 4,
        title: "Virtual card file platform",
        description:
            "An all-in-one platform for effortlessly creating and managing VCF contact files. Register phone numbers globally and generate professional contact files in seconds.",
        image: glovcf,
        tags: ["React + tailwind", "node.js + express", "mongodb"],
        category: "Frontend",
        liveUrl: "https://glovcf.netlify.app/",
        githubUrl: "https://github.com",
    },
    {
        id: 5,
        title: "Fundifind platform",
        description:
            "Discover skilled fundis across Kenya. Connect with verified craftsmen, artisans, and service providers to get quality work done with trust, transparency, and ease.",
        image: fundifind,
        tags: ["React + tailwind", "node.js + express", "mongodb"],
        category: "Frontend",
        liveUrl: " https://fundifind.netlify.app/",
        githubUrl: "https://github.com",
    },
];

const categories = ["All", "Full-Stack", "Frontend", "Backend"];

export const Projects = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProjects =
        selectedCategory === "All"
            ? projects
            : projects.filter((project) => project.category === selectedCategory);

    return (
        <section id="projects" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        Featured <span className="text-gradient text-red-500">Projects</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Here are some of my recent projects that showcase my skills and experience
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`${selectedCategory === category
                                ? "bg-red-500 text-white"
                                : "bg-transparent border border-red-500 text-red-500"
                                } py-2 px-6 rounded-lg transition-all hover:bg-red-500 hover:text-white`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8 animate-scale-in">
                    {filteredProjects.map((project, index) => (
                        <Card
                            key={project.id}
                            className="group hover:shadow-glow transition-smooth overflow-hidden border-border"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CardHeader className="p-0">
                                <div className="relative overflow-hidden aspect-video">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <CardTitle className="text-2xl mb-3">{project.title}</CardTitle>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="p-6 pt-0 flex gap-4">
                                <Button variant="default" className='bg-red-500 text-white hover:bg-red-600' size="sm" asChild>
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Live Demo
                                    </a>
                                </Button>
                                <Button variant="outline" className='text-red-500 hover:bg-red-500 hover:text-white' size="sm" asChild>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github className="mr-2 h-4 w-4" />
                                        Code
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
