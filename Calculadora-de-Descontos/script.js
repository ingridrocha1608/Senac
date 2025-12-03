const valorInput = document.querySelector('#valor');
const formaPagamento = document.querySelector('#formaPagamento');
const botaoCalcular = document.querySelector('#calcular');
const resultadoDiv = document.querySelector('#resultado');

function calcularValorFinal() {
  const preco = Number(valorInput.value);
  const forma = formaPagamento.value;
  let valorFinal;

  if (!preco || preco <= 0) {
    resultadoDiv.innerHTML = "Por favor, digite um valor válido.";
    return;
  }

  if (forma === "avista") {
    valorFinal = preco * 0.9;
  } else if (forma === "credito") {
    valorFinal = preco * 1.05;
  } else if (forma === "2x") {
    valorFinal = preco;
  } else if (forma === "3xoumais") {
    valorFinal = preco * 1.10;
  }

  resultadoDiv.innerHTML = ` Valor final: R$ ${valorFinal.toFixed(2)}`;
}

botaoCalcular.addEventListener('click', calcularValorFinal);
