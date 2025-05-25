async function carregarComentarios() {
    try {
        const response = await fetch('https://backk-vty6.onrender.com/comentarios');
        const data = await response.json();
        const container = document.getElementById('comentarios');
        container.innerHTML = '';

        data.forEach(comentario => {
            const div = document.createElement('div');
            div.className = 'comentario';
            div.innerHTML = `
                <p>${comentario.texto}</p>
                <button onclick="editarComentario(${comentario.id}, '${comentario.texto.replace(/'/g, "\\'")}')">Editar</button>
                <button onclick="apagarComentario(${comentario.id})">Apagar</button>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao carregar comentários:', error);
        document.getElementById('comentarios').textContent = "Erro ao carregar os comentários.";
    }
}

async function enviarComentario(event) {
    event.preventDefault();
    const comentario = document.getElementById('comentario').value.trim();
    if (comentario) {
        try {
            const response = await fetch('https://backk-vty6.onrender.com/comentar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comentario })
            });
            if (response.ok) {
                document.getElementById('comentario').value = '';
                carregarComentarios();
            } else {
                alert('Erro ao enviar comentário.');
            }
        } catch (error) {
            alert('Erro ao enviar comentário.');
        }
    }
}

async function editarComentario(id, textoAtual) {
    const novoTexto = prompt("Editar comentário:", textoAtual);
    if (novoTexto !== null && novoTexto.trim() !== "") {
        await fetch(`https://backk-vty6.onrender.com/editar/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comentario: novoTexto.trim() })
        });
        carregarComentarios();
    }
}

async function apagarComentario(id) {
    if (confirm("Tem certeza que deseja apagar este comentário?")) {
        await fetch(`https://backk-vty6.onrender.com/apagar/${id}`, {
            method: 'DELETE'
        });
        carregarComentarios();
    }
}

window.onload = carregarComentarios;
