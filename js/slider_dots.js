let lis = document.querySelectorAll("li");
let activePhase = 1; // Variável para ver que fase está ativa
let maxPhase = lis.length;

// Inicializa a fase 1 como visível
function initialize() {
  let firstLi = lis[0];
  if (firstLi) {
    let firstSpan = firstLi.querySelector("span");
    if (firstSpan) {
      firstSpan.style.display = "block";
      firstLi.classList.add("active");
      activePhase = parseInt(firstLi.getAttribute("data-phase"), 10) || 1;
    }
  }
}

// Atualiza a barra lateral com base na fase ativa
function updateActiveItem(index) {
  lis.forEach(function (li) {
    li.classList.remove("active");
    let span = li.querySelector("span");
    if (span) {
      span.style.display = "none";
    }
  });

  let activeLi = lis[index];
  if (activeLi) {
    activeLi.classList.add("active");
    let span = activeLi.querySelector("span");
    if (span) {
      span.style.display = "block";
    }
    activePhase = parseInt(activeLi.getAttribute("data-phase"), 10);
    if (typeof runPhase === "function") {
      runPhase(activePhase);
    } else {
      console.error("Função runPhase não está disponível.");
    }
  }
}

// Se clicar no li faz update do item ativo
lis.forEach(function (item, index) {
  item.addEventListener("click", function () {
    updateActiveItem(index);
  });
});

// Função para mudar a fase ativa de acordo com as setas
function changeActive(direction) {
  let activeLi = document.querySelector("li.active");
  if (!activeLi) return;

  let index = Array.from(lis).indexOf(activeLi);

  if (direction === "next") {
    index = (index + 1) % lis.length;
  } else if (direction === "prev") {
    index = (index - 1 + lis.length) % lis.length;
  }

  updateActiveItem(index);
}

// Detecta se as setas foram pressionadas e altera os estados
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    changeActive("next");
  } else if (event.key === "ArrowLeft") {
    changeActive("prev");
  }
});

// Inicializa o estado inicial
initialize();
