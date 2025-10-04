import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable REST APIs with Node.js and Express",
    excerpt:
      "Learn best practices for designing and implementing RESTful APIs that can handle high traffic and scale with your application. Covers authentication, rate limiting, and database optimization.",
    date: "2025-03-15",
    readTime: "8 min read",
    tags: ["Node.js", "Express", "API"],
  },
  {
    id: 2,
    title: "Advanced React Patterns: Composition vs Inheritance",
    excerpt:
      "Dive deep into React's component composition patterns and understand why composition is preferred over inheritance. Includes practical examples and real-world use cases for building maintainable UIs.",
    date: "2025-03-08",
    readTime: "6 min read",
    tags: ["React", "JavaScript", "Patterns"],
  },
  {
    id: 3,
    title: "MongoDB Performance Optimization Techniques",
    excerpt:
      "Comprehensive guide to optimizing MongoDB queries, indexing strategies, and database design patterns. Learn how to identify bottlenecks and implement solutions for better performance at scale.",
    date: "2025-02-28",
    readTime: "10 min read",
    tags: ["MongoDB", "Database", "Performance"],
  },
];

export const Blog = () => {
  return (
    <section id="blog" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Latest <span className="text-gradient text-red-500">Articles</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, insights, and tutorials on web development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-scale-in">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className="group transition-smooth flex flex-col border border-primary/20 bg-primary/5 hover:shadow-lg hover:shadow-red-500/40"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-red-500 transition-smooth">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="border border-primary/30 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="group/btn text-primary hover:bg-primary/10" asChild>
                  <a href="#blog">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-smooth text-primary" />
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
