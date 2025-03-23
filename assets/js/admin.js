document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost/backend_filme/public';
    const filmeForm = document.getElementById('filme-form');
    const filmesList = document.getElementById('filmes-list');

    // Carrega a lista de filmes ao iniciar
    carregarFilmes();

    // Função para carregar os filmes
    function carregarFilmes() {
        fetch(`${apiUrl}/listar-filme`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar filmes.');
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    let html = '';
                    data.forEach(filme => {
                        html += `
                            <div class="filme-item mb-3 p-3 border rounded">
                                <h3>${filme.titulo}</h3>
                                <p><strong>Sinopse:</strong> ${filme.sinopse}</p>
                                <p><strong>Categoria:</strong> ${filme.categoria}</p>
                                <p><strong>Trailer:</strong> <a href="${filme.trailer}" target="_blank">Assistir</a></p>
                                <img src="http://localhost/backend_filme/uploads/${filme.capa}" alt="${filme.titulo}" class="img-fluid mb-3">
                                <button onclick="editarFilme(${filme.id})" class="btn btn-warning btn-sm">Editar</button>
                                <button onclick="deletarFilme(${filme.id})" class="btn btn-danger btn-sm">Deletar</button>
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
                filmesList.innerHTML = '<p>Erro ao carregar filmes. Tente novamente mais tarde.</p>';
            });
    }

    // Função para cadastrar/atualizar filme
    filmeForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const id = document.getElementById('filme-id').value;
        const titulo = document.getElementById('titulo').value;
        const sinopse = document.getElementById('sinopse').value;
        const trailer = document.getElementById('trailer').value;
        const capa = document.getElementById('capa').files[0]; // Arquivo de imagem
        const categoria = document.getElementById('categoria').value;

        // Cria um objeto FormData para enviar os dados
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('sinopse', sinopse);
        formData.append('trailer', trailer);
        formData.append('capa', capa); // Adiciona o arquivo de imagem
        formData.append('categoria', categoria);

        const url = id ? `${apiUrl}/atualizar-filme/${id}` : `${apiUrl}/cadastrar-filme`;
        const method = id ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            body: formData, // Usa FormData em vez de JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao salvar filme.');
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
                carregarFilmes(); // Recarrega a lista de filmes
                filmeForm.reset(); // Limpa o formulário
                document.getElementById('filme-id').value = ''; // Limpa o ID
            })
            .catch(error => {
                console.error('Erro ao salvar filme:', error);
                alert('Erro ao salvar filme. Tente novamente.');
            });
    });

    // Função para editar filme
    window.editarFilme = function (id) {
        fetch(`${apiUrl}/filme/${id}`) // Endpoint para buscar um filme por ID
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar filme: ' + response.statusText);
                }
                return response.json();
            })
            .then(filme => {
                // Preenche o formulário com os dados do filme
                document.getElementById('filme-id').value = filme.id;
                document.getElementById('titulo').value = filme.titulo;
                document.getElementById('sinopse').value = filme.sinopse;
                document.getElementById('trailer').value = filme.trailer;
                document.getElementById('capa').value = filme.capa;
                document.getElementById('categoria').value = filme.categoria;
            })
            .catch(error => {
                console.error('Erro ao carregar filme:', error);
                alert('Erro ao carregar filme: ' + error.message);
            });
    };

    // Função para deletar filme
    window.deletarFilme = function (id) {
        if (confirm('Tem certeza que deseja deletar este filme?')) {
            fetch(`${apiUrl}/deletar-filme/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao deletar filme: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    alert(data.message);
                    carregarFilmes(); // Recarrega a lista de filmes após a exclusão
                })
                .catch(error => {
                    console.error('Erro ao deletar filme:', error);
                    alert('Erro ao deletar filme: ' + error.message);
                });
        }
    };
});