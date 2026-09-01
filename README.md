# 🌉 Bridge Structural Health Monitoring (Bridge Sense)

> **Machine Learning Structural Observation & Anomaly Detection Prototype**  
> *Fully configured and deployment-ready for Vercel.*

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployment%20Ready-black?logo=vercel)](https://vercel.com)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)

---

## 👥 Project Team Members

This project was built and designed by:

* **Pranav Srikrishnan** — *Team Lead & ML Architect* (XGBoost Telemetry Engine & System Design)
* **Akshita Sabat** — *Full-Stack & Frontend Engineer* (Interactive UI, Visual Analytics & Dashboards)
* **Yash Sawant** — *Structural & CAD Simulation Lead* (3D Bridge CAD Visualizer & Physics Models)
* **Daksh Kamble** — *Data Pipeline & Database Specialist* (Sensor Network Telemetry & CSV Ingestion)
* **Gargi Hosmani** — *Quality & Structural Analytics* (Anomaly Detection & Threshold Engineering)
* **Khushi Gandhi** — *Documentation & UI/UX Specialist* (Technical Dossiers, Reports & User Experience)

---

## 🚀 Live Demo & Key Features

This interactive web application provides continuous structural health monitoring, ML anomaly detection, and parametric 3D visualization.

### 🌟 Core Capabilities
1. **Live Sensor Telemetry Workstation**: Real-time streaming simulation of strain ($\mu\varepsilon$), vibration ($g$), tilt ($\circ$), ambient temperature ($^\circ\text{C}$), and displacement ($\text{mm}$).
2. **Context-Adaptive Normalization**: Dynamic ML baseline normalization accounting for ambient temperature expansion and heavy traffic loads.
3. **XGBoost Structural Anomaly Engine**: Feature importance attribution and anomaly risk calculation for structural deterioration.
4. **3D CAD Bridge Deformation Simulator**: Interactive 3D bridge deck rendering with load stress hotspots and structural scenario simulations.
5. **Regional Bridge Database**: Filterable dataset containing real field bridge profiles, ADT traffic metrics, and age parameters.
6. **Automated Engineering Report Generator**: Instant PDF dossier generation powered by `html2canvas` and `jsPDF`.

---

## ⚡ Deploying to Vercel

This repository is **100% Vercel Ready**. Simply upload to GitHub and connect to Vercel:

### Option A: Via Vercel Dashboard (Recommended)
1. Push this repository to **GitHub**.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..." -> "Project"**.
3. Import your GitHub repository.
4. Vercel will automatically detect **Vite** settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Vercel will deploy your application in under 1 minute!

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

---

## 💻 Local Development Setup

To run this project locally on your system:

### 1. Prerequisites
- **Node.js** (v18.x or higher recommended)
- **npm** or **yarn** / **pnpm**

### 2. Installation
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/Bridge-Dashboard.git

# Navigate to project directory
cd Bridge-Dashboard

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
```
The output files will be compiled cleanly into the `dist/` directory.

---

## 📁 Project Architecture & Directory Layout

```
├── public/                     # Static video and image assets
├── src/
│   ├── api/                    # Simulated API services & backend routes
│   ├── components/             # Reusable UI components & navigation
│   ├── config/                 # Asset metadata & global configurations
│   ├── data/                   # Initial telemetry data & presets
│   ├── models/                 # TypeScript interfaces & types
│   ├── pages/                  # Workspaces (ML, Database, PDF Report)
│   ├── sections/               # Editorial sections & 3D Bridge CAD visualizer
│   ├── services/               # Telemetry, ML Engine & Database providers
│   ├── App.tsx                 # Main application root & view router
│   └── main.tsx                # Entrypoint
├── vercel.json                 # Vercel SPA rewrites & framework configuration
├── vite.config.ts              # Vite & path alias configuration
├── tsconfig.json               # TypeScript compiler options
└── package.json                # Project dependencies & build scripts
```

---

## 📜 License & Copyright

Designed & Developed by **Pranav Srikrishnan, Akshita Sabat, Yash Sawant, Daksh Kamble, Gargi Hosmani, Khushi Gandhi** (2026).# SIHM-Bridge-prototype
