function toggleMenu() {
  document.getElementById("menu")?.classList.toggle("hidden");
}

function calcularHoras(entrada, saida) {
  const inicio = new Date(entrada);
  const fim = new Date(saida);
  const diffMs = fim - inicio;
  const diffH = diffMs / (1000 * 60 * 60);
  return diffH > 0 ? diffH : 0;
}

function salvarCadastro(e) {
  e.preventDefault();

  const placa = document.getElementById("placa").value;
  const entrada = document.getElementById("entrada").value;
  const saida = document.getElementById("saida").value;
  const valorHora = parseFloat(document.getElementById("valorHora").value);
  const total = calcularHoras(entrada, saida) * valorHora;

  const estadias = JSON.parse(localStorage.getItem("estadias")) || [];

  const editarIndex = localStorage.getItem("editarIndex");

  if (editarIndex !== null) {
    estadias[editarIndex] = { placa, entrada, saida, valorHora, total };
    localStorage.removeItem("editarIndex");
  } else {
    estadias.push({ placa, entrada, saida, valorHora, total });
  }

  localStorage.setItem("estadias", JSON.stringify(estadias));
  window.location.href = "index.html";
}

function carregarEstadias() {
  const lista = document.getElementById("lista-estadias");
  if (!lista) return;

  const estadias = JSON.parse(localStorage.getItem("estadias")) || [];

  lista.innerHTML = "";

  estadias.forEach((e, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${e.placa}</h3>
      <p>Entrada: ${new Date(e.entrada).toLocaleString()}</p>
      <p>Saída: ${new Date(e.saida).toLocaleString()}</p>
      <p>Valor Hora: R$ ${e.valorHora.toFixed(2)}</p>
      <strong>Total: R$ ${e.total.toFixed(2)}</strong>
      <div style="margin-top:10px;">
        <button onclick="editarVeiculo(${index})" class="btn">Editar</button>
      </div>
    `;
    lista.appendChild(card);
  });
}

function editarVeiculo(index) {
  const estadias = JSON.parse(localStorage.getItem("estadias")) || [];
  const veiculo = estadias[index];
  localStorage.setItem("editarIndex", index);
  localStorage.setItem("editarVeiculo", JSON.stringify(veiculo));
  window.location.href = "cadastro.html";
}

function preencherFormularioEdicao() {
  const veiculo = JSON.parse(localStorage.getItem("editarVeiculo"));
  if (!veiculo) return;

  document.getElementById("placa").value = veiculo.placa;
  document.getElementById("entrada").value = veiculo.entrada;
  document.getElementById("saida").value = veiculo.saida;
  document.getElementById("valorHora").value = veiculo.valorHora;

  localStorage.removeItem("editarVeiculo");
}

const form = document.getElementById("formCadastro");
if (form) {
  form.addEventListener("submit", salvarCadastro);
  preencherFormularioEdicao();
}

window.addEventListener("DOMContentLoaded", carregarEstadias);