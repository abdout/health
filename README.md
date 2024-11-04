<div align="center"> <br /> <a href="https://databayt.com" target="_blank"> <img src="/public/readme/head.png" alt="Project Banner"> </a> <br /> <div> <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="Next.js" /> <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" /> <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="TailwindCSS" /> <img src="https://img.shields.io/badge/-ShadCN-black?style=for-the-badge&logoColor=white&color=3178C6" alt="ShadCN" /> <img src="https://img.shields.io/badge/-Resend-black?style=for-the-badge&logoColor=white&color=24ae7c" alt="Resend" /> <img src="https://img.shields.io/badge/-AuthJS-black?style=for-the-badge&logoColor=white&color=1d1f21" alt="AuthJS" /> </div> <h3 align="center">Databayt HealthCare Automation System</h3> <div align="center"> Databayt's mission is to streamline business processes by creating a modular, open-source automation platform. </div> </div>
📋 <a name="table">Table of Contents</a>
🤖 Introduction
⚙️ Tech Stack
🔋 Features
🤸 Quick Start
🛠️ Snippets (Code to Copy)
🔗 Assets
🚀 Additional Resources
<a name="introduction">🤖 Introduction</a>
Databayt is pioneering the future of business automation. Our healthcare management system exemplifies Databayt’s vision by enabling patients to register, book, and manage appointments while providing administrators with powerful scheduling tools—all in a modular and reusable architecture.

We aim to create reusable components and tools, so businesses can build unique applications that evolve with their needs. Our platform functions as both an automation solution and a collaborative ecosystem, driving productivity and innovation.

<a name="tech-stack">⚙️ Tech Stack</a>
Next.js - Scalable framework for server-rendered React applications.
React - Core JavaScript library for building user interfaces.
TypeScript - Typed JavaScript to enhance code reliability.
MongoDB - NoSQL database optimized for performance and scalability.
TailwindCSS - Utility-first CSS framework for rapid UI development.
ShadCN - UI components tailored for modern web development.
Zod - TypeScript-first schema declaration and validation library.
React-Hook-Form - React library for managing forms and validation.
Resend - API-first email service for reliable communications.
AuthJS - Authentication framework for secure user management.
Prettier - Code formatting tool for consistent code styling.
Figma - Design tool for UI/UX prototyping.
Framer Motion - Animation library for interactive experiences.
<a name="features">🔋 Features</a>
Patient and Appointment Management
User Registration: Create a patient profile and manage appointments.
Appointment Scheduling: Book appointments with preferred physicians.
Admin Control Panel: Comprehensive dashboard for administrators to manage appointments.
Communication and Notification
Email Notifications (Powered by Resend): Confirm, update, and cancel appointments with automated email notifications.
Secure Authentication: User management and authentication using AuthJS.
Enhanced User Experience
Complete Responsiveness: Optimized for desktop and mobile viewing.
TailwindCSS and ShadCN: Ensures visually appealing and consistent design.
File Upload with Appwrite: Secure file handling and storage.
Monitoring and Performance
Application Monitoring: Track and optimize application performance.
Reusable Components: Modular architecture for rapid development and scalability.
<a name="quick-start">🤸 Quick Start</a>
Follow these steps to set up the project locally.

Prerequisites
Ensure the following tools are installed:

Git
Node.js
npm
Cloning the Repository
bash
Copy code
git clone https://github.com/databayt/healthcare.git
cd healthcare
Installation
Install dependencies using npm:

bash
Copy code
npm install
Set Up Environment Variables
Create a new .env.local file in the project root and add the following variables:

env
Copy code
# Appwrite
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

# Databayt System
NEXT_PUBLIC_ADMIN_PASSKEY=111111
Replace placeholders with your actual credentials. Visit Appwrite for setup details.

Running the Project
bash
Copy code
npm run dev
Open http://localhost:3000 in your browser.

<a name="snippets">🛠️ Snippets</a>
<details> <summary><code>tailwind.config.ts</code></summary>
typescript
Copy code
// Example configuration for Tailwind CSS
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#24AE7C",
        secondary: "#3178C6",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
</details> <details> <summary><code>app/globals.css</code></summary>
css
Copy code
/* Global CSS configurations using TailwindCSS */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom Styles */
.bg-custom { @apply bg-gray-900; }
.text-custom { @apply text-primary; }
</details>
<a name="links">🔗 Assets</a>
Access public assets for the project here.

<a name="resources">🚀 Additional Resources</a>
Level Up Your Skills with Databayt’s Expert Training Program

Ready to enhance your skills? Explore our expert training program and master advanced techniques in Next.js, React, and full-stack automation development. Join us to unlock a new level of expertise in web development and automation.

<a href="https://databayt.com/expert-training" target="_blank"> <img src="https://github.com/databayt/branding/assets/expert-training.png" alt="Expert Training Banner"> </a>