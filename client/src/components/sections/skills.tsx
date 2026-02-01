import { skillsData } from "@/lib/static-data";
import { SectionHeading } from "@/components/section-heading";
import { motion } from "framer-motion";
import { Server, Code, Globe, Terminal, Database, Cloud } from "lucide-react";

export function Skills() {
  const skills = skillsData;
  const isLoading = false;

  // Mapping categories to icons for visual interest
  const getIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes("frontend")) return <Globe className="w-6 h-6" />;
    if (lower.includes("backend")) return <Server className="w-6 h-6" />;
    if (lower.includes("devops") || lower.includes("cloud")) return <Cloud className="w-6 h-6" />;
    if (lower.includes("database")) return <Database className="w-6 h-6" />;
    if (lower.includes("tools")) return <Terminal className="w-6 h-6" />;
    return <Code className="w-6 h-6" />;
  };

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container-padding">
        <SectionHeading 
          title="Technical Expertise" 
          subtitle="My diverse stack of languages, frameworks, and tools tailored for modern web development and reliable infrastructure."
        />

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills?.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/40 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/5 hover:border-primary/20 transition-all duration-300 group hover-elevate"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 border border-primary/20">
                    {getIcon(skill.category)}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{skill.category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span 
                      key={item} 
                      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary/50 text-secondary-foreground border border-white/5 group-hover:border-primary/20 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
