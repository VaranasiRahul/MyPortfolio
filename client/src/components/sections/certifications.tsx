import { motion } from "framer-motion";
import { Award, ExternalLink, Cloud, Trophy, Zap, Code, Youtube } from "lucide-react";
import { Card } from "@/components/ui/card";

const certifications = [
  {
    title: "AWS Solutions Architect Associate (SAA-C03)",
    issuer: "Amazon Web Services",
    icon: <img src="https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/twitter_thumb_201604_image.png" alt="AWS SAA Badge" className="w-full h-full object-contain" />,
    link: "https://www.credly.com/org/amazon-web-services/badge/aws-certified-solutions-architect-associate",
    badge: "https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/twitter_thumb_201604_image.png"
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    icon: <img src="https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/twitter_thumb_201604_image.png" alt="AWS CCP Badge" className="w-full h-full object-contain" />,
    link: "https://www.credly.com/org/amazon-web-services/badge/aws-certified-cloud-practitioner",
    badge: "https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/twitter_thumb_201604_image.png"
  }
];

const achievements = [
  {
    title: "WEB 3.0 Certification",
    description: "Certified by Lumos Labs & GITAM University",
    icon: <Zap className="w-5 h-5 text-emerald-400" />,
    link: "https://drive.google.com/file/d/1RV4uTwp-L6DHDihYyEUtngsHi_oxJYVx/view?usp=share_link"
  },
  {
    title: "Industry Ready Training",
    description: "Certified by Microsoft & IBM",
    icon: <Award className="w-5 h-5 text-blue-400" />,
    link: "https://drive.google.com/file/d/1sIeC4qzAPw9fUoDFm3WgC-oPO1hyn4fN/view?usp=share_link"
  },
  {
    title: "DSA Certification",
    description: "Certified by NSDC & GDG MAD",
    icon: <Code className="w-5 h-5 text-indigo-400" />,
    link: "https://verify.letsupgrade.in/certificate/LUEDSANOV122369"
  },
  {
    title: "MySQL Certification",
    description: "Certified by NSDC & GDG MAD",
    icon: <Code className="w-5 h-5 text-indigo-400" />,
    link: "https://verify.letsupgrade.in/certificate/LUEMSQLNOV122541"
  },
  {
    title: "YouTube Content Creator",
    description: "Admin for 'RR REALMS' [1.4k subs]. Creative thinking & leadership skills.",
    icon: <Youtube className="w-5 h-5 text-red-500" />,
    link: "http://www.youtube.com/@RRReels"
  }
];

export function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-background">
      <div className="container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Credentials</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">
            Certifications & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry-recognized certifications and notable accomplishments
          </p>
        </motion.div>

        <div className="space-y-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Cloud className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">AWS Certifications</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <Card key={index} className="bg-gradient-to-br from-emerald-500/10 via-card/50 to-emerald-950/30 border-emerald-500/20 p-12 hover-elevate group overflow-hidden relative min-h-[300px] flex items-center shadow-2xl shadow-emerald-500/10 hover:border-emerald-500/40 transition-all duration-500">
                  <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-72 h-72 opacity-20 group-hover:opacity-60 transition-all duration-700 rotate-12 group-hover:rotate-0 group-hover:scale-110 pointer-events-none">
                    <img src={cert.badge} alt="" className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]" />
                  </div>
                  <div className="flex gap-12 items-center relative z-10 w-full">
                    <div className="w-40 h-40 shrink-0 rounded-[2rem] bg-gradient-to-br from-emerald-500/30 to-emerald-900/60 flex items-center justify-center border-2 border-emerald-400/40 group-hover:border-emerald-300 transition-all duration-500 shadow-2xl shadow-emerald-500/30 backdrop-blur-md">
                      <div className="w-full h-full p-6 transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]">{cert.icon}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-4xl mb-4 group-hover:text-emerald-400 transition-colors leading-tight tracking-tighter drop-shadow-xl">{cert.title}</h4>
                      <p className="text-emerald-400 font-black text-base mb-10 uppercase tracking-[0.3em]">{cert.issuer}</p>
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 text-sm font-black text-white uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 px-10 py-4 rounded-2xl border-2 border-emerald-300/50 transition-all shadow-[0_15px_40px_-10px_rgba(16,185,129,0.7)] hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100"
                      >
                        Verify Credential <ExternalLink className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Additional Achievements</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((item, index) => (
                <a 
                  key={index} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card className="bg-card/30 border-border/50 p-5 flex gap-4 items-center hover-elevate h-full">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 border group-hover:border-primary transition-colors">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm mb-0.5 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
