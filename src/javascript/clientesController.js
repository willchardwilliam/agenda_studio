import {
  getClientes,
  adicionarCliente,
  removerCliente,
  atualizarCliente
} from "./clientesService.js"

import {
  criarElelementoCliente,
  limparLista,
  mostrarMensagem
} from "./clienteUI.js"

export const dom = {
  sectionForm: document.querySelector('[data-clientesCadastro]'),
  listaClientes: document.querySelector("[data-listaCliente]"),
  btnAbrirCadastro: document.getElementById("abrirCadastro"),
  btnSalvar: document.getElementById("salvarAlteracoes"),
  btnSubmit: document.getElementById("cadastrar"),
  btnCancelar: document.getElementById("cancelar"),
  btnFechar: document.getElementById("fecharCadastroCliente"),
  divMsg: document.querySelector(".divMsg")
}

const form = {
  formCliente: document.getElementById("cadastroCliente"),
  id: document.getElementById("id"),
  nome: document.getElementById("nomeCompleto"),
  email: document.getElementById("email"),
  telefone: document.getElementById("telefone")
}
export default function initClientes() {

  renderizar()

  function mostrarBotoesEdicao() {
    dom.btnCancelar.style.display = "flex"
    dom.btnSalvar.style.display = "flex"
    dom.btnSubmit.style.display = "none"
  }

  function abrirFormCadastro() {
    dom.sectionForm.classList.add("ativo")
  }

  function fecharFormCadastro() {
    dom.sectionForm.classList.remove("ativo")
  }
  
  dom.btnCancelar.addEventListener('click', () => {
    dom.btnSubmit.style.display = "flex"
    dom.btnCancelar.style.display = "none"
    dom.btnSalvar.style.display = "none"
    form.telefone.readOnly = false
    form.formCliente.reset()
  })

  dom.btnFechar.addEventListener('click', () => {
    fecharFormCadastro()
  })
  dom.btnAbrirCadastro.addEventListener('click', () => {
    abrirFormCadastro()
  })

  function confirmar(id) {
    let resposta = confirm("Deseja excluir o cliente?")

    if (resposta === true) {
      removerCliente(id)
      mostrarMensagem(dom.sectionForm, "Cliente excluido com sucesso!")
    } else {
      return
    }
  }

  function handleEventLista(event) {
    const btn = event.target.closest("button")

    if (!btn || !btn.dataset.id) return

    const id = Number(btn.dataset.id)

    if (btn.classList.contains("btn-excluir")) {
      confirmar(id)
      renderizar()
    }

    if (btn.classList.contains("btn-editar")) {
      const cliente = getClientes().find(c => c.id === id)

      if (!cliente) return
      preencherFormulario(cliente)
      abrirFormCadastro()
      mostrarBotoesEdicao()
    }
  }

  dom.listaClientes.addEventListener("click", handleEventLista)

  function renderizar() {
    limparLista(dom.listaClientes)

    getClientes().forEach(cliente => {
      const el = criarElelementoCliente(cliente)
      dom.listaClientes.appendChild(el)
    })
  }

  function cadastrar(e) {
    e.preventDefault()
    
    const cliente = {
      id: Date.now(),
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value
    }  
    
    try {
      adicionarCliente(cliente)
      mostrarMensagem(dom.sectionForm, "Cliente cadastrado")
    } catch (err) {
      mostrarMensagem(dom.sectionForm, err.mensage)
    }
    
    form.formCliente.reset()
    renderizar()
  }

  function preencherFormulario(cliente) {
    form.id.value = cliente.id
    form.nome.value = cliente.nome
    form.email.value = cliente.email
    form.telefone.value = cliente.telefone
    form.telefone.readOnly = true
  }

  function salvarDadosAtualizados() {
    const formulario = form.formCliente
    const formData = new FormData(formulario)
    const dadosAtualizados = Object.fromEntries(formData.entries())

    const id = Number(dadosAtualizados.id)

    delete dadosAtualizados.id

    atualizarCliente(id, dadosAtualizados)

    renderizar()

    mostrarMensagem(dom.sectionForm, "Cliente atualizado!")
  }

  dom.btnSalvar.addEventListener("click", salvarDadosAtualizados)

  form.formCliente.addEventListener("submit", cadastrar)
}
