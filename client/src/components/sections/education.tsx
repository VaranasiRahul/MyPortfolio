import { useEducation } from "@/hooks/use-portfolio";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

export function Education() {
  const { data: education, isLoading } = useEducation();

  return (
    <section id="education" className="py-24 bg-background">
      <div className="container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Academics</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">
            Education
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Strong academic foundation in computer science and engineering
          </p>
        </motion.div>

        {isLoading ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {[1, 2, 3].map(i => <div key={i} className="h-40 bg-muted rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {education?.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <Card className="bg-card/30 border-border/40 p-8 rounded-2xl hover-elevate group-hover:border-primary/30 transition-all duration-500 flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-foreground/80 font-medium mb-4">
                      <span>{edu.institution} — {edu.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary/60" />
                        {edu.year}
                      </div>
                    </div>

                    {edu.id === 1 && (
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <p className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">Relevant Coursework:</p>
                        <div className="flex flex-wrap gap-2">
                          {["Agile Software Development", "Database Management Systems", "Software Testing", "Big Data Analytics", "Cloud Computing", "Web Development", "Data Structures & Algorithms"].map((course) => (
                            <span key={course} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors cursor-default">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
