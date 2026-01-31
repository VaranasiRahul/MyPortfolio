import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 rounded-full blur-[100px]" />
      </div>

      <div className="container-padding relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Get In Touch</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">Let's <span className="text-gradient">Connect</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            I'm actively seeking new opportunities. Feel free to reach out if you'd like to discuss potential collaborations or just say hello!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            <ContactCard 
              icon={<Mail className="w-5 h-5 text-primary" />}
              label="Email"
              value="rahulvaranasi04@gmail.com"
              href="mailto:rahulvaranasi04@gmail.com"
            />
            <ContactCard 
              icon={<Phone className="w-5 h-5 text-primary" />}
              label="Phone"
              value="+91 9346304157"
              href="tel:+919346304157"
            />
            <ContactCard 
              icon={<MapPin className="w-5 h-5 text-primary" />}
              label="Location"
              value="Visakhapatnam, Andhra Pradesh, India"
            />
          </div>

          {/* Follow Me */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Follow Me</h3>
            <SocialCard 
              icon={<Github className="w-5 h-5 text-primary" />}
              label="GitHub"
              value="github.com/VaranasiRahul"
              href="https://github.com/VaranasiRahul"
            />
            <SocialCard 
              icon={<Linkedin className="w-5 h-5 text-primary" />}
              label="LinkedIn"
              value="linkedin.com/in/VaranasiRahul"
              href="https://linkedin.com/in/VaranasiRahul"
            />
            
            <Card className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-blue-500/30 p-6 mt-8 flex flex-col items-center text-center">
              <h4 className="text-lg font-bold mb-2">Ready to work together?</h4>
              <p className="text-sm text-slate-300 mb-6">Let's discuss how I can contribute to your team</p>
              <Button 
                asChild
                className="w-full h-12 bg-white text-black hover:bg-slate-100 font-bold rounded-xl"
              >
                <a href="mailto:rahulvaranasi04@gmail.com">
                  <Mail className="mr-2 h-4 w-4" /> Send a Message
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <Card className="bg-white/5 border-white/10 p-4 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-default">
      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-400 mb-0.5">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </Card>
  );

  if (href) {
    return <a href={href} className="block">{content}</a>;
  }
  return content;
}

function SocialCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="bg-white/5 border-white/10 p-4 flex items-center justify-between hover:bg-white/10 transition-colors group">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 mb-0.5">{label}</p>
            <p className="text-sm font-medium truncate">{value}</p>
          </div>
        </div>
        <Send className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors -rotate-45" />
      </Card>
    </a>
  );
}

