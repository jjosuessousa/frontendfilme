document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost/backend_filme/public';
    const filmesList = document.getElementById('filmes-list');
    const filmesDestaque = document.getElementById('filmes-destaque');
    const categoriasContainer = document.getElementById('categorias-container');
    const categoriasDropdown = document.getElementById('categorias-dropdown');
    const searchBar = document.getElementById('searchBar');
    const filmeModal = new bootstrap.Modal(document.getElementById('filmeModal'));

    // Carregar filmes e categorias
    carregarFilmes();
    carregarCategorias();

    // Função para carregar filmes
    function carregarFilmes() {
        filmesList.innerHTML = '<div class="col-12 text-center py-5"><div class="spinner-border text-danger" role="status"></div></div>';
        
        fetch(`${apiUrl}/listar-filme`)
            .then(response => {
                if (!response.ok) throw new Error('Erro na resposta da API');
                return response.json();
            })
            .then(data => {
                exibirFilmes(data);
                exibirDestaques(data.filter(filme => filme.destaque).slice(0, 6));
            })
            .catch(error => exibirErro("Erro ao carregar filmes", error));
    }

    // Exibir filmes na lista principal
    function exibirFilmes(filmes) {
        if (!filmes || filmes.length === 0) {
            filmesList.innerHTML = '<div class="col-12 text-center text-white py-5"><h4>Nenhum filme encontrado</h4></div>';
            return;
        }
        
        filmesList.innerHTML = filmes.map(filme => {
            const anoLancamento = filme.lancamento ? new Date(filme.lancamento).getFullYear() : '';
            const duracaoFormatada = filme.duracao ? `${Math.floor(filme.duracao/60)}h ${filme.duracao%60}m` : '';
            
            return `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="filme-card card h-100 border-0 bg-dark text-white">
                        <img src="${filme.capa || 'https://via.placeholder.com/300x450?text=Sem+Capa'}" 
                             alt="${filme.titulo}" 
                             class="card-img-top filme-capa" 
                             style="height: 400px; object-fit: cover;"
                             onclick="abrirModalFilme('${filme.id}')">
                        <div class="card-body">
                            <h5 class="card-title">${filme.titulo || 'Sem título'}</h5>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-muted">${anoLancamento}</span>
                                <span class="badge ${filme.classificacao ? 'bg-warning text-dark' : 'bg-secondary'}">
                                    ${filme.classificacao || 'L'}
                                </span>
                            </div>
                            <p class="card-text text-muted">${(filme.sinopse || '').substring(0, 100)}${filme.sinopse && filme.sinopse.length > 100 ? '...' : ''}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-danger">${filme.categoria || 'Geral'}</span>
                                <small class="text-muted">${duracaoFormatada}</small>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent border-top-0 d-flex justify-content-between">
                            <button class="btn btn-outline-light btn-sm" onclick="abrirModalFilme('${filme.id}')">
                                <i class="fas fa-info-circle me-2"></i>Detalhes
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); abrirModalFilme('${filme.id}', true)">
                                <i class="fas fa-play me-2"></i>Trailer
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Exibir filmes em destaque
    function exibirDestaques(filmes) {
        if (!filmes || filmes.length === 0) return;
        
        filmesDestaque.innerHTML = filmes.map(filme => {
            const anoLancamento = filme.lancamento ? new Date(filme.lancamento).getFullYear() : '';
            
            return `
                <div class="col-lg-2 col-md-4 col-6 mb-4">
                    <div class="filme-destaque position-relative rounded overflow-hidden">
                        <img src="${filme.capa || 'https://via.placeholder.com/300x450?text=Sem+Capa'}" 
                             alt="${filme.titulo}" 
                             class="img-fluid"
                             style="height: 250px; width: 100%; object-fit: cover;"
                             onclick="abrirModalFilme('${filme.id}')">
                        <div class="destaque-overlay position-absolute bottom-0 start-0 end-0 p-3">
                            <h6 class="mb-1">${filme.titulo || 'Sem título'}</h6>
                            <small class="d-block mb-2">${anoLancamento}</small>
                            <button class="btn btn-sm btn-danger" onclick="event.stopPropagation(); abrirModalFilme('${filme.id}', true)">
                                <i class="fas fa-play me-1"></i>Trailer
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Carregar categorias
    function carregarCategorias() {
        fetch(`${apiUrl}/categorias`)
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar categorias');
                return response.json();
            })
            .then(categorias => {
                if (!categorias || categorias.length === 0) {
                    categorias = ['Ação', 'Drama', 'Comédia', 'Ficção', 'Terror'];
                }
                
                categoriasContainer.innerHTML = `
                    <button onclick="resetarFiltro()" class="btn btn-outline-danger btn-sm btn-categoria active">
                        Todos
                    </button>
                    ${categorias.map(categoria => `
                        <button onclick="filtrarCategoria('${categoria}')" 
                                class="btn btn-outline-danger btn-sm btn-categoria">
                            ${categoria}
                        </button>
                    `).join('')}
                `;
                
                categoriasDropdown.innerHTML = `
                    <li><a class="dropdown-item" href="#" onclick="resetarFiltro()">Todos</a></li>
                    ${categorias.map(categoria => `
                        <li><a class="dropdown-item" href="#" onclick="filtrarCategoria('${categoria}')">${categoria}</a></li>
                    `).join('')}
                `;
            })
            .catch(error => {
                console.error('Erro ao carregar categorias:', error);
                categoriasContainer.innerHTML = '<span class="text-danger">Erro ao carregar categorias</span>';
            });
    }

    // Filtrar por categoria
    window.filtrarCategoria = function(categoria) {
        document.querySelectorAll('.btn-categoria').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.trim() === categoria) {
                btn.classList.add('active');
            }
        });
        
        filmesList.innerHTML = '<div class="col-12 text-center py-5"><div class="spinner-border text-danger" role="status"></div></div>';
        
        fetch(`${apiUrl}/filmes/categoria/${encodeURIComponent(categoria)}`)
            .then(response => {
                if (!response.ok) throw new Error('Erro ao filtrar');
                return response.json();
            })
            .then(data => exibirFilmes(data))
            .catch(error => exibirErro("Erro ao filtrar filmes", error));
    };

    // Resetar filtro
    window.resetarFiltro = function() {
        document.querySelectorAll('.btn-categoria').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.trim() === 'Todos') {
                btn.classList.add('active');
            }
        });
        carregarFilmes();
    };

    // Buscar por título
    window.buscarFilmePorTitulo = function() {
        const termo = searchBar.value.trim();
        if (!termo) return resetarFiltro();
        
        filmesList.innerHTML = '<div class="col-12 text-center py-5"><div class="spinner-border text-danger" role="status"></div></div>';
        
        fetch(`${apiUrl}/filmes/titulo/${encodeURIComponent(termo)}`)
            .then(response => {
                if (!response.ok) throw new Error('Erro na busca');
                return response.json();
            })
            .then(data => exibirFilmes(data))
            .catch(error => exibirErro("Nenhum filme encontrado", error));
    };

    // Abrir modal com detalhes do filme
    window.abrirModalFilme = function(idFilme, mostrarTrailer = false) {
        fetch(`${apiUrl}/filme/${idFilme}`)
            .then(response => {
                if (!response.ok) throw new Error('Filme não encontrado');
                return response.json();
            })
            .then(filme => {
                // Formatando os dados
                const anoLancamento = filme.lancamento ? new Date(filme.lancamento).getFullYear() : 'N/A';
                const duracaoFormatada = filme.duracao ? `${Math.floor(filme.duracao/60)}h ${filme.duracao%60}m` : 'N/A';
                const classificacao = filme.classificacao || 'Livre';
                const genero = filme.genero || filme.categoria || 'Geral';
                const elenco = filme.elenco || 'Informação não disponível';
                
                // Preencher o modal
                document.getElementById('filmeModalTitle').textContent = filme.titulo || 'Detalhes do Filme';
                document.getElementById('modalFilmeTitulo').textContent = filme.titulo || 'Sem título';
                document.getElementById('modalFilmeCapa').src = filme.capa || 'https://via.placeholder.com/300x450?text=Sem+Capa';
                document.getElementById('modalFilmeSinopse').textContent = filme.sinopse || 'Sinopse não disponível';
                document.getElementById('modalFilmeCategoria').textContent = filme.categoria || 'Geral';
                document.getElementById('modalFilmeAno').textContent = anoLancamento;
                document.getElementById('modalFilmeDuracao').textContent = duracaoFormatada;
                document.getElementById('modalFilmeClassificacao').textContent = classificacao;
                document.getElementById('modalFilmeGenero').textContent = genero;
                document.getElementById('modalFilmeElenco').textContent = elenco;
                
                // Configurar o trailer
                const trailerContainer = document.getElementById('trailerContainer');
                const trailerIframe = document.getElementById('trailerIframe');
                const trailerBtn = document.getElementById('modalFilmeTrailerBtn');
                
                trailerContainer.classList.add('d-none');
                trailerIframe.src = '';
                
                if (filme.trailer) {
                    trailerBtn.style.display = 'block';
                    
                    trailerBtn.onclick = function() {
                        if (trailerContainer.classList.contains('d-none')) {
                            let trailerUrl = filme.trailer;
                            if (filme.trailer.includes('youtube.com/watch?v=')) {
                                const videoId = filme.trailer.split('v=')[1].split('&')[0];
                                trailerUrl = `https://www.youtube.com/embed/${videoId}`;
                            } else if (filme.trailer.includes('youtu.be/')) {
                                const videoId = filme.trailer.split('youtu.be/')[1].split('?')[0];
                                trailerUrl = `https://www.youtube.com/embed/${videoId}`;
                            }
                            
                            trailerIframe.src = trailerUrl;
                            trailerContainer.classList.remove('d-none');
                            trailerBtn.innerHTML = '<i class="fas fa-times me-2"></i>Fechar Trailer';
                        } else {
                            trailerIframe.src = '';
                            trailerContainer.classList.add('d-none');
                            trailerBtn.innerHTML = '<i class="fas fa-play me-2"></i>Ver Trailer';
                        }
                    };
                    
                    if (mostrarTrailer) {
                        trailerBtn.click();
                    }
                } else {
                    trailerBtn.style.display = 'none';
                }
                
                filmeModal.show();
            })
            .catch(error => {
                console.error('Erro ao carregar filme:', error);
                alert('Erro ao carregar detalhes do filme. Por favor, tente novamente.');
            });
    };

    // Exibir mensagem de erro
    function exibirErro(mensagem, error) {
        console.error(mensagem, error);
        filmesList.innerHTML = `
            <div class="col-12 text-center text-white py-5">
                <i class="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                <h4>${mensagem}</h4>
                <p class="text-muted">${error.message || 'Tente novamente mais tarde'}</p>
                <button onclick="carregarFilmes()" class="btn btn-outline-light mt-3">
                    <i class="fas fa-sync-alt me-2"></i>Recarregar
                </button>
            </div>
        `;
    }

    // Evento de busca ao pressionar Enter
    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarFilmePorTitulo();
        }
    });
});