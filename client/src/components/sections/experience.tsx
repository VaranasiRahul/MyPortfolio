import { useExperience } from "@/hooks/use-portfolio";
import { SectionHeading } from "@/components/section-heading";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  const { data: experience, isLoading } = useExperience();

  return (
    <section id="experience" className="py-24 bg-background overflow-hidden">
      <div className="container-padding">
        <SectionHeading 
          title="Professional Journey" 
          subtitle="A timeline of my career growth and contributions in the tech industry."
        />

        <div className="max-w-3xl mx-auto relative pl-8 md:pl-0">
          {/* Vertical Line with Animation */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary via-emerald-500 to-primary/20 -translate-x-1/2 hidden md:block origin-top" 
          />
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="absolute left-0 top-0 w-px bg-gradient-to-b from-primary via-emerald-500 to-primary/20 md:hidden origin-top" 
          />

          {isLoading ? (
            <div className="space-y-12">
               {[1, 2].map(i => <div key={i} className="h-40 bg-muted rounded-xl animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-12">
              {experience?.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className={`absolute left-[-33px] md:left-1/2 md:-translate-x-1/2 top-0 w-4 h-4 rounded-full border-4 border-background shadow-sm z-10 mt-1.5 ${
                      role.id === 1 ? "bg-emerald-500 shadow-emerald-500/20" : "bg-primary shadow-primary/20"
                    }`} 
                  />

                  {/* Date (Desktop) */}
                  <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? "text-left" : "text-right"}`}>
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border ${
                      role.id === 1 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "bg-secondary text-secondary-foreground border-transparent"
                    }`}>
                      <Calendar className="w-3.5 h-3.5" /> {role.id === 2 ? "Nov 2022 - Mar 2023" : role.duration}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className="md:w-1/2 group">
                    <div className={`backdrop-blur-md rounded-2xl p-6 shadow-xl border transition-all duration-300 relative hover-elevate ${
                      role.id === 1
                        ? "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50"
                        : "bg-card/40 border-white/5 hover:border-primary/20"
                    }`}>
                      {/* JLR Logo for Experience Section */}
                      {role.id === 1 && (
                        <div className="absolute top-6 right-6 w-12 opacity-80 group-hover:opacity-100 transition-opacity">
                          <img 
                            src="https://1000logos.net/wp-content/uploads/2023/08/JLR-Logo-2008.png" 
                            alt="JLR Logo" 
                            className="w-full h-auto grayscale brightness-200 contrast-125"
                          />
                        </div>
                      )}

                      {/* Mobile Date */}
                      <div className="md:hidden mb-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
                          role.id === 1
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-primary/10 text-primary border-primary/20"
                        }`}>
                          <Calendar className="w-3 h-3" /> {role.id === 2 ? "Nov 2022 - Mar 2023" : role.duration}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-1">
                        {role.id === 2 ? (
                          <a 
                            href="https://drive.google.com/file/d/1iEg4BbHKAAMDkhGvvbMDbf_j7DofEFGA/view?usp=share_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-xl font-bold transition-colors hover:underline decoration-emerald-500/50 ${
                              role.id === 1 ? "group-hover:text-emerald-400" : "group-hover:text-primary"
                            }`}
                          >
                            {role.role}
                          </a>
                        ) : (
                          <h3 className={`text-xl font-bold transition-colors ${
                            role.id === 1 ? "group-hover:text-emerald-400" : "group-hover:text-primary"
                          }`}>
                            {role.role}
                          </h3>
                        )}
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
                      
                      <ul className="space-y-3 mb-6">
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

                      <div className="flex flex-wrap gap-2 items-center">
                        {role.tags?.map((tag) => (
                          <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-tighter shrink-0 ${
                            tag === "Jaguar Land Rover"
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                              : role.id === 1
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          }`}>
                            {tag}
                          </span>
                        ))}
                      </div>
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
