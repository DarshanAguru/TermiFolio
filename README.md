# TermiFolio: Modern Terminal-Themed Developer Portfolio Template

Welcome to **TermiFolio**! This is a generic, highly dynamic, single-page creative coder portfolio template built with **Next.js, TypeScript, Tailwind CSS, and Framer Motion**. It features an immersive interactive command-line terminal alongside a gorgeous, responsive, glassmorphic visual graphical user interface.

Anyone can customize and build their own premium terminal-themed website with **minimal to no coding effort** by simply updating a few static data files!

---

## 🚀 Key Features

*   **Dual Interactive UI**: Seamlessly switch between a premium glassmorphic visual web layout and a retro-modern fully functional command-line terminal.
*   **Immersive Terminal Experience**: Support for natural navigation (`cd`, `ls`, `cat`), tab/autocomplete predictions (triggered via `Esc` key), background file downloader (`download`), helpers, and responsive multi-line outputs.
*   **Flat & Symlink-Free Structure**: **Zero broken paths or link caches!** The project directory has been completely flattened to use standard native `/app`, `/data`, and `/public` folders directly in the root of the project. Works flawlessly across all operating systems (Linux, macOS, and Windows) out of the box.
*   **Decoupled Dynamic Skills Dispatcher**: **No raw React imports in data files!** Type your skill (e.g. `"Java"`, `"FastAPI"`, `"AWS"`), and the portfolio automatically resolves it to a matching icon. If the technology is not yet indexed in our icon dictionary, it automatically compiles a sleek cyan-glowing initials badge (e.g. `"Kubernetes"` ➔ `"KU"`).
*   **Obsidian Experience & Credentials**: Interactive Obsidian-style timelines for work history and dynamic badges for valid certifications.
*   **Dynamic Gradient Fallback Avatars**: **Zero Broken Images!** If you do not have logo files uploaded yet, the application automatically computes employer/issuer initials and renders a beautiful CSS radial-gradient fallback badge, keeping the UI flawless at all times.
*   **Same-Page Redirects**: All external redirection URLs inside configuration data files are standardly set to `"#"`, keeping visitors engaged inside the active portfolio page.
*   **Responsive layouts**: Perfect display fidelity across mobile viewports, tablet screens, and desktop monitors.

---

## 🛠️ How to Customize Your Portfolio (in 2 Minutes)

We have placed a **direct native configuration directory in the root of the project** called `/data/`. 

To edit your text and populate your personal information, simply open the `/data` folder in the root and edit these files:

### 1. Global Profile Details (`data/profileData.ts`)
Controls your name, website title, typewriter carousel roles, contact details, bio, and social handles:
```typescript
export const profileData: ProfileData = {
  title: "TermiFolio", // Set the customizable name of your portfolio website
  name: "Your Name",
  username: "username", // Used in your terminal shell prompt: username@portfolio
  roles: ["Software Engineer", "Full-Stack Developer", "Creative Coder"],
  location: "City, Country",
  locationLink: "#", // Set to "#" to redirect to the same page
  email: "your.email@example.com",
  aboutParagraphs: [
    "First paragraph: Introduction & engineering passion...",
    "Second paragraph: Scalable backends, favorite frameworks...",
    "Third paragraph: Open-source contributions, teamwork philosophy...",
    "Fourth paragraph: Hobbies, sci-fi novels, traveling..."
  ],
  socials: [
    { name: "GitHub", url: "#" },
    { name: "LinkedIn", url: "#" }
  ],
  resumeUrl: "#", // Path to your resume PDF in the public folder, or "#"
  resumeFilename: "Your_Resume.pdf" // Downloader output name
};
```

### 2. Work History Timeline (`data/experienceData.tsx`)
Add as many work experience items as you like. We support company logos or dynamic fallbacks:
```typescript
export const experienceData: Experience[] = [
  {
    role: "Your Role Title 1 (e.g. Senior Software Engineer)",
    org: "Company Name 1",
    from: "15 Jan 2024",
    to: "Present",
    location: "City, Country",
    type: "Full-time",
    locationType: "Hybrid",
    logo: "/companyLogos/logo.png", // Path in public/companyLogos/, or leave empty "" for gradient fallback initials!
    desc: [
      "Highlight your impact: Developed system that reduced latency by **35%**.",
      "Spearheaded database query optimization..."
    ]
  }
];
```

### 3. Certifications Badge List (`data/certificationsData.tsx`)
Configure your industry credentials and licenses:
```typescript
export const certifications: Certification[] = [
  {
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    description: 'Validates expertise in designing secure, resilient, high-performance distributed systems.',
    link: '#',
    logo: '/certsLogo/AWS_SA.png', // Path in public/certsLogo/, or leave empty "" for fallback
    from: 'June 2025',
    to: 'June 2028'
  }
];
```

### 4. Technical Skills Categories (`data/skillsData.tsx`)
Group your programming languages, frameworks, and dev tools. Icon resolution runs dynamically based on the skill `name` parameter:
```typescript
export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    description: 'The core languages used to compile and build systems.',
    skills: [
      { name: 'Java', url: "#", isCore: true }, // Custom dispatcher resolves this to a Java icon automatically!
      { name: 'Kotlin', url: "#", isCore: true } // Resolves to initials badge "KO" if icon not present!
    ]
  }
];
```

### 5. Projects Showcase (`data/projectData.tsx`)
List your code repositories, design challenges, and deep-dive technical achievements:
```typescript
export const projects: Project[] = [
  {
    title: 'Project1', // Single-word title is best for terminal route navigation (e.g. cd Project1)
    description: 'This is a brief, one-sentence description.',
    about: 'Detailed technical deep-dive into the architectural mechanics.',
    challenges: [
      "Outline technical challenge 1 and how you solved it.",
      "Outline technical challenge 2..."
    ],
    image: '', // Leave empty to display a clean terminal mockup card!
    techStack: ['Language1', 'Framework1', 'Database1'],
    link: '#' // Set to "#" to keep on the same page
  }
];
```

---

## 📂 Asset Placement Guide

To keep the template pristine, please upload your custom static assets into the following directories under the `/public` root:
*   **Resume PDF**: Put your resume document in `/public/resume.pdf` (make sure it matches `resumeUrl` in `profileData.ts`).
*   **Company Logos**: Put company experience images inside `/public/companyLogos/` (e.g., `/public/companyLogos/logo.png`).
*   **Certification Logos**: Put issuer badges inside `/public/certsLogo/` (e.g., `/public/certsLogo/AWS_SA.png`).
*   **Project Screenshots**: Put project screenshot images inside `/public/githubProjImgs/` (e.g., `/public/githubProjImgs/screenshot.png`).

---

## 💻 Commands

### Run the development server
To launch the project locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

### Build and Package
To compile a fully optimized production bundle:
```bash
npm run build
```

---

## 👨‍💻 Credits & Attribution

This template is based on the original concept, design, and implementation created by:
*   **Aguru Darshan** ➔ [GitHub Profile](https://github.com/AguruDarshan) | [Portfolio](https://thisdarshiii.in)

If you use or adapt this portfolio, please maintain this credit attribution to acknowledge their design work!

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](file:///home/darshan/Projects/DarshanPortfolio/LICENSE) file for details.
