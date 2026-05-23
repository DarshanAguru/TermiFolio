export interface Skill {
  name: string;
  url: string;
  isCore?: boolean;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    description: 'The core languages used to compile and build systems.',
    skills: [
      { name: 'Java', url: "#", isCore: true },
      { name: 'Python', url: "#", isCore: true },
      { name: 'JavaScript', url: "#" },
      { name: 'SQL', url: "#" },
    ],
  },
  {
    name: 'Backend Technologies',
    description: 'Frameworks and runtimes for server-side logic and database operations.',
    skills: [
      { name: 'Spring Boot', url: "#", isCore: true },
      { name: 'FastAPI', url: "#", isCore: true },
      { name: 'Node.js', url: "#" },
      { name: 'Django', url: "#" },
      { name: 'REST APIs', url: "#", isCore: true },
      { name: 'Microservices', url: "#" },
    ],
  },
  {
    name: 'Frontend Technologies',
    description: 'Tools, libraries, and frameworks for designing responsive UIs.',
    skills: [
      { name: 'React', url: "#", isCore: true },
      { name: 'React Native', url: "#", isCore: true },
      { name: 'Next.js', url: "#", isCore: true },
      { name: 'Vite', url: "#", isCore: true },
      { name: 'Tailwind CSS', url: "#" },
    ],
  },
  {
    name: 'Databases & Message Queues',
    description: 'Relational databases, NoSQL stores, and distributed queues.',
    skills: [
      { name: 'PostgreSQL', url: "#", isCore: true },
      { name: 'MySQL', url: "#" },
      { name: 'MongoDB', url: "#", isCore: true },
      { name: 'Kafka', url: "#" },
    ],
  },
  {
    name: 'DevOps & Systems',
    description: 'Platforms and workflows for containers, orchestration, and scripting.',
    skills: [
      { name: 'AWS', url: "#", isCore: true },
      { name: 'Docker', url: "#", isCore: true },
      { name: 'Git & GitHub', url: "#", isCore: true },
      { name: 'Linux & Shell', url: "#", isCore: true },
    ],
  },
  {
    name: 'Other Domains',
    description: 'Areas of security, methodology, and architectural design.',
    skills: [
      { name: 'Cybersecurity', url: "#" },
      { name: 'System Design', url: "#" },
      { name: 'Agile / CI-CD', url: "#" },
    ],
  },
];
