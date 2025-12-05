<p align="center">
  <img src="assets/logo_grand_platon.png" alt="Logo Platon Formation" width="150" style="margin: 0 30px;" />
  <img src="assets/logo_ndi.png" alt="Logo NDI 2025" width="150" style="margin: 0 30px;" />
</p>

<p align="center">
  <strong>Nettoyez le web comme VOUS l'entendez !</strong><br>
  Projet Nuit de l'Info 2025 par GIMENEZ Paul et ELOIRE Mathis de la Team <strong>FC PHP MAFIA</strong>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blueviolet.svg?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Chrome-Extension-google.svg?style=for-the-badge" alt="Chrome Extension">
  <img src="https://img.shields.io/badge/Made%20with-Vanilla%20JS-f7df1e.svg?style=for-the-badge" alt="Vanilla JS">
</p>

## 📸 Aperçu de l'Interface

<p align="center">
    <img src="assets/screenshot_1.png" alt="Menu Principal" width="200"/>
    <img src="assets/screenshot_2.png" alt="Options" width="200"/>
    <img src="assets/screenshot_3.png" alt="Zoom Mode" width="200"/>
</p>

---

## ✨ Guide d'installation

### 🎯 1. Télécharger le projet 

## 💻 Architecture Technique

Le projet est construit en **Vanilla JS** (Javascript pur) pour garantir une légèreté maximale et aucune dépendance externe.

```text
platon-web-cleaner/
├── manifest.json            # Configuration Manifest V3
├── assets/                  # Logos et Images
├── interface/               # Le Front-End (Popup & Dashboard)
│   ├── menu.html            # Structure HTML (Vues coulissantes)
│   ├── menu.css             # Styles CSS (Design System)
│   ├── menu.js              # Logique UI & Communication
│   ├── parametres.html      # Tableau de bord de gestion
│   └── style-injection.css  # CSS injecté sur les pages (Cadres, Anim)
└── logique/                 # Le Back-End (Script injecté)
    └── nettoyeur.js         # Moteur de sélection, Stockage & Algorithme