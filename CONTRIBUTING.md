# Contributing to TermiFolio

Thank you for your interest in contributing to **TermiFolio**! We welcome open-source developers, designers, and creative coders of all skill levels to help polish, extend, and build the premium terminal-themed creative developer portfolio template.

By participating in this project, you agree to abide by our [Code of Conduct](file:///home/darshan/Projects/DarshanPortfolio/CODE_OF_CONDUCT.md).

---

## 🛠️ How Can I Contribute?

### 1. Reporting Bugs
*   Search the open issues to see if the bug has already been reported.
*   If not, open a new issue detailing the exact steps to reproduce the bug, including your web browser and operating system details.

### 2. Suggesting Enhancements
*   Enhancements are welcome! Open an issue first to discuss major additions or structural changes.
*   Clearly outline the features you would like to introduce and how they improve developer experience.

### 3. Submitting Pull Requests
*   **Fork** the repository and create your feature branch from `main`:
    ```bash
    git checkout -b feature/awesome-feature
    ```
*   Install dependencies and run the local development server:
    ```bash
    npm install
    npm run dev
    ```
*   Ensure that all code is fully type-safe and has zero ESLint warnings.
*   Run the production compiler before opening a PR to verify that the build packages correctly:
    ```bash
    npm run build
    ```
*   Commit your changes using clear, descriptive messages, and submit a PR to our main branch!

---

## 📂 Coding Standards & Architecture

*   **Static Data Isolation**: Absolutely no personal details or custom texts should be hardcoded inside standard page components. All configs belong inside modular typescript modules under `/src/data/`.
*   **DRY Utilities**: Reuse the central helper utilities for image scaling (`imagePlaceholder.tsx`) and technology icon mapping (`iconDispatcher.tsx`).
*   **CSS Style Tokens**: Custom themes should be defined centrally in `src/app/globals.css` using standard Tailwind CSS classes or core CSS tokens rather than ad-hoc inline styles.
