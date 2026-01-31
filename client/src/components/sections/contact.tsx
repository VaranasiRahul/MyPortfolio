import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useSendMessage } from "@/hooks/use-portfolio";
import { SectionHeading } from "@/components/section-heading";
import { motion } from "framer-motion";
import { Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export function Contact() {
  const { toast } = useToast();
  const mutation = useSendMessage();
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
          duration: 5000,
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      },
    });
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 rounded-full blur-[100px]" />
      </div>

      <div className="container-padding relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">Let's Work Together</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to discuss DevOps best practices? 
            Send me a message and I'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Direct Email</h3>
            <p className="text-slate-300 mb-8 text-lg">
              I've simplified the contact process. Click the button below to send me an email directly from your favorite client.
            </p>
            <Button 
              asChild
              className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]"
            >
              <a href="mailto:rahulvaranasi04@gmail.com">
                Email Me <Send className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        
        <div className="mt-12 text-center text-slate-400">
          <p className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> rahulvaranasi04@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}
