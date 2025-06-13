// Função para buscar e exibir comentários
async function carregarComentarios() {
    try {
        const response = await fetch('https://backk-1-5s4u.onrender.com/comentariosO');
        if (!response.ok) throw new Error('Erro ao buscar comentários');
        
        const data = await response.json();
        document.getElementById('comentarios').textContent = data.comentarios || "Nenhum comentário ainda.";
    } catch (error) {
        console.error(error);
        document.getElementById('comentarios').textContent = "Erro ao carregar comentários.";
    }
}

// Função para enviar novo comentário
async function enviarComentario(event) {
    event.preventDefault();
    const input = document.getElementById('comentario');
    const comentario = input.value.trim();

    if (!comentario) {
        alert('Escreva um comentário antes de enviar.');
        return;
    }

    try {
        const response = await fetch('https://backk-1-5s4u.onrender.com/comentarO', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comentario })
        });
        
        if (response.ok) {
            alert('Comentário enviado com sucesso!');
            input.value = '';
            carregarComentarios(); // Atualiza lista de comentários
        } else {
            alert('Erro ao enviar comentário.');
        }
    } catch (error) {
        console.error(error);
        alert('Erro na requisição para enviar comentário.');
    }
}

// Evento para carregar comentários quando a página carregar
window.addEventListener('load', carregarComentarios);

