export interface ProfileData {
  title: string; // The customizable name of your portfolio project (e.g. TermiFolio)
  name: string;
  username: string;
  roles: string[];
  location: string;
  locationLink?: string;
  email: string;
  aboutParagraphs: string[];
  socials: {
    name: string;
    url: string;
  }[];
  resumeUrl: string;
  resumeFilename: string;
}

export const profileData: ProfileData = {
  title: "TermiFolio",
  name: "Your Name",
  username: "username",
  roles: [
    "Software Engineer",
    "Full-Stack Developer",
    "Creative Coder",
    "Your Custom Role"
  ],
  location: "City, State, Country",
  locationLink: "#",
  email: "your.email@example.com",
  aboutParagraphs: [
    "Welcome to your portfolio! This is the first paragraph of your introduction. Use this space to give a high-level overview of who you are, what you specialize in, and what drives your engineering passion. Keep it engaging to make a great first impression!",
    "This is your second introduction paragraph. You can describe your deep technical expertise, favorite languages, frameworks, databases, and the kinds of scalable architectures you love to design (e.g., microservices, frontend design systems, or cloud infrastructures).",
    "This is your third paragraph. Share your community contributions, open-source projects, hackathon achievements, public speaking, technical writing, or how you collaborate within a dynamic engineering team.",
    "This is your fourth paragraph. Tell visitors about your hobbies outside of programming—whether you love hiking, reading sci-fi, sketching, playing musical instruments, or learning new languages. Show your creative side!"
  ],
  socials: [
    {
      name: "GitHub",
      url: "#"
    },
    {
      name: "LinkedIn",
      url: "#"
    },
    {
      name: "Instagram",
      url: "#"
    }
  ],
  resumeUrl: "/resume.pdf",
  resumeFilename: "resume.pdf"
};
