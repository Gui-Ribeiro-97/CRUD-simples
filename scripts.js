const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const snome = document.querySelector('#m-nome')
const sano = document.querySelector('#m-ano')
const spreco = document.querySelector('#m-preço')
const smarca = document.querySelector('#m-marca')
const sfornecedor = document.querySelector('#m-fornecedor')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    snome.value = itens[index].nome
    sano.value = itens[index].ano
    spreco.value = itens[index].preco
    smarca.value = itens[index].marca
    sfornecedor.value = itens[index].fornecedor
    id = index
  } else {
    snome.value = ''
    sano.value = ''
    spreco.value = ''
    smarca.value = ''
    sfornecedor.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.ano}</td>
    <td>R$ ${item.preco}</td>
    <td>${item.marca}</td>
    <td>${item.fornecedor}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (snome.value == '' || sano.value == '' || spreco.value == '' || smarca.value == '' || sfornecedor.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = snome.value
    itens[id].ano = sano.value
    itens[id].preco = spreco.value
    itens[id].marca = smarca.value
    itens[id].fornecedor = sfornecedor.value
  } else {
    itens.push({'nome': snome.value, 'ano': sano.value, 'preço': spreco.value, 'marca': smarca.value, 'Fornecedor': sfornecedor.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()