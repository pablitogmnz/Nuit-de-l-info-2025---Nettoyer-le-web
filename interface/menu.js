document.addEventListener('DOMContentLoaded', async () => {
    // Éléments
    const toggle = document.getElementById('toggle-cleaning');
    const statusText = document.getElementById('status-text');
    const statusIcon = document.getElementById('status-icon');
    const btnReset = document.getElementById('btn-reset');

    // Navigation
    const btnMore = document.getElementById('btn-more');
    const btnBack = document.getElementById('btn-back');
    const btnSettings = document.getElementById('btn-settings');

    // Bonus & Nouveau Bouton Compare
    const btnCompareToggle = document.getElementById('btn-compare-toggle');
    const txtCompare = document.getElementById('txt-compare');
    const checkShowHidden = document.getElementById('check-show-hidden');
    const checkPause = document.getElementById('check-pause');

    // Connexion Chrome
    let currentTabId = null;
    try {
        if (typeof chrome !== "undefined" && chrome.tabs) {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab) currentTabId = tab.id;
        }
    } catch (e) { console.log("Mode Design"); }

    // --- NAVIGATION FLUIDE ---
    btnMore.addEventListener('click', () => document.body.classList.add('show-options'));
    btnBack.addEventListener('click', () => document.body.classList.remove('show-options'));

    // --- LOGIQUE PRINCIPALE ---
    function updateUI(isEditing) {
        toggle.checked = isEditing;
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

    toggle.addEventListener('change', () => {
        const isActive = toggle.checked;
        updateUI(isActive);
        sendMessageToBack(isActive ? "ACTIVER_MODE_EDITION" : "DESACTIVER_MODE_EDITION");
    });

    btnReset.addEventListener('click', () => {
        if (confirm("Réinitialiser cette page ?")) {
            sendMessageToBack("RESET_PAGE_ACTUELLE");
        }
    });

    btnSettings.addEventListener('click', () => {
        if (typeof chrome !== "undefined" && chrome.runtime) chrome.runtime.openOptionsPage();
        else window.location.href = "parametres.html";
    });

    // --- LOGIQUE BONUS ---

    // Bonus 1 : NOUVEAU BOUTON AVANT / APRÈS
    let isComparing = false;
    btnCompareToggle.addEventListener('click', () => {
        isComparing = !isComparing;

        // Changement Visuel
        if (isComparing) {
            btnCompareToggle.classList.add('active');
            txtCompare.textContent = "Retour au résultat nettoyé";
            btnCompareToggle.querySelector('span').textContent = "cleaning_services"; // Change icône
        } else {
            btnCompareToggle.classList.remove('active');
            txtCompare.textContent = "Voir la page d'origine";
            btnCompareToggle.querySelector('span').textContent = "visibility"; // Remet icône oeil
        }

        // Envoi de l'ordre (true = montrer l'original, false = cacher l'original)
        sendMessageToBack("TOGGLE_AVANT_APRES", { value: isComparing });
    });

    // Bonus 2 & 3
    checkShowHidden.addEventListener('change', () => sendMessageToBack("TOGGLE_VISUALISER_CACHES", { value: checkShowHidden.checked }));
    checkPause.addEventListener('change', () => sendMessageToBack("TOGGLE_PAUSE", { value: checkPause.checked }));

    // Helper
    function sendMessageToBack(actionName, extraData = {}) {
        if (currentTabId) {
            chrome.tabs.sendMessage(currentTabId, { action: actionName, ...extraData });
        } else {
            console.log(`[Simulation] ${actionName}`, extraData);
        }
    }
});