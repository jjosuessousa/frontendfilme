document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost/backend_filme/public';
    const filmeForm = document.getElementById('filme-form');
    const filmesList = document.getElementById('filmes-list');
    const capaInput = document.getElementById('capa');
    const capaPreview = document.getElementById('capa-preview');

    // Carrega a lista de filmes ao iniciar
    carregarFilmes();

    // Preview da imagem ao selecionar
    capaInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                capaPreview.src = e.target.result;
                capaPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

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
                            <div class="filme-card">
                                <h3>${filme.titulo}</h3>
                                <p><strong>Categoria:</strong> ${filme.categoria}</p>
                                <img src="http://localhost/backend_filme/uploads/${filme.capa}" alt="${filme.titulo}">
                                <div class="btn-group">
                                    <button onclick="editarFilme(${filme.id})" class="btn-edit">
                                        <i class="fas fa-edit"></i> Editar
                                    </button>
                                    <button onclick="deletarFilme(${filme.id})" class="btn-delete">
                                        <i class="fas fa-trash"></i> Deletar
                                    </button>
                                </div>
                            </div>
                        `;
                    });
                    filmesList.innerHTML = html;
                } else {
                    filmesList.innerHTML = '<div class="loading">Nenhum filme encontrado.</div>';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar filmes:', error);
                filmesList.innerHTML = '<div class="loading">Erro ao carregar filmes. Tente novamente mais tarde.</div>';
            });
    }

    // Função para cadastrar/atualizar filme
    filmeForm.addEventListener('submit', function (e) {
        e.preventDefault();
    
        const titulo = document.getElementById('titulo').value;
        const sinopse = document.getElementById('sinopse').value;
        const trailer = document.getElementById('trailer').value;
        const capa = document.getElementById('capa').files[0];
        const categoria = document.getElementById('categoria').value;
    
        // Validação do título
        if (!titulo) {
            alert('O título do filme é obrigatório.');
            return;
        }
    
        // Criação do FormData para enviar os dados
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('sinopse', sinopse);
        formData.append('trailer', trailer);
        if (capa) formData.append('capa', capa);
        formData.append('categoria', categoria);
    
        // URL para cadastro de novos filmes
        const url = `${apiUrl}/cadastrar-filme`;
    
        // Requisição POST para cadastrar filme
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) throw new Error('Erro ao cadastrar filme.');
                return response.json();
            })
            .then(data => {
                alert(data.message);
                carregarFilmes(); // Atualiza a lista de filmes
                filmeForm.reset(); // Limpa o formulário
                capaPreview.style.display = 'none'; // Esconde a prévia da capa
            })
            .catch(error => {
                console.error('Erro ao cadastrar filme:', error);
                alert('Erro ao cadastrar filme: ' + error.message);
            });
    });

   // Função para editar filme
window.editarFilme = function (id) {
    // Mostra um carregando ao usuário enquanto busca os dados
   

    // Faz a requisição para buscar os dados do filme pelo ID
    fetch(`${apiUrl}/filme/${id}`)
        .then(response => {
            if (!response.ok) {
                // Caso o servidor retorne erro, lança uma mensagem personalizada
                throw new Error('Erro ao carregar o filme. Por favor, tente novamente.');
            }
            return response.json();
        })
        .then(filme => {
            // Preenche os campos do formulário com os dados do filme
            document.getElementById('filme-id').value = filme.id || '';
            document.getElementById('titulo').value = filme.titulo || '';
            document.getElementById('sinopse').value = filme.sinopse || '';
            document.getElementById('trailer').value = filme.trailer || '';
            document.getElementById('categoria').value = filme.categoria || '';

            // Define a visualização da capa, caso exista
            if (filme.capa) {
                capaPreview.src = `http://localhost/backend_filme/uploads/${filme.capa}`;
                capaPreview.style.display = 'block';
            } else {
                capaPreview.src = '';
                capaPreview.style.display = 'none';
            }

            // Rola suavemente para o formulário para melhorar a experiência do usuário
            document.getElementById('filme-form').scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            alert('Dados do filme carregados com sucesso!');
        })
        .catch(error => {
            // Trata erros de forma amigável
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
                    if (!response.ok) throw new Error('Erro ao deletar filme.');
                    return response.json();
                })
                .then(data => {
                    alert(data.message);
                    carregarFilmes();
                })
                .catch(error => {
                    console.error('Erro ao deletar filme:', error);
                    alert('Erro ao deletar filme: ' + error.message);
                });
        }
    };
});