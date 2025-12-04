document.addEventListener('DOMContentLoaded', loadSites);

function loadSites() {
    const tbody = document.getElementById('tbody-sites');
    const emptyState = document.getElementById('empty-state');
    const tableContainer = document.getElementById('table-container');
    const btnResetAll = document.getElementById('btn-reset-all');

    // --- FONCTION D'AFFICHAGE ---
    const render = (data) => {
        // Sécurité si data est null
        const sites = data ? Object.keys(data) : [];
        tbody.innerHTML = "";

        if (sites.length === 0) {
            tableContainer.classList.add('hidden');
            emptyState.classList.remove('hidden');
        } else {
            tableContainer.classList.remove('hidden');
            emptyState.classList.add('hidden');

            sites.forEach(site => {
                const rules = data[site];
                const count = Array.isArray(rules) ? rules.length : 0;

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${site}</strong></td>
                    <td><span class="badge">${count} éléments masqués</span></td>
                    <td>
                        <button class="btn-delete" data-site="${site}">
                            <span class="material-symbols-outlined">delete</span> Supprimer
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Re-câblage des boutons supprimer générés dynamiquement
            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const site = e.target.closest('button').dataset.site;
                    deleteSite(site);
                });
            });
        }
    };

    // --- LOGIQUE BOUTON "TOUT RÉINITIALISER" ---
    if (btnResetAll) {
        btnResetAll.addEventListener('click', () => {
            if (confirm("ATTENTION : Cela va effacer TOUS vos nettoyages sur TOUS les sites. Continuer ?")) {
                if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
                    // MODE RÉEL
                    chrome.storage.local.clear(() => {
                        loadSites();
                    });
                } else {
                    // MODE SIMULATION (Ctrl+O)
                    console.log("[Simulation] Tout effacé !");
                    render({}); // On ré-affiche avec un objet vide
                }
            }
        });
    }

    // --- CHARGEMENT INITIAL DES DONNÉES ---
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        // VRAI CHARGEMENT
        chrome.storage.local.get(null, (items) => render(items));
    } else {
        // CHARGEMENT FICTIF POUR LE DESIGN
        console.log("Mode Design : Chargement de fausses données");
        render({
            "facebook.com": ["pub-1", "sidebar"],
            "youtube.com": ["shorts", "ads"],
            "le-monde.fr": ["paywall"]
        });
    }

    // --- FONCTION DE SUPPRESSION UNITAIRE ---
    function deleteSite(site) {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
            // VRAIE SUPPRESSION
            chrome.storage.local.remove(site, () => {
                loadSites();
            });
        } else {
            // SIMULATION DE SUPPRESSION
            console.log(`[Simulation] Site ${site} supprimé`);
            const row = document.querySelector(`button[data-site="${site}"]`).closest('tr');
            row.remove();

            // Vérifier si c'était le dernier pour afficher l'état vide
            if (document.querySelectorAll('#tbody-sites tr').length === 0) {
                render({});
            }
        }
    }
}