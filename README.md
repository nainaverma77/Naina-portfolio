# ✿ Naina's Digital Garden - Developer Portfolio ✿

Welcome to **Naina's Digital Garden**, a premium, highly-interactive, and aesthetic developer portfolio. Designed with a soft "floral" theme, it blends a beautiful glassmorphism UI with powerful administrative capabilities and seamless Github syncing.

## 🌟 Key Features

- **Floral & Glassmorphism UI**: Beautiful petal animations, soft color palettes (rose gold, neon cyan, soft pinks), and smooth transitions using Framer Motion.
- **Dynamic Admin Dashboard**: Manage everything without touching code! Access the secure `/admin` route to add/edit projects, sync GitHub repositories, update your skills, and manage education details.
- **Infinite Image Gallery**: Showcase your UI! Projects can feature a seamless, auto-playing image slideshow directly inside the beautifully crafted Project Details modal.
- **GitHub Sync**: Automatically pull the latest README.md files for your projects and sync their metadata directly from GitHub.
- **Project Pinning & Lockdown**: Pin your most important projects to the top, and conditionally hide source code access for private client work.
- **LeetCode Integration**: Automatically fetch and display your live LeetCode stats (like total problems solved).
- **Fully Responsive**: Crafted with Tailwind CSS to ensure a pixel-perfect experience across desktop, tablet, and mobile devices.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Markdown Rendering**: `react-markdown` with `remark-gfm` for beautiful GitHub README display.

## 🚀 Getting Started

First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio in action.

### Admin Access
Navigate to `/admin` in your browser. Admin credentials are securely stored and verified against MongoDB using PBKDF2 cryptography.

#### Initial Seeding
On your very first login attempt, if the `admins` collection in MongoDB is empty, the system will automatically seed it using the credentials defined in your `.env.local` file:
```env
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
MASTER_USERNAME=your_master_username
MASTER_PASSWORD=your_master_password
```

All subsequent logins will verify against the database records.

#### OTP Verification & Fallback
To log in securely, an OTP is generated:
1. It is sent via email using the SMTP settings (`EMAIL_USER`, `EMAIL_PASS`) in `.env.local`.
2. If email sending fails or is not configured, the system falls back gracefully, showing a warning in the UI, and logs the secure OTP code directly to the server terminal console (where `npm run dev` is running) so you can still log in instantly.

## 🎨 Customization
Most data (Skills, Projects, Bio, etc.) is persistently stored and read from `src/data/portfolio.json`. You can safely modify this from the Admin Panel, or edit the JSON manually.

---
*"Great things are not done by impulse, but by a series of small things brought together." - Vincent van Gogh*
