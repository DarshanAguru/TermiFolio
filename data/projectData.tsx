export interface Project {
  title: string;
  description: string;
  about: string;
  challenges: string[];
  image: string;
  techStack: string[];
  link: string;
  redirectLink?: string;
  aiHint?: string;
}

export const projects: Project[] = [
  {
    title: 'Project1', // Single-word title is best for terminal route navigation (e.g. cd Project1)
    description: 'This is a brief, one-sentence description of your first project. Summarize its primary purpose.',
    about: 'Provide a detailed, deep-dive paragraph outlining the architecture, key libraries, databases, and overall engineering achievements of Project 1.',
    challenges: [
      'Describe technical challenge 1 that you solved in Project 1.',
      'Describe technical challenge 2 that you solved in Project 1.',
      'Describe technical challenge 3 that you solved in Project 1.'
    ],
    image: '', // Leave blank to trigger the beautiful clean placeholder card!
    techStack: ['Language1', 'Framework1', 'Database1', 'CloudPlatform1'],
    link: 'https://github.com/DarshanAguru/TermiFolio',
    redirectLink: '/',
    aiHint: 'project1 software template'
  },
  {
    title: 'Project2', // Single-word title is best for terminal route navigation (e.g. cd Project2)
    description: 'This is a brief, one-sentence description of your second project. Summarize its primary purpose.',
    about: 'Provide a detailed, deep-dive paragraph outlining the architecture, key libraries, databases, and overall engineering achievements of Project 2.',
    challenges: [
      'Describe technical challenge 1 that you solved in Project 2.',
      'Describe technical challenge 2 that you solved in Project 2.',
      'Describe technical challenge 3 that you solved in Project 2.'
    ],
    image: '', // Leave blank to trigger the beautiful clean placeholder card!
    techStack: ['Language2', 'Framework2', 'Database2', 'CloudPlatform2'],
    link: 'https://github.com/DarshanAguru/TermiFolio',
    redirectLink: '/',
    aiHint: 'project2 software template'
  }
];
