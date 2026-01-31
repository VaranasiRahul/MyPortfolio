import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  align?: "left" | "center";
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
        {title}
      </h2>
      <div className={`h-1.5 w-20 bg-primary/20 rounded-full mb-6 ${align === "center" ? "mx-auto" : ""}`}>
        <div className="h-full w-10 bg-primary rounded-full" />
      </div>
      <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  );
}
