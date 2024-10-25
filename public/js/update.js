document.addEventListener('DOMContentLoaded', () => {
    // Charger les entreprises disponibles
    loadCompanies();

    // Récupérer l'ID de l'entreprise choisie
    const companySelect = document.getElementById('company-select');
    companySelect.addEventListener('change', handleCompanySelection);

    // Gestion des boutons pour les mises à jour
    document.getElementById('update-code-button').addEventListener('click', updateCode);
    document.getElementById('update-url-button').addEventListener('click', updateUrl);
});

// Charger la liste des entreprises dans la datalist
function loadCompanies() {
    fetch('/api/promocodes/codeList')
        .then(response => response.json())
        .then(data => {
            const companiesDatalist = document.getElementById('companies');
            companiesDatalist.innerHTML = '';
            data.forEach(company => {
                const option = document.createElement('option');
                option.value = company.nom; // Affiche le nom dans la liste
                option.dataset.id = company.id; // Stocke l'ID comme dataset
                companiesDatalist.appendChild(option);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des entreprises:', error));
}

// Gérer la sélection d'une entreprise
function handleCompanySelection() {
    const companyName = document.getElementById('company-select').value;
    const selectedOption = [...document.querySelectorAll('#companies option')].find(option => option.value === companyName);

    if (selectedOption) {
        const companyId = selectedOption.dataset.id;
        document.getElementById('update-code-button').dataset.companyId = companyId;
        document.getElementById('update-url-button').dataset.companyId = companyId;
    } else {
        alert('Veuillez sélectionner une entreprise valide dans la liste déroulante.');
    }
}

// Mettre à jour le code promo
function updateCode() {
    const companyId = document.getElementById('update-code-button').dataset.companyId;
    const newCode = document.getElementById('code').value;

    if (companyId && newCode) {
        fetch(`/api/promocodes/codePromoUpdate/${companyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: newCode }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Erreur lors de la mise à jour du code promo:', error));
    } else {
        alert('Veuillez entrer un code valide et sélectionner une entreprise.');
    }
}

// Mettre à jour l'URL
function updateUrl() {
    const companyId = document.getElementById('update-url-button').dataset.companyId;
    const newUrl = document.getElementById('url').value;

    if (companyId && newUrl) {
        fetch(`/api/promocodes/codeUrlUpdate/${companyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: newUrl }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Erreur lors de la mise à jour de l\'URL:', error));
    } else {
        alert('Veuillez entrer une URL valide et sélectionner une entreprise.');
    }
}
