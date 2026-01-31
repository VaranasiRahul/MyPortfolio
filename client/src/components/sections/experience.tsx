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
                  <div className="absolute left-[-33px] md:left-1/2 md:-translate-x-1/2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm z-10 mt-1.5" />

                  {/* Date (Desktop) */}
                  <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? "text-left" : "text-right"}`}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                      <Calendar className="w-3.5 h-3.5" /> {role.duration}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className="md:w-1/2">
                    <div className="bg-card/40 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/5 hover:border-primary/20 transition-all duration-300 relative group hover-elevate">
                      {/* Mobile Date */}
                      <div className="md:hidden mb-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary border border-primary/20">
                          <Calendar className="w-3 h-3" /> {role.duration}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {role.role}
                      </h3>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                          <Briefcase className="w-4 h-4 text-primary" /> {role.company}
                        </span>
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                          <MapPin className="w-4 h-4 text-primary" /> {role.location}
                        </span>
                      </div>
                      
                      <ul className="space-y-3">
                        {role.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground/90 leading-relaxed">
                            <span className="mt-2 min-w-[6px] h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
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
