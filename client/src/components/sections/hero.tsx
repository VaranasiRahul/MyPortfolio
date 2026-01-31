import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Download } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden opacity-30">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="container-padding grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-display">
            Hi, I'm <br />
            <span className="text-gradient">Rahul Varanasi</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
            DevOps Engineer & Full Stack Developer based in <span className="font-medium text-foreground">Visakhapatnam, India</span>.
            I build scalable infrastructure and beautiful web applications.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-10">
            <ScrollLink
              to="contact"
              smooth={true}
              offset={-100}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-2"
            >
              Let's Talk <ArrowRight className="w-4 h-4" />
            </ScrollLink>
            
            <a 
              href="/resume.pdf" 
              target="_blank"
              className="px-8 py-4 rounded-xl bg-white border border-border text-foreground font-semibold hover:bg-slate-50 hover:border-primary/30 transition-all flex items-center gap-2"
            >
              Download CV <Download className="w-4 h-4" />
            </a>
          </div>
          
          <div className="flex items-center gap-6">
            <SocialLink href="https://github.com/RahulVaranasi" icon={<Github className="w-6 h-6" />} label="GitHub" />
            <SocialLink href="https://linkedin.com/in/RahulVaranasi" icon={<Linkedin className="w-6 h-6" />} label="LinkedIn" />
            <SocialLink href="mailto:rahulvaranasi04@gmail.com" icon={<Mail className="w-6 h-6" />} label="Email" />
          </div>
        </motion.div>

        {/* Hero Visual - Code/Tech Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-6 rotate-2 hover:rotate-0 transition-transform duration-500">
             <div className="flex gap-2 mb-4">
               <div className="w-3 h-3 rounded-full bg-red-500" />
               <div className="w-3 h-3 rounded-full bg-yellow-500" />
               <div className="w-3 h-3 rounded-full bg-green-500" />
             </div>
             <pre className="text-sm font-mono text-slate-300 overflow-hidden">
               <code>
{`class Developer {
  constructor() {
    this.name = "Rahul Varanasi";
    this.role = ["DevOps", "FullStack"];
    this.location = "India";
  }

  solve(problem) {
    while(problem.exists()) {
      this.analyze();
      this.code();
      this.deploy();
    }
    return "Solution Delivered";
  }
}

const rahul = new Developer();
rahul.solve(yourProblem);`}
               </code>
             </pre>
          </div>
          {/* Decorative elements behind */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl" />
        </motion.div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
