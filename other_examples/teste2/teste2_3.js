/* colocar o dataset associado para ver, para cada bolinha (1024) o nome do laureado e o premio que recebeu (on hovered)*/
let svg;
//import do dataset dos laureados
let laureatesFile = "../../dataset/laureates_data.csv";
let phase = 1;
let totalCircles = 0; // Número total de círculos baseado no dataset

window.onload = function () {
  let data = [];

  svg = d3.select("svg");
  let width = window.innerWidth - 100;
  let height = window.innerHeight - 100;
  // Atualiza o tamanho do SVG
  svg.attr("width", width).attr("height", height);
  // Escalas para ajustar os valores
  const xScale = d3.scaleLinear().domain([0, 10]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 10]).range([0, height]);
  // Atualiza largura e escala em redimensionamento da janela
  let originalWidth = window.innerWidth - 100;
  let originalHeight = window.innerHeight - 100;
  const Ratio = originalHeight / originalWidth; // Proporção inicial de altura para largura

  function resize() {
    // Atualizar dimensões
    let newWidth = window.innerWidth - 100;
    let newHeight = newWidth * Ratio;
    // Atualiza o tamanho do SVG
    svg.attr("width", newWidth).attr("height", newHeight);
    // Recalcula as escalas com base no novo tamanho
    xScale.range([0, newWidth]);
    yScale.range([0, newHeight]);
    // Recalcula as posições dos círculos proporcionalmente
    data = data.map((d) => ({
      ...d,
      x: (d.x / originalWidth) * newWidth, // Ajuste proporcional da largura
      y: (d.y / originalHeight) * newHeight, // Ajuste proporcional da altura
    }));

    //para garantir que o width e o height sejam proporcionais
    // Atualiza as dimensões originais para as próximas interações
    originalWidth = newWidth;
    originalHeight = newHeight;
    // Atualiza os círculos no SVG
    update();
  }

  window.addEventListener("resize", resize);

  d3.csv(laureatesFile, (d) => {
    return { //importa todos os dados dos laureados
      id: +d.id,
      name: d.knownName,
      prizeCategory: d.category,
      awardYear: d.awardYear,
      gender: d.gender,
    };
  })
  .then((loadedData) => {
    laureates = loadedData;
    totalCircles = laureates.length;
    update();
    data.forEach((circle) => {
      console.log(`ID: ${circle.id}, Name: ${circle.name}, X: ${circle.x}, Y: ${circle.y}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao carregar os dados:", error);
  });
  // Fase 1: Adicionar um círculo central
  function phase1() {
    data = [{ id: 0, x: xScale(5), y: yScale(5), r: 300, color: "#E9DF69" }];
    update();
  }

  // Fase 2: Adicionar nº total de circulos
  function phase2() {
    const centerX = width / 2; // Centro da grelha
    const centerY = height / 2; // Centro da grelha
    const circleRadius = 7; // Raio de cada círculo
    const gap = 1; // Espaçamento entre círculos
    const effectiveRadius = circleRadius + gap; // Raio efetivo considerando o gap

    data = []; // Redefine os dados

    let currentRadius = 0; // Raio atual da camada
    let index = 0; // Índice para acessar laureates

    // Processa apenas os laureados disponíveis
    const totalLaureates = laureates.length;

    while (index < totalLaureates) {
        currentRadius += effectiveRadius * 2; // Incrementa o raio da camada com base no tamanho efetivo
        // Número de círculos na camada atual, proporcional ao comprimento da circunferência
        const circumference = 2 * Math.PI * currentRadius;
        const circlesInLayer = Math.min(
            totalLaureates - index,
            Math.floor(circumference / (effectiveRadius * 2))
        );

        // Ângulo entre círculos nesta camada
        const angleStep = (2 * Math.PI) / circlesInLayer;

        // Adiciona os círculos da camada
        for (let i = 0; i < circlesInLayer; i++) {
            const angle = i * angleStep;
            const x = centerX + currentRadius * Math.cos(angle);
            const y = centerY + currentRadius * Math.sin(angle);

            // Obtem o laureado correspondente
            const laureate = laureates[index] || { id: null, name: "Unknown", gender: "Unknown" };
            //console.log(laureate);

            data.push({ //dá push apenas dos dados que quero ver
                x: x,
                y: y,
                r: circleRadius,
                color: "#E9DF69",
                id: laureate.id,
                name: laureate.name,
                gender: laureate.gender,
                prizeCategory: laureate.prizeCategory,
                awardYear: laureate.awardYear
            });
            index++; // Avança para o próximo laureado
        }
    }

    update(); // Atualiza o SVG com os novos círculos
}

  // Fase 3: Remover os círculos com ids específicos
  function phase3() {
    const idsToRemove = [5, 9, 4, 2];
    data = data.filter((d) => !idsToRemove.includes(d.id));
    update();
  }

  // Fase 4: Adicionar uma bola amarela
  function phase4() {
    data.push({
      id: data.length,
      x: xScale(Math.random() * 10),
      y: yScale(Math.random() * 10),
      r: 20,
      color: "yellow",
    });
    update();
  }

  // Função de atualização que faz o binding de dados com os elementos SVG
  function update() {

    const mOver = function(e, d){
        // e is the mouseEvent
        // d is the data
        console.log(d);
        d3.select(this) // this is the svg element interacted with
            .style("stroke", "black")
            .style("opacity", 1);
        d3.select(this.parentNode)
            .append('text')
            .attr('dy', "100px")
            .attr('id', 'temp')
            .text(d.name)
            .attr('fill', 'black');
    }

    const mOut = function(){
        d3.select(this)
            .style("stroke", "none");

        d3.select(this.parentNode).selectAll('#temp').remove('#temp');
    }



    // Organizar os dados em grupos (não tem efeito direto na criação do SVG, mas pode ser útil)
   /* const groupedData = d3.group(data, d => d.category); // Agrupar por categoria ou outro critério*/
    // Seleciona o grupo onde os círculos serão inseridos
    const circleGroup = svg.selectAll(".circle-group")
        .data([data], (d) => d.id);
    // Adiciona um novo grupo (g) se necessário
    const groupEnter = circleGroup.enter()
        .append("g")
        .attr("class", "circle-group");
    // Remove grupos desnecessários, se existirem
    circleGroup.exit().remove();
    // Agora dentro do grupo, lidamos com os círculos
    const circles = groupEnter.merge(circleGroup)
        .selectAll("circle")
        .data((d) => d, (d) => d.id); // A função de key precisa ser baseada no id de cada círculo

    // Remover círculos que não existem nos dados
    circles.exit().transition().duration(500).attr("r", 0).remove();

    //console.log(circles);
    //console.log(d3.version);

    // Atualizar círculos existentes
    circles.transition()
      .duration(500)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => d.r)
      .attr("fill", (d) => d.color);

    // Adicionar novos círculos
    circles.enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 0) // Começa com raio 0 para animação
      .attr("fill", (d) => d.color)
      .on('mouseover', mOver)
      .on('mouseout', mOut)
      .transition()
      .duration(500)
      .attr("r", (d) => d.r)
  }

  // Controle de fases com as teclas LEFT e RIGHT
  function nextPhase() {
    phase++;
    if (phase > 4) phase = 1; // Volta para a fase 1
    runPhase(phase);
  }

  function previousPhase() {
    phase--;
    if (phase < 1) phase = 4; // Vai para a fase 4
    runPhase(phase);
  }

  function runPhase(phase) {
    if (phase === 1) phase1();
    if (phase === 2) phase2();
    if (phase === 3) phase3();
    if (phase === 4) phase4();
  }

  // Eventos de teclado
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") nextPhase();
    if (event.key === "ArrowLeft") previousPhase();
  });

  // Evento de redimensionamento da janela
  window.addEventListener("resize", resize);
  // Iniciar na fase 1
  phase1();
};