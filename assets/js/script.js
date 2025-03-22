async function carregarFilmes() {
    try {
        console.log("Fazendo requisição à API...");
        const resposta = await fetch('http://localhost/filmes/public/?rota=filmes');
        if (!resposta.ok) throw new Error("Erro ao carregar filmes.");

        const filmes = await resposta.json();
        console.log("Filmes recebidos:", filmes); // Exibe os filmes no console

        const container = document.getElementById('filmes-container');
        container.innerHTML = ''; // Limpa o conteúdo anterior

        filmes.forEach(filme => {
            const capa = filme.capa 
                ? `http://localhost/filmes/public/${filme.capa}`
                : 'http://localhost/filmes/public/filmes/uploads/imagem_padrao.jpg';

            console.log("Caminho da imagem:", capa); // Exibe o caminho da imagem no console

            const card = `
                <div class="col-md-3 mb-4">
                    <div class="card">
                        <img src="${capa}" class="card-img-top" alt="${filme.titulo}">
                        <div class="card-body">
                            <h5 class="card-title">${filme.titulo}</h5>
                            <p class="card-text">${filme.sinopse.substring(0, 100)}...</p>
                            <a href="${filme.trailer}" target="_blank" class="btn btn-primary">Assistir Trailer</a>
                        </div>
                    </div>
                </div>`;
            container.innerHTML += card;
        });
    } catch (erro) {
        console.error("Erro ao carregar filmes:", erro.message);
        alert("Não foi possível carregar os filmes.");
    }
}