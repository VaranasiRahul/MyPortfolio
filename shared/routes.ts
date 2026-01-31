import { z } from "zod";
import { insertMessageSchema, skills, experience, education, projects } from "./schema";

export const api = {
  skills: {
    list: {
      method: "GET" as const,
      path: "/api/skills",
      responses: {
        200: z.array(z.custom<typeof skills.$inferSelect>()),
      },
    },
  },
  experience: {
    list: {
      method: "GET" as const,
      path: "/api/experience",
      responses: {
        200: z.array(z.custom<typeof experience.$inferSelect>()),
      },
    },
  },
  education: {
    list: {
      method: "GET" as const,
      path: "/api/education",
      responses: {
        200: z.array(z.custom<typeof education.$inferSelect>()),
      },
    },
  },
  projects: {
    list: {
      method: "GET" as const,
      path: "/api/projects",
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
  },
  contact: {
    submit: {
      method: "POST" as const,
      path: "/api/contact",
      input: insertMessageSchema,
      responses: {
        200: z.object({ success: z.boolean() }),
        400: z.object({ message: z.string() }),
      },
    },
  },
};
