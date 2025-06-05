// Função para obter e exibir os comentários
async function carregarComentarios() {
    try {
        const response = await fetch('https://backk-vty6.onrender.com/comentarios');
        const data = await response.json();
        document.getElementById('comentarios').textContent = data.comentarios || "Nenhum comentário ainda.";
    } catch (error) {
        console.error('Erro ao carregar comentários:', error);
        document.getElementById('comentarios').textContent = "Erro ao carregar os comentários.";
    }
}

// Função para enviar um novo comentário
async function enviarComentario(event) {
    event.preventDefault();
    const comentario = document.getElementById('comentario').value.trim();
    if (comentario) {
        try {
            const response = await fetch('https://backk-vty6.onrender.com/comentar', {  // Note aqui a URL /comentar
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comentario })
            });

            if (response.ok) {
                alert('Comentário enviado!');
                document.getElementById('comentario').value = ''; // Limpar campo
                carregarComentarios(); // Recarregar comentários
            } else {
                alert('Erro ao enviar comentário.');
            }
        } catch (error) {
            console.error('Erro ao enviar comentário:', error);
            alert('Erro ao enviar comentário.');
        }
    }
}

// Carregar comentários ao iniciar a página
window.onload = carregarComentarios;

// Supondo que você tenha um form com id="form-comentario"
document.getElementById('form-comentario').addEventListener('submit', enviarComentario);
