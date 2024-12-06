let lis = document.querySelectorAll('li');

// Inicializa o primeiro <span> como visível
let firstLi = lis[0];
if (firstLi) {
  let firstSpan = firstLi.querySelector('span');
  if (firstSpan) {
    firstSpan.style.display = 'block'; // Torna o primeiro <span> visível
    firstLi.classList.add('active'); // Adiciona a classe 'active' ao primeiro <li>
  }
}

// Adiciona eventos de clique
lis.forEach(function(item) {
  item.addEventListener('click', function() {
    // Remove a classe 'active' de todos os itens <li> e esconde os <span>
    lis.forEach(function(li) {
      li.classList.remove('active');
      let span = li.querySelector('span');
      if (span) {
        span.style.display = 'none'; // Esconde o <span> de todos os <li>
      }
    });

    // Adiciona a classe 'active' ao item clicado e torna o <span> visível
    this.classList.add('active');
    let span = this.querySelector('span');
    if (span) {
      span.style.display = 'block'; // Torna o <span> do item clicado visível
    }

    // Pega o valor do atributo "data-phase" do item clicado
    let phase = this.getAttribute('data-phase');

    // Chama a função correspondente com base no atributo "data-phase"
    if (window['phase' + phase]) {
      window['phase' + phase]();  // Chama a função dinamicamente
    } else {
      console.log("Função fase " + phase + " não encontrada.");
    }
  });
});

// Função para mover para o próximo ou anterior
function changeActive(direction) {
  let activeLi = document.querySelector('li.active');
  if (!activeLi) return;

  let index = Array.from(lis).indexOf(activeLi);

  // Define o próximo ou o anterior dependendo da direção
  if (direction === 'next') {
    index = (index + 1) % lis.length; // Vai para o próximo item, ou volta para o começo
  } else if (direction === 'prev') {
    index = (index - 1 + lis.length) % lis.length; // Vai para o item anterior, ou volta para o final
  }

  // Remove a classe 'active' de todos os itens <li> e esconde os <span>
  lis.forEach(function(li) {
    li.classList.remove('active');
    let span = li.querySelector('span');
    if (span) {
      span.style.display = 'none';
    }
  });

  // Adiciona a classe 'active' ao item selecionado e torna o <span> visível
  let nextLi = lis[index];
  nextLi.classList.add('active');
  let nextSpan = nextLi.querySelector('span');
  if (nextSpan) {
    nextSpan.style.display = 'block';
  }
}

// Detecta o pressionamento das teclas de seta
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    changeActive('next'); // Muda para o próximo <li> quando pressionado a seta direita
  } else if (event.key === 'ArrowLeft') {
    changeActive('prev'); // Muda para o item anterior quando pressionado a seta esquerda
  }
});
