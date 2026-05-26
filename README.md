# ✿ Naina's Digital Garden - Developer Portfolio ✿

Welcome to **Naina's Digital Garden**, a premium, highly-interactive, and aesthetically stunning developer portfolio. Designed with a soft "floral" theme and high-impact visual interactions, it blends a beautiful glassmorphism UI with powerful administrative capabilities and seamless MongoDB data persistence.

## 🌟 Key Features

- **Cinematic Loading Screen**: A visually stunning 4-second entrance featuring a fully synchronized, 3D rotating glassmorphism flower bloom and a live 0-100% progress counter.
- **Floral & Glassmorphism UI**: Beautiful petal animations, soft color palettes, ambient glowing backgrounds, and buttery-smooth 60fps transitions using Framer Motion.
- **MongoDB Persistence**: All data—including projects, skills, site configurations, and contact messages—is fully persisted to MongoDB Atlas for real-time production deployment.
- **Dynamic Admin Dashboard**: Manage everything without touching code! Access the secure `/admin` route to add/edit projects, sync GitHub repositories, update your skills, and read messages. Fully responsive on mobile!
- **Rich Project Management**: Projects feature auto-playing infinite image slideshows, pinned project capabilities, and options to conditionally hide source code access for private client work. Admin tables feature direct image previews and descriptions.
- **GitHub Sync**: Automatically pull the latest `README.md` files for your projects and sync their metadata directly from GitHub.
- **Web3Forms Contact Integration**: Seamlessly receive emails and store messages in MongoDB when users reach out via the secure contact form.
- **LeetCode Integration**: Automatically fetch and display your live LeetCode stats (like total problems solved).

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Markdown Rendering**: `react-markdown` with `remark-gfm` for beautiful GitHub README display.

## 🚀 Getting Started

First, install the dependencies:
```bash
npm install
```

Set up your `.env.local` file with the required credentials:
```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio
# Admin Initial Setup (Only needed for first-time MongoDB seeding)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
MASTER_USERNAME=your_master_username
MASTER_PASSWORD=your_master_password
# Email/OTP Settings (For Admin 2FA)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
# Web3Forms Contact Key
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_key
```

Then, run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio in action.

## 🔐 Admin Access
Navigate to `/admin` in your browser. Admin credentials are securely stored and verified against MongoDB using PBKDF2 cryptography.

**Initial Seeding:** On your very first login attempt, if the database is empty, the system will automatically seed your MongoDB collections using the credentials and initial data structures defined in your `.env.local` and application settings.

**OTP Verification & Fallback:** To log in securely, an OTP is generated:
1. It is sent via email using the SMTP settings (`EMAIL_USER`, `EMAIL_PASS`) in `.env.local`.
2. If email sending fails or is not configured, the system falls back gracefully, showing a warning in the UI, and logs the secure OTP code directly to the server terminal console so you are never locked out of your own site.

---
*"Great things are not done by impulse, but by a series of small things brought together." - Vincent van Gogh*
