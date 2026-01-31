import { useEducation } from "@/hooks/use-portfolio";
import { SectionHeading } from "@/components/section-heading";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";

export function Education() {
  const { data: education, isLoading } = useEducation();

  return (
    <section id="education" className="py-24 bg-background">
      <div className="container-padding">
        <SectionHeading 
          title="Education" 
          subtitle="Academic background and qualifications."
        />

        {isLoading ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {[1, 2].map(i => <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto grid gap-6">
            {education?.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 items-start p-8 rounded-2xl border border-white/5 bg-card/40 backdrop-blur-md hover-elevate hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="p-4 bg-primary/10 rounded-2xl shadow-sm border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <GraduationCap className="w-8 h-8" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{edu.degree}</h3>
                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-xs font-bold text-primary border border-primary/20 tracking-wider">
                      {edu.year}
                    </span>
                  </div>
                  
                  <div className="text-lg font-semibold text-foreground/90 mb-2">
                    {edu.institution}
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-4">
                    <MapPin className="w-4 h-4 text-primary/60" /> {edu.location}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {edu.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
