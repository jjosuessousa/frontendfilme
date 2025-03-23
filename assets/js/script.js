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
                    filmesList.innerHTML = '<p>Nenhum filme encontrado.</p>';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar filmes:', error);
                filmesList.innerHTML = `<p>Erro ao carregar filmes: ${error.message}</p>`;
            });
    }

    // Carrega os filmes ao iniciar
    carregarFilmes();
});