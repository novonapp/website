<div align="center">
  <img src="public/logo.png" alt="Novon logo" width="120" />
  <h1>Novon Documentation</h1>
  <p>The high-performance, high-fidelity documentation engine for the Novon ecosystem.</p>
  <p>
    <img alt="Framework" src="https://img.shields.io/badge/Next.js-15.x-000000?style=for-the-badge&logo=nextdotjs" />
    <img alt="UI" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
    <img alt="Theme" src="https://img.shields.io/badge/Obsidian-Theme-2C2C32?style=for-the-badge" />
  </p>
</div>

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Content Management](#content-management)
- [License](#license)


---

## Overview

This repository contains the source code for the official Novon Documentation website. Built with **Next.js 15** and **MDX**, it provides a lightning-fast, highly readable experience for developers and users alike.


This site features a premium obsidian-toned dark mode with high-contrast typography, subtle glassmorphism, and smooth interactive transitions.


## Core Features

-   **High-Fidelity Obsidian Theme**: A custom-built CSS design system inspired by modern dark-mode aesthetics.
-   **Weighted Fuzzy Search**: A custom-built search engine (`src/lib/docs-search.ts`) with typo tolerance and relevance scoring.
-   **Global Shortcuts**: Seamless navigation with `Ctrl + K` (Search) and full keyboard accessibility.
-   **Static-First Architecture**: Powered by MDX for rich content with zero runtime overhead in production.
-   **Code Purification**: A 100% comment-free production codebase for maximum clarity and minimized footprint.

## Technology Stack

-   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
-   **Logic**: React 19 / TypeScript
-   **Styling**: Pure CSS (Modern Variables & Custom Design System)

-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Syntax Highlighting**: [Shiki](https://shiki.style/) (GitHub Dark Dimmed)
-   **Markdown**: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)

## Project Structure

```text
src/
├── app/              # Next.js App Router (Layouts, Docs Pages, Global Styles)
├── components/       # UI Components (Header, SearchModal, Sidebar, MDX)
├── content/          # Source MDX documentation files
│   └── docs/         # Hierarchical guides, API refs, and FAQs
├── lib/              # Core logic (Docs processing, Fuzzy search engine)
└── public/           # Static assets (Logos, App Mockups)
```

## Getting Started

### Prerequisites

-   Node.js 20+
-   npm / pnpm / yarn

### Installation

```bash
# Clone the repository and navigate to docs
cd docs

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The site will be available at `http://localhost:3000`.

### Build

```bash
# Generate the production bundle
npm run build
```

## Content Management

Adding documentation is as simple as creating a new `.mdx` file in `src/content/docs`.

1.  Create your file (e.g., `src/content/docs/guides/new-feature.mdx`).
2.  Add the required Frontmatter:
    ```markdown
    ---
    title: New Feature
    description: A description of the new feature.
    ---
    ```
3.  Update `src/lib/docs-data.ts` to include the relative path in the Sidebar configuration.



## License

Licensed under the Apache License 2.0. See [LICENSE](file:///LICENSE) for full details.
