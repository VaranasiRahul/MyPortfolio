import { useQuery, useMutation } from "@tanstack/react-query";
import { skillsData, experienceData, projectsData, educationData } from "@/lib/static-data";

// === READ HOOKS (Now using static data) ===

export function useSkills() {
  return useQuery({
    queryKey: ["/api/skills"],
    queryFn: () => Promise.resolve(skillsData),
  });
}

export function useExperience() {
  return useQuery({
    queryKey: ["/api/experience"],
    queryFn: () => Promise.resolve(experienceData),
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["/api/projects"],
    queryFn: () => Promise.resolve(projectsData),
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ["/api/education"],
    queryFn: () => Promise.resolve(educationData),
  });
}

// === MUTATION HOOKS (No-op for static site) ===

export function useSendMessage() {
  return useMutation({
    mutationFn: async (data: any) => {
      console.log("Static mode: Contact form data:", data);
      return Promise.resolve({ success: true });
    },
  });
}
