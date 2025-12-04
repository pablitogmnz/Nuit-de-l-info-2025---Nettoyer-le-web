document.addEventListener('DOMContentLoaded', async () => {
    const toggle = document.getElementById('toggle-cleaning');
    const statusText = document.getElementById('status-text');
    const statusIcon = document.getElementById('status-icon');
    const btnReset = document.getElementById('btn-reset');
    const btnSettings = document.getElementById('btn-settings');

    // Variable pour stocker l'onglet, null en mode test
    let currentTabId = null;

    // TENTATIVE DE CONNEXION À CHROME (Sécurisée)
    try {
        if (typeof chrome !== "undefined" && chrome.tabs) {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab) currentTabId = tab.id;
        }
    } catch (e) {
        console.log("Mode Design : API Chrome non disponible.");
    }

    // --- FONCTION UI (Mise à jour visuelle) ---
    function updateUI(isEditing) {
        toggle.checked = isEditing; // Force l'état visuel du switch
        if (isEditing) {
            statusText.textContent = "Activé";
            statusText.style.color = "#952E7D";
            statusIcon.style.color = "#952E7D";
        } else {
            statusText.textContent = "Désactivé";
            statusText.style.color = "#9ca3af";
            statusIcon.style.color = "#9ca3af";
        }
    }

    // --- ACTION DU TOGGLE (SWITCH) ---
    toggle.addEventListener('change', () => {
        const isActive = toggle.checked;

        // 1. D'abord on met à jour l'interface (Feedback immédiat)
        updateUI(isActive);

        // 2. Ensuite on essaie d'envoyer le message
        const action = isActive ? "ACTIVER_MODE_EDITION" : "DESACTIVER_MODE_EDITION";

        if (currentTabId) {
            chrome.tabs.sendMessage(currentTabId, { action: action });
        } else {
            console.log(`[Simulation] Envoi de l'ordre : ${action}`);
        }
    });

    // --- BOUTON RESET ---
    btnReset.addEventListener('click', () => {
        // Petit effet visuel pour montrer le clic
        btnReset.style.backgroundColor = "#f3f4f6";
        setTimeout(() => btnReset.style.backgroundColor = "white", 200);

        if (confirm("Réinitialiser cette page ?")) {
            if (currentTabId) {
                chrome.tabs.sendMessage(currentTabId, { action: "RESET_PAGE_ACTUELLE" });
            } else {
                console.log("[Simulation] Ordre : RESET_PAGE_ACTUELLE");
            }
        }
    });

    // --- BOUTON PARAMÈTRES ---
    btnSettings.addEventListener('click', () => {
        if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            // En mode test Ctrl+O, on ouvre le fichier localement pour que tu puisses voir
            window.location.href = "parametres.html";
        }
    });
});