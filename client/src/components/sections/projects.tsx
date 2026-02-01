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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border transition-all duration-300 flex flex-col group hover-elevate ${
                  project.id === 1 
                    ? "md:col-span-2 lg:col-span-3 bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50 shadow-emerald-900/10" 
                    : "bg-card/40 border-white/5 hover:border-primary/20"
                }`}
              >
                <div className={`p-8 flex flex-col h-full relative ${project.id === 1 ? "md:flex-row md:gap-8 md:items-center" : ""}`}>
                  {project.id === 1 && (
                    <div className="absolute top-8 right-8 z-20">
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        {project.duration}
                      </span>
                    </div>
                  )}
                  <div className={`flex flex-col flex-1 ${project.id === 1 ? "md:max-w-3xl" : ""}`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-xl transition-all duration-300 border ${
                        project.id === 1
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white"
                          : "bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground"
                      }`}>
                        <Code2 className="w-6 h-6" />
                      </div>
                      {project.id !== 1 && (
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider ${
                            project.id === 1
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-primary/10 text-primary border-primary/20"
                          }`}>
                            {project.duration}
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className={`text-3xl font-bold mb-2 transition-colors ${
                      project.id === 1 ? "group-hover:text-emerald-400" : "group-hover:text-primary"
                    }`}>
                      {project.title}
                    </h3>
                    
                    <p className={`text-base font-semibold mb-6 uppercase tracking-wide ${
                      project.id === 1 ? "text-emerald-400/80" : "text-primary/80"
                    }`}>
                      {project.role}
                    </p>

                    <div className="flex-grow">
                      <ul className="space-y-4 mb-8">
                        {project.highlights.map((item, i) => (
                          <li key={i} className="text-muted-foreground text-base flex gap-3 leading-relaxed">
                             <span className={`font-bold shrink-0 ${project.id === 1 ? "text-emerald-500" : "text-primary"}`}>•</span>
                             {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags?.map((tag) => (
                          <span key={tag} className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-tighter ${
                            tag === "Jaguar Land Rover"
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                              : project.id === 1
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          }`}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {project.id !== 1 && (
                        <div className={`pt-6 border-t ${project.id === 1 ? "border-emerald-500/10" : "border-white/5"}`}>
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 border ${
                              project.id === 1
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-white"
                                : "bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground"
                            }`}
                          >
                             View Documentation <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {project.id === 1 && (
                    <div className="hidden md:flex flex-none justify-center items-center p-4">
                      <img 
                        src="https://www.freepnglogos.com/uploads/land-rover-png-logo/jaguar-land-rover-sports-png-logo-3.png" 
                        alt="JLR Logo" 
                        className="w-[180px] object-contain opacity-40 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 -translate-x-4" 
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
