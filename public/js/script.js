document.addEventListener('DOMContentLoaded', () => {

    const itemsPerPage = 5;  
    let currentPage = 1;

    // Sert a afficher le footer
    function loadFooter(){
        fetch('/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
    }
    // Sert a afficher le header
    function loadHeader(){
        fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        });
    }
    // Recupere les info de la bdd pour les mettres sur les tickets
    function loadPromoCodes(page = 1) {
        fetch(`/api/promocodes/codeList?page=${page}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('code');
                const totalItems = data.length; 
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                const startIndex = (page - 1) * itemsPerPage;
                const codesToShow = data.slice(startIndex, startIndex + itemsPerPage);
    
                container.innerHTML = '';
    
                codesToShow.forEach((firm, index) => {
                    container.innerHTML += `
                    <div class="ticket-item">
                        <div class="container pt-5">
                            <div class="row justify-content-center">
                                <div class="col-12 text-center">
                                    <div>
                                        <input class="checkbox-ticket" type="radio" name="ticket" id="ticket-${startIndex + index}">
                                        <label for="ticket-${startIndex + index}">
                                            <span class="top-dots">
                                                <span class="section dots">
                                                    <span></span><span></span><span></span><span></span>
                                                    <span></span><span></span><span></span><span></span>
                                                    <span></span><span></span><span></span><span></span>
                                                    <span></span><span></span><span></span><span></span>
                                                </span>
                                            </span>
                                            <span class="duration">
                                                <img src="${firm.image}" alt="${firm.nom}">
                                                <p>${firm.nom}</p>
                                            </span>
                                            <span class="price mt-2 pb-4 mb-3">
                                                ${getReductionText(firm.presentation)}
                                            </span>
                                            <span class="section dots">
                                                <span></span><span></span><span></span><span></span>
                                                <span></span><span></span><span></span><span></span>
                                                <span></span><span></span><span></span><span></span>
                                                <span></span><span></span><span></span><span></span>
                                            </span>
                                            <span class="section pt-4">
                                                <i class='uil uil-clock-two mt-3'></i>
                                            </span>
                                            <span class="time mt-2">
                                                <h2>${firm.code}</h2>
                                            </span>
                                            <span class="bottom-dots">
                                                <span class="section dots">
                                                    <span></span><span></span><span></span><span></span>
                                                    <span></span><span></span><span></span><span></span>
                                                    <span></span><span></span><span></span><span></span>
                                                    <span></span><span></span><span></span><span></span>
                                                </span>
                                            </span>
                                        </label>
                                        <div class="w-100"></div>
                                        <a href="${firm.url}" class="btn mt-4 mb-5">
                                            <i class="uil uil-ticket size-22 mr-2"></i>Visiter le site
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                });
    

                setupPagination(totalPages, page);
            });
    }
    // Gere la pagination
    function setupPagination(totalPages, currentPage) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';
    
        if (currentPage > 1) {
            const prevLi = document.createElement('li');
            const prevLink = document.createElement('a');
            prevLink.href = "#";
            prevLink.textContent = "Précédent";
            prevLink.addEventListener('click', (event) => {
                event.preventDefault(); 
                loadPromoCodes(currentPage - 1);
            });
            prevLi.appendChild(prevLink);
            pagination.appendChild(prevLi);
        }
    
        for (let i = 1; i <= totalPages; i++) {
            const pageLi = document.createElement('li');
            const pageLink = document.createElement('a');
            pageLink.href = "#";
            pageLink.textContent = i;
            pageLink.className = i === currentPage ? 'active' : '';
            pageLink.addEventListener('click', (event) => {
                event.preventDefault(); 
                loadPromoCodes(i);
            });
            pageLi.appendChild(pageLink);
            pagination.appendChild(pageLi);
        }
    
        if (currentPage < totalPages) {
            const nextLi = document.createElement('li');
            const nextLink = document.createElement('a');
            nextLink.href = "#";
            nextLink.textContent = "Suivant";
            nextLink.addEventListener('click', (event) => {
                event.preventDefault();
                loadPromoCodes(currentPage + 1);
            });
            nextLi.appendChild(nextLink);
            pagination.appendChild(nextLi);
        }
    }
    
    
    function getReductionText(text) {
        const match = text.match(/(\d+)\s*%/);
        return match ? `${match[1]}%` : text;
    }
    
    loadPromoCodes();  
    loadFooter();
    loadHeader();
});
