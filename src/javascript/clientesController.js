import { nanoid } from '../../node_modules/nanoid/nanoid.js';

import {
  getClientes,
  adicionarCliente,
  removerCliente,
  atualizarCliente
} from "./clientesService.js";

import {
  renderizar,
  limparLista,
  mostrarMensagem,
  renderCliente,
  dom,
  form,
  cancelarEdicao,
} from "./clienteUI.js";


export default function initClientes() {

  let clienteSendoEditadoId = null;
  renderizar();

  function abrirFormCadastro() {
    dom.sectionForm.classList.add("ativo");
  }

  function fecharFormCadastro() {
    dom.sectionForm.classList.remove("ativo");
  }
  
  dom.btnCancelar.addEventListener('click', () => {
    finalizarAcao();
  })

  dom.btnFechar.addEventListener('click', () => {
    fecharFormCadastro();
  })
  dom.btnAbrirCadastro.addEventListener('click', () => {
    abrirFormCadastro();
  })

  function confirmar(id) {
    let resposta = confirm("Deseja excluir o cliente?");

    if (resposta === true) {
      removerCliente(id);
      mostrarMensagem(dom.divMsg, "Cliente excluido com sucesso!");
    } else {
      return;
    };
  };

  function handleEventLista(event) {
    const btn = event.target.closest("button");

    if (!btn || !btn.dataset.id) return;

    const id = btn.dataset.id;

    if (btn.classList.contains("btn-excluir")) {
      confirmar(id);
      renderizar();
    }

    if (btn.classList.contains("btn-editar")) {
      const cliente = getClientes().find(c => c.id === id);

      if (!cliente) return;

      abrirFormCadastro();
      preencherFormulario(cliente);
      botoesEdicao();
    };
  };

  dom.listaClientes.addEventListener("click", handleEventLista);

  function botoesEdicao() {
    if(clienteSendoEditadoId) {
      dom.btnCancelar.style.display = "block";
    } else {
      dom.btnCancelar.style.display = "none";
    };
  };

  function cadastrar(e) {
    e.preventDefault();
    
    const idCliente = nanoid();

    const cliente = {
      id: idCliente,
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value
    };
    
    try {
      adicionarCliente(cliente);
      mostrarMensagem(dom.divMsg, "Cliente cadastrado com sucesso!");
      form.formCliente.reset();

    } catch (err) {
      mostrarMensagem(dom.divMsg, err.message);
    };
    
  };

  function preencherFormulario(cliente) {
    clienteSendoEditadoId = cliente.id;

    form.id.value = cliente.id;
    form.nome.value = cliente.nome;
    form.email.value = cliente.email;
    form.telefone.value = cliente.telefone;

    dom.btnSubmit.textContent = "Salvar alterações"
  };

  function salvarDadosAtualizados() {
    try {
      const formulario = form.formCliente;
      const formData = new FormData(formulario);
      const dadosAtualizados = Object.fromEntries(formData.entries());

      const id = dadosAtualizados.id;
      if(!id) {
        throw new Error("ID do cliente não encontrado.")
      }  
   
      atualizarCliente(id, dadosAtualizados);
      mostrarMensagem(dom.divMsg, "Cliente atualizado!");
      finalizarAcao();

    } catch (err) {
      mostrarMensagem(dom.divMsg, err.message);
    };
   
  };

   

  function finalizarAcao() {
    clienteSendoEditadoId = null;
    form.formCliente.reset();
    dom.btnSubmit.textContent = "Cadastrar cliente";
  };

  form.formCliente.addEventListener("submit", (e) =>{
    e.preventDefault();

    if(clienteSendoEditadoId) {
      salvarDadosAtualizados();

    } else {
      cadastrar(e);
    };

  });
};
