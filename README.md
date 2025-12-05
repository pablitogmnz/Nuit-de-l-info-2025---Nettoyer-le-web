<p align="center">
  <img src="assets/logo_grand_platon.png" alt="Logo Platon Formation" height="150" style="margin: 0 30px;" />
  <img src="assets/logo_ndi.png" alt="Logo Nuit de l'Info" height="150" style="margin: 0 30px;" />
</p>

<p align="center">
  <strong>Nettoyez le web comme VOUS l'entendez !</strong><br>
  Projet Nuit de l'Info 2025 par la Team <strong>FC PHP MAFIA</strong>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blueviolet.svg?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Chrome-Extension-google.svg?style=for-the-badge" alt="Chrome Extension">
  <img src="https://img.shields.io/badge/Made%20with-Vanilla%20JS-f7df1e.svg?style=for-the-badge" alt="Vanilla JS">
</p>

## 📸 Aperçu de l'Interface

<p align="center">
    <img src="assets/screenshot_1.png" alt="Menu Principal" height="300"/>
    <img src="assets/screenshot_2.png" alt="Options" height="300" style="margin: 0 10px;"/>
    <img src="assets/screenshot_3.png" alt="Zoom Mode" height="300" style="margin: 0 10px;"/>
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

## ✨ Fonctionnalités Détaillées

Cette extension repose sur deux modes principaux et une suite d'outils avancés pour redonner le contrôle à l'utilisateur.

### 🧹 1. Le Mode Nettoyage (Switch Principal)
C'est le cœur de l'extension. Il permet de supprimer définitivement les nuisances visuelles.
* **Fonctionnement :** Activez le switch. Les éléments survolés s'encadrent en **ROUGE**.
* **Action :** Un simple clic pulvérise l'élément (publicité, bannière cookie, pop-up, menu inutile).
* **Persistance :** L'extension possède une mémoire. Si vous nettoyez *Wikipedia* aujourd'hui, il sera toujours propre demain.

### 🔍 2. Le Mode Loupe (Accessibilité)
Pensé pour faciliter la lecture sans modifier la mise en page globale du site.
* **Fonctionnement :** Activez-le dans le menu "Plus d'options". Les éléments s'encadrent en **BLEU**.
* **Action :** Cliquez sur un paragraphe, une image ou un tableau. L'élément s'agrandit (**x1.2**) et passe au premier plan avec un fond blanc pour une lisibilité parfaite.
* **Annulation :** Un second clic remet l'élément à sa taille normale.

### 🎛️ 3. Les Outils Avancés
Cachés dans le menu tiroir pour ne pas surcharger l'interface :

* **👻 Voir les zones masquées :**
    * Vous avez supprimé un élément par erreur ? Pas de panique.
    * Cochez la case "Plus d'options > Voir zones masquées" pour faire réapparaître les éléments supprimés en **transparence (fantôme)**.
    
* **⚖️ Comparaison Avant / Après :**
    * Un bouton unique pour désactiver instantanément tous les effets de l'extension.
    * Idéal pour montrer la différence entre le site "pollué" d'origine et votre version propre.

* **⏸️ Pause Temporaire :**
    * Désactivez le nettoyage le temps d'une session sans perdre vos configurations sauvegardées.

---

Projet réalisé avec ❤️ et beaucoup de ☕ durant la Nuit de l'Info 2025.

Team : FC PHP MAFIA

GIMENEZ Paul et ELOIRE Mathis de l'IUT Informatique de Bayonne et du Pays-Basque.