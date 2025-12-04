
document.addEventListener('click', function(e)
    {
        e.preventDefault();
        e.stopPropagation();
        const elmt = e.target;

        let cheminCSS = genererSelecteur(elmt);
        enregistrer(cheminCSS);

        elmt.style.display = 'none';
    }, true)

function genererSelecteur(element) {
    /*
    retourne le chemin CSS pour l'elmt cliqué passé en paramètre, c'est ce qu'on va stocker au lieu
    de stocker le code en lui même qui serait beaucoup trop lourd
     */
    if (element.id) {
        return "#" + element.id;
    }

    var cheminCSS = [];

    //on remonte jusqu'a ce qu'il n'ai plus de parent
    while (element.parentElement)
    {
        var balise = element.tagName.toLowerCase();

        var freres = element.parentElement.children;

        var index = 1;
        for (var i = 0; i < freres.length; i++) {
            if (freres[i] === element) {
                break;
            }
            if (freres[i].tagName === element.tagName) {
                index++;
            }
        }

        if (index > 1)
        {
            balise += ":nth-of-type(" + index + ")";
        }

        cheminCSS.unshift(balise);
        element = element.parentElement;
    }

    return cheminCSS.join(" > ");
}

function enregistrer(selecteurCSS) {
    // 1. On récupère le nom du site (ex: "youtube.com")
    const nomDuSite = window.location.hostname;

    // 2. On demande à Chrome : "Qu'est-ce qu'on a déjà pour ce site ?"
    chrome.storage.local.get([nomDuSite], function(resultat) {

        // On récupère la liste existante, ou une liste vide si c'est la 1ère fois
        let reglesActuelles = resultat[nomDuSite] || [];

        // 3. On ajoute le nouveau sélecteur à la liste (s'il n'y est pas déjà)
        if (!reglesActuelles.includes(selecteurCSS)) {
            reglesActuelles.push(selecteurCSS);

            // 4. On SAUVEGARDE le tout
            chrome.storage.local.set({ [nomDuSite]: reglesActuelles }, function() {
                console.log("Sauvegardé : " + selecteurCSS);
            });
        }
    });
}
