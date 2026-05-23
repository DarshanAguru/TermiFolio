export interface Experience {
  role: string;
  org: string;
  from: string;
  to: string;
  location: string;
  type: string;
  locationType: string;
  logo: string;
  desc: string[];
}

export const experienceData: Experience[] = [
  {
    role: "Your Role Title 1 (e.g. Senior Software Engineer)",
    org: "Company Name 1",
    from: "15 Jan 2024",
    to: "Present",
    location: "City, Country",
    type: "Full-time",
    locationType: "Hybrid",
    logo: "", // Leave blank to test the dynamic gradient placeholder generating initials for Company Name 1!
    desc: [
      "Highlight your impact and metrics: e.g., Led the design of a distributed system, reducing API latency by **35%**.",
      "Describe a technical achievement: e.g., Spearheaded database query optimization, reducing load times on backend endpoints.",
      "Mention tools/standards used: e.g., Automated CI/CD pipelines using Docker and popular cloud providers.",
      "Describe leadership or collaboration: e.g., Mentored junior developers and co-authored modular team code standards."
    ]
  },
  {
    role: "Your Role Title 2 (e.g. Software Engineer)",
    org: "Company Name 2",
    from: "10 Jul 2022",
    to: "31 Dec 2023",
    location: "City, State",
    type: "Full-time",
    locationType: "Remote",
    logo: "", // Leave blank to test the dynamic gradient placeholder generating initials for Company Name 2!
    desc: [
      "Detail your backend work: e.g., Developed high-throughput event messaging systems using Apache Kafka.",
      "Detail your database work: e.g., Maintained internal databases, executing periodic structural migrations.",
      "Detail your frontend work: e.g., Designed clean, responsive administrator dashboard interfaces.",
      "Highlight any collaboration: e.g., Partnered with security audit teams to resolve critical vulnerabilities."
    ]
  }
];
