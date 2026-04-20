export default function initClientesContent() {
  function initFormCliente() {
    const btnFormCliente = document.getElementById("btn-initFormCliente");

    const btnFecharForm = document.querySelector(".fechar");

    const formCadastroCliente = document.querySelector(
      "[data-clientesCadastro]",
    );

    formCadastroCliente.addEventListener("click", (event) => {
      if (event.target === formCadastroCliente) {
        formCadastroCliente.classList.remove("show");
      }
    });

    btnFecharForm.addEventListener("click", () => {
      formCadastroCliente.classList.remove("show");
    });

    btnFormCliente.addEventListener("click", () => {
      formCadastroCliente.classList.add("show");
    });
  }
  initFormCliente();

  const form = document.getElementById("cadastroCliente");
  const listaClientes = document.querySelector("[data-listaCliente]");

  let listaDados = [];

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const dados = {
      nome: document.getElementById("nomeCompleto").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
    };

    listaDados.push(dados);
    const itemLista = document.createElement("li");
    itemLista.innerText = `${dados.nome} - ${dados.telefone}`;
    listaClientes.appendChild(itemLista);

    form.reset();
  });

}
