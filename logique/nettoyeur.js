/**
 * PLATON CLEANER - VERSION FINALE STABLE
 * Corrigée : Variable hostname, État initial et Event Listeners
 */

// --- 1. VARIABLES GLOBALES (Définies au début pour éviter les erreurs) ---
const hostname = window.location.hostname; // <--- DÉPLACÉ ICI (CRITIQUE)

let state = {
    isEditing: false,       // <--- REMIS A FALSE (Pour ne pas activer tout seul)
    isPaused: false,
    showHidden: false,
    compareMode: false
};

// --- 2. INITIALISATION ---
(function init() {
    console.log("%c🧹 Platon Cleaner : PRÊT SUR " + hostname, "color: #952E7D; font-weight: bold;");

    // On charge les règles existantes (mais on ne clique pas encore)
    loadAndApplyRules();
    setupMessageListener();
})();

// --- 3. ÉCOUTE DU MENU ---
function setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

        // Le Menu demande : "Tu es allumé ?"
        if (request.action === "GET_STATUS") {
            sendResponse({ isEditing: state.isEditing });
            return;
        }

        console.log("Ordre reçu :", request.action);

        switch (request.action) {
            case "ACTIVER_MODE_EDITION": toggleEditing(true); break;
            case "DESACTIVER_MODE_EDITION": toggleEditing(false); break;
            case "RESET_PAGE_ACTUELLE": resetCurrentSite(); break;
            case "TOGGLE_AVANT_APRES": toggleCompareMode(request.value); break;
            case "TOGGLE_VISUALISER_CACHES": toggleShowHidden(request.value); break;
            case "TOGGLE_PAUSE": togglePause(request.value); break;
        }
    });
}

// --- 4. GESTION DU MODE ÉDITION ---
function toggleEditing(active) {
    state.isEditing = active;

    if (active) {
        console.log("⚡ Mode Édition ACTIVÉ");
        document.body.style.cursor = "crosshair";
        // On ajoute les écouteurs
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);
        document.addEventListener("click", handleClick, true);
    } else {
        console.log("💤 Mode Édition DÉSACTIVÉ");
        document.body.style.cursor = "default";
        // On retire PROPREMENT les écouteurs
        document.removeEventListener("mouseover", handleMouseOver);
        document.removeEventListener("mouseout", handleMouseOut);
        document.removeEventListener("click", handleClick, true);
        removeHighlight(); // On nettoie le cadre rouge s'il reste
    }
}

function handleMouseOver(e) {
    if (!state.isEditing) return;
    e.target.classList.add("platon-hover-target");
}

function handleMouseOut(e) {
    // On retire le cadre même si isEditing est false (pour nettoyer proprement à la fin)
    e.target.classList.remove("platon-hover-target");
}

function handleClick(e) {
    if (!state.isEditing) return;

    e.preventDefault();
    e.stopPropagation();

    const target = e.target;

    // Animation
    target.classList.add("platon-removing");

    // Calcul du sélecteur
    const selector = genererSelecteur(target);
    console.log("Cible :", selector);

    // Sauvegarde (Délai pour l'animation)
    setTimeout(() => {
        saveRule(selector);
        // Nettoyage des classes
        target.classList.remove("platon-hover-target");
        target.classList.remove("platon-removing");
    }, 400);
}

// --- 5. ALGO DE SÉLECTION (Ton collègue) ---
function genererSelecteur(element) {
    if (element.id) return "#" + CSS.escape(element.id);

    let path = [];
    while (element.parentElement) {
        let tag = element.tagName.toLowerCase();
        let siblings = element.parentElement.children;
        let index = 1;

        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] === element) break;
            if (siblings[i].tagName === element.tagName) index++;
        }

        if (index > 1) tag += ":nth-of-type(" + index + ")";
        path.unshift(tag);
        element = element.parentElement;
    }
    return path.join(" > ");
}

// --- 6. STOCKAGE & APPLICATION ---

function saveRule(selector) {
    // Maintenant 'hostname' est accessible car défini tout en haut !
    chrome.storage.local.get([hostname], (result) => {
        let rules = result[hostname] || [];
        if (!rules.includes(selector)) {
            rules.push(selector);
            chrome.storage.local.set({ [hostname]: rules }, () => {
                console.log("✅ Sauvegardé !");
                loadAndApplyRules();
            });
        }
    });
}

function loadAndApplyRules() {
    chrome.storage.local.get([hostname], (result) => {
        const rules = result[hostname] || [];
        refreshStyleTag(rules);
    });
}

function resetCurrentSite() {
    console.log("Reset demandé.");
    chrome.storage.local.remove([hostname], () => {
        location.reload();
    });
}

// --- 7. STYLE INJECTION ---
function refreshStyleTag(rules) {
    let style = document.getElementById("platon-style-block");
    if (!style) {
        style = document.createElement("style");
        style.id = "platon-style-block";
        document.head.appendChild(style);
    }

    if (state.isPaused || state.compareMode) {
        style.textContent = "";
        return;
    }

    if (state.showHidden) {
        const css = rules.join(", ") + ` { 
            display: block !important; 
            opacity: 0.5 !important; 
            filter: grayscale(100%) !important;
            outline: 2px dashed #952E7D !important; 
            pointer-events: none !important;
        }`;
        style.textContent = css;
    } else {
        if (rules.length > 0) {
            const css = rules.join(", ") + " { display: none !important; }";
            style.textContent = css;
        } else {
            style.textContent = "";
        }
    }
}

// --- 8. BONUS ---
function toggleCompareMode(val) { state.compareMode = val; loadAndApplyRules(); }
function toggleShowHidden(val) { state.showHidden = val; loadAndApplyRules(); }
function togglePause(val) { state.isPaused = val; loadAndApplyRules(); }

function removeHighlight() {
    document.querySelectorAll(".platon-hover-target").forEach(e => e.classList.remove("platon-hover-target"));
}