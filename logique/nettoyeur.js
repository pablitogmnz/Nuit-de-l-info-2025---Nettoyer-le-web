/**
 * PLATON CLEANER - VERSION FINALE AVEC ZOOM
 */

// --- 1. VARIABLES GLOBALES ---
const hostname = window.location.hostname;

let state = {
    isEditing: false,       // Mode Nettoyage
    isZooming: false,       // Mode Loupe (NOUVEAU)
    isPaused: false,
    showHidden: false,
    compareMode: false
};

// --- 2. INITIALISATION ---
(function init() {
    console.log("%c🧹 Platon Cleaner : PRÊT SUR " + hostname, "color: #952E7D; font-weight: bold;");
    loadAndApplyRules();
    setupMessageListener();
})();

// --- 3. ÉCOUTE DU MENU ---
function setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

        if (request.action === "GET_STATUS") {
            // On renvoie l'état complet
            sendResponse({ isEditing: state.isEditing, isZooming: state.isZooming });
            return;
        }

        switch (request.action) {
            case "ACTIVER_MODE_EDITION": toggleEditing(true); break;
            case "DESACTIVER_MODE_EDITION": toggleEditing(false); break;
            case "RESET_PAGE_ACTUELLE": resetCurrentSite(); break;
            case "TOGGLE_AVANT_APRES": toggleCompareMode(request.value); break;
            case "TOGGLE_VISUALISER_CACHES": toggleShowHidden(request.value); break;
            case "TOGGLE_PAUSE": togglePause(request.value); break;
            case "TOGGLE_ZOOM": toggleZoom(request.value); break; // Nouveau
        }
    });
}

// --- 4. GESTION DES MODES (Nettoyage OU Zoom) ---
function toggleEditing(active) {
    state.isEditing = active;
    if (active) state.isZooming = false; // Priorité au nettoyage
    updateListeners();
}

function toggleZoom(active) {
    state.isZooming = active;
    if (active) state.isEditing = false; // Priorité au zoom
    updateListeners();
}

function updateListeners() {
    // On nettoie tout d'abord
    document.removeEventListener("mouseover", handleMouseOver);
    document.removeEventListener("mouseout", handleMouseOut);
    document.removeEventListener("click", handleClick, true);
    removeHighlight();

    if (state.isEditing) {
        console.log("⚡ Mode Nettoyage ACTIVÉ");
        document.body.style.cursor = "crosshair";
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);
        document.addEventListener("click", handleClick, true);
    }
    else if (state.isZooming) {
        console.log("🔍 Mode Loupe ACTIVÉ");
        document.body.style.cursor = "zoom-in";
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);
        document.addEventListener("click", handleClick, true);
    }
    else {
        document.body.style.cursor = "default";
    }
}

function handleMouseOver(e) {
    if (state.isEditing) e.target.classList.add("platon-hover-target");
    if (state.isZooming) e.target.classList.add("platon-zoom-target"); // Cadre bleu
}

function handleMouseOut(e) {
    e.target.classList.remove("platon-hover-target");
    e.target.classList.remove("platon-zoom-target");
}

function handleClick(e) {
    if (!state.isEditing && !state.isZooming) return;

    e.preventDefault();
    e.stopPropagation();
    const target = e.target;

    // CAS 1 : SUPPRESSION
    if (state.isEditing) {
        target.classList.add("platon-removing");
        const selector = genererSelecteur(target);
        setTimeout(() => {
            saveRule(selector);
            target.classList.remove("platon-hover-target");
            target.classList.remove("platon-removing");
        }, 400);
    }

    // CAS 2 : ZOOM (Mode Loupe)
    else if (state.isZooming) {
        // Si déjà zoomé, on remet normal
        if (target.classList.contains("platon-zoomed")) {
            target.classList.remove("platon-zoomed");
            // Reset des styles
            target.style.transform = "";
            target.style.zIndex = "";
            target.style.position = "";
            target.style.boxShadow = "";
            target.style.backgroundColor = "";
            target.style.transition = "";
        } else {
            // Sinon on zoome
            target.classList.add("platon-zoomed");
            target.style.transition = "transform 0.3s ease";
            target.style.transform = "scale(1.2)";
            target.style.zIndex = "99999";
            target.style.position = "relative";
            target.style.boxShadow = "0 0 20px rgba(0,0,0,0.2)";
            target.style.backgroundColor = "white"; // Fond blanc pour lisibilité
            target.style.borderRadius = "8px";
        }
    }
}

// --- 5. ALGO DE SÉLECTION (Inchangé) ---
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

// --- 6. STOCKAGE & APPLICATION (Inchangé) ---
function saveRule(selector) {
    chrome.storage.local.get([hostname], (result) => {
        let rules = result[hostname] || [];
        if (!rules.includes(selector)) {
            rules.push(selector);
            chrome.storage.local.set({ [hostname]: rules }, () => {
                loadAndApplyRules();
            });
        }
    });
}

function loadAndApplyRules() {
    chrome.storage.local.get([hostname], (result) => {
        refreshStyleTag(result[hostname] || []);
    });
}

function resetCurrentSite() {
    chrome.storage.local.remove([hostname], () => location.reload());
}

// --- 7. STYLE INJECTION (Inchangé) ---
function refreshStyleTag(rules) {
    let style = document.getElementById("platon-style-block");
    if (!style) {
        style = document.createElement("style");
        style.id = "platon-style-block";
        document.head.appendChild(style);
    }
    if (state.isPaused || state.compareMode) { style.textContent = ""; return; }

    if (state.showHidden) {
        const css = rules.join(", ") + " { display: block !important; opacity: 0.5 !important; filter: grayscale(100%) !important; outline: 2px dashed #952E7D !important; pointer-events: none !important; }";
        style.textContent = css;
    } else {
        style.textContent = rules.length > 0 ? rules.join(", ") + " { display: none !important; }" : "";
    }
}

// --- 8. BONUS TOGGLES ---
function toggleCompareMode(val) { state.compareMode = val; loadAndApplyRules(); }
function toggleShowHidden(val) { state.showHidden = val; loadAndApplyRules(); }
function togglePause(val) { state.isPaused = val; loadAndApplyRules(); }

function removeHighlight() {
    document.querySelectorAll(".platon-hover-target").forEach(e => e.classList.remove("platon-hover-target"));
    document.querySelectorAll(".platon-zoom-target").forEach(e => e.classList.remove("platon-zoom-target"));
}