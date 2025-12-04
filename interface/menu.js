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

    // Bonus
    const btnCompareToggle = document.getElementById('btn-compare-toggle');
    const txtCompare = document.getElementById('txt-compare');
    const checkShowHidden = document.getElementById('check-show-hidden');
    const checkPause = document.getElementById('check-pause');

    // Connexion Chrome
    let currentTabId = null;
    try {
        if (typeof chrome !== "undefined" && chrome.tabs) {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab) {
                currentTabId = tab.id;
                // ASTUCE : On demande l'état actuel au script pour mettre à jour le bouton
                verifierEtatDuScript(currentTabId);
            }
        }
    } catch (e) { console.log("Mode Design"); }

    // --- FONCTION QUI VÉRIFIE SI C'EST DÉJÀ ALLUMÉ ---
    function verifierEtatDuScript(tabId) {
        // On envoie un petit message "PING" pour demander l'état
        chrome.tabs.sendMessage(tabId, { action: "GET_STATUS" }, (response) => {
            if (chrome.runtime.lastError) return; // Le script n'est pas encore prêt
            if (response && response.isEditing) {
                // Si le script dit "Je suis allumé", on allume le bouton visuellement
                updateUI(true);
            }
        });
    }

    // --- NAVIGATION ---
    btnMore.addEventListener('click', () => document.body.classList.add('show-options'));
    btnBack.addEventListener('click', () => document.body.classList.remove('show-options'));

    // --- UI ---
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

    // --- SWITCH ---
    toggle.addEventListener('change', () => {
        const isActive = toggle.checked;
        updateUI(isActive);
        sendMessageToBack(isActive ? "ACTIVER_MODE_EDITION" : "DESACTIVER_MODE_EDITION");
    });

    // --- BUTTONS ---
    btnReset.addEventListener('click', () => {
        if (confirm("Réinitialiser cette page ?")) sendMessageToBack("RESET_PAGE_ACTUELLE");
    });

    btnSettings.addEventListener('click', () => {
        if (typeof chrome !== "undefined" && chrome.runtime) chrome.runtime.openOptionsPage();
        else window.location.href = "parametres.html";
    });

    // --- BONUS ---
    let isComparing = false;
    if (btnCompareToggle) {
        btnCompareToggle.addEventListener('click', () => {
            isComparing = !isComparing;
            if (isComparing) {
                btnCompareToggle.classList.add('active');
                txtCompare.textContent = "Retour au résultat nettoyé";
                btnCompareToggle.querySelector('span').textContent = "cleaning_services";
            } else {
                btnCompareToggle.classList.remove('active');
                txtCompare.textContent = "Voir la page d'origine";
                btnCompareToggle.querySelector('span').textContent = "visibility";
            }
            sendMessageToBack("TOGGLE_AVANT_APRES", { value: isComparing });
        });
    }

    if (checkShowHidden) checkShowHidden.addEventListener('change', () => sendMessageToBack("TOGGLE_VISUALISER_CACHES", { value: checkShowHidden.checked }));
    if (checkPause) checkPause.addEventListener('change', () => sendMessageToBack("TOGGLE_PAUSE", { value: checkPause.checked }));

    function sendMessageToBack(actionName, extraData = {}) {
        if (currentTabId) {
            chrome.tabs.sendMessage(currentTabId, { action: actionName, ...extraData });
        } else {
            console.log(`[Simulation] ${actionName}`, extraData);
        }
    }
});