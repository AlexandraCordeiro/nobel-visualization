let lis = document.querySelectorAll('li');
let activePhase = 1; // Variável para rastrear a fase ativa
let maxPhase = lis.length;

// Inicializa o primeiro <span> como visível
function initialize() {
  let firstLi = lis[0];
  if (firstLi) {
    let firstSpan = firstLi.querySelector('span');
    if (firstSpan) {
      firstSpan.style.display = 'block';
      firstLi.classList.add('active');
      activePhase = parseInt(firstLi.getAttribute('data-phase'), 10) || 1;
    }
  }
}

// Atualiza a exibição com base no item ativo
function updateActiveItem(index) {
  lis.forEach(function(li) {
    li.classList.remove('active');
    let span = li.querySelector('span');
    if (span) {
      span.style.display = 'none';
    }
  });

  let activeLi = lis[index];
  if (activeLi) {
    activeLi.classList.add('active');
    let span = activeLi.querySelector('span');
    if (span) {
      span.style.display = 'block';
    }
    activePhase = parseInt(activeLi.getAttribute('data-phase'), 10);
    if (typeof runPhase === 'function') {
      runPhase(activePhase);
    } else {
      console.error('Função runPhase não está disponível.');
    }
  }
}

// Configura os eventos de clique nos itens <li>
lis.forEach(function(item, index) {
  item.addEventListener('click', function() {
    updateActiveItem(index);
  });
});

// Função para mudar a fase ativa usando as setas
function changeActive(direction) {
  let activeLi = document.querySelector('li.active');
  if (!activeLi) return;

  let index = Array.from(lis).indexOf(activeLi);

  if (direction === 'next') {
    index = (index + 1) % lis.length;
  } else if (direction === 'prev') {
    index = (index - 1 + lis.length) % lis.length;
  }

  updateActiveItem(index);
}

// Detecta o pressionamento das teclas de seta
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    changeActive('next');
  } else if (event.key === 'ArrowLeft') {
    changeActive('prev');
  }
});

// Inicializa o estado inicial
initialize();
