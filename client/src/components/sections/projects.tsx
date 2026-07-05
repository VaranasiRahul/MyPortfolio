import { projectsData } from "@/lib/static-data";
import { SectionHeading } from "@/components/section-heading";
import { motion } from "framer-motion";
import { ExternalLink, Code2, Github, Cpu } from "lucide-react";

export function Projects() {
  const projects = projectsData;
  const isLoading = false;

  const getProjectIcon = (id: number) => {
    if (id === 2) return <Cpu className="w-6 h-6" />;
    return <Code2 className="w-6 h-6" />;
  };

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container-padding">
        <SectionHeading
          title="Featured Projects"
          subtitle="Highlights of my production work, personal DevOps infrastructure, and technical experiments."
        />

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-80 bg-muted rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Projects — Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.slice(0, 2).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border transition-all duration-300 flex flex-col group hover-elevate ${
                    project.id === 1
                      ? "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50 shadow-emerald-900/10"
                      : project.id === 2
                        ? "bg-indigo-950/20 border-indigo-500/30 hover:border-indigo-500/50 shadow-indigo-900/10"
                        : "bg-card/40 border-white/5 hover:border-primary/20"
                  }`}
                >
                  <div className="p-8 flex flex-col h-full relative">
                    <div className="absolute top-8 right-8 z-20">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider ${
                        project.id === 1
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : project.id === 2
                            ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                            : "bg-primary/10 text-primary border-primary/20"
                      }`}>
                        {project.duration}
                      </span>
                    </div>

                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-xl transition-all duration-300 border ${
                          project.id === 1
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white"
                            : project.id === 2
                              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white"
                              : "bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground"
                        }`}>
                          {getProjectIcon(project.id)}
                        </div>
                      </div>

                      <h3 className={`text-2xl font-bold mb-2 transition-colors ${
                        project.id === 1 ? "group-hover:text-emerald-400" : project.id === 2 ? "group-hover:text-indigo-400" : "group-hover:text-primary"
                      }`}>
                        {project.title}
                      </h3>

                      <p className={`text-sm font-semibold mb-6 uppercase tracking-wide ${
                        project.id === 1 ? "text-emerald-400/80" : project.id === 2 ? "text-indigo-400/80" : "text-primary/80"
                      }`}>
                        {project.role}
                      </p>

                      <div className="flex-grow">
                        <ul className="space-y-3 mb-6">
                          {project.highlights.map((item, i) => (
                            <li key={i} className="text-muted-foreground text-sm flex gap-3 leading-relaxed">
                              <span className={`font-bold shrink-0 ${
                                project.id === 1 ? "text-emerald-500" : project.id === 2 ? "text-indigo-500" : "text-primary"
                              }`}>•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags?.map((tag) => (
                            <span key={tag} className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-tighter ${
                              project.id === 1
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : project.id === 2
                                  ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                  : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            }`}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className={`pt-6 border-t ${
                          project.id === 1 ? "border-emerald-500/10" : project.id === 2 ? "border-indigo-500/10" : "border-white/5"
                        }`}>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 border ${
                              project.id === 1
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-white"
                                : project.id === 2
                                  ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500 hover:text-white"
                                  : "bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground"
                            }`}
                          >
                            View on GitHub <Github className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Other Projects — Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.slice(2).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/5 hover:border-primary/20 transition-all duration-300 flex flex-col group hover-elevate bg-card/40"
                >
                  <div className="p-8 flex flex-col h-full relative">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider bg-primary/10 text-primary border-primary/20">
                        {project.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm font-semibold mb-5 uppercase tracking-wide text-primary/80">
                      {project.role}
                    </p>

                    <div className="flex-grow">
                      <ul className="space-y-2 mb-6">
                        {project.highlights.map((item, i) => (
                          <li key={i} className="text-muted-foreground text-sm flex gap-3 leading-relaxed">
                            <span className="font-bold shrink-0 text-primary">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags?.map((tag) => (
                          <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-tighter bg-blue-500/10 text-blue-400 border-blue-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-5 border-t border-white/5">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 border bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground"
                        >
                          View Project <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
