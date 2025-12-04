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
    const checkZoom = document.getElementById('check-zoom');

    // Connexion Chrome
    let currentTabId = null;
    try {
        if (typeof chrome !== "undefined" && chrome.tabs) {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab) {
                currentTabId = tab.id;
                verifierEtatDuScript(currentTabId);
            }
        }
    } catch (e) { console.log("Mode Design"); }

    function verifierEtatDuScript(tabId) {
        chrome.tabs.sendMessage(tabId, { action: "GET_STATUS" }, (response) => {
            if (chrome.runtime.lastError) return;
            if (response) {
                if (response.isEditing) updateUI(true);
                // Si le zoom est actif, on coche la case
                if (response.isZooming && checkZoom) checkZoom.checked = true;
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

    // --- SWITCH NETTOYAGE ---
    toggle.addEventListener('change', () => {
        const isActive = toggle.checked;

        // Sécurité : Si on active le nettoyage, on coupe le zoom
        if (isActive && checkZoom && checkZoom.checked) {
            checkZoom.checked = false;
            sendMessageToBack("TOGGLE_ZOOM", { value: false });
        }

        updateUI(isActive);
        sendMessageToBack(isActive ? "ACTIVER_MODE_EDITION" : "DESACTIVER_MODE_EDITION");
    });

    // --- SWITCH ZOOM (NOUVEAU) ---
    if (checkZoom) {
        checkZoom.addEventListener('change', () => {
            const isZooming = checkZoom.checked;

            // Sécurité : Si on active le zoom, on coupe le nettoyage
            if (isZooming && toggle.checked) {
                toggle.checked = false;
                updateUI(false);
                sendMessageToBack("DESACTIVER_MODE_EDITION");
            }

            sendMessageToBack("TOGGLE_ZOOM", { value: isZooming });
        });
    }

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