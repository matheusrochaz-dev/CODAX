import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  'https://xyxjjsjjhntqtyuogzox.supabase.co',
  'SUA_CHAVE_PUBLICA_AQUI' // ache essa no dashboard em Project Settings > API
)

async function carregarComentarios() {
  const { data, error } = await supabase
    .from('comentarios')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    document.getElementById('comentarios').textContent = "Erro ao carregar os comentários."
    console.error(error)
    return
  }

  document.getElementById('comentarios').innerHTML =
    data.length ? data.map(c => `<p>${c.texto}</p>`).join('') : 'Nenhum comentário ainda.'
}

async function enviarComentario() {
  const comentario = document.getElementById('comentario').value.trim()
  if (!comentario) return alert('Digite algo')

  const { error } = await supabase
    .from('comentarios')
    .insert([{ texto: comentario }])

  if (error) {
    alert('Erro ao enviar comentário.')
    console.error(error)
    return
  }

  document.getElementById('comentario').value = ''
  carregarComentarios()
}

carregarComentarios()