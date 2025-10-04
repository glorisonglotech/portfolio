import { useState } from "react";
import { toast } from "sonner";
import emailjs from "emailjs-com"; // Import EmailJS SDK
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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


      console.log(result.text); // Log the response to console (optional)

      toast.success("Message sent!", {
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error.text);
      toast.error("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Get In <span className="text-gradient text-red-500">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's connect!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-border animate-slide-in-left">
            <CardHeader>
              <CardTitle className="text-2xl">Send Me a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-500 text-white hover:bg-red-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in-right">
                 <Card className="border-border">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Mail className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:glorison@example.com"
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        glorisonglotech@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Phone className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a
                        href="tel:+254712345678"
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        +254 717 055 797  
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Uasin Gishu County, Kenya
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 text-red-500">
                  <a
                    href="https://github.com/glorison"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg transition-smooth"
                    aria-label="GitHub"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/glorison"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg transition-smooth"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://twitter.com/glorison"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg transition-smooth"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border overflow-hidden">
              <div className="aspect-video bg-secondary flex items-center justify-center">
                <MapPin className="h-12 w-12 text-muted-foreground" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
