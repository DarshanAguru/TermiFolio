export interface Certification {
  title: string;
  issuer: string;
  description: string;
  link: string;
  logo: string;
  from: string;
  to?: string;
}

export const certifications: Certification[] = [
  {
    title: 'Certification Name (e.g. AWS Solutions Architect)',
    issuer: 'Certification Issuer (e.g. Amazon Web Services)',
    description: 'Describe what skills and competencies this certification validates (e.g. designing highly resilient distributed systems, database scaling, access controls).',
    link: '#',
    logo: '', // Leave blank to test the beautiful dynamic gradient placeholder!
    from: 'June 2025',
    to: 'June 2028'
  },
  {
    title: 'Foundational Cybersecurity Certificate',
    issuer: 'Security Council (e.g. ISC2)',
    description: 'Demonstrates foundational understanding of cybersecurity principles, access controls, network security operations, and system compliance.',
    link: '#',
    logo: '', // Leave blank to test the beautiful dynamic gradient placeholder!
    from: 'November 2024'
  }
];
