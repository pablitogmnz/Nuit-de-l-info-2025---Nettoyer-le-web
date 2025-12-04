# 🧹 Platon Web Cleaner

> **Défi Nuit de l'Info 2025** : "Nettoyez le web comme VOUS l'entendez !"
> **Team :** FC PHP MAFIA

![Version](https://img.shields.io/badge/version-1.0.0-blueviolet.svg?style=for-the-badge) ![Chrome](https://img.shields.io/badge/Chrome-Extension-google.svg?style=for-the-badge) ![Tech](https://img.shields.io/badge/Made%20with-Vanilla%20JS-yellow.svg?style=for-the-badge)

**Platon Web Cleaner** redéfinit votre expérience de navigation. Plus qu'un simple bloqueur, c'est un outil de remodelage qui vous permet de supprimer les nuisances visuelles, de zoomer sur l'essentiel et de sauvegarder vos préférences par site.

---

## 📸 Aperçu de l'Interface

| Menu Principal | Options Avancées | Mode Loupe (Zoom) |
|:---:|:---:|:---:|
| <img src="assets/demo-menu.png" alt="Menu Principal" width="200"/> | <img src="assets/demo-options.png" alt="Options" width="200"/> | <img src="assets/demo-zoom.png" alt="Zoom Mode" width="200"/> |
> *(Pensez à ajouter vos propres captures d'écran dans le dossier assets/)*

---

## ✨ Fonctionnalités

### 🎯 1. Nettoyage Chirurgical (Core)
* **Sélection Visuelle :** Un mode "Viseur" met en surbrillance les éléments au survol (Cadre Rouge).
* **Suppression Fluide :** Un clic supprime l'élément (pub, bannière, pop-up) avec une animation de désintégration.
* **Persistance Intelligente :** L'extension mémorise vos choix par domaine. Revenez demain, la page sera toujours propre.

### 🔍 2. Mode Loupe (Accessibilité)
* **Zoom au clic :** Transforme le curseur en loupe.
* **Focus :** Cliquez sur un texte ou une image illisible pour l'agrandir (x1.2) et le mettre au premier plan (Cadre Bleu).

### 🎛️ 3. Le Menu "Plus d'options"
Une interface coulissante (Slide-in) inspirée des applications mobiles permet d'accéder aux outils bonus :
* **👻 Vision "Rayons X" :** Révèle les zones masquées en semi-transparence (contour violet) pour les retrouver facilement.
* **⚖️ Mode Avant / Après :** Un bouton unique pour comparer instantanément la page originale et votre version.
* **⏸️ Pause Temporaire :** Désactivez le nettoyage le temps d'une session sans perdre vos règles.

### 🎨 4. UX/UI Soignée
* **Navigation Fluide :** Système de "Vues" qui glissent latéralement.
* **Design System :** Respect de la charte graphique Platon Formation (Violet/Blanc/Gris).
* **Tableau de Bord :** Une page dédiée pleine page pour gérer et supprimer les règles de chaque site.

---

## 🛠️ Installation & Test

Cette extension respecte les standards **Manifest V3** de Google Chrome.

1.  Téléchargez ce projet.
2.  Ouvrez Google Chrome et allez sur l'URL : `chrome://extensions`.
3.  Activez le **Mode développeur** (bouton switch en haut à droite).
4.  Cliquez sur **Charger l'extension non empaquetée** (Load unpacked).
5.  Sélectionnez le dossier racine du projet `platon-web-cleaner`.
6.  **Important :** Allez sur un site web (ex: Wikipedia) et rafraîchissez la page (`F5`) pour activer le script.

---

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