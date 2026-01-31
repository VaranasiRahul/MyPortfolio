import { useExperience } from "@/hooks/use-portfolio";
import { SectionHeading } from "@/components/section-heading";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  const { data: experience, isLoading } = useExperience();

  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container-padding">
        <SectionHeading 
          title="Professional Journey" 
          subtitle="A timeline of my career growth and contributions in the tech industry."
        />

        <div className="max-w-3xl mx-auto relative pl-8 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:hidden" />

          {isLoading ? (
            <div className="space-y-12">
               {[1, 2].map(i => <div key={i} className="h-40 bg-muted rounded-xl animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-12">
              {experience?.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-[-33px] md:left-1/2 md:-translate-x-1/2 top-0 w-4 h-4 rounded-full border-4 border-background shadow-sm z-10 mt-1.5 transition-all duration-300 group-hover:scale-125 ${
                    role.id === 1 ? "bg-emerald-500 shadow-emerald-500/20" : "bg-primary shadow-primary/20"
                  }`} />

                  {/* Date (Desktop) */}
                  <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? "text-left" : "text-right"}`}>
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border ${
                      role.id === 1 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "bg-secondary text-secondary-foreground border-transparent"
                    }`}>
                      <Calendar className="w-3.5 h-3.5" /> {role.duration}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className="md:w-1/2 group">
                    <div className={`backdrop-blur-md rounded-2xl p-6 shadow-xl border transition-all duration-300 relative hover-elevate ${
                      role.id === 1
                        ? "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50"
                        : "bg-card/40 border-white/5 hover:border-primary/20"
                    }`}>
                      {/* Mobile Date */}
                      <div className="md:hidden mb-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
                          role.id === 1
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-primary/10 text-primary border-primary/20"
                        }`}>
                          <Calendar className="w-3 h-3" /> {role.duration}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`text-xl font-bold transition-colors ${
                          role.id === 1 ? "group-hover:text-emerald-400" : "group-hover:text-primary"
                        }`}>
                          {role.role}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-tighter ${
                          role.id === 1
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}>
                          {role.id === 1 ? "Enterprise" : "Professional"}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-muted-foreground mb-4">
                        <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border ${
                          role.id === 1 ? "bg-emerald-500/5 border-emerald-500/10" : "bg-white/5 border-white/5"
                        }`}>
                          <Briefcase className={`w-4 h-4 ${role.id === 1 ? "text-emerald-500" : "text-primary"}`} /> {role.company}
                        </span>
                        <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border ${
                          role.id === 1 ? "bg-emerald-500/5 border-emerald-500/10" : "bg-white/5 border-white/5"
                        }`}>
                          <MapPin className={`w-4 h-4 ${role.id === 1 ? "text-emerald-500" : "text-primary"}`} /> {role.location}
                        </span>
                      </div>
                      
                      <ul className="space-y-3">
                        {role.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground/90 leading-relaxed">
                            <span className={`mt-2 min-w-[6px] h-1.5 rounded-full transition-colors ${
                              role.id === 1 
                                ? "bg-emerald-500/40 group-hover:bg-emerald-500" 
                                : "bg-primary/40 group-hover:bg-primary"
                            }`} />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
