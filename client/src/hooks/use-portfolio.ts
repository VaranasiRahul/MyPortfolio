import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertMessage } from "@shared/schema";

// Helper to handle API requests that should match the Zod schemas
async function fetchApi<T>(path: string, schema: any): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error("Failed to fetch data");
  const json = await res.json();
  return schema.parse(json);
}

// === READ HOOKS ===

export function useSkills() {
  return useQuery({
    queryKey: [api.skills.list.path],
    queryFn: () => fetchApi(api.skills.list.path, api.skills.list.responses[200]),
  });
}

export function useExperience() {
  return useQuery({
    queryKey: [api.experience.list.path],
    queryFn: () => fetchApi(api.experience.list.path, api.experience.list.responses[200]),
  });
}

export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: () => fetchApi(api.projects.list.path, api.projects.list.responses[200]),
  });
}

export function useEducation() {
  return useQuery({
    queryKey: [api.education.list.path],
    queryFn: () => fetchApi(api.education.list.path, api.education.list.responses[200]),
  });
}

// === MUTATION HOOKS ===

export function useSendMessage() {
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = api.contact.submit.input.parse(data);
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send message");
      }
      
      return api.contact.submit.responses[200].parse(await res.json());
    },
  });
}
