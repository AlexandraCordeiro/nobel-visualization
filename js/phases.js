let raio=280;
svg= d3.select("svg");

//estado inicial - imagem moeda
function phase1() {
    svg.selectAll("text").remove()
    // Dados do círculo
    data = [{ id: 0, x: xScale(5), y: yScale(5), r: raio, color: "#E9DF69", imagePath: "../../dataset/moeda.png" }];

    // Remove qualquer imagem existente para evitar duplicação
    svg.selectAll("image").remove();

    // Adiciona a imagem centralizada no círculo
    svg.append("image")
        .attr("xlink:href", data[0].imagePath) // Caminho da imagem
        .attr("x", data[0].x - data[0].r) // Centraliza horizontalmente
        .attr("y", data[0].y - data[0].r ) // Centraliza verticalmente
        .attr("width", 2*data[0].r) // Define a largura igual ao diâmetro do círculo
        .attr("height", 2*data[0].r); // Define a altura igual ao diâmetro do círculo

    update();

}

//estado inicial - moeda com número
function phase2() {
    // Remover qualquer imagem existente para evitar duplicação
    svg.selectAll("image").remove();

    // Dados do círculo para a fase 2
    data = [{ id: 0, x: xScale(5), y: yScale(5), r: raio, color: "#E9DF69" }];
        
    // Atualiza a visualização (presumivelmente altera o círculo)
    update();

    // Adiciona um texto centralizado no SVG

    // Remover texto anterior (se houver)
    svg.selectAll("text").remove();

    // Adiciona o texto no centro do SVG
    svg.append("text")
        .attr("x", width / 2)  // Posição X centralizada
        .attr("y", height / 2)  // Posição Y centralizada
        .attr("text-anchor", "middle")  // Alinha o texto no centro
        .attr("dominant-baseline", "middle")  // Centraliza verticalmente
        .attr("font-size", "100px")  // Tamanho da fonte
        .attr("fill", "#000000")  // Cor do texto
        .text("1012");
}

//1012 bolas
function phase3() {
    console.log("fase 3");

    svg.selectAll("text").remove()

    const centerX = width / 2; // Centro da grelha
    const centerY = height / 2; // Centro da grelha
    const circleRadius = (raio * 7) / 300; //raio de cada circulo
    console.log(circleRadius + "px")
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
            const laureate = laureates[index] || { id: null, name: "Unknown", gender: "Unknown"};
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

    update();
}

//separa por cores entidades/género 
function phase4() {
    console.log("fase 4");

    const centerX = width / 2; // Centro da grelha
    const centerY = height / 2; // Centro da grelha
    const circleRadius = (raio * 7) / 300; 
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

            // Determina a cor com base no gênero
            const color = laureate.gender === "male"
                ? "#A69A07"
                : laureate.gender === "female"
                ? "#D7CB34"
                : "#E9DF69";

            data.push({ // dá push apenas dos dados que quero ver
                x: x,
                y: y,
                r: circleRadius,
                color: color, // Usa a cor definida com base no gênero
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

//separa por grupos de cores entidades/género
function phase5() {
    console.log("fase 5");


    const centerX = width / 2; //Centro horizontal
    const centerY = height / 2; // Centro vertical
    const circleRadius = 7; // Raio de cada círculo
    const gap = 1; // Espaçamento entre círculos
    const effectiveRadius = circleRadius + gap; // Raio efetivo considerando o gap

    //valor que define o género de um triangulos
    let val = 250;
     // Definir centros para cada gênero
    const centers = {
        male: { x: centerX-val/2, y: centerY },
        female: { x: centerX+val, y: centerY+val/2 },
        other: { x: centerX+val, y: centerY-val/3 }
    };

    // Grupos de dados para cada gênero
    const groups = {
        male: [],
        female: [],
        other: []
    };

    // Separar laureados por gênero
    laureates.forEach(laureate => {
        const gender = laureate.gender;
        if (gender === 'male') {
            groups.male.push(laureate);
        } else if (gender === 'female') {
            groups.female.push(laureate);
        } else {
            groups.other.push(laureate);
        }
    });

    // Processar cada grupo
    data = []; // Redefine os dados
    Object.keys(groups).forEach(groupKey => {
        const laureates = groups[groupKey];
        const { x: groupCenterX, y: groupCenterY } = centers[groupKey];
        const color = groupKey === 'male' ? '#A69A07' : groupKey === 'female' ? '#D7CB34' : '#E9DF69';

        let currentRadius = 0; // Raio atual da camada
        let index = 0; // Índice para acessar laureates

        while (index < laureates.length) {
            currentRadius += effectiveRadius * 2; // Incrementa o raio da camada com base no tamanho efetivo
            // Número de círculos na camada atual, proporcional ao comprimento da circunferência
            const circumference = 2 * Math.PI * currentRadius;
            const circlesInLayer = Math.min(
                laureates.length - index,
                Math.floor(circumference / (effectiveRadius * 2))
            );

            // Ângulo entre círculos nesta camada
            const angleStep = (2 * Math.PI) / circlesInLayer;

            // Adiciona os círculos da camada
            for (let i = 0; i < circlesInLayer; i++) {
                const angle = i * angleStep;
                const x = groupCenterX + currentRadius * Math.cos(angle);
                const y = groupCenterY + currentRadius * Math.sin(angle);

                const laureate = laureates[index];

                data.push({
                    x: x,
                    y: y,
                    r: circleRadius,
                    color: color,
                    id: laureate.id,
                    name: laureate.name,
                    gender: laureate.gender,
                    prizeCategory: laureate.prizeCategory,
                    awardYear: laureate.awardYear
                });
                index++; // Avança para o próximo laureado
            }
        }
    });


    update();
}

//separa por categorias
function phase6() {

console.log("fase 6");

//se estiver na phase5() e voltar atras remove o pattern
  svg.selectAll("pattern").remove()
  const centerX = width / 2; // Centro horizontal
  const centerY = height / 2; // Centro vertical
  const circleRadius = 7; // Raio de cada círculo
  const gap = 1; // Espaçamento entre círculos
  const effectiveRadius = circleRadius + gap; // Raio efetivo considerando o gap

  // Valor para definir deslocamento entre as categorias
  const val = 250;

  // Lista de categorias únicas no dataset
  const categories = [...new Set(laureates.map(laureate => laureate.prizeCategory))];

  // Calcular centros para cada categoria (em uma distribuição circular)
  const centers = {};
  const angleStep = (2 * Math.PI) / categories.length;

  categories.forEach((category, index) => {
      const angle = index * angleStep;
      centers[category] = {
          x: centerX + val * Math.cos(angle),
          y: centerY + val * Math.sin(angle)
      };
  });

  // Grupos de dados para cada categoria
  const groups = {};
  categories.forEach(category => {
      groups[category] = [];
  });

  // Separar laureados por categoria
  laureates.forEach(laureate => {
      const category = laureate.prizeCategory;
      if (groups[category]) {
          groups[category].push(laureate);
      }
  });

  // Processar cada grupo
  data = []; // Redefine os dados
  Object.keys(groups).forEach(groupKey => {
      const laureates = groups[groupKey];
      const { x: groupCenterX, y: groupCenterY } = centers[groupKey];
      const color = getColorForCategory(groupKey); // Obtem a cor com base na categoria

      let currentRadius = 0; // Raio atual da camada
      let index = 0; // Índice para acessar laureates

      while (index < laureates.length) {
          currentRadius += effectiveRadius * 2; // Incrementa o raio da camada com base no tamanho efetivo
          // Número de círculos na camada atual, proporcional ao comprimento da circunferência
          const circumference = 2 * Math.PI * currentRadius;
          const circlesInLayer = Math.min(
              laureates.length - index,
              Math.floor(circumference / (effectiveRadius * 2))
          );

          // Ângulo entre círculos nesta camada
          const angleStep = (2 * Math.PI) / circlesInLayer;

          // Adiciona os círculos da camada
          for (let i = 0; i < circlesInLayer; i++) {
              const angle = i * angleStep;
              const x = groupCenterX + currentRadius * Math.cos(angle);
              const y = groupCenterY + currentRadius * Math.sin(angle);

              const laureate = laureates[index];

              data.push({
                  x: x,
                  y: y,
                  r: circleRadius,
                  color: color,
                  id: laureate.id,
                  name: laureate.name,
                  gender: laureate.gender,
                  prizeCategory: laureate.prizeCategory,
                  awardYear: laureate.awardYear
              });
              index++; // Avança para o próximo laureado
          }
      }
  });

  update(); // Atualiza o SVG com os novos círculos

  // Função para obter uma cor única para cada categoria
    function getColorForCategory(category) {
    const colors = {
        Physics: "#A69A07",
        Chemistry: "#D7CB34",
        Physiology_or_Medicine: "#E9DF69",
        Literature: "#34D7A0",
        Peace: "#34A6D7",
        Economic_Sciences: "#D73434"
    };
    return colors[category] || "#888888"; // Cor padrão para categorias desconhecidas
    }
    update();
}

//separa categorias por entidades (diferentes cores) A cor é dependente do gender
/*function phase7() {
    console.log("fase 7");
    //se estiver na phase5() e voltar atras remove o pattern

  const centerX = width / 2; // Centro horizontal
  const centerY = height / 2; // Centro vertical
  const circleRadius = 7; // Raio de cada círculo
  const gap = 1; // Espaçamento entre círculos
  const effectiveRadius = circleRadius + gap; // Raio efetivo considerando o gap

  // Valor para definir deslocamento entre as categorias
  const val = 250;

  // Lista de categorias únicas no dataset
  const categories = [...new Set(laureates.map(laureate => laureate.prizeCategory))];

  // Calcular centros para cada categoria (em uma distribuição circular)
  const centers = {};
  const angleStep = (2 * Math.PI) / categories.length;

  categories.forEach((category, index) => {
      const angle = index * angleStep;
      centers[category] = {
          x: centerX + val * Math.cos(angle),
          y: centerY + val * Math.sin(angle)
      };
  });

  // Grupos de dados para cada categoria
  const groups = {};
  categories.forEach(category => {
      groups[category] = [];
  });

  // Separar laureados por categoria
  laureates.forEach(laureate => {
      const category = laureate.prizeCategory;
      if (groups[category]) {
          groups[category].push(laureate);
      }
  });

  // Processar cada grupo
  data = []; // Redefine os dados
  Object.keys(groups).forEach(groupKey => {
      const laureates = groups[groupKey];
      const { x: groupCenterX, y: groupCenterY } = centers[groupKey];
      const color = getColorForCategory(groupKey); // Obtem a cor com base na categoria

      let currentRadius = 0; // Raio atual da camada
      let index = 0; // Índice para acessar laureates

      while (index < laureates.length) {
          currentRadius += effectiveRadius * 2; // Incrementa o raio da camada com base no tamanho efetivo
          // Número de círculos na camada atual, proporcional ao comprimento da circunferência
          const circumference = 2 * Math.PI * currentRadius;
          const circlesInLayer = Math.min(
              laureates.length - index,
              Math.floor(circumference / (effectiveRadius * 2))
          );

          // Ângulo entre círculos nesta camada
          const angleStep = (2 * Math.PI) / circlesInLayer;

          // Adiciona os círculos da camada
          for (let i = 0; i < circlesInLayer; i++) {
              const angle = i * angleStep;
              const x = groupCenterX + currentRadius * Math.cos(angle);
              const y = groupCenterY + currentRadius * Math.sin(angle);

              const laureate = laureates[index];

              data.push({
                  x: x,
                  y: y,
                  r: circleRadius,
                  color: color,
                  id: laureate.id,
                  name: laureate.name,
                  gender: laureate.gender,
                  prizeCategory: laureate.prizeCategory,
                  awardYear: laureate.awardYear
              });
              index++; // Avança para o próximo laureado
          }
      }
  });

  update(); // Atualiza o SVG com os novos círculos

  // Função para obter uma cor única para cada categoria
    function getColorForCategory(category) {
    const colors = {
        Physics: "#A69A07",
        Chemistry: "#D7CB34",
        Physiology_or_Medicine: "#E9DF69",
        Literature: "#34D7A0",
        Peace: "#34A6D7",
        Economic_Sciences: "#D73434"
    };
    return colors[category] || "#888888"; // Cor padrão para categorias desconhecidas
    }
    update();
}*/

function phase7() {
    console.log("fase 7");
    //se estiver na phase5() e voltar atras remove o pattern

    const centerX = width / 2; // Centro horizontal
    const centerY = height / 2; // Centro vertical
    const circleRadius = 7; // Raio de cada círculo
    const gap = 1; // Espaçamento entre círculos
    const effectiveRadius = circleRadius + gap; // Raio efetivo considerando o gap

    // Valor para definir deslocamento entre as categorias
    const val = 250;

    // Lista de categorias únicas no dataset
    const categories = [...new Set(laureates.map(laureate => laureate.prizeCategory))];

    // Calcular centros para cada categoria (em uma distribuição circular)
    const centers = {};
    const angleStep = (2 * Math.PI) / categories.length;

    categories.forEach((category, index) => {
        const angle = index * angleStep;
        centers[category] = {
            x: centerX + val * Math.cos(angle),
            y: centerY + val * Math.sin(angle)
        };
    });

    // Grupos de dados para cada categoria
    const groups = {};
    categories.forEach(category => {
        groups[category] = [];
    });

    // Separar laureados por categoria
    laureates.forEach(laureate => {
        const category = laureate.prizeCategory;
        if (groups[category]) {
            groups[category].push(laureate);
        }
    });

    // Processar cada grupo
    data = []; // Redefine os dados
    Object.keys(groups).forEach(groupKey => {
        const laureates = groups[groupKey];
        const { x: groupCenterX, y: groupCenterY } = centers[groupKey];

        let currentRadius = 0; // Raio atual da camada
        let index = 0; // Índice para acessar laureates

        while (index < laureates.length) {
            currentRadius += effectiveRadius * 2; // Incrementa o raio da camada com base no tamanho efetivo
            // Número de círculos na camada atual, proporcional ao comprimento da circunferência
            const circumference = 2 * Math.PI * currentRadius;
            const circlesInLayer = Math.min(
                laureates.length - index,
                Math.floor(circumference / (effectiveRadius * 2))
            );

            // Ângulo entre círculos nesta camada
            const angleStep = (2 * Math.PI) / circlesInLayer;

            // Adiciona os círculos da camada
            for (let i = 0; i < circlesInLayer; i++) {
                const angle = i * angleStep;
                const x = groupCenterX + currentRadius * Math.cos(angle);
                const y = groupCenterY + currentRadius * Math.sin(angle);

                const laureate = laureates[index];

                // A cor agora depende do gênero do laureado
                const color = getColorForGender(laureate.gender);

                data.push({
                    x: x,
                    y: y,
                    r: circleRadius,
                    color: color,
                    id: laureate.id,
                    name: laureate.name,
                    gender: laureate.gender,
                    prizeCategory: laureate.prizeCategory,
                    awardYear: laureate.awardYear
                });
                index++; // Avança para o próximo laureado
            }
        }
    });

    update(); // Atualiza o SVG com os novos círculos

    // Função para obter a cor com base no gênero
    function getColorForGender(gender) {
        if (gender === 'male') {
            return "#646E68";  // Cor para male
        } else if (gender === 'female') {
            return "#BAACBD";  // Cor para female
        } else {
            return "#B48EAE";  // Cor para other
        }
    }
}

function phase8(){

        console.log("fase 8");
    
        const centerX = width / 2; // Centro horizontal
        const centerY = height / 2; // Centro vertical
        const circleRadius = 7; // Raio de cada círculo
        const gap = 1; // Espaçamento entre círculos
        const effectiveRadius = circleRadius + gap; // Raio efetivo considerando o gap
    
        // Valor para definir deslocamento entre as categorias (diminuído para manter as categorias mais próximas)
        const val = 280; // Ajuste aqui para reduzir a distância entre as categorias
        
        // Lista de categorias únicas no dataset
        const categories = [...new Set(laureates.map(laureate => laureate.prizeCategory))];
    
        // Calcular centros para cada categoria (em uma distribuição circular)
        const centers = {};
        const angleStep = (2 * Math.PI) / categories.length;
    
        categories.forEach((category, index) => {
            const angle = index * angleStep;
            centers[category] = {
                x: centerX + val * Math.cos(angle),
                y: centerY + val * Math.sin(angle)
            };
        });
    
        // Grupos de dados para cada categoria
        const groups = {};
        categories.forEach(category => {
            groups[category] = {
                male: [],
                female: [],
                other: []
            };
        });
    
        // Separar laureados por categoria e gênero
        laureates.forEach(laureate => {
            const category = laureate.prizeCategory;
            const gender = laureate.gender;
    
            if (groups[category]) {
                if (gender === 'male') {
                    groups[category].male.push(laureate);
                } else if (gender === 'female') {
                    groups[category].female.push(laureate);
                } else {
                    groups[category].other.push(laureate);
                }
            }
        });
    
        // Processar cada grupo
        data = []; // Redefine os dados
        Object.keys(groups).forEach(groupKey => {
            const laureatesByGender = groups[groupKey];
            const { x: groupCenterX, y: groupCenterY } = centers[groupKey];
    
            // Definir os 3 pontos centrais para os gêneros (distribuídos ao longo da circunferência)
            const genderCenters = {
                male: { x: groupCenterX, y: groupCenterY},
                female: { x: groupCenterX+100, y: groupCenterY},
                other: { x: groupCenterX-100, y: groupCenterY}
            };
    
            // Processar laureados de cada gênero dentro da categoria
            Object.keys(laureatesByGender).forEach(genderKey => {
                const laureates = laureatesByGender[genderKey];
                const { x: genderCenterX, y: genderCenterY } = genderCenters[genderKey];
    
                // Cor associada ao gênero
                const color = getColorForGender(genderKey);
    
                let currentRadius = 0; // Raio atual da camada
                let index = 0; // Índice para acessar laureates
    
                while (index < laureates.length) {
                    currentRadius += effectiveRadius * 2; // Incrementa o raio da camada com base no tamanho efetivo
                    // Número de círculos na camada atual, proporcional ao comprimento da circunferência
                    const circumference = 2 * Math.PI * currentRadius;
                    const circlesInLayer = Math.min(
                        laureates.length - index,
                        Math.floor(circumference / (effectiveRadius * 2))
                    );
    
                    // Ângulo entre círculos nesta camada
                    const angleStep = (2 * Math.PI) / circlesInLayer;

                    // Adiciona os círculos da camada
                    for (let i = 0; i < circlesInLayer; i++) {
                        const angle = i * angleStep;
                        const x = genderCenterX + currentRadius * Math.cos(angle);
                        const y = genderCenterY + currentRadius * Math.sin(angle);
    
                        const laureate = laureates[index];
    
                        data.push({
                            x: x,
                            y: y,
                            r: circleRadius,
                            color: color,
                            id: laureate.id,
                            name: laureate.name,
                            gender: laureate.gender,
                            prizeCategory: laureate.prizeCategory,
                            awardYear: laureate.awardYear
                        });
                        index++; // Avança para o próximo laureado
                    }
                }
            });
        });
    
        update(); // Atualiza o SVG com os novos círculos
    
        // Função para obter a cor com base no gênero
        function getColorForGender(gender) {
            if (gender === 'male') {
                return "#646E68";  // Cor para male
            } else if (gender === 'female') {
                return "#BAACBD";  // Cor para female
            } else {
                return "#B48EAE";  // Cor para other
            }
        }
    
    
}

//Marie Curie
function phase9(){
    console.log("FASE 9");

  const backgroundImageURL = "../../marie_curie.png";
  const svg = d3.select("svg");

  const wikidataId = "";
  fetchWikidataImage(wikidataId);

  // Limpa o SVG antes de adicionar elementos
  //svg.selectAll("*").remove();

  // Define um padrão para a imagem
  const defs = svg.append("defs");
  defs.append("pattern")
      .attr("id", "circle-bg") // ID único do padrão
      //.attr("patternUnits", "objectBoundingBox")
      .attr("width", 1)
      .attr("height", 1)
      .append("image")
      .attr("xlink:href", backgroundImageURL)
      //.attr("preserveAspectRatio", "xMidYMid slice") // Ajusta a proporção
      //.attr("width", 600) // Ajuste para o tamanho correto da imagem
      //.attr("height", 600); // Ajuste para o tamanho correto da imagem

  // Adiciona o círculo com o padrão de fundo
  data = [
      { id: 0, x: xScale(5), y: yScale(5), r: raio, color: "url(#circle-bg)" }
  ];

  svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", d => d.color)
      .attr("id", "backgroundCircle"); // Adiciona um ID para o círculo

  update();
}

function phase10(){
    console.log("FASE 10");
    //remove o pattern ao avançar para a phase6();
    svg.selectAll("pattern").remove()
    svg.selectAll("image").remove();
}

function initializePhases() {
    maxPhase = 10;
    runPhase(1);
}

function runPhase(phase) {
    if (phase === 1) phase1();
    if (phase === 2) phase2();
    if (phase === 3) phase3();
    if (phase === 4) phase4();
    if (phase === 5) phase5();
    if (phase === 6) phase6();
    if (phase === 7) phase7();
    if (phase === 8) phase8();
    if (phase === 9) phase9();
    if (phase === 10) phase10();
}






// URL da Wikidata
const wikidataLink = "https://www.wikidata.org/wiki/Q7186";

// Função para extrair o ID da Wikidata do link
function getWikidataId(url) {
  const match = url.match(/\/wiki\/(Q\d+)/);
  return match ? match[1] : null;
}

// Função para buscar a imagem associada a um item da Wikidata
async function fetchWikidataImage(wikidataId) {
  const apiUrl = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${wikidataId}&property=P18&format=json&origin=*`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Verificar se a propriedade P18 (imagem) existe
    if (data.claims && data.claims.P18) {
      const imageName = data.claims.P18[0].mainsnak.datavalue.value;
      // Construir a URL da imagem no Wikimedia Commons
      const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(imageName)}`;
      console.log(`Imagem encontrada: ${imageUrl}`);
      return imageUrl;
    } else {
      console.log("Nenhuma imagem encontrada para este item.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar a imagem:", error);
    return null;
  }
}

// Processar o único link
(async () => {
  const wikidataId = getWikidataId(wikidataLink);
  if (wikidataId) {
    await fetchWikidataImage(wikidataId);
  } else {
    console.log("Link da Wikidata inválido.");
  }
})();
