import { Github, Linkedin, Twitter, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-secondary/30 border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-foreground text-red-500">GO</span>
              <span className="text-gradient"> Portfolio</span>
            </h3>
            <p className="text-muted-foreground mb-4">
              Building modern web applications with passion and precision.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/glorisonglotech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/glorison01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>glorisonglotech@gmail.com</li>
              <li>+254 717 055-797</li>
              <li>Nairobi ,Kenya</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-1">
            © {currentYear} <span className="text-red-500 text-2xl font-bold text-disabled">Glorison Ouma</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};
