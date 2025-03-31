// Funções para manipulação da Sidebar
document.getElementById("menu-toggle").addEventListener("click", function() {
    let sidebar = document.getElementById("sidebar");
    let mainContent = document.getElementById("main-content");
    if (sidebar.classList.contains("show")) {
        sidebar.classList.remove("show");
        mainContent.style.marginLeft = "auto";
        mainContent.style.paddingLeft = "15px";
    } else {
        sidebar.classList.add("show");
        mainContent.style.marginLeft = "250px";
        mainContent.style.paddingLeft = "25px";
    }
});

// Funções para API de Filmes
document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost/backend_filme/public'; // URL base da API
    const filmesList = document.getElementById('filmes-list');
    const categoriasContainer = document.getElementById('categorias-container');
    const searchBar = document.getElementById('searchBar');

    // Função para carregar os filmes
    function carregarFilmes() {
        filmesList.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"></div></div>';
        
        fetch(`${apiUrl}/listar-filme`)
            .then(response => response.json())
            .then(data => exibirFilmes(data))
            .catch(error => exibirErro("Erro ao carregar filmes", error));
    }

    // Função para exibir filmes
    function exibirFilmes(filmes) {
        if (filmes.length === 0) {
            filmesList.innerHTML = '<div class="col-12 text-center text-white py-5"><h4>Nenhum filme encontrado</h4></div>';
            return;
        }
        
        let html = filmes.map(filme => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="filme-item card h-100 bg-dark text-white">
                    <img src="${filme.capa}" alt="${filme.titulo}" class="card-img-top filme-capa" style="height: 400px; object-fit: cover;">
                    <div class="card-body">
                        <h3 class="card-title">${filme.titulo}</h3>
                        <p class="card-text"><strong>Sinopse:</strong> ${filme.sinopse}</p>
                        <p class="text-info"><strong>Categoria:</strong> ${filme.categoria}</p>
                    </div>
                    <div class="card-footer bg-transparent">
                        <a href="${filme.trailer}" target="_blank" class="btn btn-danger btn-block">Assistir Trailer</a>
                    </div>
                </div>
            </div>
        `).join('');
        
        filmesList.innerHTML = html;
    }

    // Função para carregar categorias
    function carregarCategorias() {
        fetch(`${apiUrl}/categorias`)
            .then(response => response.json())
            .then(categorias => {
                categoriasContainer.innerHTML = categorias.map(categoria => `
                    <button onclick="filtrarCategoria('${categoria}')" class="btn btn-outline-primary btn-categoria">
                        ${categoria}
                    </button>
                `).join('');
            })
            .catch(error => console.error('Erro ao carregar categorias:', error));
    }

    // Função para filtrar filmes por categoria
    window.filtrarCategoria = function(categoria) {
        filmesList.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"></div></div>';
        
        fetch(`${apiUrl}/filmes/categoria/${encodeURIComponent(categoria)}`)
            .then(response => response.json())
            .then(data => exibirFilmes(data))
            .catch(error => exibirErro("Erro ao buscar categoria", error));
    };

    // Função para buscar filmes por título
    window.buscarFilmePorTitulo = function() {
        const termo = searchBar.value.trim();
        if (!termo) return carregarFilmes();
        
        filmesList.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"></div></div>';
        
        fetch(`${apiUrl}/filmes/titulo/${encodeURIComponent(termo)}`)
            .then(response => response.json())
            .then(data => exibirFilmes(data))
            .catch(error => exibirErro("Erro na busca", error));
    };

    // Função para exibir erro
    function exibirErro(mensagem, error) {
        console.error(mensagem, error);
        filmesList.innerHTML = `
            <div class="col-12 text-center text-danger py-5">
                <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                <h4>${mensagem}</h4>
                <p>${error.message}</p>
                <button onclick="carregarFilmes()" class="btn btn-outline-light mt-3">
                    Tentar novamente
                </button>
            </div>
        `;
    }

    // Carrega os filmes e categorias ao iniciar
    carregarFilmes();
    carregarCategorias();
});
