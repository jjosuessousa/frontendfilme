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

    // Função para carregar os filmes
    function carregarFilmes() {
        fetch(`${apiUrl}/listar-filme`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    let html = '';
                    data.forEach(filme => {
                        html += `
                            <div class="col-md-4">
                                <div class="filme-item">
                                    <img src="${filme.capa}" alt="${filme.titulo}" class="img-fluid mb-3">
                                    <h3>${filme.titulo}</h3>
                                    <p><strong>Sinopse:</strong> ${filme.sinopse}</p>
                                    <p><strong>Categoria:</strong> ${filme.categoria}</p>
                                    <a href="${filme.trailer}" target="_blank" class="btn btn-primary">Assistir Trailer</a>
                                </div>
                            </div>
                        `;
                    });
                    filmesList.innerHTML = html;
                } else {
                    filmesList.innerHTML = '<p class="text-white">Nenhum filme encontrado.</p>';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar filmes:', error);
                filmesList.innerHTML = `<p class="text-white">Erro ao carregar filmes: ${error.message}</p>`;
            });
    }

    // Função para buscar filmes
    window.buscarFilme = function() {
        const termo = document.getElementById('searchBar').value.trim();
        if (termo) {
            fetch(`${apiUrl}/buscar-filme?termo=${encodeURIComponent(termo)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        let html = '';
                        data.forEach(filme => {
                            html += `
                                <div class="col-md-4">
                                    <div class="filme-item">
                                        <img src="${filme.capa}" alt="${filme.titulo}" class="img-fluid mb-3">
                                        <h3>${filme.titulo}</h3>
                                        <p><strong>Sinopse:</strong> ${filme.sinopse}</p>
                                        <p><strong>Categoria:</strong> ${filme.categoria}</p>
                                        <a href="${filme.trailer}" target="_blank" class="btn btn-primary">Assistir Trailer</a>
                                    </div>
                                </div>
                            `;
                        });
                        filmesList.innerHTML = html;
                    } else {
                        filmesList.innerHTML = '<p class="text-white">Nenhum filme encontrado com esse termo.</p>';
                    }
                })
                .catch(error => {
                    console.error('Erro na busca:', error);
                    filmesList.innerHTML = `<p class="text-white">Erro na busca: ${error.message}</p>`;
                });
        } else {
            carregarFilmes();
        }
    }

    // Função para filtrar por categoria
    window.filtrarCategoria = function(categoria) {
        fetch(`${apiUrl}/filtrar-filme?categoria=${encodeURIComponent(categoria)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    let html = '';
                    data.forEach(filme => {
                        html += `
                            <div class="col-md-4">
                                <div class="filme-item">
                                    <img src="${filme.capa}" alt="${filme.titulo}" class="img-fluid mb-3">
                                    <h3>${filme.titulo}</h3>
                                    <p><strong>Sinopse:</strong> ${filme.sinopse}</p>
                                    <p><strong>Categoria:</strong> ${filme.categoria}</p>
                                    <a href="${filme.trailer}" target="_blank" class="btn btn-primary">Assistir Trailer</a>
                                </div>
                            </div>
                        `;
                    });
                    filmesList.innerHTML = html;
                } else {
                    filmesList.innerHTML = `<p class="text-white">Nenhum filme encontrado na categoria ${categoria}.</p>`;
                }
            })
            .catch(error => {
                console.error('Erro ao filtrar:', error);
                filmesList.innerHTML = `<p class="text-white">Erro ao filtrar: ${error.message}</p>`;
            });
    }

    // Carrega os filmes ao iniciar
    carregarFilmes();
    
});