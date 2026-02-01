import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container-padding flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold font-display tracking-tight text-foreground mb-1">
            Rahul Varanasi
          </h2>
          <p className="text-sm text-muted-foreground">
            Building the web, one container at a time.
          </p>
        </div>

        <div className="flex gap-6">
          <a href="https://github.com/RahulVaranasi" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://linkedin.com/in/RahulVaranasi" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>

        <div className="text-sm text-muted-foreground">
          © {currentYear} Rahul Varanasi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
