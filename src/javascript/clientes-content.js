export default function initClientesContent() {

  const dom = {
    formCliente: document.getElementById("cadastroCliente"),
    sectionForm: document.querySelector('[data-clientesCadastro]'),
    listaClientes: document.querySelector("[data-listaCliente]"),
    btnAbrirCadastro: document.getElementById("abrirCadastro"),
    btnSalvar: document.getElementById("salvarAlteracoes"),
    btnSubmit: document.getElementById("cadastrar"),
    btnCancelar: document.getElementById("cancelar")
  }

  const form = {
    id: document.getElementById("registroId"),
    nome: document.getElementById("nomeCompleto"),
    email: document.getElementById("email"),
    telefone: document.getElementById("telefone")
  }

  function handleCadastro() {
    dom.sectionForm.classList.toggle("ativo");
  }
  
  dom.btnCancelar.addEventListener('click', () => {
    dom.btnSubmit.style.display = "flex"
    dom.btnCancelar.style.display = "none"
    dom.btnSalvar.style.display = "none"
    form.telefone.readOnly = false
    dom.formCliente.reset()
  })

  dom.btnAbrirCadastro.addEventListener('click', handleCadastro);
  // verifica se existe em localstorage, se não, cria um array vazio
  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

  // carrega a lista ao carregar a página
  window.addEventListener("load", renderizar);
  
  

  // função exibe lista
  function renderizar(event) {
    
    // limpa a lista antes de renderizar
    dom.listaClientes.innerHTML = "";

    clientes.forEach((cliente) => {
      // cria um elemento de lista
      const item = document.createElement("li");
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const p3 = document.createElement("p");
      const btnExcluir = document.createElement("button");
      const btnEditar = document.createElement("button");

      p1.innerText = `Nome: ${cliente.nome}`;
      p2.innerText = `E-mail: ${cliente.email}`;
      p3.innerText = `Telefone: ${cliente.phone}`;

      btnExcluir.innerText  = "Excluir";
      btnExcluir.classList.add("btn-excluir");
      item.classList.add("itemLista");

      item.innerHTML = `
      <p>Nome: ${cliente.nome}</p>
      <p>E-mail: ${cliente.email}</p>
      <p>Telefone: ${cliente.phone}</p>
      <button class="btn-excluir" data-index="${cliente.id}">Excluir</button>
      <button class="btn-editar" data-index="${cliente.id}">Editar</button>
      `;
      item.querySelector(".btn-excluir").addEventListener("click", excluirItem);
      item.querySelector(".btn-editar").addEventListener('click', editarRegistro);
      dom.listaClientes.appendChild(item);
    });

  };
  

  function editarRegistro(event) {
    dom.btnSubmit.style.display = "none"
    dom.btnSalvar.style.display = "flex"
    dom.btnCancelar.style.display = "flex"
    
    const idUnico = Number(event.target.dataset.index)
    const clienteParaEditar = clientes.find(c => c.id === idUnico);

    if (clienteParaEditar) {
      form.id.value = clienteParaEditar.id;
      form.nome.value = clienteParaEditar.nome;
      form.email.value = clienteParaEditar.email;
      form.telefone.value = clienteParaEditar.phone;
      form.telefone.readOnly = true

      dom.sectionForm.classList.add("ativo");
    } else {
      msg("Erro ao encontrar ID de registro!")
      return;
    }
  }

  dom.btnSalvar.addEventListener('click', salvarAlteracoes)
  function salvarAlteracoes() {
    const idCliente = Number(form.id.value)
    const clientesEditados = clientes.map(cliente => {
      if (cliente.id === idCliente) {
        return {...cliente, nome: form.nome.value, email: form.email.value }
      }
      return cliente
    })
    clientes = clientesEditados
    localStorage.setItem("clientes", JSON.stringify(clientes))
    msg("Cadastro editado com sucesso!")
    renderizar()
    dom.formCliente.reset()
  }
  
  function excluirItem(event) {
    const idUnico = Number(event.target.dataset.index);

    clientes = clientes.filter(item => item.id !== idUnico)

    localStorage.setItem('clientes', JSON.stringify(clientes));
    renderizar();
  }

  // função mensagem
  function msg(msg) {
    const div = document.createElement("div")
    div.classList.add("msgForm")
    div.innerText = msg
    dom.sectionForm.appendChild(div);
    setTimeout(() => {
      div.style.display = 'none';
    }, 2000)
  }

  function cadastrar(event) {
    // não carregar a página
    event.preventDefault();
    
    // captura os valores no momento do clique
    const novoCliente = {
      id: Date.now(),
      nome: form.nome.value,
      email: form.email.value,
      phone: form.telefone.value
    }  
    
    // verifica se exixte um número de telefone igual
    if (!clientes.some(u => u.phone === novoCliente.phone)) {
      clientes.push(novoCliente);
      msg("Cadastro bem sucedido!");
    } else {
      msg("Número de telefone existente");
      return; // para não limpar o form e nem renderizar à toa
    }
    localStorage.setItem("clientes", JSON.stringify(clientes));
    renderizar();
    dom.formCliente.reset();
  }

  dom.formCliente.addEventListener('submit', cadastrar);
}
