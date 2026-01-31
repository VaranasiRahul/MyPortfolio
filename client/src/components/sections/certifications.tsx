import { motion } from "framer-motion";
import { Award, ExternalLink, Cloud, Trophy, Zap, Code, Youtube } from "lucide-react";
import { Card } from "@/components/ui/card";

const certifications = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    icon: <Cloud className="w-8 h-8 text-blue-500" />,
    link: "https://drive.google.com/drive/folders/1zI3nOCrFoixYJ8jNndZCn0pqL0HaJsgk?usp=share_link",
    badge: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/AWS-SolArchAssociate-2020.png"
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    icon: <Cloud className="w-8 h-8 text-blue-400" />,
    link: "https://drive.google.com/drive/folders/1zI3nOCrFoixYJ8jNndZCn0pqL0HaJsgk?usp=share_link",
    badge: "https://images.credly.com/size/340x340/images/00634fca-3301-443b-81f7-e2343a41ef73/AWS-CloudPractitioner-2020.png"
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
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="bg-card/50 border-border/50 p-6 hover-elevate group">
                  <div className="flex gap-6 items-start">
                    <div className="w-16 h-16 shrink-0 rounded-lg bg-background flex items-center justify-center border group-hover:border-primary/50 transition-colors">
                      {cert.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{cert.title}</h4>
                      <p className="text-muted-foreground text-sm mb-3">{cert.issuer}</p>
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                      >
                        View Credential <ExternalLink className="w-3 h-3" />
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
