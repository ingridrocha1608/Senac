// Preços dos alimentos
const precos = {
  pizza: 28.00,
  salada: 12.50,
  hamburguer: 18.00,
  suco: 6.50,
  sobremesa: 9.00
};

// Elementos do DOM
const selectAlimento = document.getElementById('alimento');
const inputQuantidade = document.getElementById('quantidade');
const btnAdicionar = document.getElementById('adicionar');
const divErro = document.getElementById('erro');
const listaPedido = document.getElementById('lista-pedido');
const totalGeral = document.getElementById('total-geral');

// Função para formatar nome (ex: 'pizza' -> 'Pizza')
function formatNome(chave) {
  return chave.charAt(0).toUpperCase() + chave.slice(1);
}

// Adicionar item
function adicionarItem() {
  clearErro();

  const chave = selectAlimento.value;
  const qtd = Number(inputQuantidade.value);

  if (!chave) {
    mostrarErro('Selecione um alimento.');
    return;
  }
  if (!qtd || qtd < 1 || qtd > 9) {
    mostrarErro('Quantidade inválida. Use 1 a 9.');
    return;
  }

  const precoUnit = precos[chave];
  if (typeof precoUnit === 'undefined') {
    mostrarErro('Alimento não encontrado no cardápio.');
    return;
  }

  const subtotal = precoUnit * qtd;

  const li = document.createElement('li');
  li.classList.add('novo');
  li.dataset.valor = subtotal.toString();

  const info = document.createElement('div');
  info.className = 'info';

  const nomeEl = document.createElement('strong');
  nomeEl.textContent = formatNome(chave);

  const qtdEl = document.createElement('span');
  qtdEl.textContent = `Qtd: ${qtd}`;

  info.appendChild(nomeEl);
  info.appendChild(qtdEl);

  const acoes = document.createElement('div');
  acoes.className = 'acoes';

  const precoSpan = document.createElement('div');
  precoSpan.textContent = `R$ ${subtotal.toFixed(2)}`;

  const btnRemover = document.createElement('button');
  btnRemover.type = 'button';
  btnRemover.className = 'remover';
  btnRemover.textContent = 'Remover';

  btnRemover.addEventListener('click', () => {
    li.remove();
    atualizarTotal();
    destacarMaisCaro();
  });

  acoes.appendChild(precoSpan);
  acoes.appendChild(btnRemover);

  li.appendChild(info);
  li.appendChild(acoes);
  listaPedido.appendChild(li);

  li.addEventListener('animationend', () => li.classList.remove('novo'));

  atualizarTotal();
  destacarMaisCaro();

  inputQuantidade.value = 1;
}

// Soma total
function atualizarTotal() {
  const itens = Array.from(listaPedido.querySelectorAll('li'));
  const soma = itens.reduce((acc, li) => acc + Number(li.dataset.valor || 0), 0);
  totalGeral.textContent = `Total: R$ ${soma.toFixed(2)}`;
}

// Destaca o item mais caro
function destacarMaisCaro() {
  const itens = Array.from(listaPedido.querySelectorAll('li'));
  if (itens.length === 0) return;

  itens.forEach(li => li.classList.remove('destaque'));

  let max = -Infinity;
  let caro = null;

  itens.forEach(li => {
    const val = Number(li.dataset.valor || 0);
    if (val > max) {
      max = val;
      caro = li;
    }
  });

  if (caro) caro.classList.add('destaque');
}

// Mostrar erro
function mostrarErro(msg) {
  divErro.textContent = msg;
}

// Limpar erro
function clearErro() {
  divErro.textContent = '';
}

// Eventos
btnAdicionar.addEventListener('click', adicionarItem);
selectAlimento.addEventListener('change', clearErro);

inputQuantidade.addEventListener('input', () => {
  let v = Number(inputQuantidade.value);
  if (v < 1) inputQuantidade.value = 1;
  if (v > 9) inputQuantidade.value = 9;
  clearErro();
});