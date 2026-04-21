export default function initClientesContent() {

  const sectionForm = document.querySelector(
    "[data-clientesCadastro]",
  );

  function formCliente() {
    const btnAbrirForm = document.getElementById("btn-initFormCliente");
    
    const btnFecharForm = document.querySelector(".fechar");
    
    // remove a classe ao clique externo ao form
    sectionForm.addEventListener("click", (event) => {
      if (event.target === sectionForm) {
        sectionForm.classList.remove("show");
      }
    });

    // remove a classe ao clique
    btnFecharForm.addEventListener("click", () => {
      sectionForm.classList.remove("show");
    });

    // adiciona a classe ao clique
    btnAbrirForm.addEventListener("click", () => {
      sectionForm.classList.add("show");
    });
  }
  formCliente();

  const form = document.getElementById("cadastroCliente");
  const lista = document.querySelector("[data-listaCliente]");

  // verifica se existe em localstorage, se não, cria um array vazio
  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  console.log(clientes);

  // carrega a lista ao carregar a página
  window.addEventListener("load", renderizar);

  // função exibe lista
  function renderizar() {
    // limpa a lista antes de renderizar
    lista.innerHTML = "";

    clientes.forEach((cliente, index) => {
      // cria um elemento de lista
      const item = document.createElement("li");
      item.classList.add("itemLista");
      item.innerHTML = `
      <p>${cliente.nome} - ${cliente.telefone}</p>
      <button class="btn-excluir" data-index="${index}">Excluir</button>
      `;
      item.querySelector(".btn-excluir").addEventListener("click", excluirItem)
      lista.appendChild(item);
    });
  };

  function excluirItem(event) {
    const index = event.target.dataset.index;
    clientes.splice(index, 1);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    renderizar();
  }

  // função mensagem quando o cadastro é bem sucedido
  function msgCadastrou() {
    const div = document.createElement("div");
    div.innerText = "Cliente cadastrado com sucesso!"
    sectionForm.appendChild(div);
    setTimeout(() => {
      div.style.display = 'none';
    }, 1500)
  }

  // função mesnsagem quando cliente existe
  function msgClienteExiste() {
    const div = document.createElement("div");
    div.innerText = "Cliente Existente!";
    div.style.color = "red";
    sectionForm.appendChild(div);
    setTimeout(() => {
      div.style.display = 'none';
    }, 1500)
  }

  function cadastrar(event) {
    // não carregar a página
    event.preventDefault();
    
    // converte os dados do formulário em objeto
    const formData = new FormData(form);
    const cliente = Object.fromEntries(formData);

    // verifica se exixte um número de telefone igual
    if (!clientes.some(u => u.telefone === cliente.telefone)) {
      clientes.push(cliente);
      localStorage.setItem("clientes", JSON.stringify(clientes));
      msgCadastrou();
    } else {
      msgClienteExiste();
    }

    renderizar();

    form.reset();
    
  }

  form.addEventListener('submit', cadastrar);


}
