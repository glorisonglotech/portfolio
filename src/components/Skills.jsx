import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const skillCategories = [
    {
        title: "Frontend Development",
        skills: [
            { name: "React / Next.js", level: 90 },
            { name: "JavaScript / TypeScript", level: 95 },
            { name: "HTML / CSS / Tailwind", level: 90 },
        ],
    },
    {
        title: "Backend Development",
        skills: [
            { name: "Node.js / Express", level: 85 },
            { name: "MongoDB / Mongoose", level: 80 },
            { name: "RESTful APIs", level: 90 },
        ],
    },
    {
        title: "Tools & Technologies",
        skills: [
            { name: "Git / GitHub", level: 85 },
            { name: "Docker / AWS", level: 75 },
            { name: "CI/CD / Testing", level: 80 },
        ],
    },
    {
        title: "Soft Skills",
        skills: [
            { name: "Problem Solving", level: 95 },
            { name: "Team Collaboration", level: 90 },
            { name: "Project Management", level: 85 },
        ],
    },
];

export const Skills = () => {
    return (
        <section id="skills" className="py-20 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        Skills & <span className="text-gradient">Expertise</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A comprehensive overview of my technical and professional competencies
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {skillCategories.map((category, categoryIndex) => (
                        <Card
                            key={category.title}
                            className="border-border hover:shadow-glow transition-smooth animate-scale-in"
                            style={{ animationDelay: `${categoryIndex * 100}ms` }}
                        >
                            <CardHeader>
                                <CardTitle className="text-xl">{category.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {category.skills.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium">{skill.name}</span>
                                            <span className="text-red-500 font-semibold">{skill.level}%</span>
                                        </div>
                                        <progress
                                            value={skill.level}
                                            max="100"
                                            className="h-2 rounded-full w-full bg-gray-200"
                                            style={{ appearance: 'none', backgroundColor: 'transparent' }}
                                        >
                                            <style jsx>{`
    progress::-webkit-progress-value {
      background-color: #ef4444; /* Tailwind red-500 */
    }
    progress::-moz-progress-bar {
      background-color: #ef4444; /* Tailwind red-500 */
    }
  `}</style>
                                        </progress>

                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
