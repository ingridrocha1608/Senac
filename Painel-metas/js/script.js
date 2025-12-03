document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#formMeta");
  const titulo = document.querySelector("#titulo");
  const descricao = document.querySelector("#descricao");
  const prioridade = document.querySelector("#prioridade");
  const dataMeta = document.querySelector("#dataMeta");
  const listaMetas = document.querySelector("#listaMetas");
  const erroGeral = document.querySelector("#erroGeral");

 
  if (!form || !titulo || !descricao || !prioridade || !dataMeta || !listaMetas || !erroGeral) {
    console.error("Algum elemento necessário não foi encontrado. Verifique os IDs no HTML.");
    return;
  }

  [titulo, descricao, prioridade, dataMeta].forEach(el => {
    el.addEventListener("input", () => { erroGeral.textContent = ""; });
    el.addEventListener("change", () => { erroGeral.textContent = ""; });
  });

  form.addEventListener("submit", adicionarMeta);

  function adicionarMeta(event) {
    event.preventDefault();
    erroGeral.textContent = ""; 

    if (titulo.value.trim() === "") {
      erroGeral.textContent = "Digite um título válido";
      titulo.focus();
      return;
    }

    if (descricao.value.trim() === "") {
      erroGeral.textContent = "Digite uma descrição válida";
      descricao.focus();
      return;
    }

    if (prioridade.value === "" || prioridade.value === null) {
      erroGeral.textContent = "Selecione uma prioridade válida";
      prioridade.focus();
      return;
    }

    if (dataMeta.value === "") {
      erroGeral.textContent = "Selecione uma data válida";
      dataMeta.focus();
      return;
    }

    const hoje = new Date().toISOString().split("T")[0];
    if (dataMeta.value < hoje) {
      erroGeral.textContent = "A data não pode ser anterior ao dia atual";
      dataMeta.focus();
      return;
    }

    const li = document.createElement("li");
    const prioridadeClasse = prioridade.value.toLowerCase();
    li.classList.add("meta-item", prioridadeClasse, "entrando");

    function esc(text) {
      return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    li.innerHTML = `
      <div class="meta-conteudo">
        <h3 class="meta-titulo">${esc(titulo.value)}</h3>
        <p class="meta-descricao">${esc(descricao.value)}</p>
        <p class="meta-info"><strong>Prioridade:</strong> ${esc(prioridade.value)}</p>
        <p class="meta-info"><strong>Data:</strong> ${esc(dataMeta.value)}</p>
      </div>

      <div class="meta-acoes">
        <button type="button" class="btn-concluir">Concluir</button>
        <button type="button" class="btn-remover">Remover</button>
      </div>
    `;

    setTimeout(() => li.classList.remove("entrando"), 350);

    const btnConcluir = li.querySelector(".btn-concluir");
    btnConcluir.addEventListener("click", () => {
      li.classList.toggle("concluida");
      btnConcluir.textContent = li.classList.contains("concluida") ? "Desfazer" : "Concluir";
    });

    const btnRemover = li.querySelector(".btn-remover");
    btnRemover.addEventListener("click", () => {
      li.classList.add("saindo");
      setTimeout(() => {
        if (li.parentElement) li.remove();
      }, 300); 
    });
    listaMetas.appendChild(li);

    form.reset();
    titulo.focus();

    console.log("Meta adicionada:", {
      titulo: titulo.value,
      descricao: descricao.value,
      prioridade: prioridade.value,
      data: dataMeta.value
    });
  }
});