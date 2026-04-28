import { renderizar } from './clienteUI.js'

let clientes = JSON.parse(localStorage.getItem("clientes")) || []

export function getClientes() {
  return clientes
}

export function salvarClientes() {
  localStorage.setItem("clientes", JSON.stringify(clientes))
  renderizar()
}

export function adicionarCliente(cliente) {
  const existe = clientes.some(c => c.telefone === cliente.telefone)
  
  if (existe) {
    throw new Error("Cliente já existe")
  }

  clientes.push(cliente)
  salvarClientes()
}

export function removerCliente(id) {
  clientes = clientes.filter(c => c.id !== id)
  salvarClientes()
}

export function atualizarCliente(id, dadosAtualizados) {
  console.log(id, dadosAtualizados)
  clientes = clientes.map(cliente => (cliente.id === id)  ? { ...cliente, ...dadosAtualizados } : cliente)
  console.log(clientes)
  salvarClientes()
}
