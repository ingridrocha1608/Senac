const dicas = [
  "Estabeleça metas diárias e mantenha um cronograma.",
  "Faça resumos e mapas mentais para fixar melhor o conteúdo.",
  "Evite distrações e mantenha o celular longe durante os estudos.",
  "Estude em blocos de 50 minutos com pausas curtas entre eles.",
  "Revise o conteúdo regularmente para não esquecer o que aprendeu.",
  "Explique a matéria para alguém — ensinar é uma ótima forma de aprender."
];

const paragrafo = document.querySelector("#dica");
const botao = document.querySelector("button");
function gerarDica() {
  const indice = Math.floor(Math.random() * dicas.length);
  paragrafo.innerText = dicas[indice];
}
botao.addEventListener("click", gerarDica);
