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

Cette extension n'étant pas encore sur le Chrome Web Store, elle doit être installée en **mode développeur**. C'est très simple et prend moins d'une minute.

### 🎯 1. Préparation
1.  **Téléchargez** le code source de ce projet (Zip ou `git clone`).
2.  Décompressez le dossier si nécessaire.

### 🔧 2. Installation dans Chrome
1.  Ouvrez Google Chrome.
2.  Dans la barre d'adresse, tapez : `chrome://extensions` et validez.
3.  En haut à droite, activez le bouton **Mode développeur** (le switch doit être bleu).
4.  Cliquez sur le bouton **Charger l'extension non empaquetée** (en haut à gauche).
5.  Sélectionnez le dossier **racine** du projet (`platon-web-cleaner`) qui contient le fichier `manifest.json`.

📌 **Astuce :** Cliquez sur l'icône "Puzzle" 🧩 en haut à droite de votre navigateur et épinglez **Platon Formation** pour l'avoir toujours sous la main.

---

## 🧪 Comment tester l'extension ?

⚠️ **Important :** Les extensions ne fonctionnent pas sur les pages système de Chrome (comme l'accueil vide ou les paramètres).

1.  **Allez sur un vrai site web** (ex: [Wikipedia](https://fr.wikipedia.org/), [Le Monde](https://www.lemonde.fr/), ou n'importe quel site avec du contenu).
2.  **Rafraîchissez la page (Touche F5)**. *C'est indispensable la première fois pour charger le script.*
3.  Ouvrez l'extension Platon.
4.  Activez le **Mode Nettoyage** (le switch devient violet).
5.  Passez votre souris sur la page : les éléments s'encadrent en **Rouge**.
6.  **Cliquez** pour supprimer un élément !

### 🕵️ Tester les Bonus
1.  Dans le menu de l'extension, cliquez sur **"Plus d'options >"**.
2.  Activez le **Mode Loupe** : le cadre devient **Bleu**. Cliquez sur un texte pour l'agrandir.
3.  Cochez **Voir zones masquées** pour voir en transparence ce que vous avez supprimé.

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