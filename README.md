# 🎓 UniversityFinder

> A modern web application to discover, view, and book information about colleges and universities. Built with React, TypeScript, Firebase, and TailwindCSS.

🔗 [Live Site](https://collegefinder19.netlify.app/)
📦 [GitHub Repository](https://github.com/istiak19/CollegeFinder-frontend)

---

## 📚 Table of Contents

* [Introduction](#introduction)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Configuration](#configuration)
* [Examples](#examples)
* [Troubleshooting](#troubleshooting)
* [Contributors](#contributors)
* [License](#license)

---

## 🧠 Introduction

**UniversityFinder** is a dynamic college booking and discovery platform. It helps students browse available colleges, explore their features, and submit applications — all in one streamlined interface. Built with performance, responsiveness, and accessibility in mind.

---

## ✨ Features

* 🔍 Browse a list of colleges with filtering options
* 📝 College application submission form with validation
* 📸 Image galleries for each university
* 🔔 Real-time notifications via `react-toastify`
* 🔥 Firebase-based backend integration
* 🎨 Modern UI with TailwindCSS & Framer Motion animations
* 📦 Fully type-safe with Zod and TypeScript

---

## 🛠️ Tech Stack

### Frontend

* **React 19**
* **TypeScript**
* **TailwindCSS**
* **Vite** (for blazing fast builds and development)
* **React Router v7**
* **React Hook Form** + **Zod** for form handling and validation
* **React Query** for data fetching and caching
* **Framer Motion** for animations
* **Swiper** for image carousels

### Backend & Hosting

* **Firebase** (authentication, Firestore, etc.)
* **Netlify** (deployment)

### Tooling

* **ESLint** for linting
* **Prettier** recommended for formatting
* **TypeScript ESLint Plugin**
* **Vite Plugin React**

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/istiak19/CollegeFinder-frontend.git
cd CollegeFinder-frontend
npm install
```

---

## 🚀 Usage

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint the Codebase

```bash
npm run lint
```

---

## ⚙️ Configuration

To use Firebase and other environment-based features, create a `.env` file in the root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> Replace placeholders with your actual Firebase credentials.

---

## 💡 Examples

* View colleges list: `/colleges`
* Submit an application: `/apply/:collegeId`
* Authenticated user dashboard (requires login)

---

## 🛠️ Troubleshooting

* **Firebase not working?**

  * Double-check your `.env` setup.
  * Make sure Firebase services are enabled in the console.

* **Styling not applied?**

  * Ensure Tailwind is properly configured and postcss plugins are installed.

---

## 👨‍💻 Contributors

* [istiak19](https://github.com/istiak19) – Creator & Maintainer