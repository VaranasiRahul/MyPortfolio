import { useProjects } from "@/hooks/use-portfolio";
import { SectionHeading } from "@/components/section-heading";
import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";

export function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container-padding">
        <SectionHeading 
          title="Featured Projects" 
          subtitle="Highlights of my recent work, personal projects, and technical experiments."
        />

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-80 bg-muted rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/5 hover:border-primary/20 transition-all duration-300 flex flex-col group hover-elevate"
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 border border-primary/20">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 uppercase tracking-wider">
                      {project.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors text-foreground">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm font-semibold text-primary/80 mb-6 uppercase tracking-wide">
                    {project.role}
                  </p>

                  <div className="flex-grow">
                    <ul className="space-y-3">
                      {project.highlights.map((item, i) => (
                        <li key={i} className="text-muted-foreground text-sm flex gap-3 leading-relaxed">
                           <span className="text-primary font-bold">•</span>
                           {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <button className="w-full py-3.5 rounded-xl bg-primary/10 text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2 border border-primary/20">
                       View Case Study <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
