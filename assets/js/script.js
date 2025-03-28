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

    // Função para carregar os filmes
    function carregarFilmes() {
        filmesList.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"></div></div>';
        
        fetch(`${apiUrl}/listar-filme`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    exibirFilmes(data);
                } else {
                    filmesList.innerHTML = '<div class="col-12 text-center text-white py-5"><h4>Nenhum filme encontrado</h4></div>';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar filmes:', error);
                filmesList.innerHTML = `
                    <div class="col-12 text-center text-danger py-5">
                        <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                        <h4>Erro ao carregar filmes</h4>
                        <p>${error.message}</p>
                        <button onclick="carregarFilmes()" class="btn btn-outline-light mt-3">
                            Tentar novamente
                        </button>
                    </div>
                `;
            });
    }

    // Função para exibir filmes (reutilizável)
    function exibirFilmes(filmes) {
        let html = '';
        filmes.forEach(filme => {
            html += `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="filme-item card h-100 bg-dark text-white">
                        <img src="${filme.capa}" alt="${filme.titulo}" 
                             class="card-img-top filme-capa" 
                             style="height: 400px; object-fit: cover;">
                        <div class="card-body">
                            <h3 class="card-title">${filme.titulo}</h3>
                            <p class="card-text"><strong>Sinopse:</strong> ${filme.sinopse}</p>
                            <p class="text-info"><strong>Categoria:</strong> ${filme.categoria}</p>
                        </div>
                        <div class="card-footer bg-transparent">
                            <a href="${filme.trailer}" target="_blank" 
                               class="btn btn-danger btn-block">Assistir Trailer</a>
                        </div>
                    </div>
                </div>
            `;
        });
        filmesList.innerHTML = html;
    }

    // Função para carregar categorias
    function carregarCategorias() {
        fetch(`${apiUrl}/categorias`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar categorias');
                }
                return response.json();
            })
            .then(categorias => {
                let html = '<div class="d-flex flex-wrap gap-2">';
                categorias.forEach(categoria => {
                    html += `
                        <button onclick="filtrarCategoria('${categoria}')" 
                                class="btn btn-outline-primary btn-categoria">
                            ${categoria}
                        </button>
                    `;
                });
                html += '</div>';
                categoriasContainer.innerHTML = html;
            })
            .catch(error => {
                console.error('Erro ao carregar categorias:', error);
                categoriasContainer.innerHTML = `
                    <div class="alert alert-warning">
                        Erro ao carregar categorias: ${error.message}
                    </div>
                `;
            });
    }

    // Função para buscar filmes
    window.buscarFilme = function() {
        const termo = document.getElementById('searchBar').value.trim();
        if (termo) {
            filmesList.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"></div></div>';
            
            fetch(`${apiUrl}/buscar-filme?termo=${encodeURIComponent(termo)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.length > 0) {
                        exibirFilmes(data);
                    } else {
                        filmesList.innerHTML = `
                            <div class="col-12 text-center text-white py-5">
                                <h4>Nenhum filme encontrado com "${termo}"</h4>
                                <button onclick="carregarFilmes()" class="btn btn-outline-light mt-3">
                                    Ver todos os filmes
                                </button>
                            </div>
                        `;
                    }
                })
                .catch(error => {
                    console.error('Erro na busca:', error);
                    filmesList.innerHTML = `
                        <div class="col-12 text-center text-danger py-5">
                            <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                            <h4>Erro na busca</h4>
                            <p>${error.message}</p>
                        </div>
                    `;
                });
        } else {
            carregarFilmes();
        }
    }

    // Função para filtrar por categoria (atualizada com a rota correta)
    window.filtrarCategoria = function(categoria) {
        filmesList.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"></div></div>';
        
        fetch(`${apiUrl}/filmes/categoria/${encodeURIComponent(categoria)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    exibirFilmes(data);
                } else {
                    filmesList.innerHTML = `
                        <div class="col-12 text-center text-white py-5">
                            <h4>Nenhum filme encontrado na categoria "${categoria}"</h4>
                            <button onclick="carregarFilmes()" class="btn btn-outline-light mt-3">
                                Ver todos os filmes
                            </button>
                        </div>
                    `;
                }
            })
            .catch(error => {
                console.error('Erro ao filtrar:', error);
                filmesList.innerHTML = `
                    <div class="col-12 text-center text-danger py-5">
                        <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                        <h4>Erro ao filtrar</h4>
                        <p>${error.message}</p>
                    </div>
                `;
            });
    }

    // Carrega os filmes e categorias ao iniciar
    carregarFilmes();
    carregarCategorias();
});