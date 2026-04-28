import { nanoid } from '../../node_modules/nanoid/nanoid.js'

import {
  getClientes,
  adicionarCliente,
  removerCliente,
  atualizarCliente
} from "./clientesService.js"

import {
  renderizar,
  limparLista,
  mostrarMensagem,
  renderCliente,
  dom,
  form,
  cancelarEdicao,
  mostrarBotoesEdicao
} from "./clienteUI.js"


export default function initClientes() {

  renderizar()

  function abrirFormCadastro() {
    dom.sectionForm.classList.add("ativo")
  }

  function fecharFormCadastro() {
    dom.sectionForm.classList.remove("ativo")
  }
  
  dom.btnCancelar.addEventListener('click', () => {
    cancelarEdicao()
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
      mostrarMensagem(dom.divMsg, "Cliente excluido com sucesso!")
    } else {
      return
    }
  }

  function handleEventLista(event) {
    const btn = event.target.closest("button")

    if (!btn || !btn.dataset.id) return

    const id = btn.dataset.id

    if (btn.classList.contains("btn-excluir")) {
      confirmar(id)
      renderizar()
    }

    if (btn.classList.contains("btn-editar")) {
      const cliente = getClientes().find(c => c.id === id)

      if (!cliente) return
      abrirFormCadastro()
      preencherFormulario(cliente)
      mostrarBotoesEdicao()
    }
  }

  dom.listaClientes.addEventListener("click", handleEventLista)


  function cadastrar(e) {
    e.preventDefault()
    
    const idCliente = nanoid()


    const cliente = {
      id: idCliente,
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value
    }  
    
    try {
      adicionarCliente(cliente)
      mostrarMensagem(dom.divMsg, "Cliente cadastrado")
    } catch (err) {
      mostrarMensagem(dom.divMsg, err.mensage)
    }
    
    form.formCliente.reset()
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

    // console.log(dadosAtualizados)

    const id = dadosAtualizados.id

    

    atualizarCliente(id, dadosAtualizados)

    mostrarMensagem(dom.divMsg, "Cliente atualizado!")
  }

  dom.btnSalvar.addEventListener("click", salvarDadosAtualizados)

  form.formCliente.addEventListener("submit", cadastrar)
}
