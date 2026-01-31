import { useEducation } from "@/hooks/use-portfolio";
import { SectionHeading } from "@/components/section-heading";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";

export function Education() {
  const { data: education, isLoading } = useEducation();

  return (
    <section id="education" className="py-24 bg-white">
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
                className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl border border-border/60 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="p-4 bg-white rounded-xl shadow-sm border border-border text-primary">
                  <GraduationCap className="w-8 h-8" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <span className="px-3 py-1 rounded-full bg-secondary text-sm font-medium text-secondary-foreground whitespace-nowrap">
                      {edu.year}
                    </span>
                  </div>
                  
                  <div className="text-lg font-medium text-foreground/80 mb-2">
                    {edu.institution}
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                    <MapPin className="w-4 h-4" /> {edu.location}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
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
