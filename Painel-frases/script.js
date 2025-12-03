const frases = [
  "Acredite no seu potencial e vá além!",
  "Você é capaz de conquistar qualquer coisa.",
  "Nunca desista dos seus sonhos.",
  "Cada dia é uma nova chance de recomeçar.",
  "A persistência leva ao sucesso.",
  "Você é mais forte do que imagina.",
];

const botao = document.querySelector("button");
const paragrafo = document.querySelector("p");
function gerarFrases() {
  const indice = Math.floor(Math.random() * frases.length);
  paragrafo.innerText = frases[indice];
};
botao.addEventListener("click", gerarFrases);