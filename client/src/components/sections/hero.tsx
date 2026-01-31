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
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light leading-relaxed">
            Computer Science graduate from GITAM University and currently a DevOps Engineer at TCS. I specialize in building scalable infrastructure and modern full-stack applications. As an AWS Certified Solutions Architect Associate (SAA-C03) and Practitioner, I bring hands-on experience in optimizing developer platforms and cloud architecture.
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
          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-primary/20 shadow-xl hover-elevate transition-all duration-500 -rotate-3 hover:rotate-0">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 border border-primary/30">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1">Infrastructure</h3>
              <p className="text-sm text-muted-foreground">AWS Architect Certified (SAA-C03)</p>
            </div>
            <div className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-indigo-500/20 shadow-xl hover-elevate transition-all duration-500 rotate-3 hover:rotate-0 mt-8">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 border border-indigo-500/30">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1 text-indigo-100">Education</h3>
              <p className="text-sm text-indigo-300/80">B.Tech CSE @ GITAM University</p>
            </div>
            <div className="bg-gradient-to-r from-primary/10 to-indigo-500/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl hover-elevate transition-all duration-500 -rotate-2 hover:rotate-0 col-span-2 mx-auto max-w-[80%]">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Currently at TCS</h3>
                  <p className="text-xs text-green-400/90 font-medium">Platform DevOps Engineer (JLR)</p>
                </div>
              </div>
            </div>
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
