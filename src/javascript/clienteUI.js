import { getClientes } from './clientesService.js';

export const dom = {
  sectionForm: document.querySelector('[data-clientesCadastro]'),
  listaClientes: document.querySelector("[data-listaCliente]"),
  btnAbrirCadastro: document.getElementById("abrirCadastro"),
  // btnSalvar: document.getElementById("salvarAlteracoes"),
  btnSubmit: document.getElementById("cadastrar"),
  btnCancelar: document.getElementById("cancelar"),
  btnFechar: document.getElementById("fecharCadastroCliente"),
  divMsg: document.querySelector(".divMsg")
};

export const form = {
  formCliente: document.getElementById("cadastroCliente"),
  id: document.getElementById("id"),
  nome: document.getElementById("nomeCompleto"),
  email: document.getElementById("email"),
  telefone: document.getElementById("telefone")
};

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
};

export function renderizar() {
  limparLista(dom.listaClientes);
  let listaHTML = "";
  
  getClientes().forEach(c => {
    listaHTML += renderCliente(c);
  })
  dom.listaClientes.innerHTML = listaHTML;
};

export function cancelarEdicao() {
  
};

export function limparLista(lista) {
  lista.innerHTML = "";
};

let timer;

export function mostrarMensagem(container, texto) {
  clearTimeout(timer);

  container.innerHTML = `<p>${texto}</p>`;
  container.classList.add("ativo");
  

  timer = setTimeout(() =>{
    container.innerHTML = "";
    container.classList.remove("ativo");
  }, 2000);
}
