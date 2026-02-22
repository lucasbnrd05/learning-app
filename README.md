# 🧠 Buzzcut Learning | Spaced Repetition PWA

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

**Buzzcut Learning** is a lightweight, offline-first Progressive Web App (PWA) designed to help you learn vocabulary, languages, and programming concepts efficiently using the **Leitner System** (spaced repetition).

🌐 **Live Demo:** [learning.lucasbernardeau.fr](https://learning.lucasbernardeau.fr)

---

## ✨ Features

- **Time-Based Leitner Algorithm:** Cards are scheduled based on your retention success (Immediate, 1 day, 3 days, 1 week, 2 weeks). Failed cards reset to Box 1 instantly.
- **Custom Decks (Folders):** Categorize your flashcards into specific subjects (e.g., English, C++, Embedded Systems) to avoid mixing contexts.
- **100% Offline (PWA):** Fully installable on iOS and Android. Uses a `Service Worker` to cache assets and run perfectly without an internet connection.
- **Frictionless Data Sync:** No database required. Export your decks as a JSON file and import them on another device to seamlessly sync your progress between your PC and your phone.
- **Vanilla Architecture:** Built entirely with pure HTML, CSS, and JavaScript. No heavy frameworks, ensuring blazing-fast load times and minimal battery consumption.

## 📱 How to Install (Mobile)

Because it's a PWA, you can install it directly from your browser like a native app:

**On iOS (Safari):**
1. Open the live demo link.
2. Tap the "Share" icon at the bottom.
3. Scroll down and tap **"Add to Home Screen"**.

**On Android (Chrome):**
1. Open the live demo link.
2. Tap the three dots menu (top right).
3. Tap **"Install app"** or **"Add to Home screen"**.

## 🔄 How to Sync Data (PC <-> Phone)

Your flashcards are securely stored in your browser's `LocalStorage`. To move your progress from your computer to your phone (or vice versa):
1. On your PC, click **"Export Data"** (this will download a `.json` file).
2. Send this file to your phone (via AirDrop, email, Discord, etc.).
3. Open the app on your phone, click **"Import Data"**, and select the `.json` file. 

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Storage:** Web Storage API (`LocalStorage`).
- **PWA Capabilities:** `manifest.json` and custom Service Worker (`sw.js`).
- **Icons:** FontAwesome.

---
*Designed & Developed by [Lucas Bernardeau](https://lucasbernardeau.fr)*
