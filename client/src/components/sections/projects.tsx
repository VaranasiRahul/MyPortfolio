import { useProjects } from "@/hooks/use-portfolio";
import { SectionHeading } from "@/components/section-heading";
import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";

export function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <section id="projects" className="py-24 bg-slate-50">
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
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col group"
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground bg-secondary px-3 py-1 rounded-md">
                      {project.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-base font-medium text-muted-foreground mb-6">
                    {project.role}
                  </p>

                  <div className="flex-grow">
                    <ul className="space-y-3">
                      {project.highlights.map((item, i) => (
                        <li key={i} className="text-muted-foreground text-sm flex gap-3">
                           <span className="text-primary font-bold">•</span>
                           {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/50">
                    <button className="w-full py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                       View Details <ExternalLink className="w-4 h-4" />
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
