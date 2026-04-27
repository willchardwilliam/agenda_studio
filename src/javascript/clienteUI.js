import form from './clientesController.js'

export function renderCliente(cliente) {
  return `
    <li class="itemLista">
    <p>Nome: ${cliente.nome}</p>
    <p>Email: ${cliente.email}</p>
    <p>Telefone: ${cliente.telefone}</p>
    <button data-id="${cliente.id}" class="btn-excluir">Excluir</button>
    <button data-id="${cliente.id}" class="btn-editar">Editar</button>
    </li>
  `
}

export function criarElelementoCliente(cliente) {
  const li = document.createElement("li")
  li.classList.add("itemLista")

  li.innerHTML = `
    <p>Nome: ${cliente.nome}</p>
    <p>Email: ${cliente.email}</p>
    <p>Telefone: ${cliente.telefone}</p>
    <button data-id="${cliente.id}" class="btn-excluir">Excluir</button>
    <button data-id="${cliente.id}" class="btn-editar">Editar</button>
    `
  
    return li
}

export function limparLista(lista) {
  lista.innerHTML = ""
}

export function mostrarMensagem(container, texto) {
  container.innerHTML = `<p>${texto}</p>`
  container.classList.add("ativo")
  

  setTimeout(() =>{
    container.innerHTML = ""
    container.classList.remove("ativo")
  }, 2000)
}
