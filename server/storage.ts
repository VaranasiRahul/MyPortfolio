import {
  skills, experience, education, projects, messages,
  type Skill, type Experience, type Education, type Project, type InsertMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getSkills(): Promise<Skill[]>;
  getExperience(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  getProjects(): Promise<Project[]>;
  createMessage(message: InsertMessage): Promise<void>;
  seed(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience);
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createMessage(message: InsertMessage): Promise<void> {
    await db.insert(messages).values(message);
  }

  async seed(): Promise<void> {
    const existingSkills = await this.getSkills();
    if (existingSkills.length === 0) {
      await db.insert(skills).values([
        { category: "Programming Languages", items: ["Python", "Java", "JavaScript", "TypeScript", "Go", "SQL", "Shell Scripting"] },
        { category: "Frontend Development", items: ["React.js", "Angular", "Bootstrap", "Material-UI", "Responsive Design"] },
        { category: "Backend & Middleware", items: ["Node.js", "Express.js", "MongoDB", "MySQL", "PostgreSQL", "Nginx", "RESTful APIs"] },
        { category: "Cloud & DevOps", items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Helm", "ArgoCD", "Terraform", "Ansible", "Jenkins", "GitLab CI/CD", "Maven", "Vagrant"] },
        { category: "Monitoring & Observability", items: ["Dynatrace", "Prometheus", "Grafana"] },
        { category: "Tools & OS", items: ["Git", "Postman", "VS Code", "Linux", "Ubuntu", "MacOS", "Windows"] },
        { category: "Design & Creative", items: ["Figma", "Adobe Creative Suite (Photoshop, After Effects, Audition, Premiere Pro)", "UI/UX Design"] },
      ]);
    }

    const existingExp = await this.getExperience();
    if (existingExp.length === 0) {
      await db.insert(experience).values([
        {
          role: "DevOps Engineer",
          company: "Tata Consultancy Services (TCS)",
          location: "Hyderabad",
          duration: "April 2024 – Present",
          highlights: [
            "Platform DevOps Engineer for Jaguar Land Rover (JLR), building an internal developer portal using the Backstage open-source project by Spotify.",
            "Architecting automation workflows to streamline employee onboarding, access management, and repository creation using standardized boilerplate templates.",
            "Spearheaded Observability initiatives by designing Dynatrace Product Dashboards to track DAU/MAU and User Sessions; defined and implemented SLOs with Error Budget Burn Rate visualization.",
            "Enhanced Developer Experience (DevEx) by refactoring Catalyst, Go, and Maven templates to automate repository creation and streamline Merge Request (MR) workflows in Global Digital Delivery (GDD) environments.",
            "Resolved critical technical debt by upgrading Go boilerplates to fix Snyk vulnerabilities and standardizing error logging across 60+ backend services."
          ]
        },
        {
          role: "Angular Developer",
          company: "Freelance Project (Training & Practice)",
          location: "Visakhapatnam",
          duration: "Aug 2022 – Oct 2022",
          highlights: [
            "Developed a comprehensive MEAN stack workspace dashboard as part of specialized technical training.",
            "Implemented responsive frontend using Angular with TypeScript, featuring calculator, file transfer, and productivity modules.",
            "Designed RESTful APIs using Node.js and Express.js with MongoDB for data persistence."
          ]
        },
        {
          role: "Full Stack Angular Developer",
          company: "Phoenix Global (Intensive Training)",
          location: "Hyderabad",
          duration: "Aug 2022 – Oct 2022",
          highlights: [
            "Completed specialized MEAN stack development training with hands-on project implementations.",
            "Focused on building scalable web applications and mastering modern JavaScript frameworks."
          ]
        },
        {
          role: "Cloud Computing Trainee",
          company: "Verzeo (AWS Training Program)",
          location: "Hyderabad",
          duration: "Jan 2022 – Apr 2022",
          highlights: [
            "Completed comprehensive AWS cloud computing training covering EC2, S3, RDS, Lambda, and VPC configurations.",
            "Gained practical experience in cloud architecture design and deployment strategies."
          ]
        }
      ]);
    }

    const existingEdu = await this.getEducation();
    if (existingEdu.length === 0) {
      await db.insert(education).values([
        {
          degree: "B.Tech Computer Science Engineering",
          institution: "GITAM University",
          location: "Visakhapatnam, AP",
          year: "2019 – 2023",
          details: "CGPA: 7.50/10.0. Coursework: Agile Software Development, Database Management Systems, Software Testing Methodologies, Big Data Analytics, Cloud Computing, Web Development, Data Structures & Algorithms"
        },
        {
          degree: "Intermediate (MPC)",
          institution: "Sri Gayatri Junior College",
          location: "Visakhapatnam, AP",
          year: "April 2019",
          details: "CGPA: 7.78/10.0"
        },
        {
          degree: "ICSE (Class X)",
          institution: "Timpany School",
          location: "Visakhapatnam, AP",
          year: "May 2017",
          details: "Percentage: 70.80%"
        }
      ]);
    }

    const existingProjects = await this.getProjects();
    if (existingProjects.length === 0) {
      await db.insert(projects).values([
        {
          title: "Jaguar Land Rover Employee Dashboard",
          role: "Frontend Development & Data Pipeline Architecture",
          duration: "April 2024 - Present",
          highlights: [
            "Frontend Development: Built responsive employee dashboard using React.js with TypeScript, implementing modern UI/UX principles and component-based architecture",
            "Data Pipeline Architecture: Designed and implemented real-time data pipelines using Google Cloud Pub/Sub and Cloud Functions for seamless data integration"
          ]
        }
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
