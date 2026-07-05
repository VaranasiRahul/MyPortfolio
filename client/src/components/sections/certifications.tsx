import { motion } from "framer-motion";
import { Award, ExternalLink, Cloud, Trophy, Zap, Code, Youtube } from "lucide-react";
import { Card } from "@/components/ui/card";

const certifications = [
  {
    title: "Microsoft Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft",
    year: "Issued 2026",
    icon: <img src="https://images.credly.com/images/4136ced8-75d5-4afb-8677-40b6236e2672/azure-ai-fundamentals-600x600.png" alt="Azure AI Fundamentals Badge" className="w-full h-full object-contain" />,
    link: "https://learn.microsoft.com/en-gb/users/rahulvaranasi-3218/credentials/1f7372ad421b4db5",
    badge: "https://images.credly.com/images/4136ced8-75d5-4afb-8677-40b6236e2672/azure-ai-fundamentals-600x600.png",
    color: "blue"
  },
  {
    title: "Microsoft Azure Developer Associate (AZ-204)",
    issuer: "Microsoft",
    year: "Issued 2026",
    icon: <img src="https://images.credly.com/images/63316b60-f62d-4e51-aacc-c23cb850089c/azure-developer-associate-600x600.png" alt="Azure Developer Associate Badge" className="w-full h-full object-contain" />,
    link: "https://learn.microsoft.com/en-gb/users/rahulvaranasi-3218/credentials/68064423a75a0e07",
    badge: "https://images.credly.com/images/63316b60-f62d-4e51-aacc-c23cb850089c/azure-developer-associate-600x600.png",
    color: "blue"
  },
  {
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    issuer: "Amazon Web Services",
    year: "Issued 2025",
    icon: <img src="https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/twitter_thumb_201604_image.png" alt="AWS CCP Badge" className="w-full h-full object-contain" />,
    link: "https://www.credly.com/badges/ecc1b451-4159-44c0-9e34-29c33c1e2a4b/public_url",
    badge: "https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/twitter_thumb_201604_image.png",
    color: "emerald"
  },
  {
    title: "AWS Solutions Architect Associate (SAA-C03)",
    issuer: "Amazon Web Services",
    year: "Issued 2025",
    icon: <img src="https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/twitter_thumb_201604_image.png" alt="AWS SAA Badge" className="w-full h-full object-contain" />,
    link: "https://www.credly.com/badges/5210018b-e5c4-4508-bc97-256006bb29d3/public_url",
    badge: "https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/twitter_thumb_201604_image.png",
    color: "emerald"
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
          {/* AWS Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Cloud className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">AWS Certifications</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.filter(c => c.color === "emerald").map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-br from-emerald-500/5 via-card/50 to-emerald-950/20 border-emerald-500/20 p-8 hover-elevate group overflow-hidden relative min-h-[200px] flex items-center shadow-xl shadow-emerald-500/5 hover:border-emerald-500/40 transition-all duration-500">
                    <div className="flex gap-8 items-center relative z-10 w-full">
                      <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/40 flex items-center justify-center border border-emerald-500/30 group-hover:border-emerald-400/50 transition-all duration-500 shadow-xl shadow-emerald-500/20 backdrop-blur-md">
                        <div className="w-full h-full p-4 transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">{cert.icon}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xl mb-1 group-hover:text-emerald-400 transition-colors leading-tight tracking-tight">{cert.title}</h4>
                        <p className="text-emerald-400/80 font-bold text-xs mb-1 uppercase tracking-widest">{cert.issuer}</p>
                        <p className="text-muted-foreground text-xs mb-6">{cert.year}</p>
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-black text-white uppercase tracking-widest bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 rounded-xl border border-emerald-400/30 transition-all shadow-lg shadow-emerald-900/40 hover:-translate-y-0.5 active:translate-y-0"
                        >
                          Verify Credential <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Microsoft Azure Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.5 2L2 20h7l2-4h6l2 4h7L16.5 2h-5zm-1 12l2-4 2 4h-4z" />
              </svg>
              <h3 className="text-xl font-bold">Microsoft Azure Certifications</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.filter(c => c.color === "blue").map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-br from-blue-500/5 via-card/50 to-blue-950/20 border-blue-500/20 p-8 hover-elevate group overflow-hidden relative min-h-[200px] flex items-center shadow-xl shadow-blue-500/5 hover:border-blue-500/40 transition-all duration-500">
                    <div className="flex gap-8 items-center relative z-10 w-full">
                      <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-900/40 flex items-center justify-center border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-500 shadow-xl shadow-blue-500/20 backdrop-blur-md">
                        <div className="w-full h-full p-4 transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">{cert.icon}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xl mb-1 group-hover:text-blue-400 transition-colors leading-tight tracking-tight">{cert.title}</h4>
                        <p className="text-blue-400/80 font-bold text-xs mb-1 uppercase tracking-widest">{cert.issuer}</p>
                        <p className="text-muted-foreground text-xs mb-6">{cert.year}</p>
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-black text-white uppercase tracking-widest bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-xl border border-blue-400/30 transition-all shadow-lg shadow-blue-900/40 hover:-translate-y-0.5 active:translate-y-0"
                        >
                          Verify Credential <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Achievements */}
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
